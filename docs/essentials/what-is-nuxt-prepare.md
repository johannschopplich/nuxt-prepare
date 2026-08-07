# What is Nuxt Prepare?

Nuxt Prepare is a [Nuxt](https://nuxt.com) module that runs your own async code before Nuxt finalizes its configuration. A prepare script returns a result, and the module merges it into `runtimeConfig` and `appConfig` or hands it to your app as typed state – all at build time, so nothing is left to do at runtime.

## A Prepare Script

A script is a file that default-exports a handler. The module looks for `server.prepare.ts` by default, and the `.prepare` part is convention rather than a rule – [`prepare.scripts`](/api/module-configuration#prepare-scripts) takes whatever names you give it:

```ts
// `server.prepare.ts`
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(async () => {
  const { apiUrl } = await fetch('https://config.example.com/env').then(r => r.json())

  return {
    runtimeConfig: {
      public: { apiUrl }
    }
  }
})
```

From here on, `useRuntimeConfig().public.apiUrl` carries the value the script fetched – in every component, on both server and client, without a request at runtime.

## What You Get

**Config that depends on something remote.** `nuxt.config.ts` is evaluated synchronously, so a value you have to fetch, read from a database or compute cannot live there. A prepare script can await it.

**Zero runtime cost.** The work happens once during the build. Your app ships the result, not the code that produced it.

**Typed state anywhere.** Return a `state` object and import it from `#nuxt-prepare` with full inference. See [Prepare State](/guides/prepare-state).

**A build that fails on bad input.** Return `ok: false` and the build stops with your message, so a missing environment variable is caught in CI rather than in production. See [Error Handling](/guides/error-handling).

**Layer support.** Scripts from extended layers run before your own, so your project always has the last word.

## Next Steps

- [Getting Started](/essentials/getting-started) – Install the module and write a first script.
- [Core Concepts](/essentials/core-concepts) – When scripts run and what happens to their result.
- [Module Configuration](/api/module-configuration) – Every option the module accepts.
- [`defineNuxtPrepareHandler`](/api/define-nuxt-prepare-handler) – The handler signature and its result shape.
