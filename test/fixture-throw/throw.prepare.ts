import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => {
  throw new Error('Missing environment variables: NUXT_PUBLIC_FOO')
})
