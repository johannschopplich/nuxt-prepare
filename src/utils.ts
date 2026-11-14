import { pascalCase } from 'scule'

// Reserved words a module cannot export as a `const`.
const RESERVED_WORDS = new Set('arguments await break case catch class const continue debugger default delete do else enum eval export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield'.split(' '))

const IDENTIFIER_RE = /^[\p{ID_Start}$_][\p{ID_Continue}$\u200C\u200D]*$/u

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value)
    ? value
    : [value]
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
  return typeof entry === 'string'
    ? entry
    : entry.file
}

export function stripExtension(name: string, extensions: string[]): string {
  for (const ext of extensions) {
    if (name.endsWith(ext))
      return name.slice(0, -ext.length)
  }

  return name
}

export function assertExportableKeys(keys: string[]) {
  const keysByTypeAlias = new Map<string, string>()

  for (const key of keys) {
    if (!IDENTIFIER_RE.test(key) || RESERVED_WORDS.has(key))
      throw new Error(`Prepare data key \`${key}\` is not a valid export name. Use a JavaScript identifier that is not a reserved word.`)

    const typeAlias = pascalCase(key)
    if (!IDENTIFIER_RE.test(typeAlias))
      throw new Error(`Prepare data key \`${key}\` gives no valid type alias name. Start it with a letter.`)

    const otherKey = keysByTypeAlias.get(typeAlias)
    if (otherKey)
      throw new Error(`Prepare data keys \`${otherKey}\` and \`${key}\` both declare the type \`${typeAlias}\`. Rename one of them.`)

    keysByTypeAlias.set(typeAlias, key)
  }
}
