import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  prepare: {
    scripts: [
      { file: 'layer.prepare.ts', runOnNuxtPrepare: true },
    ],
  },
})
