import type { Nuxt } from '@nuxt/schema'
import { join } from 'node:path'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('inline module options', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-inline'),
    })
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('runs the script they name', () => {
    expect(nuxt.options.runtimeConfig.public.fromInline).toBe('inline.prepare')
  })

  it('runs the script a layer names, from the layer\'s directory', () => {
    expect(nuxt.options.runtimeConfig.public.fromLayerInline).toBe('layer.prepare')
  })
})

describe('installModule options', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-installed'),
    })
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('runs the script they name', () => {
    expect(nuxt.options.runtimeConfig.public.fromExtra).toBe('extra.prepare')
  })

  it('lets app.prepare override what extra.prepare returned', () => {
    expect(nuxt.options.runtimeConfig.public.fromScriptOrder).toBe('app.prepare')
  })
})
