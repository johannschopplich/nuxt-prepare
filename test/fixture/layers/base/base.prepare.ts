import { defineNuxtPrepareHandler } from '../../../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: {
      fromLayer: 'base.prepare',
    },
  },
}))
