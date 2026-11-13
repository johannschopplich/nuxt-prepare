import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: {
      fromExtra: 'extra.prepare',
      fromScriptOrder: 'extra.prepare',
    },
  },
}))
