import type { AppConfig, RuntimeConfig } from '@nuxt/schema'

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
  runtimeConfig?: Partial<RuntimeConfig>
  /**
   * App config to merge with `nuxt.options.appConfig`
   */
  appConfig?: AppConfig
}
