import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: { fromScriptOrder: 'fast.prepare' },
  },
}))
