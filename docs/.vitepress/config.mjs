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

const navCN = [
  { text: '指南', link: '/zh-cn/guide/' },
  // { text: '体验', link: '/playground/' },
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

const sidebarCN = {
  '/zh-cn/': [
    {
      text: '指南',
      children: [
        {
          text: '近期声明及常见问题解答',
          link: '/zh-cn/update.html',
        },
        {
          text: '快速入门',
          link: '/zh-cn/guide/',
        },
      ],
    },
    {
      text: 'API',
      children: [
        {
          text: '地址',
          link: '/zh-cn/api/address',
          collapsable: false, // optional, defaults to true
        },
        {
          text: '商业',
          link: '/zh-cn/api/commerce',
        },
        {
          text: '公司',
          link: '/zh-cn/api/company',
        },
        {
          text: '数据库',
          link: '/zh-cn/api/database',
        },
        {
          text: '数据类型',
          link: '/zh-cn/api/datatype',
        },
        {
          text: '日期',
          link: '/zh-cn/api/date',
        },
        {
          text: 'Fake',
          link: '/zh-cn/api/fake',
        },
        {
          text: '金融',
          link: '/zh-cn/api/finance',
        },
        {
          text: '黑客',
          link: '/zh-cn/api/hacker',
        },
        {
          text: '辅助函数',
          link: '/zh-cn/api/helpers',
        },
        {
          text: '图像',
          link: '/zh-cn/api/image',
        },
        {
          text: '网络',
          link: '/zh-cn/api/internet',
        },
        {
          text: '本地化',
          link: '/zh-cn/api/localization',
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

const description =
  'Generate massive amounts of fake (but reasonable) data for testing and development.';
const image = 'https://fakerjs.dev/social-image.png';

export default defineConfig({
  // Empty in order to use the faker.js logo instead of a text title.
  // If we had a square logo, we could use it here.
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
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Faker',
      description:
        'Generate massive amounts of fake data in the browser and node.js',
    },
    '/zh-cn/': {
      lang: 'zh-CN',
      title: 'Faker',
      description: '在浏览器和 Node.js 中生成大量虚假数据。',
    },
  },
  themeConfig: {
    repo: 'faker-js/faker',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    algolia,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav,
        sidebar,
      },
      '/zh-cn/': {
        label: '简体中文',
        selectText: '语言',
        editLinkText: '在 GitHub 上编辑此页',
        nav: navCN,
        sidebar: sidebarCN,
      },
    },
  },
});
