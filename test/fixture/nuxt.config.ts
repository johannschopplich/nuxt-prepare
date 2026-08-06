import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../../src/module'

export default defineNuxtConfig({
  extends: ['./layers/base'],

  modules: [NuxtPrepare],

  runtimeConfig: {
    public: {
      fromConfig: 'nuxt.config',
      fromLayer: 'nuxt.config',
      fromScriptOrder: 'nuxt.config',
      untouched: 'nuxt.config',
    },
  },

  appConfig: {
    fromConfig: 'nuxt.config',
  },

  compatibilityDate: '2026-01-01',

  prepare: {
    scripts: [
      'first.prepare',
      'second.prepare',
    ],
  },
})
