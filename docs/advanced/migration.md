# Migration

## v4.0.0

### Nuxt 4 Is Required

The module declares `nuxt: '>=4.0.0'` and no longer installs on Nuxt 3. Stay on `nuxt-prepare` v3 until you have upgraded.

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

::: warning Arrays Are Concatenated, Not Replaced
Precedence applies to plain values and objects. An array coming back from a script is appended to the one already in place rather than replacing it, because that is how `defu` merges arrays regardless of argument order. To replace an array, return the full list you want and remove the original from `nuxt.config.ts`.
:::

### A Script's `appConfig` Outranks `app.config.ts`

The entry above covers what a script merges into `nuxt.config.ts`. `app.config.ts` is a separate file that Nuxt resolves at runtime, and it used to win over whatever a script returned. A script's `appConfig` is now placed ahead of every `app.config.ts` in the resolution order, so `useAppConfig()` reports the script's value.

Keep a value out of the script if `app.config.ts` should own it – the two are merged per key, so anything the script leaves out is unaffected.

### Layers Run Before the App Layer

Prepare scripts from extended layers used to run after the ones from the app layer. They now run first, so the app layer has the last word over the layers it extends – which is what layer precedence means everywhere else in Nuxt.

Where several layers list the same script path, the highest-priority layer decides both its position in the run order and its `runOnNuxtPrepare` setting; the script still runs once.
