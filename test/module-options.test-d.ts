import type { ModuleOptions } from '../src/module'
import { expectTypeOf } from 'vitest'

expectTypeOf([
  'users.prepare',
  { file: 'products.prepare', runOnNuxtPrepare: false },
]).toExtend<NonNullable<ModuleOptions['scripts']>>()
