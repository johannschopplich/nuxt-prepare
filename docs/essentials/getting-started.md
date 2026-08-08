# Getting Started

Nuxt's configuration file cannot await anything. Nuxt Prepare fills that gap: it runs your async code once, while Nuxt builds, and folds the result into the configuration and into a state your app can import. See [Core Concepts](/essentials/core-concepts) for what that means for runtime cost and serialization.

## Step 1: Install Nuxt Prepare

```bash
npx nuxt module add prepare
```

## Step 2: Add the Module

Add `nuxt-prepare` to your Nuxt configuration:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare']
})
```
:::

## Step 3: Create Your First Prepare Script

By default, Nuxt Prepare looks for `server.prepare.ts` in your project root. Create this file and export a handler function:

::: code-group
```ts [server.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Fetch data from an API, read a file, query a database …

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
Return `ok: false` to signal failure and halt the build process.
:::

## Step 4: Import Your Prepare State

Whatever the script returns under `state` is generated as typed exports at `.nuxt/module/nuxt-prepare.mjs`, reachable through the `#nuxt-prepare` alias from both your Nuxt app and the Nitro server:

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

## Step 5: Run Multiple Prepare Scripts

Add additional scripts to the `prepare.scripts` configuration:

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

- [Core Concepts](/essentials/core-concepts) – When scripts run, in what order, and what survives serialization.
- [Prepare State](/guides/prepare-state) – Pass build-time data to your app.
- [Runtime & App Config](/guides/runtime-app-config) – Set configuration values from a script.
- [Error Handling](/guides/error-handling) – Fail the build, or carry on.
