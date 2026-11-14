import type { NuxtConfig } from '@nuxt/schema'

// #region result
export interface NuxtPrepareResult {
  /**
   * Runtime config to merge over `nuxt.config.ts`.
   */
  runtimeConfig?: NuxtConfig['runtimeConfig']
  /**
   * App config to merge over every `app.config.ts`.
   */
  appConfig?: NuxtConfig['appConfig']
  /**
   * Build-time data, imported from `#nuxt-prepare` as one typed constant per key.
   */
  data?: Record<string, unknown>
}
// #endregion result
