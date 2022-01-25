import { defineConfig } from 'vitepress';

const nav = [
  { text: 'Guide', link: '/guide/' },
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
      children: [
        {
          text: 'Address',
          link: '/api/address',
          collapsable: false, // optional, defaults to true
        },
        {
          text: 'Commerce',
          link: '/api/commerce',
        },
        {
          text: 'Company',
          link: '/api/company',
        },
        {
          text: 'Database',
          link: '/api/database',
        },
        {
          text: 'Datatype',
          link: '/api/datatype',
        },
        {
          text: 'Date',
          link: '/api/date',
        },
        {
          text: 'Fake',
          link: '/api/fake',
        },
        {
          text: 'Finance',
          link: '/api/finance',
        },
        {
          text: 'Hacker',
          link: '/api/hacker',
        },
        {
          text: 'Helpers',
          link: '/api/helpers',
        },
        {
          text: 'Image',
          link: '/api/image',
        },
        {
          text: 'Internet',
          link: '/api/internet',
        },
        {
          text: 'Localization',
          link: '/api/localization',
        },
      ],
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
        property: 'og:description',
        content: description,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:image',
        content: image,
      },
      {
        property: 'twitter:image',
        content: image,
      },
      {
        property: 'twitter:card',
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
