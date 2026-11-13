import { defineNuxtPrepareHandler } from '../../../../src/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: {
      fromLayerInline: 'layer.prepare',
    },
  },
}))
