import { defineNuxtPrepareHandler } from '../../src/config'

export default defineNuxtPrepareHandler(() => ({
  data: {
    todo: { id: 1, title: 'todo.prepare' },
    region: 'todo.prepare',
  },
}))
