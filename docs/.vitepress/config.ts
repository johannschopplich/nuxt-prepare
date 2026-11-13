import type { DefaultTheme } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { description, version } from '../../package.json'
import { github, name, ogImage, ogUrl, releases } from './meta'

const guideItems: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/getting-started' },
  { text: 'Prepare Scripts', link: '/guide/prepare-scripts' },
  { text: 'Prepare State', link: '/guide/prepare-state' },
  { text: 'Runtime & App Config', link: '/guide/runtime-app-config' },
  { text: 'Error Handling', link: '/guide/error-handling' },
  { text: 'Migration', link: '/guide/migration' },
]

const cookbookItems: DefaultTheme.NavItemWithLink[] = [
  { text: 'Environment Variable Validation', link: '/cookbook/env-validation' },
  { text: 'Multi-Tenant Configuration', link: '/cookbook/multi-tenant-configuration' },
]

export default defineConfig({
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },

  lang: 'en-US',
  title: name,
  description,
  head: [
    [
      'link',
      { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
    ],
    [
      'meta',
      { name: 'author', content: 'Johann Schopplich' },
    ],
    [
      'meta',
      { property: 'og:type', content: 'website' },
    ],
    [
      'meta',
      { property: 'og:url', content: ogUrl },
    ],
    [
      'meta',
      { property: 'og:title', content: name },
    ],
    [
      'meta',
      { property: 'og:description', content: description },
    ],
    [
      'meta',
      { property: 'og:image', content: ogImage },
    ],
    [
      'meta',
      { name: 'twitter:title', content: name },
    ],
    [
      'meta',
      { name: 'twitter:description', content: description },
    ],
    [
      'meta',
      { name: 'twitter:image', content: ogImage },
    ],
    [
      'meta',
      { name: 'twitter:site', content: '@jschopplich' },
    ],
    [
      'meta',
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
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
      '/guide/': sidebarMain(),
      '/cookbook/': sidebarMain(),
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

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      activeMatch: '^/guide/',
      items: guideItems,
    },
    {
      text: 'Cookbook',
      activeMatch: '^/cookbook/',
      items: cookbookItems,
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
        { text: 'Migration', link: '/guide/migration' },
      ],
    },
  ]
}

function sidebarMain(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: guideItems,
    },
    {
      text: 'Cookbook',
      items: cookbookItems,
    },
    { text: 'API Reference', link: '/api/' },
    { text: 'Playground', link: 'https://github.com/johannschopplich/nuxt-prepare/tree/main/playground' },
  ]
}

function sidebarApi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
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
