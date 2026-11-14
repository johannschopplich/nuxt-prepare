import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  data: {
    region: 'later.prepare',
  },
}))
