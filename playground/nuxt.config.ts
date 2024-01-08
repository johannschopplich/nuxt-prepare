export default defineNuxtConfig({
  modules: ['../src/module.ts'],

  runtimeConfig: {
    public: {
      foo: '',
    },
  },

  prepareKit: {
    scripts: [
      'server.prepare',
      'store.prepare',
      // 'process.prepare',
    ],
  },

  future: {
    typescriptBundlerResolution: true,
  },

  typescript: {
    typeCheck: 'build',
    shim: false,
  },
})
