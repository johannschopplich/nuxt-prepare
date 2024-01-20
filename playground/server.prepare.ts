import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(async () => {
  return {
    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by "server.prepare" script',
      },
    },
  }
})
