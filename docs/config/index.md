# Module Configuration

Adapt `nuxt-prepare` to your needs with the following options in your `nuxt.config.ts` file:

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],

  prepareKit: {
    scripts: [
      // Add the prepare scripts you want to run
    ]
  }
})
```

## Type Declarations

```ts
interface ModuleOptions {
  /**
   * Accepts a list of prepare scripts to run. The scripts are executed in the
   * order they are defined.
   *
   * @remarks
   * You can omit the file extension. Supported extensions are: `.js`, `.mjs`, `.ts`.
   *
   * @default ['server.prepare']
   */
  scripts: string | string[]
  /**
   * If `true`, the module will not throw an error if a script fails.
   *
   * @remarks
   * Ensure to add `ok: false` to your script's return value to indicate that
   * the script failed. Otherwise, the module will assume that the script
   * succeeded.
   *
   * @default false
   */
  continueOnError?: boolean
}
```
