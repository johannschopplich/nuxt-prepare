import { existsSync } from 'node:fs'
import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: [
    existsSync(resolve(__dirname, '../dist/module.mjs')) ? 'nuxt-api-party' : '../src/module',
  ],

  runtimeConfig: {
    public: {
      foo: '',
    },
  },

  prepare: {
    scripts: [
      'server.prepare',
      'store.prepare',
      // 'process.prepare',
    ],
  },
})
