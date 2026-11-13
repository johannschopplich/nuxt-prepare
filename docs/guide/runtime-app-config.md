# Runtime & App Config

A prepare script can set `runtimeConfig` and `appConfig` values it had to fetch or compute first. [State, Runtime Config, or App Config?](/guide/prepare-scripts#state-runtime-config-or-app-config) helps you pick one.

## Runtime Config

Use `runtimeConfig` to conditionally set environment-based configuration that should be accessible via Nuxt's `useRuntimeConfig()`.

::: code-group
```ts [server.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Fetch API configuration from a remote source
  const apiConfig = await fetch('https://config.example.com/api')
    .then(res => res.json())

  return {
    runtimeConfig: {
      // Private config (server-only)
      apiSecret: apiConfig.secret,

      public: {
        // Public config (available everywhere)
        apiUrl: apiConfig.url,
        apiVersion: apiConfig.version
      }
    }
  }
})
```
:::

A key the script returns [wins over `nuxt.config.ts`](/guide/prepare-scripts#a-script-s-result-wins-over-nuxt-config-ts), and keys it leaves out keep their value.

## App Config

Use `appConfig` to set application-wide configuration that should be accessible via Nuxt's `useAppConfig()`.

::: code-group
```ts [features.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  // Fetch feature flags from a CMS or feature flag service
  const features = await fetch('https://api.example.com/features')
    .then(res => res.json())

  return {
    appConfig: {
      features: {
        darkMode: features.darkMode,
        analytics: features.analytics,
        betaFeatures: features.beta
      }
    }
  }
})
```
:::

App config [merges the same way](/guide/prepare-scripts#a-script-s-result-wins-over-nuxt-config-ts), over what `app.config.ts` defines.
