import type { NuxtPrepareResult } from './types'

export async function defineNuxtPrepareHandler(
  handler: NuxtPrepareResult | (() => NuxtPrepareResult | Promise<NuxtPrepareResult>),
): Promise<NuxtPrepareResult> {
  if (typeof handler === 'function')
    return await handler()

  return handler
}
