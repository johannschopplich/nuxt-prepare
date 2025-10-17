# Getting Started

## Why Nuxt Prepare?

**Wait!** Why do I need Nuxt Prepare, you may ask? Well, you can't run asynchronous code in your Nuxt configuration file. This is where Nuxt Prepare comes into play. It allows you to run synchronous or asynchronous code **at build-time** before your Nuxt application is built. This can be useful for:

- Fetching data from an API and embedding it in your app
- Creating a global state that is available to all components, composables, and server routes
- Dynamically setting runtime or app config based on async operations
- Validating your environment and failing early in CI/CD pipelines

::: tip
Prepare scripts run **during the build**, not at runtime. This means expensive operations only happen once per build, not on every request.
:::

This guide will walk you through the steps to get started with Nuxt Prepare.

## Step 1: Install Nuxt Prepare

```bash
npx nuxt module add prepare
```

## Step 2: Use the `nuxt-prepare` Module

Add `nuxt-prepare` to your Nuxt configuration:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare']
})
```
:::

## Step 3: Set up Prepare Scripts

By default, Nuxt Prepare will look for a `server.prepare.ts` file in your project root. To run synchronous or asynchronous code when Nuxt builds your app, create a file handler and export a default function:

::: code-group
```ts [server.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Do some async magic here, e.g. fetch data from an API

  return {
    // If not set, defaults to `true`
    ok: true,

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by "server.prepare" script'
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
:::

::: tip
Return `ok: false` to let the Nuxt Prepare module know that the script failed. It will then log an error and exit the process.
:::

## Step 4: Import Your Prepare State

The state you defined in your prepare script is now available globally in your Nuxt application. Behind the scenes, Nuxt Prepare generates a TypeScript file at `.nuxt/module/nuxt-prepare.mjs` that exports your state values with full type safety.

You can import state from `#nuxt-prepare` in:

- **Nuxt app** – Components, composables, pages, layouts, plugins
- **Nitro server** – API routes, server middleware, server utilities

```vue
<script setup lang="ts">
import { foo } from '#nuxt-prepare'

console.log(foo) // 'bar'
</script>
```

```ts
// server/api/example.ts
import { foo } from '#nuxt-prepare'

export default defineEventHandler(() => {
  return { foo } // 'bar'
})
```

::: info
The `#nuxt-prepare` alias works in both your Nuxt app and Nitro server, making build-time data universally accessible.
:::

## Step 5: Add More Prepare Scripts

To run more prepare scripts, add them to the `prepare.scripts` module configuration:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: ['server.prepare', 'process.prepare']
  }
})
```
:::

Now, both `server.prepare.ts` and `process.prepare.ts` will be executed at build time.

::: tip
By default, prepare scripts are run in series. If you want to run them in parallel, set `prepare.parallel` option to `true`.
:::

## Next Steps

Now that you've set up Nuxt Prepare, explore more features:

- [**Core Concepts**](/guide/core-concepts) - Understand how prepare scripts work under the hood
- [**Prepare State**](/guide/prepare-state) - Learn more about passing state to your app
- [**Runtime & App Config**](/guide/runtime-app-config) - Dynamically set configuration values
- [**Error Handling**](/guide/error-handling) - Handle errors gracefully in prepare scripts
