# Getting Started

Nuxt Prepare is a [Nuxt](https://nuxt.com) module that runs your async code once, while Nuxt builds, and folds the result into the configuration and into a state your app can import. It fills a gap: Nuxt's configuration file cannot await anything.

## Install Nuxt Prepare

Nuxt Prepare requires Nuxt 4 or later. This command installs `nuxt-prepare` and adds it to the `modules` of your `nuxt.config.ts`:

```bash
npx nuxt module add prepare
```

## Create Your First Prepare Script

By default, Nuxt Prepare looks for `server.prepare.ts` in your project root. Create this file and default-export the result of `defineNuxtPrepareHandler`:

::: code-group
```ts [server.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Fetch data from an API, read a file, query a database …

  return {
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

A script that returns `ok: false` stops the build – see [Error Handling](/guide/error-handling).

## Import Your Prepare State

Whatever the script returns under `state` is importable as typed exports from `#nuxt-prepare`, in both your Nuxt app and the Nitro server:

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

## Run Multiple Prepare Scripts

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

::: tip
Scripts run in series by default. Set the [`prepare.parallel`](/api/module-configuration#prepare-parallel) option to `true` to run them all at once.
:::

See [Prepare Scripts](/guide/prepare-scripts) for when scripts run and whose result wins.
