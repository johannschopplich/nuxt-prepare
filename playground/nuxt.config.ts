import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../src/module'

export default defineNuxtConfig({
  extends: ['./layers/nested'],

  modules: [NuxtPrepare],

  runtimeConfig: {
    public: {
      foo: '',
    },
  },

  compatibilityDate: '2026-01-01',

  prepare: {
    scripts: [
      'server.prepare',
      'store.prepare',
      // 'process.prepare',
    ],
  },
})
