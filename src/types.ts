import type { AppConfig, RuntimeConfig } from '@nuxt/schema'
import type { PartialDeep } from 'type-fest'

// #region result
export interface NuxtPrepareResult {
  /**
   * Whether the prepare script ran successfully. If an async operation
   * inside your prepare script fails, you can return `ok: false` to let the
   * Nuxt Prepare module know that the script failed.
   *
   * @default true
   */
  ok?: boolean
  /**
   * Runtime config to merge over `nuxt.config.ts`.
   */
  runtimeConfig?: PartialDeep<RuntimeConfig>
  /**
   * App config to merge over every `app.config.ts`.
   */
  appConfig?: PartialDeep<AppConfig>
  /**
   * Build-time data, imported from `#nuxt-prepare` as one typed constant per key.
   */
  data?: Record<string, unknown>
}
// #endregion result
