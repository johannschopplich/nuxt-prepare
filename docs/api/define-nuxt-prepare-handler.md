# `defineNuxtPrepareHandler`

This helper method allows you to define a prepare script. It's intended to provide a strongly typed API for your prepare scripts. The `init` parameter can be:

- a synchronous function that returns a `NuxtPrepareResult`
- an asynchronous function that returns a `Promise<NuxtPrepareResult>`
- an object of type `NuxtPrepareResult`

## Type Declarations

```ts
interface NuxtPrepareResult {
  /**
   * Indicates if the prepare script ran successfully. If an async operation
   * inside your prepare script fails, you can return `ok: false` to let the
   * Nuxt Prepare module know that the script failed.
   *
   * @default true
   */
  ok?: boolean
  /**
   * Runtime config to merge with `nuxt.options.runtimeConfig`
   */
  runtimeConfig?: PartialDeep<RuntimeConfig>
  /**
   * App config to merge with `nuxt.options.appConfig`
   */
  appConfig?: PartialDeep<AppConfig>
  /**
   * Pass custom state to Nuxt and import it anywhere from `#nuxt-prepare`
   *
   * @remarks
   * Use this to prefetch data, i.e. populate the Pinia store with data from
   * your API.
   *
   * @example
   * // `stores/todo.ts`
   * import { defineStore } from 'pinia'
   * import { todos } from '#nuxt-prepare'
   *
   * export const useTodos = defineStore('todos', {
   *   state: () => ({
   *     todos: todos || [],
   *   })
   * })
   */
  state?: Record<string, unknown>
}

function defineNuxtPrepareHandler<T extends ServerInitResult>(
  init: T | (() => T | Promise<T>)
): Promise<T>
```

## Example

```ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Do some async magic here, e.g. fetch data from an API

  return {
    // If not set, defaults to `true`
    ok: true,

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'overwritten by server init'
      }
    },

    // Pass custom state to Nuxt and import it
    // anywhere from `#nuxt-prepare`
    state: {
      foo: 'bar',
    },
  }
})
```
