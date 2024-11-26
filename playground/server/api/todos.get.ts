import { defineEventHandler } from '#imports'
import { todos } from '#nuxt-prepare'

export default defineEventHandler(() => {
  return todos
})
