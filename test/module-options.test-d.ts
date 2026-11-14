import type { ModuleOptions } from '../src/module'
import { expectTypeOf } from 'vitest'
import { defineNuxtPrepareHandler } from '../src/config'

expectTypeOf([
  'users.prepare',
  { file: 'products.prepare', runOnNuxtPrepare: false },
]).toExtend<NonNullable<ModuleOptions['scripts']>>()

// @ts-expect-error A misspelled result key.
defineNuxtPrepareHandler({ data: {}, appconfig: {} })

defineNuxtPrepareHandler({
  runtimeConfig: {
    secret: 'x',
    public: { apiUrl: 'https://example.com' },
  },
  appConfig: {
    theme: { primaryColor: '#86CA39' },
  },
})
