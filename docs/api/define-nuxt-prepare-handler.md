# `defineNuxtPrepareHandler`

`defineNuxtPrepareHandler` types a prepare script's result. Pass it the result itself, or a function that returns it, sync or async.

## Example

```ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Fetch data from an API, read a file, query a database …

  return {
    // Import `foo` anywhere from `#nuxt-prepare`
    data: {
      foo: 'bar'
    },

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by prepare script'
      }
    }
  }
})
```

## Type Declarations

Import `NuxtPrepareResult` from `nuxt-prepare/config`:

<<< @/../src/types.ts#result

```ts
function defineNuxtPrepareHandler(
  handler: NuxtPrepareResult | (() => NuxtPrepareResult | Promise<NuxtPrepareResult>)
): Promise<NuxtPrepareResult>
```

## Result Properties

The `NuxtPrepareResult` object can include the following properties:

### `runtimeConfig`

Runtime config to merge over the one from `nuxt.config.ts`, taking precedence where both set a key. Read it back with `useRuntimeConfig()`.

**Type**: `NuxtConfig['runtimeConfig']`

```ts
return {
  runtimeConfig: {
    apiSecret: 'secret-key', // Private (server-only)
    public: {
      apiUrl: 'https://api.example.com' // Public (everywhere)
    }
  }
}
```

### `appConfig`

App config to merge over the one from `app.config.ts`, taking precedence where both set a key. Read it back with `useAppConfig()`.

**Type**: `NuxtConfig['appConfig']`

```ts
return {
  appConfig: {
    theme: {
      primaryColor: '#86CA39'
    }
  }
}
```

### `data`

Build-time data importable from `#nuxt-prepare`. Values are JSON-serialized, and their read-only types are inferred from the values themselves – see [Prepare Data](/guide/prepare-data).

**Type**: `Record<string, unknown>`

```ts
return {
  data: {
    todos: [
      { id: 1, title: 'Learn Nuxt Prepare' }
    ]
  }
}
```
