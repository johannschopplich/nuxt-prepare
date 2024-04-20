import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

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
