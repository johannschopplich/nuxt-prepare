import type { AppConfig, RuntimeConfig } from '@nuxt/schema'
import type { PartialDeep } from 'type-fest'

// #region result
export interface NuxtPrepareResult {
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
