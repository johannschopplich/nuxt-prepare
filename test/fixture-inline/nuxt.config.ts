import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../../src/module'

export default defineNuxtConfig({
  modules: [[NuxtPrepare, { scripts: ['inline.prepare'] }]],

  compatibilityDate: '2026-01-01',
})
