import { execSync } from 'child_process';
import { version } from '../../package.json';

const NEXT_TEXT = 'Next';

function readBranchName() {
  try {
    return execSync('git branch --show-current').toString('utf8') || NEXT_TEXT;
  } catch {
    return NEXT_TEXT;
  }
}

const branchName = readBranchName();
const isNext = !branchName.match(/^v\d+$/);

export const currentVersion = isNext ? NEXT_TEXT : `v${version}`;

const nextVersion = { version: NEXT_TEXT, link: 'https://next.fakerjs.dev/' };
const latestVersion = { version: `v${version}`, link: 'https://fakerjs.dev/' };

export const oldVersions = [
  isNext ? latestVersion : nextVersion,
  { version: 'v6.3.1', link: 'https://v6.fakerjs.dev/' },
];
