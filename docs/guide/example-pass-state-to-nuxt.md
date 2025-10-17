# Populate Pinia Store

You can prefetch data at build-time and use it to populate your [Pinia](https://pinia.vuejs.org) store. Return a `state` object from your prepare script to make data available via `#nuxt-prepare`.

Create a prepare script that fetches data and returns it as state:

::: code-group
```ts [store.prepare.ts]
import type { FetchError } from 'ofetch'
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'
import { ofetch } from 'ofetch'

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
      todos
    }
  }
})
```
:::

Import the prefetched data in your Pinia store:

::: code-group
```ts [stores/todo.ts]
import { todos } from '#nuxt-prepare'
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    todos: todos || []
  })
})
```
:::

Or use it in server routes:

::: code-group
```ts [server/api/todos.ts]
import { todos } from '#nuxt-prepare'

export default defineEventHandler(() => {
  // Use the prefetched data in your API
  return { todos }
})
```
:::

::: info
State from `#nuxt-prepare` works in both your Nuxt app and Nitro server, making it a versatile way to share build-time data across your entire application.
:::
