---
layout: home
hero:
  name: Nuxt Prepare
  text: Async Config for Nuxt
  tagline: Run async code before your Nuxt config is final, and ship only the result.
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
    icon: <span class="i-carbon:function"></span>
    details: Await anything your config depends on – a remote value, a database, a computed default.
    link: /guide/runtime-app-config
    linkText: Runtime & App Config
  - title: Zero Runtime Cost
    icon: <span class="i-carbon:meter"></span>
    details: Expensive work happens once during the build, not on every request.
    link: /guide/prepare-scripts#scripts-run-at-build-time
    linkText: Scripts Run at Build Time
  - title: Type-Safe Global State
    icon: <span class="i-carbon:ibm-watson-knowledge-studio"></span>
    details: Return state from a script and import it from <code>#nuxt-prepare</code>, fully inferred.
    link: /guide/prepare-data
    linkText: Pass Data to Nuxt
  - title: A Build That Fails on Bad Input
    icon: <span class="i-carbon:checkmark-outline"></span>
    details: 'A script that returns <code>ok: false</code> stops the build, so bad input never reaches production.'
    link: /cookbook/env-validation
    linkText: See Example
---
