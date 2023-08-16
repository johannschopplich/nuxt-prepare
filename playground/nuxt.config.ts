export default defineNuxtConfig({
  modules: ['../src/module.ts'],

  runtimeConfig: {
    public: {
      foo: '',
    },
  },

  prepareKit: {
    scripts: ['server.prepare', 'process.prepare'],
  },

  typescript: {
    typeCheck: 'build',
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
