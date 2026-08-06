import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  prepare: {
    scripts: [
      'base.prepare',
    ],
  },
})
