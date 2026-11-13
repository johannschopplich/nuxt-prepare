import { defineNuxtModule, installModule } from '@nuxt/kit'
import NuxtPrepare from '../../src/module'

export default defineNuxtModule({
  async setup() {
    await installModule(NuxtPrepare, {
      scripts: ['extra.prepare'],
    })
  },
})
