import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';
import { apiPages } from './api-pages';
import { currentVersion, oldVersions } from './versions';

const nav: DefaultTheme.NavItem[] = [
  { text: 'Guide', link: '/guide/' },
  // { text: 'Playground', link: '/playground/' },
  {
    text: 'Ecosystem',
    items: [
      { text: 'Discord ', link: 'https://chat.fakerjs.dev' },
      { text: 'StackBlitz ', link: 'https://fakerjs.dev/new' },
      { text: 'Twitter ', link: 'https://twitter.com/faker_js' },
    ],
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
];

const sidebar: DefaultTheme.MultiSideBarConfig = {
  '/about': [
    {
      text: 'About',
      children: [
        {
          text: 'Announcements',
          link: '/about/announcements',
          children: [
            { text: '2022-01-14', link: '/about/announcements/2022-01-14' },
          ],
        },
        {
          text: 'Team',
          link: '/about/team',
        },
      ],
    },
  ],
  '/': [
    {
      text: 'Guide',
      children: [
        {
          text: 'Getting Started',
          link: '/guide/',
        },
      ],
    },
    {
      text: 'API',
      children: apiPages,
    },
    {
      text: 'Migrating from Faker v5',
      link: '/migration-guide-v5/',
    },
  ],
};

const algolia: DefaultTheme.AlgoliaSearchOptions = {
  apiKey: process.env.API_KEY,
  appId: process.env.APP_ID,
  indexName: 'fakerjs',
};

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
    repo: 'faker-js/faker',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    nav,
    sidebar,
    algolia,
  },
});
