import { defineConfig } from 'vitepress';
import { apiPages } from './api-pages.mjs';

const nav = [
  { text: 'Guide', link: '/guide/' },
  {
    text: 'Ecosystem',
    items: [
      { text: 'Discord', link: 'https://chat.fakerjs.dev' },
      { text: 'StackBlitz', link: 'https://fakerjs.dev/new' },
      { text: 'Twitter', link: 'https://twitter.com/faker_js' },
    ],
  },
  // { text: 'Playground', link: '/playground/' },
];

const sidebar = {
  '/': [
    {
      text: 'Guide',
      children: [
        {
          text: 'Recent Statement and FAQs',
          link: '/update.html',
        },
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

// grab from process.env once this is building on netlify
const algolia = {
  apiKey: '',
  indexName: '',
  searchParameters: {
    facetFilters: [''],
  },
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
    // TODO 2022-03-06: https://github.com/faker-js/faker/issues/222
    // algolia,
  },
});
