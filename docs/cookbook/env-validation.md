# Environment Variable Validation

A prepare script can check that every environment variable the app needs is set. Nuxt reads the local `.env` file before the script runs, so a schema library like [valibot](https://valibot.dev) can validate `process.env`. When a variable is missing, the build **fails early** – in CI, before a misconfigured app ships.

::: code-group
```ts [server.prepare.ts]
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'
import * as v from 'valibot'

export default defineNuxtPrepareHandler(() => {
  const schema = v.object({
    NUXT_PUBLIC_FOO: v.pipe(v.string(), v.nonEmpty()),
  })

  const result = v.safeParse(schema, process.env)

  if (!result.success) {
    console.error(
      `Missing environment variables:\n${result.issues
        .filter(issue => issue.path != null)
        .map(issue => `  - ${issue.path![0].key}: ${issue.message}`)
        .join('\n')}`,
    )
  }

  return {
    ok: result.success,
  }
})
```
:::
