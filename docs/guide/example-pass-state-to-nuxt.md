# Pass State to Nuxt and Populate Pinia Store

A common scenario is to fetch data from an API during the build process and pass it to Nuxt. This can be done with the `#nuxt-prepare` context.

With returning a `state` object in your [`defineNuxtPrepareHandler`](/api/define-nuxt-prepare-handler) handler, you can pass data to Nuxt and import it anywhere from `#nuxt-prepare`.

One use case is to populate an app store like [Pinia](https://pinia.vuejs.org) with the data pre-fetched during the build process.

::: tip
Think of the `state` as an alternative to the `nuxtServerInit` action in Nuxt 2 to pass a context (although technically speaking it was a hook and ran on server init, not during the build process).
:::

```ts
// `store.prepare.ts`
import { $fetch } from 'ofetch'
import type { FetchError } from 'ofetch'
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  let todos: Record<string, unknown> | undefined
  let error: FetchError | undefined

  try {
    todos = await $fetch('todos/1', {
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
```

Once the fetch request succeeds, the `todos` data will be available from the `#nuxt-prepare` context.

```ts
// `stores/todo.ts`
import { defineStore } from 'pinia'
import { todos } from '#nuxt-prepare'

export const useTodos = defineStore('todos', {
  state: () => ({
    todos: todos || [],
  })
})
```
