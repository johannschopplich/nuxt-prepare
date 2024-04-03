# Getting Started

## Why `nuxt-prepare`?

**Wait!** Why do I need `nuxt-prepare`, you may ask? Well, you can't run asynchronous code in your Nuxt configuration file. This is where `nuxt-prepare` comes into play. It allows you to run synchronous or asynchronous code before building your Nuxt application. This can be useful for:

- Fetching data from an API
- Creating a global state that is available to all components, composables, etc.
- Running scripts to validate your environment and e.g. fail early in CI/CD pipelines

This guide will walk you through the steps to get started with `nuxt-prepare`.

## Step 1: Install `nuxt-prepare`

```bash
npx nuxi@latest module add prepare
```

## Step 2: Use `nuxt-prepare`

Add `nuxt-prepare` to your Nuxt configuration:

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ['nuxt-prepare']
})
```

## Step 3: Set Up Prepare Scripts

By default, `nuxt-prepare` will look for a `server.prepare.ts` file in your project root. To run synchronous or asynchronous code when Nuxt builds your app, create a file handler and export a default function:

```ts
// `server.prepare.ts`
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

::: tip
Return `ok: false` to let the Nuxt Prepare module know that the script failed. It will then log an error and exit the process.
:::

## Step 4: Import Your Prepare State

The state you defined in your prepare script is now available globally in your Nuxt application. You can access it from any component, page, or layout by importing from `#nuxt-prepare`:

```vue
<script setup lang="ts">
import { foo } from '#nuxt-prepare'

console.log(foo) // 'bar'
</script>
```

## Step 5: Add More Prepare Scripts

To run more prepare scripts, add them to the `prepare.scripts` module configuration:

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: ['server.prepare', 'process.prepare']
  }
})
```

Now, both `server.prepare.ts` and `process.prepare.ts` will be executed at build time.
