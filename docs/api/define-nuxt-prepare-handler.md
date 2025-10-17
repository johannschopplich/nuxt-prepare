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

**Type:** `boolean`
**Default:** `true`

Indicates whether the prepare script executed successfully. Return `ok: false` to signal failure and halt the build process.

**When to use:**

- Validation fails (missing environment variables, invalid configuration)
- Critical API calls fail
- Required data cannot be fetched

```ts
return {
  ok: !error
}
```

### `runtimeConfig`

**Type:** `PartialDeep<RuntimeConfig>`

Dynamically set or override runtime configuration values. These are merged with existing `runtimeConfig` from `nuxt.config.ts` and can be accessed via `useRuntimeConfig()`.

**When to use:**

- Set configuration based on async operations
- Fetch API URLs or credentials from external sources
- Compute configuration values at build-time

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

**Type:** `PartialDeep<AppConfig>`

Dynamically set or override app configuration values. These are merged with existing `appConfig` from `app.config.ts` and can be accessed via `useAppConfig()`.

**When to use:**

- Set feature flags from a CMS or feature flag service
- Configure themes based on tenant data
- Define app-wide settings computed at build-time

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

**Type:** `Record<string, unknown>`

Pass build-time data that can be imported anywhere via `#nuxt-prepare`. Values are JSON-serialized and code-generated with full TypeScript support.

**When to use:**

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
  // Do some async magic here, e.g. fetch data from an API

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
