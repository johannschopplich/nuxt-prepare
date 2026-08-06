import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: {
      fromConfig: 'first.prepare',
      fromLayer: 'first.prepare',
      fromScriptOrder: 'first.prepare',
    },
  },

  appConfig: {
    fromConfig: 'first.prepare',
  },
}))
