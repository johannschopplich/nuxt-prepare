import { describe, expect, it } from 'vitest'
import { assertExportableKeys } from '../src/utils'

describe('assertExportableKeys', () => {
  it('rejects default as a data key (reserved word)', () => {
    expect(() => assertExportableKeys(['default'])).toThrow('Prepare data key `default` is not a valid export name')
  })

  it('rejects _ as a data key (empty type alias)', () => {
    expect(() => assertExportableKeys(['_'])).toThrow('Prepare data key `_` gives no valid type alias name')
  })

  it('rejects build_region beside buildRegion (same type alias)', () => {
    expect(() => assertExportableKeys(['buildRegion', 'build_region'])).toThrow('Prepare data keys `buildRegion` and `build_region` both declare the type `BuildRegion`')
  })

  it('accepts the non-ASCII key größe', () => {
    expect(() => assertExportableKeys(['größe'])).not.toThrow()
  })
})
