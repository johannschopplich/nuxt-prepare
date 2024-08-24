export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}
