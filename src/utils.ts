export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function isObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/** The entries of `list` with one occurrence dropped for every entry naming the same file in `removed`. */
export function withoutEntries<T extends string | { file: string }>(list: T[], removed: T[]): T[] {
  const remaining = removed.map(entry => (typeof entry === 'string' ? entry : entry.file))

  return list.filter((entry) => {
    const index = remaining.indexOf(typeof entry === 'string' ? entry : entry.file)
    if (index === -1)
      return true

    remaining.splice(index, 1)
    return false
  })
}

export function stripExtension(name: string, extensions: string[]): string {
  for (const ext of extensions) {
    if (name.endsWith(ext))
      return name.slice(0, -ext.length)
  }

  return name
}
