import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/config'],
  rollup: {
    emitCJS: true,
  },
})
