import type { Nuxt } from '@nuxt/schema'
import { join } from 'node:path'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('script loading', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-commonjs'),
    })
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('applies what a TypeScript script returned in a project without "type": "module"', () => {
    expect(nuxt.options.runtimeConfig.public.fromCommonJs).toBe('commonjs.prepare')
  })

  it('fails the build for a function as the default export', async () => {
    await expect(loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-invalid-export'),
    })).rejects.toThrow('Server prepare script `function.prepare` must export a result object')
  }, 120_000)
})
