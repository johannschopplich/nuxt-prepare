import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(async () => {
  console.log('This is a log message from "server.prepare" script')
  console.error('This is an error message from "server.prepare" script')

  return {
    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by "server.prepare" script',
      },
    },
  }
})
