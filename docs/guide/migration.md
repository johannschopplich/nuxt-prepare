# Migration

## v5.0.0

### Code to Change

These changes break a script or the build until you change your code.

#### `state` Is Now `data`

A script used to return its importable values under `state`. Return them under `data` – the imports from `#nuxt-prepare` stay the same:

<!-- eslint-skip -->

```ts
export default defineNuxtPrepareHandler(async () => ({
  state: { todos: await fetchTodos() } // [!code --]
  data: { todos: await fetchTodos() } // [!code ++]
}))
```

#### A Thrown Error Stops the Build Instead of `ok: false`

`ok: false` used to stop the build. The key is gone, so throw instead:

<!-- eslint-skip -->

```ts
export default defineNuxtPrepareHandler(async () => {
  const response = await fetch('https://api.example.com/todos')

  if (!response.ok)
    return { ok: false } // [!code --]
    throw new Error(`Failed to fetch todos: ${response.status}`) // [!code ++]

  return { data: { todos: await response.json() } }
})
```

`prepare.continueOnError` is gone with it, so delete it from `nuxt.config.ts`. To keep building after a failure, catch the error in the script and return a fallback – see [A Thrown Error Stops the Build](/guide/prepare-scripts#a-thrown-error-stops-the-build).

#### Data Keys Without Their Own Type Alias Stop the Build

Two `data` keys whose type aliases match, such as `buildRegion` and `build_region`, used to build with a duplicate type in the generated declarations, and so did a key like `_` that gives no type alias name. Both now stop the build. Rename the key.

### Stricter Types

These changes touch no runtime behavior. They reach you as compile errors.

#### Imports From `#nuxt-prepare` Are Read-Only

An import used to be typed as mutable, though the server shares it across all requests. Build a new value from it instead of changing it in place, such as `[...todos, newTodo]`.

#### `defineNuxtPrepareHandler` Takes No Type Argument

Remove the type argument from `defineNuxtPrepareHandler<…>()`. A result passed as an object now reports a misspelled key.

#### Prepare Scripts Are Type-Checked

`nuxi typecheck` now checks your prepare scripts with the same tsconfig as `nuxt.config.ts`. Fix the errors it reports in them.

### Changed Behavior

These changes compile and build as before, but change which values your app reads.

#### A Script's `appConfig` Stays Out of `nuxt.options.appConfig`

A script's `appConfig` used to be merged into `nuxt.options.appConfig` as well, which added each of its arrays twice at runtime. If you removed the duplicates yourself, drop that workaround. A module that reads `nuxt.options.appConfig` no longer sees the script's values; `useAppConfig()` still does.

#### Parallel Results Merge in the Listed Order

With `prepare.parallel` on, results used to merge in the order the scripts finished. They now merge in the order you listed them, as in series. If two scripts set the same key, check that the one listed later holds the value you want.

## v4.0.0

### Nuxt 4 Is Required

The module declares `nuxt: '>=4.0.0'`, so on Nuxt 3 it is disabled and no script runs. Stay on `nuxt-prepare` v3 until you have upgraded.

### A Script's Result Wins Over What It Merges Into

A prepare script's `runtimeConfig`, `appConfig` and `state` used to lose against the values already in place, so a key set in `nuxt.config.ts` survived whatever the script returned. The script now wins, and a later script wins over an earlier one.

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  runtimeConfig: {
    public: { apiUrl: 'https://api.example.com' }
  }
})
```

```ts
// `server.prepare.ts`
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: { apiUrl: 'https://staging.example.com' }
  }
}))
```

`apiUrl` used to stay `https://api.example.com`; it is now `https://staging.example.com`. Keys the script leaves out are untouched either way.

If you relied on `nuxt.config.ts` having the last word, stop returning that key from the script, or read the current value and return it unchanged.

::: warning Arrays Are Concatenated, Not Replaced
Precedence applies to plain values and objects. An array coming back from a script is put in front of the one already in place rather than replacing it. To replace an array, return the full list you want and remove the original from `nuxt.config.ts`.
:::

### A Script's `appConfig` Outranks `app.config.ts`

`app.config.ts` used to win over whatever a script returned as `appConfig`. The script's value now wins over every `app.config.ts`, so `useAppConfig()` reports it.

Keep a value out of the script if `app.config.ts` should own it – the two are merged per key, so anything the script leaves out is unaffected.

### Layers Run Before the App Layer

Prepare scripts from extended layers used to run after the ones from the app layer. They now run first, so the app layer has the last word over the layers it extends.

Where several layers list the same script path, the highest-priority layer decides both its position in the run order and its `runOnNuxtPrepare` setting; the script still runs once.
