import { version } from '../../package.json';

const isNext = true;

export const currentVersion = isNext ? 'Next' : `v${version}`;

const latestVersion = { version: `v${version}`, link: 'https://fakerjs.dev/' };

export const oldVersions = [
  ...(isNext ? [latestVersion] : []),
  { version: 'v6.3.1', link: 'https://v6.fakerjs.dev/' },
];
