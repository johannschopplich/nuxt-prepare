# Module Configuration

Configure Nuxt Prepare in the `prepare` key of your Nuxt configuration.

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: ['server.prepare']
  }
})
```
:::

The defaults cover the common case: a single `server.prepare.ts` in your project root, run in series, stopping the build when it fails. Reach for the options below when that isn't what you want.

The same options can travel with the module entry instead, which is what a layer publishing its own scripts usually wants:

```ts
import NuxtPrepare from 'nuxt-prepare'

export default defineNuxtConfig({
  modules: [
    [
      NuxtPrepare,
      {
        scripts: ['users.prepare']
      }
    ]
  ]
})
```

## `prepare.scripts`

The scripts to run, in the order given.

**Default Value**: `['server.prepare']`

A script is named by its path relative to the layer it belongs to, without the file extension – `.js`, `.mjs` and `.ts` are all resolved.

Pass a single name, a list of names, or an object per script to set [`runOnNuxtPrepare`](/api/module-configuration#prepare-runonnuxtprepare) individually:

```ts
export default defineNuxtConfig({
  prepare: {
    scripts: [
      'users.prepare',
      { file: 'products.prepare', runOnNuxtPrepare: false }
    ]
  }
})
```

A script listed here that doesn't exist stops the build with an error. The one exception is the default `server.prepare`, whose absence is silently ignored – it is a convention, not a requirement.

## `prepare.parallel`

Whether the scripts run all at once instead of one after another.

**Default Value**: `false`

Only turn this on when the scripts are genuinely independent. Each result is merged the moment its script resolves, so in parallel the order two scripts write the same key in is the order they happen to finish in, not the order you listed them. See [A Script's Result Wins Over `nuxt.config.ts`](/guide/prepare-scripts#a-script-s-result-wins-over-nuxt-config-ts).

## `prepare.runOnNuxtPrepare`

Whether the scripts run during `nuxt prepare`, which generates TypeScript types without building the app.

**Default Value**: `true`

Turn it off where a script makes an expensive request or has a side effect that type generation has no use for. Note that a script's `data` shapes the types importable from `#nuxt-prepare`, so a skipped script's exports are missing from the types until the next `nuxt dev` or `nuxt build`.

To skip a single script, use the object syntax of [`prepare.scripts`](/api/module-configuration#prepare-scripts). It cannot opt one back in: with `prepare.runOnNuxtPrepare: false`, every script is skipped.

## Type Declarations

<<< @/../src/module.ts#options
