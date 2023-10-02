import { z } from 'zod'
import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(() => {
  const schema = z.object({
    NUXT_PUBLIC_FOO: z.string(),
  })

  // eslint-disable-next-line node/prefer-global/process
  const result = schema.safeParse(process.env)

  if (!result.success) {
    console.error(`Invalid environment variables:\n${
      result.error.errors.map(issue => `- ${issue.path}: ${JSON.stringify(issue)}`).join('\n')
    }`)
  }

  return {
    ok: result.success,
  }
})
