import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../src/module'

export default defineNuxtConfig({
  modules: [NuxtPrepare],

  runtimeConfig: {
    public: {
      foo: '',
    },
  },

  compatibilityDate: '2024-04-03',

  prepare: {
    scripts: [
      'server.prepare',
      'store.prepare',
      // 'process.prepare',
    ],
  },
})
