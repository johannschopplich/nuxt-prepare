import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../../src/module'

export default defineNuxtConfig({
  extends: ['./layers/base'],

  modules: [
    [
      NuxtPrepare,
      {
        scripts: ['inline.prepare'],
      },
    ],
  ],

  compatibilityDate: '2026-01-01',
})
