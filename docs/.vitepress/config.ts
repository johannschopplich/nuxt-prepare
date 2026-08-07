import type { DefaultTheme } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { description, version } from '../../package.json'
import { github, name, ogImage, ogUrl, releases } from './meta'

export default defineConfig({
  vite: {
    plugins: [UnoCSS()],
  },

  lang: 'en-US',
  title: name,
  description: 'Build actions for Nuxt',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Johann Schopplich' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:title', content: name }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: name }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@jschopplich' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  appearance: 'dark',

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/johannschopplich/nuxt-prepare/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    nav: nav(),

    sidebar: {
      '/essentials/': sidebarMain(),
      '/guides/': sidebarMain(),
      '/advanced/': sidebarMain(),
      '/api/': sidebarApi(),
    },

    socialLinks: [
      { icon: 'github', link: github },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Johann Schopplich.<br>Icon by <a href="https://konkon.zip">Konkon</a>',
    },

    search: {
      provider: 'local',
    },
  },
})

const essentialsItems = [
  { text: 'What is Nuxt Prepare?', link: '/essentials/what-is-nuxt-prepare' },
  { text: 'Getting Started', link: '/essentials/getting-started' },
  { text: 'Core Concepts', link: '/essentials/core-concepts' },
]

const guidesItems = [
  { text: 'Prepare State', link: '/guides/prepare-state' },
  { text: 'Runtime & App Config', link: '/guides/runtime-app-config' },
  { text: 'Error Handling', link: '/guides/error-handling' },
  { text: 'Environment Variable Validation', link: '/guides/example-env-validation' },
  { text: 'Populate Pinia Store', link: '/guides/example-pass-state-to-nuxt' },
]

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Essentials',
      activeMatch: '^/essentials/',
      items: essentialsItems,
    },
    {
      text: 'Guides',
      activeMatch: '^/guides/',
      items: guidesItems,
    },
    {
      text: 'API',
      link: '/api/',
      activeMatch: '^/api/',
    },
    {
      text: `v${version}`,
      items: [
        {
          text: 'Release Notes ',
          link: releases,
        },
        { text: 'Migration', link: '/advanced/migration' },
      ],
    },
  ]
}

function sidebarMain(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Essentials',
      items: essentialsItems,
    },
    {
      text: 'Guides',
      items: guidesItems,
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Migration', link: '/advanced/migration' },
      ],
    },
    { text: 'API Reference', link: '/api/' },
    { text: 'Playground', link: 'https://github.com/johannschopplich/nuxt-prepare/tree/main/playground' },
  ]
}

function sidebarApi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Overview',
      link: '/api/',
    },
    {
      text: 'Module Configuration',
      link: '/api/module-configuration',
    },
    {
      text: 'Methods',
      items: [
        { text: 'defineNuxtPrepareHandler', link: '/api/define-nuxt-prepare-handler' },
      ],
    },
  ]
}
