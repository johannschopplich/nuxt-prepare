# Migration

## v4.0.0

### Nuxt 4 Is Required

The module declares `nuxt: '>=4.0.0'`, so on Nuxt 3 it is disabled and no script runs. Stay on `nuxt-prepare` v3 until you have upgraded.

### A Script's Result Wins Over What It Merges Into

A prepare script's `runtimeConfig`, `appConfig` and `state` used to lose against the values already in place, so a key set in `nuxt.config.ts` survived whatever the script returned. The script now wins, and a later script wins over an earlier one.

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  runtimeConfig: {
    public: { apiUrl: 'https://api.example.com' }
  }
})
```

```ts
// `server.prepare.ts`
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: { apiUrl: 'https://staging.example.com' }
  }
}))
```

`apiUrl` used to stay `https://api.example.com`; it is now `https://staging.example.com`. Keys the script leaves out are untouched either way.

If you relied on `nuxt.config.ts` having the last word, stop returning that key from the script, or read the current value and return it unchanged.

::: warning Arrays Are Concatenated, Not Replaced
Precedence applies to plain values and objects. An array coming back from a script is put in front of the one already in place rather than replacing it. To replace an array, return the full list you want and remove the original from `nuxt.config.ts`.
:::

### A Script's `appConfig` Outranks `app.config.ts`

`app.config.ts` used to win over whatever a script returned as `appConfig`. The script's value now wins over every `app.config.ts`, so `useAppConfig()` reports it.

Keep a value out of the script if `app.config.ts` should own it – the two are merged per key, so anything the script leaves out is unaffected.

### Layers Run Before the App Layer

Prepare scripts from extended layers used to run after the ones from the app layer. They now run first, so the app layer has the last word over the layers it extends.

Where several layers list the same script path, the highest-priority layer decides both its position in the run order and its `runOnNuxtPrepare` setting; the script still runs once.
