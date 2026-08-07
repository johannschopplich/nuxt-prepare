import type { AppConfig, RuntimeConfig } from '@nuxt/schema'
import type { NuxtPrepareResult } from './types'
import { addTemplate, defineNuxtModule, findPath, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import * as importx from 'importx'
import { interopDefault } from 'mlly'
import { join } from 'pathe'
import { pascalCase } from 'scule'
import { name, version } from '../package.json'
import { isObject, stripExtension, toArray } from './utils'

const SCRIPT_EXTENSIONS = ['.js', '.mjs', '.ts']

// #region options
export interface PrepareScript {
  file: string
  runOnNuxtPrepare?: boolean
}

export interface ModuleOptions {
  /**
   * List of prepare scripts to run. The scripts are executed in the
   * order they are defined.
   *
   * @remarks
   * You can omit the file extension. Supported extensions are: `.js`, `.mjs`, `.ts`.
   *
   * @default ['server.prepare']
   */
  scripts: string | string[] | PrepareScript | PrepareScript[]

  /**
   * If `true`, the prepare scripts will be run in parallel.
   *
   * @remarks
   * This can be useful if you have multiple scripts that can be run independently.
   *
   * @default false
   */
  parallel?: boolean

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

  /**
   * Whether the scripts should be run on `nuxt prepare`.
   *
   * @remarks
   * If set to `false`, all scripts will be ignored when running `nuxt prepare`. If you want to
   * exclude specific scripts, use the object syntax for the `scripts` option and set the
   * `runOnNuxtPrepare` property individually for each script.
   *
   * @default true
   */
  runOnNuxtPrepare?: boolean
}
// #endregion options

interface ResolvedScriptMeta {
  name: string
  path: string
  runOnNuxtPrepare: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'prepare',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  defaults: {
    scripts: ['server.prepare'],
    parallel: false,
    continueOnError: false,
    runOnNuxtPrepare: true,
  },
  async setup(options, nuxt) {
    const moduleName = name
    const logger = useLogger(moduleName)
    let successCount = 0
    let errorCount = 0

    let state: Record<string, unknown> = {}

    // Lowest priority first: a later script overrides an earlier one, and the
    // app layer has to have the last word over the layers it extends.
    const layerScripts: { root: string, name: string, runOnNuxtPrepare: boolean }[] = []
    const appLayer = nuxt.options._layers[0]

    for (const layer of [...nuxt.options._layers].reverse()) {
      const isAppLayer = layer === appLayer
      const layerPrepareScripts = layer.config.prepare ? layer.config.prepare.scripts : undefined
      const scripts = layerPrepareScripts !== undefined
        ? toArray(layerPrepareScripts)
        : isAppLayer
          ? ['server.prepare']
          : []

      for (const entry of scripts) {
        const scriptName = stripExtension(
          typeof entry === 'string' ? entry : entry.file,
          SCRIPT_EXTENSIONS,
        )

        layerScripts.push({
          root: layer.config.rootDir,
          name: scriptName,
          runOnNuxtPrepare: typeof entry === 'string' ? true : (entry.runOnNuxtPrepare ?? true),
        })
      }
    }

    // Resolve script file paths relative to each layer's root.
    const resolvedEntries = await Promise.all(layerScripts.map(async (script) => {
      const path = await findPath(script.name, { extensions: SCRIPT_EXTENSIONS, cwd: script.root }, 'file')

      if (!path) {
        if (script.name === 'server.prepare') {
          // Default server prepare script not found – skip silently.
          return
        }

        logger.error(
          `Server prepare script \`${script.name}{${SCRIPT_EXTENSIONS.join(',')}}\` not found. Please create the file or remove it from the \`prepare.scripts\` module option.`,
        )
        throw new Error('Server prepare script not found')
      }

      return {
        name: script.name,
        path,
        runOnNuxtPrepare: script.runOnNuxtPrepare,
      }
    }))

    // A path listed by several layers keeps the last entry and the last
    // position, so the highest-priority layer decides both when the script runs
    // and whether `nuxt prepare` runs it.
    const scriptsByPath = new Map<string, ResolvedScriptMeta>()
    for (const entry of resolvedEntries) {
      if (entry) {
        scriptsByPath.delete(entry.path)
        scriptsByPath.set(entry.path, entry)
      }
    }
    const resolvedScripts = [...scriptsByPath.values()]

    const runScript = async ({ name, path, runOnNuxtPrepare }: ResolvedScriptMeta) => {
      if (nuxt.options._prepare && !runOnNuxtPrepare) {
        logger.info(`Skipping prepare script \`${name}\``)
        return
      }

      logger.info(`Running prepare script \`${name}\``)

      const result: NuxtPrepareResult = await interopDefault(
        await importx.import(path, {
          parentURL: nuxt.options.rootDir,
          cache: false,
          loaderOptions: {
            // Nuxt's TypeScript config will only be generated along
            // with prepare scripts, so we disable config resolution.
            tsx: { tsconfig: false },
          },
        }),
      )
      const isOk = result.ok ?? true

      if (!isOk) {
        logger.error(`Server prepare script \`${name}\` returned an error`)
        errorCount++

        if (!options.continueOnError)
          throw new TypeError('Server prepare script failed')

        return
      }

      successCount++

      // A script's result takes precedence over what it merges into, so that
      // returning a key overrides the value `nuxt.config` gave it and a later
      // script overrides an earlier one. An array is the exception – `defu`
      // concatenates those whichever way around it is called. The casts hold
      // because the defaults stay whole underneath; `defu` just cannot see
      // that through the partial.
      if (result.runtimeConfig) {
        nuxt.options.runtimeConfig = defu(
          result.runtimeConfig,
          nuxt.options.runtimeConfig,
        ) as RuntimeConfig
      }

      if (result.appConfig)
        nuxt.options.appConfig = defu(result.appConfig, nuxt.options.appConfig) as AppConfig

      if (result.state) {
        if (!isObject(result.state))
          throw new TypeError('Server prepare script returned invalid state')
        state = defu(result.state, state)
      }
    }

    if (nuxt.options._prepare && !options.runOnNuxtPrepare) {
      logger.info('Skipping prepare scripts')
    }
    else {
      if (options.parallel) {
        await Promise.all(resolvedScripts.map(runScript))
      }
      else {
        for (const script of resolvedScripts) {
          await runScript(script)
        }
      }
    }

    // Add `#nuxt-prepare` module alias.
    nuxt.options.alias[`#${moduleName}`] = join(nuxt.options.buildDir, `module/${moduleName}`)

    nuxt.hooks.hook('nitro:config', (config) => {
      // Provide `#nuxt-prepare` module alias for Nitro.
      config.alias ||= {}
      config.alias[`#${moduleName}`] = join(nuxt.options.buildDir, `module/${moduleName}`)
    })

    addTemplate({
      filename: `module/${moduleName}.mjs`,
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
`.trim()).join('\n')}
`.trimStart()
      },
    })

    addTemplate({
      filename: `module/${moduleName}.d.ts`,
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
export declare const ${key}: ${JSON.stringify(value, undefined, 2)}
export type ${pascalCase(key)} = typeof ${key}
`.trim()).join('\n')}
`.trimStart()
      },
    })

    if (errorCount > 0)
      logger.warn(`Server prepare scripts completed with ${errorCount} error${errorCount > 1 ? 's' : ''}`)
    else if (successCount > 0)
      logger.success('Server prepare scripts completed')
  },
})
