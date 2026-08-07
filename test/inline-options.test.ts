import type { Nuxt } from '@nuxt/schema'
import { fileURLToPath } from 'node:url'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('inline module options', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: fileURLToPath(new URL('./fixture-inline', import.meta.url)),
    })
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('runs a script listed in scripts passed beside the module', () => {
    expect(nuxt.options.runtimeConfig.public.fromInline).toBe('inline.prepare')
  })
})
