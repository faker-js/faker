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
          link: '/guide/recent-faqs',
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

export default defineConfig({
  // Empty in order to use the faker.js logo instead of a text title.
  // If we had a square logo, we could use it here.
  title: 'Faker',
  description:
    'Generate massive amounts of fake data in the browser and node.js',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#40af7c' }],
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
