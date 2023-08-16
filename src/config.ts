import type { NuxtPrepareResult } from './types'

export async function defineNuxtPrepareHandler<T extends NuxtPrepareResult>(
  init: T | (() => T | Promise<T>),
): Promise<T> {
  if (typeof init === 'function')
    return await init()

  return init
}
