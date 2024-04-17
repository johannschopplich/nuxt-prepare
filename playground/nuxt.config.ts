import { existsSync } from 'node:fs'
import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    existsSync(resolve(__dirname, '../dist/module.mjs')) ? 'nuxt-prepare' : '../src/module',
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
