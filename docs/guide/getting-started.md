# Getting Started

Nuxt Prepare is a [Nuxt](https://nuxt.com) module that runs your async code once while Nuxt builds and turns the result into typed imports: return `data: { todos }` from a prepare script, and `import { todos } from '#nuxt-prepare'` works in your app and your Nitro server, typed with its literal values. A script can also set `runtimeConfig` and `appConfig`, and its `appConfig` wins over `app.config.ts`.

A value only your config reads does not need this module: `nuxt.config.ts` can `await` at the top level, and Nuxt loads `.env` before it evaluates the file, so a check that throws there stops the build.

## Install Nuxt Prepare

This command installs `nuxt-prepare` and adds it to the `modules` of your `nuxt.config.ts`:

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
    // Import `foo` anywhere from `#nuxt-prepare`
    data: {
      foo: 'bar'
    },

    // Overwrite the runtime config variable `foo`
    runtimeConfig: {
      public: {
        foo: 'Overwritten by "server.prepare" script'
      }
    }
  }
})
```
:::

[A script that throws stops the build](/guide/prepare-scripts#a-thrown-error-stops-the-build).

## Import Your Prepare Data

Whatever the script returns under `data` is importable as typed exports from `#nuxt-prepare`, in both your Nuxt app and the Nitro server:

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
