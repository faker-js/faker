import { defineConfig } from 'vitepress';
import { apiPages } from './api-pages';
import { currentVersion, oldVersions } from './versions';

const description =
  'Generate massive amounts of fake (but reasonable) data for testing and development.';
const image = 'https://fakerjs.dev/social-image.png';

export default defineConfig({
  title: 'Faker',
  description,

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#40af7c' }],
    [
      'meta',
      {
        name: 'og:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'og:image',
        content: image,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: image,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/faker-js/faker/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/faker_js' },
      { icon: 'discord', link: 'https://chat.fakerjs.dev' },
      { icon: 'github', link: 'https://github.com/faker-js/faker' },
    ],

    algolia: {
      apiKey: process.env.API_KEY,
      appId: process.env.APP_ID,
      indexName: 'fakerjs',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Faker.',
    },

    nav: [
      { text: 'Guide', link: '/guide/' },
      // { text: 'Playground', link: '/playground/' },
      {
        text: 'Ecosystem',
        items: [{ text: 'StackBlitz ', link: 'https://fakerjs.dev/new' }],
      },
      {
        text: 'About',
        items: [
          {
            text: 'Announcements',
            link: '/about/announcements',
          },
          {
            text: 'Team',
            link: '/about/team',
          },
        ],
      },
      {
        text: currentVersion,
        items: [
          {
            text: 'Release Notes',
            link: 'https://github.com/faker-js/faker/releases',
          },
          ...oldVersions.map(({ version, link }) => ({
            text: version,
            link,
          })),
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/guide/',
            },
          ],
        },
        {
          text: 'API',
          items: apiPages,
        },
        {
          text: 'Migrations',
          items: [
            {
              text: 'Migrating from Faker v5',
              link: '/guide/migration-guide-v5',
            },
            {
              text: 'Migrating from Faker v6',
              link: '/guide/migration-guide-v6',
            },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API',
          items: apiPages,
        },
      ],
      '/about/': [
        {
          text: 'About',
          items: [
            {
              text: 'Announcements',
              link: '/about/announcements',
              // children: [
              //   { text: '2022-01-14', link: '/about/announcements/2022-01-14' },
              // ],
            },
            {
              text: 'Team',
              link: '/about/team',
            },
          ],
        },
      ],
    },
  },
});
