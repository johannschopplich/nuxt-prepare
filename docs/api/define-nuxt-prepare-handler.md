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
  runtimeConfig?: Partial<RuntimeConfig>
  /**
   * App config to merge with `nuxt.options.appConfig`
   */
  appConfig?: AppConfig
}

function defineNuxtPrepareHandler<T extends ServerInitResult>(
  init: T | (() => T | Promise<T>)
): Promise<T>
```

## Example

```ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare'

export default defineNuxtPrepareHandler(async () => {
  // Do some async magic here, e.g. fetch data from an API

  return {
    // Default is `true` if not set
    ok: true,

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'overwritten by server init'
      }
    }
  }
})
```
