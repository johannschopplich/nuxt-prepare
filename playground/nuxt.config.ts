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
      // 'process.prepare',
    ],
  },

  experimental: {
    typescriptBundlerResolution: true,
  },

  typescript: {
    typeCheck: 'build',
    shim: false,
  },
})
