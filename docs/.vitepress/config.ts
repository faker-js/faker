import { defineConfig } from 'vitepress';
import { DefaultTheme } from 'vitepress/theme';
import { apiPages } from './api-pages';
import { currentVersion, oldVersions, versionBannerInfix } from './versions';

type SidebarGroup = DefaultTheme.SidebarGroup;

const description =
  'Generate massive amounts of fake (but reasonable) data for testing and development.';
const image = 'https://fakerjs.dev/social-image.png';

function extendSideNav(current: SidebarGroup): SidebarGroup[] {
  const links: SidebarGroup[] = [
    {
      text: 'Guide',
      items: [
        {
          text: 'Usage Guide',
          link: '/guide/',
        },
      ],
    },
    {
      text: 'API',
      items: [
        {
          text: 'API Reference',
          link: '/api/',
        },
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
          text: 'Roadmap',
          link: '/about/roadmap/',
        },
        {
          text: 'Team',
          link: '/about/team',
        },
      ],
    },
  ];
  links[links.findIndex((group) => group.text === current.text)] = current;
  return links;
}

const config = defineConfig({
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
    [
      'link',
      {
        rel: 'me',
        href: 'https://fosstodon.org/@faker_js',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/faker-js/faker/edit/next/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'discord', link: 'https://chat.fakerjs.dev' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 417.8 512"><path d="M417.8 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.5-28.4-290.4 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54-.6-4.4-.9-9-.9-13.9 85.6 20.9 158.6 9.1 178.7 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6V190.1c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H75.1c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"/></svg>',
        },
        link: 'https://fosstodon.org/@faker_js',
      },
      { icon: 'twitter', link: 'https://twitter.com/faker_js' },
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
      { text: 'Guide', activeMatch: `^/guide/`, link: '/guide/' },
      {
        text: 'API',
        activeMatch: `^/api/`,
        link: '/api/',
      },
      {
        text: 'Ecosystem',
        items: [{ text: 'StackBlitz ', link: 'https://fakerjs.dev/new' }],
      },
      {
        text: 'About',
        activeMatch: `^/about/`,
        items: [
          {
            text: 'Announcements',
            link: '/about/announcements',
          },
          {
            text: 'Roadmap',
            link: '/about/roadmap/',
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
      '/guide/': extendSideNav({
        text: 'Guide',
        items: [
          {
            text: 'Getting Started',
            link: '/guide/',
          },
          {
            text: 'Usage',
            link: '/guide/usage',
          },
          {
            text: 'Localization',
            link: '/guide/localization',
          },
          {
            text: 'Frameworks',
            link: '/guide/frameworks',
          },
          {
            text: 'Upgrading to v8',
            link: '/guide/upgrading',
          },
        ],
      }),
      '/api/': extendSideNav({
        text: 'API',
        items: apiPages,
      }),

      '/about/': extendSideNav({
        text: 'About',
        items: [
          {
            text: 'Announcements',
            link: '/about/announcements',
            items: [
              { text: '2022-09-08', link: '/about/announcements/2022-09-08' },
              { text: '2022-01-14', link: '/about/announcements/2022-01-14' },
            ],
          },
          {
            text: 'Roadmap',
            link: '/about/roadmap/',
            items: [
              { text: 'v8 - Make Faker Handier', link: '/about/roadmap/v8' },
              {
                text: 'v7 - Cleanup & Improvements',
                link: '/about/roadmap/v7',
              },
              { text: 'v6 - Continue Faker', link: '/about/roadmap/v6' },
            ],
          },
          {
            text: 'Team',
            link: '/about/team',
          },
        ],
      }),
    },
  },

  vite: {
    define: {
      __BANNER__: versionBannerInfix ?? false,
    },
  },
});

if (versionBannerInfix) {
  config.head?.push([
    'script',
    { id: 'restore-banner-preference' },
    `
(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key);
    if (saved ? saved !== 'false' && new Date() < saved : def) {
      document.documentElement.classList.add(cls);
    }
  };
  restore('faker-version-banner', 'banner-dismissed');
})();`,
  ]);
}

export default config;
