import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrepare from '../../../../src/module'

export default defineNuxtConfig({
  modules: [
    [
      NuxtPrepare,
      {
        scripts: ['layer.prepare'],
      },
    ],
  ],
})
