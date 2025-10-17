# Error Handling

Prepare scripts run during the build process, so proper error handling ensures your build fails gracefully when something goes wrong.

## Indicating Script Failure

Return `ok: false` to signal that your prepare script failed:

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

When `ok: false` is returned, Nuxt Prepare will:

1. Log an error message
2. Throw a `TypeError` to halt the build process
3. Prevent your application from building with incomplete data

::: info
If you don't return an `ok` property, it defaults to `true`. Only return `ok: false` when you want to halt the build.
:::

## Continue on Error

By default, if any prepare script fails, the entire build stops. Use the `continueOnError` option to allow the build to continue even when scripts fail:

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

With `continueOnError: true`:

- Failed scripts are logged as errors
- The build continues with remaining scripts
- A warning is shown at the end if any scripts failed

::: warning
Use `continueOnError` carefully. If your application depends on data from prepare scripts, continuing on error might cause runtime issues.
:::

## Error Handling Patterns

### Pattern 1: Fail Fast

Stop the build immediately when critical data is missing:

```ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  const apiKey = process.env.API_KEY

  if (!apiKey) {
    console.error('API_KEY is required but not set')
    return { ok: false }
  }

  return {
    runtimeConfig: {
      apiKey
    }
  }
})
```

### Pattern 2: Graceful Degradation

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

## Debugging Failed Scripts

When a prepare script fails, Nuxt Prepare logs the script name and error:

```
✖ Server prepare script `data.prepare` returned an error
✖ Server prepare scripts completed with 1 error
```

To debug:

1. Check the console output for error messages from your script
2. Verify that async operations are properly awaited
3. Ensure environment variables and dependencies are available at build-time
4. Add detailed error logging to pinpoint the failure
