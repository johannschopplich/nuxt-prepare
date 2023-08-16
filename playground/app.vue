<script setup lang="ts">
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

  <h3>Configuration</h3>
  <details>
    <summary>Public Runtime Options</summary>
    <pre>{{ JSON.stringify(config, null, 2) }}</pre>
  </details>
</template>
