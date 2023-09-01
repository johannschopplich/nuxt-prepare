import type { AppConfig, RuntimeConfig } from '@nuxt/schema'
import type { PartialDeep } from 'type-fest'

export interface NuxtPrepareResult {
  /**
   * Indicates if the prepare script ran successfully. If an async operation
   * inside your prepare script fails, you can return `ok: false` to let the
   * Nuxt Prepare module know that the script failed.
   *
   * @default true
   */
  ok?: boolean
  /**
   * Runtime config to merge with `nuxt.options.runtimeConfig`
   */
  runtimeConfig?: PartialDeep<RuntimeConfig>
  /**
   * App config to merge with `nuxt.options.appConfig`
   */
  appConfig?: PartialDeep<AppConfig>
  /**
   * Pass custom state to Nuxt and import it anywhere from `#nuxt-prepare`
   *
   * @remarks
   * Use this to prefetch data, i.e. populate the Pinia store with data from
   * your API.
   *
   * @example
   * // `stores/todo.ts`
   * import { defineStore } from 'pinia'
   * import { todos } from '#nuxt-prepare'
   *
   * export const useTodos = defineStore('todos', {
   *   state: () => ({
   *     todos: todos || [],
   *   })
   * })
   */
  state?: Record<string, unknown>
}
