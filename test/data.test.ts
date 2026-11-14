import type { Nuxt, NuxtTemplate } from '@nuxt/schema'
import { join } from 'node:path'
import { loadNuxt } from '@nuxt/kit'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

function templateContents(nuxt: Nuxt, filename: string) {
  const template = nuxt.options.build.templates.find(template => template.filename === filename)
  return template?.getContents?.({} as Parameters<NonNullable<NuxtTemplate['getContents']>>[0])
}

describe('prepare data', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-data'),
    })
  }, 120_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('exports each key as a constant', () => {
    expect(templateContents(nuxt, 'module/nuxt-prepare.mjs')).toContain('export const todo = {\n  "id": 1,')
  })

  it('declares each key with its literal type, read-only, and a type alias', () => {
    const declarations = templateContents(nuxt, 'module/nuxt-prepare.d.ts')

    expect(declarations).toContain('type _DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: _DeepReadonly<T[K]> } : T')
    expect(declarations).toContain('export declare const todo: _DeepReadonly<{')
    expect(declarations).toContain('"id": 1,')
    expect(declarations).toContain('export type Todo = typeof todo')
  })

  it('lets later.prepare override what todo.prepare returned', () => {
    expect(templateContents(nuxt, 'module/nuxt-prepare.mjs')).toContain('export const region = "later.prepare"')
  })
})

describe('prepare data keys', () => {
  it('stops the build for build-region', async () => {
    await expect(loadNuxt({
      cwd: join(import.meta.dirname, 'fixture-invalid-key'),
    })).rejects.toThrow('Prepare data key `build-region` is not a valid export name')
  }, 120_000)
})
