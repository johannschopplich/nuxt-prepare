import { ofetch } from 'ofetch'
import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(async () => {
  // A failed fetch throws and stops the build.
  const todos = await ofetch<Record<string, unknown>>('todos/1', {
    baseURL: 'https://jsonplaceholder.typicode.com',
  })

  return {
    // Import `todos` anywhere from `#nuxt-prepare`.
    data: {
      todos,
    },
  }
})
