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

  it('adds a script to nuxt.options.watch', () => {
    expect(nuxt.options.watch).toContain(join(import.meta.dirname, 'fixture-commonjs/commonjs.prepare.ts'))
  })

  it('fails the build for a function as the default export', async () => {
    await expect(loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-invalid-export'),
    })).rejects.toThrow('Server prepare script `function.prepare` must export a result object')
  }, 120_000)

  it('fails the build with the error a script throws', async () => {
    await expect(loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-throw'),
    })).rejects.toThrow('Missing environment variables: NUXT_PUBLIC_FOO')
  }, 120_000)

  it('evaluates a script afresh on a second loadNuxt', async () => {
    for (let run = 0; run < 2; run++) {
      const rerunNuxt = await loadNuxt({
        cwd: join(import.meta.dirname, 'fixture-rerun'),
      })
      await rerunNuxt.close()
    }

    expect((globalThis as { prepareRuns?: number }).prepareRuns).toBe(2)
  }, 120_000)
})
