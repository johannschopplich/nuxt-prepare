# Environment Variable Validation

Using a schema validation library like [zod](https://github.com/colinhacks/zod) lets us validate if all environment variables are set correctly.

Since Nuxt reads the environment variables at build time from the local `.env` file, we can validate them in our prepare script:

```ts
// `server.prepare.ts`
import { z } from 'zod'
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'

export default defineNuxtPrepareHandler(() => {
  const schema = z.object({
    NUXT_PUBLIC_FOO: z.string()
  })

  const result = schema.safeParse(process.env)

  if (!result.success) {
    console.error(`Invalid environment variables:\n${
      result.error.errors.map(issue => `  - ${issue.path}: ${JSON.stringify(issue)}`).join('\n')
    }`)
  }

  return {
    ok: result.success
  }
})
```
