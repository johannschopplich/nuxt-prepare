import type { Nuxt, NuxtApp, NuxtTemplate } from '@nuxt/schema'
import { join } from 'node:path'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const appConfigFile = join(import.meta.dirname, 'fixture/app.config.ts')

describe('prepare script results', () => {
  let nuxt: Nuxt
  let publicRuntimeConfig: Record<string, unknown>
  let appConfig: Record<string, unknown>

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: join(import.meta.dirname, 'fixture'),
    })
    publicRuntimeConfig = nuxt.options.runtimeConfig.public
    appConfig = nuxt.options.appConfig
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('overrides a runtimeConfig key that nuxt.config already set', () => {
    expect(publicRuntimeConfig.fromConfig).toBe('first.prepare')
  })

  it('overrides an appConfig key that nuxt.config already set', () => {
    expect(appConfig.fromConfig).toBe('first.prepare')
  })

  it('leaves a runtimeConfig key no script returned untouched', () => {
    expect(publicRuntimeConfig.untouched).toBe('nuxt.config')
  })

  it('lets second.prepare override what first.prepare returned', () => {
    expect(publicRuntimeConfig.fromScriptOrder).toBe('second.prepare')
  })

  it('lets the app layer override what an extended layer returned', () => {
    expect(publicRuntimeConfig.fromLayer).toBe('first.prepare')
  })

  it('places the generated app config ahead of every app.config file', async () => {
    // Only the fields the registered `app:resolve` hooks reach for.
    const app = { configs: [appConfigFile], middleware: [], plugins: [] }

    await nuxt.callHook('app:resolve', app as unknown as NuxtApp)

    expect(app.configs).toEqual([expect.stringMatching(/nuxt-prepare-app-config\.mjs$/), appConfigFile])
  })

  it('writes what the script returned into the generated app config', () => {
    const template = nuxt.options.build.templates.find(
      ({ filename }) => filename?.endsWith('nuxt-prepare-app-config.mjs'),
    )

    expect(template?.getContents?.({} as Parameters<NonNullable<NuxtTemplate['getContents']>>[0])).toContain('"fromConfig": "first.prepare"')
  })
})
