---
layout: home
sidebar: false

title: nuxt-prepare
titleTemplate: Run initialization steps before Nuxt starts

hero:
  name: nuxt-prepare
  text: Run initialization steps before Nuxt starts
  tagline: Like server init in Nuxt 2, but better
  image:
    src: /logo-shadow.svg
    alt: nuxt-prepare
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API
      link: /api/
    - theme: alt
      text: View on GitHub
      link: https://github.com/johannschopplich/nuxt-prepare

features:
  - title: Zero-Config
    icon: 🦦
    details: Uses `server.prepare.ts` by default.
    link: /guide/getting-started
    linkText: Getting Started
  - title: Define Custom Handlers
    icon: 🦾
    details: Type-Safe with `defineNuxtPrepareHandler`.
    link: /api/define-nuxt-prepare-handler
    linkText: Methods
  - title: Validate Your `.env`
    icon: 🦜
    details: Ensure your `.env` is valid before Nuxt starts.
    link: /guide/example-env-validation
    linkText: Examples
---
