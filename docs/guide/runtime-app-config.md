# Runtime & App Config

Prepare scripts can dynamically set `runtimeConfig` and `appConfig` values based on async operations. This is useful when configuration values need to be computed or fetched at build-time.

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

Access runtime config values anywhere in your app:

```ts
const config = useRuntimeConfig()
console.log(config.public.apiUrl) // Set by prepare script
```

::: info
Values returned from prepare scripts are **merged** with existing runtime config. This means you can override specific values without replacing the entire configuration.
:::

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

Access app config values anywhere in your app:

```vue
<script setup lang="ts">
const appConfig = useAppConfig()
const isDarkModeEnabled = appConfig.features.darkMode
</script>
```

::: info
Like runtime config, app config values are **merged** with existing configuration defined in `app.config.ts`.
:::

## When to Use Each Option

### Use `state`

- Import data as constants
- Get full TypeScript type inference from generated types
- Share data between multiple modules without prop drilling

```ts
import { features } from '#nuxt-prepare'

// Direct constant access with full type safety
if (features.darkMode) {
  // ...
}
```

### Use `runtimeConfig`

- Follow Nuxt's runtime configuration patterns
- Access environment variables and secrets
- Use Nuxt's built-in public/private config separation

```ts
const config = useRuntimeConfig()

// Accessed via composable
const apiUrl = config.public.apiUrl
```

### Use `appConfig`

- Define app-wide configuration
- Support runtime updates with HMR
- Follow Nuxt's app config patterns

```ts
const appConfig = useAppConfig()

// Accessed via composable, supports HMR
const theme = appConfig.theme
```

## Practical Example: Multi-Tenant Configuration

Here's a real-world example that uses all three options appropriately:

::: code-group
```ts [tenant.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'
import { ofetch } from 'ofetch'

export default defineNuxtPrepareHandler(async () => {
  const tenantId = process.env.TENANT_ID
  const tenant = await ofetch(`https://api.example.com/tenants/${tenantId}`)

  return {
    // Public tenant data as importable constants
    state: {
      tenant: {
        id: tenant.id,
        name: tenant.name,
        logo: tenant.logo
      }
    },

    // API configuration
    runtimeConfig: {
      tenantApiKey: tenant.apiKey, // Private
      public: {
        tenantApiUrl: tenant.apiUrl // Public
      }
    },

    // Theme configuration
    appConfig: {
      theme: {
        primaryColor: tenant.primaryColor,
        logo: tenant.logo
      }
    }
  }
})
```
:::

Now you can use each piece of data in the most appropriate way:

```vue
<script setup lang="ts">
import { tenant } from '#nuxt-prepare'

const config = useRuntimeConfig()
const appConfig = useAppConfig()

// Direct import for static data
const tenantName = tenant.name

// Runtime config for API calls
const apiUrl = config.public.tenantApiUrl

// App config for theme
const primaryColor = appConfig.theme.primaryColor
</script>
```
