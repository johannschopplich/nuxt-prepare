# Getting Started

This guide will walk you through the steps to get started with `nuxt-prepare`.

## Step 1: Install `nuxt-prepare`

::: code-group
  ```bash [pnpm]
  pnpm add -D nuxt-prepare
  ```
  ```bash [yarn]
  yarn add -D nuxt-prepare
  ```
  ```bash [npm]
  npm install -D nuxt-prepare
  ```
:::

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
        foo: 'overwritten by server init'
      }
    }
  }
})
```

::: tip
Return `ok: false` to let the Nuxt Prepare module know that the script failed. It will then log an error and exit the process.
:::

## Step 4: Add More Prepare Scripts

To run more prepare scripts, add them to the `prepareKit.scripts` module configuration:

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepareKit: {
    scripts: ['server.prepare', 'process.prepare']
  }
})
```

Now, both `server.prepare.ts` and `process.prepare.ts` will be executed at build time.
