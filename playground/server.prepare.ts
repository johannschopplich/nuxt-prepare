import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(async () => {
  console.log('This is a log from "server.prepare" script')
  console.error('This is an error from "server.prepare" script')

  return {
    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by "server.prepare" script',
      },
    },
  }
})
