# Prepare Scripts

## Scripts Run at Build Time

Prepare scripts run **during the build process**, not at runtime:

```
nuxt dev/build → Prepare scripts run → Nuxt builds your app → App runs
```

Scripts run once per build, so an API call or a database query in a prepare script costs build time, never request time, and what the app ships is the result rather than the code that produced it.

## A Script's Result Wins Over `nuxt.config.ts`

A result is merged over `nuxt.config.ts` rather than under it, so a key a script returns overrides the value already in place, and keys it leaves out keep theirs. A later script wins over an earlier one, and a script's `appConfig` wins over `app.config.ts` the same way. Two exceptions: arrays are concatenated rather than replaced, and a `null` never overrides – the earlier value stays.

## Layers Run Before Your Project

Scripts from extended layers run before the ones your own project lists, so your project has the last word – its result is merged over theirs. Where several layers list the same script path, it runs once, at the position the highest-priority layer gives it.

## Data, Runtime Config, or App Config?

Prepare scripts can return:

| Key | Your app reads it with | Reach for it when |
| --- | --- | --- |
| `data` | `import { … } from '#nuxt-prepare'` | Values you import as typed constants – prefetched content, initial store data |
| `runtimeConfig` | `useRuntimeConfig()` | Environment settings, API URLs, and credentials – public or server-only |
| `appConfig` | `useAppConfig()` | App-wide settings – feature flags from a CMS, a tenant's theme |

See [Prepare Data](/guide/prepare-data) and [Runtime & App Config](/guide/runtime-app-config) for each one, and [Multi-Tenant Configuration](/cookbook/multi-tenant-configuration) for all three in one script.
