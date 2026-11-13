import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: {
      fromCommonJs: 'commonjs.prepare',
    },
  },
}))
