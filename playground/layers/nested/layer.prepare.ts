import { defineNuxtPrepareHandler } from '../../../src/config'

export default defineNuxtPrepareHandler(() => {
  console.log('This is a log message from "layer.prepare" script')

  return {
    ok: true,
  }
})
