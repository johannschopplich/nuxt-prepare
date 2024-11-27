import process from 'node:process'
import * as v from 'valibot'
import { defineNuxtPrepareHandler } from '../src/config'

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
