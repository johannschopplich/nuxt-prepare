import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler({
  data: { 'build-region': 'eu-central-1' },
})
