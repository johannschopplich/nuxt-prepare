import { defineNuxtPrepareHandler } from '../../src/config'

const globalState = globalThis as { prepareRuns?: number }
globalState.prepareRuns = (globalState.prepareRuns ?? 0) + 1

export default defineNuxtPrepareHandler({})
