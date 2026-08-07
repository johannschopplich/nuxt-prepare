# Overview

The module's surface is small: a handful of options in `nuxt.config.ts`, one function your scripts export, and one virtual module their results land in.

## Configuration

- [Module Configuration](/api/module-configuration) – Which scripts run, when, and what a failure does to the build.

## Methods

Auto-imported in every prepare script:

- [`defineNuxtPrepareHandler`](/api/define-nuxt-prepare-handler) – Wraps the handler and types its result.

```ts
// `server.prepare.ts`
export default defineNuxtPrepareHandler(async () => {
  const { apiUrl } = await fetch('https://config.example.com/env').then(r => r.json())

  return {
    runtimeConfig: { public: { apiUrl } },
    state: { buildRegion: 'eu-central-1' }
  }
})
```

A result carries `ok`, `runtimeConfig`, `appConfig` and `state`, each optional. [`defineNuxtPrepareHandler`](/api/define-nuxt-prepare-handler#return-value-properties) documents what each one does.

## Virtual Module

Whatever your scripts returned as `state` is importable by key, typed from the value itself:

```ts
import { buildRegion } from '#nuxt-prepare'
//     ^? string
```

See [Prepare State](/guides/prepare-state).
