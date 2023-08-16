import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(async () => {
  // Do some async magic here

  return {
    ok: true,

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'overwritten by server init',
      },
    },
  }
})
