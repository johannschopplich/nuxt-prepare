// The handler itself instead of its result: `defineNuxtPrepareHandler` is missing.
export default () => ({
  runtimeConfig: {
    public: {
      fromFunction: 'function.prepare',
    },
  },
})
