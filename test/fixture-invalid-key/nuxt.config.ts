import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../../src/module'

export default defineNuxtConfig({
  modules: [NuxtPrepare],

  compatibilityDate: '2026-01-01',

  prepare: {
    scripts: ['data.prepare'],
  },
})
