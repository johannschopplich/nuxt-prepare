import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { description, version } from '../../package.json'
import { github, name, ogImage, ogUrl, releases } from './meta'

const url = new URL(ogUrl)

export default defineConfig({
  lang: 'en-US',
  title: name,
  description: 'Run initialization steps at build time',
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
    // Plausible analytics
    ['script', { 'src': 'https://plausible.io/js/script.js', 'defer': '', 'data-domain': url.hostname }],
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
      '/guide/': sidebarGuide(),
      '/config/': sidebarGuide(),
      '/migration/': sidebarGuide(),
      '/api/': sidebarApi(),
    },

    socialLinks: [
      { icon: 'github', link: github },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Johann Schopplich.<br>Icon by <a href="https://maronbeere.carrd.co">Maronbeere</a>',
    },

    search: {
      provider: 'local',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      activeMatch: '^/guide/',
      items: [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Prepare State', link: '/guide/prepare-state' },
          ],
        },
        {
          text: 'Examples',
          items: [
            { text: 'Dotenv Validation', link: '/guide/example-env-validation' },
            { text: 'Populate Pinia Store', link: '/guide/example-pass-state-to-nuxt' },
          ],
        },
      ],
    },
    {
      text: 'Config',
      link: '/config/',
      activeMatch: '^/config/',
    },
    {
      text: 'API',
      items: [
        {
          text: 'Overview',
          link: '/api/',
        },
        {
          text: 'Methods',
          items: [
            { text: 'defineNuxtPrepareHandler', link: '/api/define-nuxt-prepare-handler' },
          ],
        },
      ],
    },
    {
      text: `v${version}`,
      items: [
        {
          text: 'Release Notes ',
          link: releases,
        },
      ],
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guides',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Prepare State', link: '/guide/prepare-state' },
      ],
    },
    {
      text: 'Module',
      items: [
        { text: 'Configuration', link: '/config/' },
      ],
    },
    {
      text: 'Examples',
      items: [
        { text: 'Dotenv Validation', link: '/guide/example-env-validation' },
        { text: 'Populate Pinia Store', link: '/guide/example-pass-state-to-nuxt' },
      ],
    },
    { text: 'Migration', link: '/migration/' },
    { text: 'API', link: '/api/' },
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
      text: 'Methods',
      items: [
        { text: 'defineNuxtPrepareHandler', link: '/api/define-nuxt-prepare-handler' },
      ],
    },
  ]
}
