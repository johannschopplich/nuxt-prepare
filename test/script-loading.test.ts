import type { Nuxt } from '@nuxt/schema'
import { join } from 'node:path'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('a project without `"type": "module"`', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-commonjs'),
    })
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('applies what a TypeScript script returned', () => {
    expect(nuxt.options.runtimeConfig.public.fromCommonJs).toBe('commonjs.prepare')
  })
})
