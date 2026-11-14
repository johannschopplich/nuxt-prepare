import { setTimeout } from 'node:timers/promises'
import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(async () => {
  await setTimeout(200)

  return {
    runtimeConfig: {
      public: { fromScriptOrder: 'slow.prepare' },
    },
  }
})
