# Error Handling

A prepare script signals failure by returning `ok: false`. What that does to the build depends on [`continueOnError`](/api/module-configuration#prepare-continueonerror).

## Stop the Build

Return `ok: false` to stop the build when critical data is missing:

::: code-group
```ts [server.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  try {
    const data = await fetchCriticalData()

    return {
      ok: true,
      state: { data }
    }
  }
  catch (error) {
    console.error('Failed to fetch critical data:', error)

    return {
      ok: false
    }
  }
})
```
:::

If you don't return an `ok` property, it defaults to `true`. [Environment Variable Validation](/cookbook/env-validation) stops the build the same way when a variable is missing.

## Fall Back to a Default

Provide fallback values when non-critical data is unavailable:

```ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  let features = {
    analytics: false,
    darkMode: true
  }

  try {
    features = await fetchFeatureFlags()
  }
  catch (error) {
    console.warn('Failed to fetch feature flags, using defaults:', error)
  }

  return {
    state: { features }
  }
})
```

## Let the Remaining Scripts Run

The [`continueOnError`](/api/module-configuration#prepare-continueonerror) option lets the remaining scripts run after a failure, and reports the failures at the end. Turn it on only where your app does not depend on the failing script's data.

## What a Failed Script Logs

When a prepare script fails, Nuxt Prepare logs its name and stops the build:

```
[nuxt-prepare]  ERROR  Server prepare script data.prepare returned an error
 ERROR  Server prepare script failed
```

With `continueOnError` enabled, a warning closes the run:

```
[nuxt-prepare]  WARN  Server prepare scripts completed with 1 error
```

A script runs during the build, so the environment variables and dependencies it needs must be available at build time.
