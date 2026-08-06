import type { Nuxt } from '@nuxt/schema'
import { fileURLToPath } from 'node:url'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('prepare script results', () => {
  let nuxt: Nuxt
  let publicRuntimeConfig: Record<string, unknown>
  let appConfig: Record<string, unknown>

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: fileURLToPath(new URL('./fixture', import.meta.url)),
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
})
