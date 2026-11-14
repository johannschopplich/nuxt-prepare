# Nuxt Prepare

A Nuxt module that runs async code once while Nuxt builds and turns its result into typed imports and configuration.

## Language

**Prepare script**:
A file that runs once at build time, `nuxt prepare` included, and default-exports a result.
_Avoid_: init script, server script

**Result**:
The object a prepare script exports, holding its data, runtime config and app config.
_Avoid_: output, return value

**Handler**:
The result, or a function returning it, that a prepare script passes to `defineNuxtPrepareHandler`.
_Avoid_: init, event handler

**Prepare data**:
The values a result holds under `data`, imported from `#nuxt-prepare` as typed, read-only constants.
_Avoid_: state, global state, store
