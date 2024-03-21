import { ofetch } from 'ofetch'
import type { FetchError } from 'ofetch'
import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(async () => {
  let todos: Record<string, unknown> | undefined
  let error: FetchError | undefined

  try {
    todos = await ofetch('todos/1', {
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
  }
  catch (err) {
    error = err as FetchError
    console.error(error)
  }

  return {
    // If the fetch failed, we want to halt the build
    ok: !error,

    // Pass your todos data to Nuxt and import it
    // anywhere from `#nuxt-prepare`
    state: {
      todos,
    },
  }
})
