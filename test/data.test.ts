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

  it('declares each key with its literal type and a type alias', () => {
    const declarations = templateContents(nuxt, 'module/nuxt-prepare.d.ts')

    expect(declarations).toContain('export declare const todo:')
    expect(declarations).toContain('"id": 1,')
    expect(declarations).toContain('export type Todo = typeof todo')
  })

  it('lets later.prepare override what todo.prepare returned', () => {
    expect(templateContents(nuxt, 'module/nuxt-prepare.mjs')).toContain('export const region = "later.prepare"')
  })
})
