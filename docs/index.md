---
layout: home
hero:
  name: Nuxt Prepare
  text: Fetch Once, Import Anywhere
  tagline: Turn API responses into typed imports when Nuxt builds.
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
  - title: Typed Imports
    icon: <span class="i-carbon:data-structured"></span>
    details: Return <code>data</code> from a script and import it from <code>#nuxt-prepare</code> in Vue and Nitro, typed with its literal values.
    link: /guide/prepare-data
    linkText: Prepare Data
  - title: Zero Runtime Cost
    icon: <span class="i-carbon:meter"></span>
    details: Expensive work happens once during the build, not on every request.
    link: /guide/prepare-scripts#scripts-run-at-build-time
    linkText: Scripts Run at Build Time
  - title: Config Above <code>app.config.ts</code>
    icon: <span class="i-carbon:settings-adjust"></span>
    details: A script's <code>appConfig</code> wins over <code>app.config.ts</code>, its <code>runtimeConfig</code> over <code>nuxt.config.ts</code>.
    link: /guide/runtime-app-config
    linkText: Runtime & App Config
  - title: A Build That Fails on Bad Input
    icon: <span class="i-carbon:checkmark-outline"></span>
    details: A script that throws stops the build, so bad input never reaches production.
    link: /guide/prepare-scripts#a-thrown-error-stops-the-build
    linkText: A Thrown Error Stops the Build
---
