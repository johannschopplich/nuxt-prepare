# Environment Variable Validation

Using a schema validation library like [valibot](https://valibot.dev) lets us validate if all environment variables required for the application are set correctly.

Since Nuxt reads the environment variables at build time from the local `.env` file, you can validate them in a prepare script:

```ts
// `server.prepare.ts`
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
