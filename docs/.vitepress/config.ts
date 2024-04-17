import type { UserConfig } from 'vitepress';
import type { DefaultTheme } from 'vitepress/theme';
import { apiPages } from './api-pages';
import {
  algoliaIndex,
  currentVersion,
  oldVersions,
  versionBannerInfix,
} from './versions';

type SidebarItem = DefaultTheme.SidebarItem;

const description =
  'Generate massive amounts of fake (but reasonable) data for testing and development.';
const image = 'https://fakerjs.dev/social-image.png';

function extendSideNav(current: SidebarItem): SidebarItem[] {
  const links: SidebarItem[] = [
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
        {
          text: 'Contributing',
          link: '/about/contributing',
        },
      ],
    },
  ];
  links[links.findIndex((group) => group.text === current.text)] = current;
  return links;
}

// TODO @Shinigami92 2023-12-28: reuse `defineConfig` from vitepress, when we can go esm-only
const config: UserConfig<DefaultTheme.Config> = {
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
      { icon: 'mastodon', link: 'https://fosstodon.org/@faker_js' },
      { icon: 'x', link: 'https://twitter.com/faker_js' },
      { icon: 'github', link: 'https://github.com/faker-js/faker' },
      {
        icon: {
          svg: '<svg role="img" width="14px" height="14px" viewBox="0 0 14 14"><title>Open Collective</title><path d="M 7,1 C 3.6862915,1 1,3.686292 1,7 c 0,3.313708 2.6862915,6 6,6 1.2698255,0 2.4472377,-0.394558 3.416941,-1.06764 L 8.8632814,10.378084 C 8.3110136,10.683293 7.6756458,10.857319 7,10.857319 4.8697587,10.857319 3.1426809,9.130241 3.1426809,7 3.1426809,4.869759 4.8697587,3.142681 7,3.142681 c 0.6756458,0 1.3110136,0.174026 1.8632814,0.479235 L 10.416941,2.06764 C 9.4472377,1.394558 8.2698255,1 7,1 Z m 4.93236,2.583059 -1.554276,1.55366 c 0.267058,0.483234 0.433793,1.029899 0.471217,1.611636 0.0053,0.08311 0.008,0.167189 0.008,0.251645 0,0.675646 -0.174026,1.311014 -0.479235,1.863281 l 1.554276,1.55366 C 12.605442,9.447238 13,8.269825 13,7 13,5.730175 12.605442,4.552762 11.93236,3.583059 Z"/></svg>',
        },
        link: 'https://opencollective.com/fakerjs',
        ariaLabel: 'Open Collective',
      },
    ],

    algolia:
      process.env.API_KEY == null || process.env.APP_ID == null
        ? undefined
        : {
            apiKey: process.env.API_KEY,
            appId: process.env.APP_ID,
            indexName: algoliaIndex,
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
        text: 'Try it',
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
          {
            text: 'Contributing',
            link: '/about/contributing',
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
            text: 'Randomizer',
            link: '/guide/randomizer',
          },
          {
            text: 'Unique Values',
            link: '/guide/unique',
          },
          {
            text: 'Upgrading to v9',
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
              {
                text: 'v9 - Tree-Shakeable Module-Functions',
                link: '/about/roadmap/v9',
              },
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
          {
            text: 'Contributing',
            link: '/about/contributing',
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
};

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
