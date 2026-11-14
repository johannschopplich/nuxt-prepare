# Multi-Tenant Configuration

A multi-tenant build fetches its tenant once and returns all three result keys:

::: code-group
```ts [tenant.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'
import { ofetch } from 'ofetch'

export default defineNuxtPrepareHandler(async () => {
  const tenantId = process.env.TENANT_ID
  const tenant = await ofetch(`https://api.example.com/tenants/${tenantId}`)

  return {
    // Public tenant data as importable constants
    data: {
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
