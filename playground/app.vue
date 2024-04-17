<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { todos } from '#nuxt-prepare'

const config = useRuntimeConfig().public
</script>

<template>
  <Head>
    <Title>nuxt-prepare</Title>
    <Link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
  </Head>

  <header>
    <h1>nuxt-prepare</h1>
  </header>

  <h3>Nuxt Config</h3>
  <details>
    <summary>Public Runtime Options</summary>
    <pre>{{ JSON.stringify(config, null, 2) }}</pre>
  </details>

  <h3>Prepared State</h3>
  <details>
    <summary>Prefetched state <code>todos</code> at build-time</summary>
    <pre>{{ JSON.stringify(todos, null, 2) }}</pre>
  </details>
</template>
