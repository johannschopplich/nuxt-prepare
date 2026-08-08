# `defineNuxtPrepareHandler`

This helper method defines a prepare script with full type safety. The `init` parameter can be:

- A synchronous function that returns a `NuxtPrepareResult`
- An asynchronous function that returns a `Promise<NuxtPrepareResult>`
- An object of type `NuxtPrepareResult`

Use this helper in all your prepare scripts to get TypeScript IntelliSense and type checking.

## Type Declarations

<<< @/../src/types.ts#result

```ts
function defineNuxtPrepareHandler<T extends NuxtPrepareResult>(
  init: T | (() => T | Promise<T>)
): Promise<T>
```

## Return Value Properties

The `NuxtPrepareResult` object can include the following properties:

### `ok`

Whether the script succeeded. Return `ok: false` to stop the build – see [`continueOnError`](/api/module-configuration#prepare-continueonerror) for the other way that can go.

**Type**: `boolean`

**Default Value**: `true`

Reach for it where:

- Validation fails (missing environment variables, invalid configuration)
- Critical API calls fail
- Required data cannot be fetched

```ts
return {
  ok: !error
}
```

### `runtimeConfig`

Runtime config to merge over the one from `nuxt.config.ts`, taking precedence where both set a key. Read it back with `useRuntimeConfig()`.

**Type**: `PartialDeep<RuntimeConfig>`

Reach for it where:

- Set configuration based on async operations
- Fetch API URLs or credentials from external sources
- Compute configuration values at build time

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

**Type**: `PartialDeep<AppConfig>`

Reach for it where:

- Set feature flags from a CMS or feature flag service
- Configure themes based on tenant data
- Define app-wide settings computed at build time

```ts
return {
  appConfig: {
    theme: {
      primaryColor: '#86CA39'
    }
  }
}
```

### `state`

Build-time data importable from `#nuxt-prepare`. Values are JSON-serialized, and their types are inferred from the values themselves.

**Type**: `Record<string, unknown>`

Reach for it where:

- Prefetch data to embed in your app
- Share build-time computed constants
- Populate stores or provide initial data

```ts
return {
  state: {
    todos: [{ id: 1, title: 'Learn Nuxt Prepare' }]
  }
}
```

Then import anywhere:

```ts
import { todos } from '#nuxt-prepare'
```

## Example

```ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Fetch data from an API, read a file, query a database …

  return {
    // If not set, defaults to `true`
    ok: true,

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by prepare script'
      }
    },

    // Pass custom state to Nuxt and import it
    // anywhere from `#nuxt-prepare`
    state: {
      foo: 'bar'
    }
  }
})
```
