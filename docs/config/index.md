# Module Configuration

Configure Nuxt Prepare in `nuxt.config.ts`:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: [
      // Add the prepare scripts you want to run
    ]
  }
})
```
:::

## Parallel Script Execution

By default, prepare scripts are run in series. If you want to run them in parallel, set the `parallel` option to `true`:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: ['users.prepare', 'products.prepare', 'settings.prepare'],
    parallel: true
  }
})
```
:::

::: warning
Only use parallel execution when your scripts are truly independent. If one script depends on another's output, run them in series.
:::

## Continue on Error

By default, if a prepare script fails (returns `ok: false`), the build process stops. Set `continueOnError` to `true` to allow the build to continue even when scripts fail:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: ['critical.prepare', 'optional.prepare'],
    continueOnError: true
  }
})
```
:::

When enabled:

- Failed scripts are logged as errors
- The build continues with remaining scripts
- A warning summarizes failures at the end

::: tip
Use this when some prepare scripts are optional and their failure shouldn't block the build. Always ensure your script returns `ok: false` to signal failure.
:::

## Skip Scripts During `nuxt prepare`

The `runOnNuxtPrepare` option controls whether scripts run during `nuxt prepare` (which generates TypeScript types without building the app).

### Global Control

Disable all prepare scripts during `nuxt prepare`:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: ['data.prepare', 'api.prepare'],
    runOnNuxtPrepare: false
  }
})
```
:::

### Per-Script Control

Use the object syntax to control individual scripts:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepare: {
    scripts: [
      // Always run, including during `nuxt prepare`
      'types.prepare',

      // Skip during `nuxt prepare`, run during dev/build
      {
        file: 'data.prepare',
        runOnNuxtPrepare: false
      }
    ]
  }
})
```
:::

This is useful when:

- A script makes expensive API calls that aren't needed for type generation
- A script has side effects that should only run during actual builds
- You want faster type generation with `nuxt prepare`

## Type Declarations

<<< @/../src/module.ts#options
