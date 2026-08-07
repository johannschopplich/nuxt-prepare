# Migration

## v4.0.0

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
export default defineNuxtPrepareHandler(() => ({
  runtimeConfig: {
    public: { apiUrl: 'https://staging.example.com' }
  }
}))
```

`apiUrl` used to stay `https://api.example.com`; it is now `https://staging.example.com`. Keys the script leaves out are untouched either way.

If you relied on `nuxt.config.ts` having the last word, stop returning that key from the script, or read the current value and return it unchanged.

::: warning Arrays are concatenated, not replaced
Precedence applies to plain values and objects. An array coming back from a script is appended to the one already in place rather than replacing it, because that is how `defu` merges arrays regardless of argument order. To replace an array, return the full list you want and remove the original from `nuxt.config.ts`.
:::

### Layers Run Before the App Layer

Prepare scripts from extended layers used to run after the ones from the app layer. They now run first, so the app layer has the last word over the layers it extends – which is what layer precedence means everywhere else in Nuxt.

Where several layers list the same script path, the highest-priority layer decides both its position in the run order and its `runOnNuxtPrepare` setting; the script still runs once.
