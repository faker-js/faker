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
  ],

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/faker-js/faker/edit/next/docs/:path',
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
            text: 'Upgrading to v7',
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
      __BANNER__: versionBannerInfix()?.version ?? false,
    },
  },
});

if (versionBannerInfix()?.id) {
  config.head?.push([
    'script',
    { id: 'restore-banner-preference' },
    `
(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key);
    if (saved ? saved !== 'false' : def) {
      document.documentElement.classList.add(cls);
    }
  };
  window.__FAKER_BANNER_ID__ = '${versionBannerInfix().id}';
  restore(\`faker-banner-\${__FAKER_BANNER_ID__}\`, 'banner-dismissed');
})();`,
  ]);
}

export default config;
