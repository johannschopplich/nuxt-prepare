---
layout: home
titleTemplate: Build Actions for Nuxt
hero:
  name: Nuxt Prepare
  text: Build Actions for Nuxt
  tagline: Async operations with zero runtime cost
  image:
    src: /logo-shadow.svg
    alt: Nuxt Prepare Logo
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
  - title: Async Operations
    icon: 🫴
    details: Run async code at build-time before your app builds.
    link: /guide/core-concepts
    linkText: Core Concepts
  - title: Zero Runtime Cost
    icon: 🚀
    details: Expensive operations run once at build, not on every request.
    link: /guide/core-concepts
    linkText: Build-Time vs Runtime
  - title: Type-Safe Global State
    icon: 🦾
    details: Auto-generated imports with full TypeScript inference via <code>#nuxt-prepare</code>.
    link: /guide/prepare-state
    linkText: Pass State to Nuxt
  - title: Fail Fast in CI/CD
    icon: ✅
    details: Validate environment and dependencies before deployment.
    link: /guide/example-env-validation
    linkText: See Example
---
