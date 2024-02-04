export default defineNuxtConfig({
  modules: ['../src/module.ts'],

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

  typescript: {
    shim: false,
  },
})
