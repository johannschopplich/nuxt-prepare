import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: {
      fromInline: 'inline.prepare',
    },
  },
}))
