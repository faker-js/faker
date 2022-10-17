import { execSync } from 'node:child_process';
import * as semver from 'semver';
import { version } from '../../package.json';

function readBranchName(): string {
  return (
    execSync('git branch --show-current').toString('utf8').trim() || 'unknown'
  );
}

function readOtherLatestReleaseTagNames(): string[] {
  const currentMajorVersion = semver.major(version);
  const latestReleaseTagNames = execSync('git tag -l')
    .toString('utf8')
    .split('\n')
    .filter((tag) => semver.valid(tag))
    .reduce<Record<number, string[]>>((acc, tag) => {
      const majorVersion = semver.major(tag);
      // Only consider tags for our deployed website versions,
      // excluding the current major version.
      if (majorVersion >= 6 && majorVersion !== currentMajorVersion) {
        (acc[majorVersion] = acc[majorVersion] ?? []).push(tag);
      }
      return acc;
    }, {});
  return Object.entries(latestReleaseTagNames)
    .map(([major, tags]) => semver.maxSatisfying(tags, `^${major}`))
    .sort(semver.rcompare);
}

// Set by netlify
const {
  CONTEXT: deployContext = 'local',
  BRANCH: branchName = readBranchName(),
} = process.env;

const hiddenLink =
  deployContext === 'production'
    ? 'https://fakerjs.dev/'
    : `https://${branchName}.fakerjs.dev/`;
const otherVersions = readOtherLatestReleaseTagNames();
const isReleaseBranch = /^v\d+$/.test(branchName);

export const currentVersion = isReleaseBranch ? `v${version}` : branchName;
export const oldVersions = [
  {
    version: 'latest',
    link: 'https://fakerjs.dev/',
  },
  {
    version: 'next',
    link: 'https://next.fakerjs.dev/',
  },
  ...otherVersions.map((version) => ({
    version,
    link: `https://v${semver.major(version)}.fakerjs.dev/`,
  })),
].filter(({ link }) => link !== hiddenLink);
