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
})
