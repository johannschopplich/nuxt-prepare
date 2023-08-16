import { z } from 'zod'
import { defineNuxtPrepareHandler } from '../src/config'

export default defineNuxtPrepareHandler(() => {
  const schema = z.object({
    NUXT_PUBLIC_FOO: z.string(),
  })

  // eslint-disable-next-line n/prefer-global/process
  const result = schema.safeParse(process.env)

  if (!result.success)
    console.error(result.error)

  return {
    ok: result.success,
  }
})
