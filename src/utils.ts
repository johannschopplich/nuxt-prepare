export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function isObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/** The entries of `scripts`, one occurrence dropped for each entry of `exclusions` naming the same file. */
export function withoutScripts<T extends string | { file: string }>(scripts: T[], exclusions: T[]): T[] {
  const excludedFiles = exclusions.map(scriptFile)

  return scripts.filter((entry) => {
    const index = excludedFiles.indexOf(scriptFile(entry))
    if (index === -1)
      return true

    excludedFiles.splice(index, 1)
    return false
  })
}

function scriptFile(entry: string | { file: string }): string {
  return typeof entry === 'string' ? entry : entry.file
}

export function stripExtension(name: string, extensions: string[]): string {
  for (const ext of extensions) {
    if (name.endsWith(ext))
      return name.slice(0, -ext.length)
  }

  return name
}
