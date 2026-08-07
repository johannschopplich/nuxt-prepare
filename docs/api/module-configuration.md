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

## `prepare.scripts`

The scripts to run, in the order given. A script is named by its path relative to the layer it belongs to, without the file extension – `.js`, `.mjs` and `.ts` are all resolved.

Pass a single name, a list of names, or an object per script to set [`runOnNuxtPrepare`](#per-script-control) individually:

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

**Default Value**: `['server.prepare']`

## `prepare.parallel`

Whether the scripts run all at once instead of one after another.

Only turn this on when the scripts are genuinely independent. Each result is merged the moment its script resolves, so in parallel the order two scripts write the same key in is the order they happen to finish in, not the order you listed them. See [Script Execution](/essentials/core-concepts#_1-script-execution).

**Default Value**: `false`

## `prepare.continueOnError`

Whether a failing script lets the build carry on.

A script fails by returning `ok: false`. With this off, the first failure stops the build. With it on, the failure is logged, the remaining scripts still run, and a warning summarizes what failed at the end. Use it where a script is genuinely optional – an enrichment that is nice to have rather than a validation the app depends on. See [Error Handling](/guides/error-handling).

**Default Value**: `false`

## `prepare.runOnNuxtPrepare`

Whether the scripts run during `nuxt prepare`, which generates TypeScript types without building the app.

Turn it off where a script makes an expensive request or has a side effect that type generation has no use for. Note that a script's `state` shapes the types importable from `#nuxt-prepare`, so skipping a script means its state is typed from whatever the last real run wrote.

**Default Value**: `true`

### Per-Script Control

The object syntax of `prepare.scripts` above sets this for one script, overriding the module-wide value:

```ts
export default defineNuxtConfig({
  prepare: {
    scripts: [
      // Runs during `nuxt prepare` as well
      'types.prepare',

      // Skipped during `nuxt prepare`, runs on dev and build
      {
        file: 'data.prepare',
        runOnNuxtPrepare: false
      }
    ]
  }
})
```

## Type Declarations

<<< @/../src/module.ts#options
