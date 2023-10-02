import { join } from 'pathe'
import { defu } from 'defu'
import { pascalCase } from 'scule'
import createJITI from 'jiti'
import { addTemplate, defineNuxtModule, findPath, useLogger } from '@nuxt/kit'
import { name, version } from '../package.json'
import { toArray } from './utils'
import type { NuxtPrepareResult } from './types'

export { defineNuxtPrepareHandler } from './config'

export interface ModuleOptions {
  /**
   * Accepts a list of prepare scripts to run. The scripts are executed in the
   * order they are defined.
   *
   * @remarks
   * You can omit the file extension. Supported extensions are: `.js`, `.mjs`, `.ts`.
   *
   * @default ['server.prepare']
   */
  scripts: string | string[]
  /**
   * If `true`, the module will not throw an error if a script fails.
   *
   * @remarks
   * Ensure to add `ok: false` to your script's return value to indicate that
   * the script failed. Otherwise, the module will assume that the script
   * succeeded.
   *
   * @default false
   */
  continueOnError?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'prepareKit',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    scripts: ['server.prepare'],
    continueOnError: false,
  },
  async setup(options, nuxt) {
    const moduleName = 'nuxt-prepare'
    const logger = useLogger(moduleName)
    const extensions = ['.js', '.mjs', '.ts']
    const _import = createJITI(nuxt.options.rootDir, {
      interopDefault: true,
      esmResolve: true,
    })
    let successCount = 0
    let errorCount = 0

    // Normalize options and dedupe items
    options.scripts = Array.from(
      new Set(toArray(options.scripts).map((script) => {
        // Remove extension if present
        for (const ext of extensions) {
          if (script.endsWith(ext)) {
            script = script.slice(0, -ext.length)
            break
          }
        }

        return script.trim()
      })),
    )

    const resolvedScripts: {
      name: string
      path: string
    }[] = []

    const state: Record<string, unknown> = {}

    // Prepare scripts
    for (const name of options.scripts) {
      const path = await findPath(name, { extensions }, 'file')

      if (name === 'server.prepare' && !path) {
        // Default server prepare script not found
        continue
      }

      if (!path) {
        logger.error(
          `Server prepare script \`${name}{${extensions.join(',')}}\` not found. Please create the file or remove it from the \`prepareKit.scripts\` module option.`,
        )
        throw new Error('Server prepare script not found')
      }

      resolvedScripts.push({ name, path })
    }

    // Run scripts
    for (const { name, path } of resolvedScripts) {
      logger.info(`Running prepare script \`${name}\``)

      const result: NuxtPrepareResult = await _import(path)
      const isOk = result.ok ?? true

      if (!isOk) {
        logger.error(`Server prepare script \`${name}\` returned an error`)
        errorCount++

        if (!options.continueOnError)
          throw new TypeError('Server prepare script failed')

        continue
      }

      successCount++

      if (result.runtimeConfig) {
        // @ts-expect-error: type mismatch
        nuxt.options.runtimeConfig = defu(
          result.runtimeConfig,
          nuxt.options.runtimeConfig,
        )
      }
      if (result.appConfig)
        // @ts-expect-error: type mismatch
        nuxt.options.appConfig = defu(result.appConfig, nuxt.options.appConfig)
      if (result.state) {
        if (!isObject(result.state))
          throw new TypeError('Server prepare script returned invalid state')
        Object.assign(state, result.state)
      }
    }

    // Add `#nuxt-prepare` module alias
    nuxt.options.alias[`#${moduleName}`] = join(nuxt.options.buildDir, `module/${moduleName}`)

    // Add global `#nuxt-prepare` state
    addTemplate({
      filename: `module/${moduleName}.ts`,
      write: true,
      getContents() {
        const results = Object.entries(state)

        if (!results.length) {
          return `
// Generated by ${moduleName}
export {}
`.trimStart()
        }

        return `
// Generated by ${moduleName}
${results.map(([key, value]) => `
export const ${key} = ${JSON.stringify(value, undefined, 2)}
export type ${pascalCase(key)} = typeof ${key}
`.trim()).join('\n')}
`.trimStart()
      },
    })

    // Finally, add `#nuxt-prepare` global state
    if (errorCount > 0)
      logger.warn(`Server prepare scripts completed with ${errorCount} error${errorCount > 1 ? 's' : ''}`)
    else if (successCount > 0)
      logger.success('Server prepare scripts completed')
  },
})

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
