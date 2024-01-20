# Migration

## v1.0.0

With the release of v1.0.0, the `prepareKit` Nuxt configuration key has been renamed to `prepare`. Please update the according configuration in your `nuxt.config.ts` file:

```diff
export default defineNuxtConfig({
-  prepareKit: {
+  prepare: {
    scripts: ['payload.prepare']
  }
})
```
