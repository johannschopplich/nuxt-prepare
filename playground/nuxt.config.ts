import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../src/module'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // @ts-expect-error: Type mismatch
  modules: [NuxtPrepare],

  runtimeConfig: {
    public: {
      foo: '',
    },
  },

  prepare: {
    scripts: [
      'server.prepare',
      'store.prepare',
      // 'process.prepare',
    ],
  },
})
