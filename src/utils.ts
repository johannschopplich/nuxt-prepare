export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function isObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function stripExtension(name: string, extensions: string[]): string {
  for (const ext of extensions) {
    if (name.endsWith(ext))
      return name.slice(0, -ext.length)
  }

  return name
}
