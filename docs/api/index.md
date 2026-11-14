# Reference

The module's surface is small: a handful of options in `nuxt.config.ts`, one function your scripts call, and one virtual module their data lands in.

## Configuration

- [Module Configuration](/api/module-configuration) – Which scripts run, and when.

## Methods

Imported from `nuxt-prepare/config` in every prepare script:

- [`defineNuxtPrepareHandler`](/api/define-nuxt-prepare-handler) – Wraps the handler and types its result.

```ts
// `server.prepare.ts`
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => ({
  runtimeConfig: {
    public: { apiUrl: await resolveApiUrl() }
  },
  data: { buildRegion: 'eu-central-1' }
}))
```

A result carries `runtimeConfig`, `appConfig` and `data`, each optional. [`defineNuxtPrepareHandler`](/api/define-nuxt-prepare-handler#result-properties) documents what each one does.

## Virtual Module

Whatever your scripts returned as `data` is importable by key, typed from the value itself:

```ts
import { buildRegion } from '#nuxt-prepare'
//     ^? "eu-central-1"
```

See [Prepare Data](/guide/prepare-data).
