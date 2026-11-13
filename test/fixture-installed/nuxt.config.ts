import { defineNuxtConfig } from 'nuxt/config'
import ExtraModule from './extra-module'

export default defineNuxtConfig({
  modules: [ExtraModule],

  compatibilityDate: '2026-01-01',

  prepare: {
    scripts: ['app.prepare'],
  },
})
