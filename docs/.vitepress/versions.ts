import { execSync } from 'node:child_process';
import * as semver from 'semver';
import { version } from '../../package.json';

function readBranchName(): string {
  return (
    execSync('git branch --show-current').toString('utf8').trim() || 'unknown'
  );
}

function readOtherLatestReleaseTagNames(): string[] {
  const latestReleaseTagNames = execSync('git tag -l')
    .toString('utf8')
    .split('\n')
    .filter((tag) => semver.valid(tag))
    // Only consider tags for our deployed website versions
    .filter((tag) => semver.major(tag) >= 6)
    // Find the latest tag for each major version
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce<Record<number, string>>((latestTagByMajor, tag) => {
      const majorVersion = semver.major(tag);

      const latestTag = latestTagByMajor[majorVersion];
      if (latestTag == null || semver.lt(latestTag, tag)) {
        latestTagByMajor[majorVersion] = tag;
      }

      return latestTagByMajor;
    }, {});
  return Object.values(latestReleaseTagNames).sort(semver.rcompare);
}

// Set by netlify
const {
  CONTEXT: deployContext = 'local',
  BRANCH: branchName = readBranchName(),
} = process.env;

const otherVersions = readOtherLatestReleaseTagNames();
const isReleaseBranch = /^v\d+$/.test(branchName);

export const versionBannerInfix: string | null = (() => {
  if (deployContext === 'production') {
    return null;
  }

  if (isReleaseBranch) {
    return '"an old version"';
  }

  if (branchName === 'next') {
    return '"the next (unreleased) version"';
  }

  return '"a development version"';
})();

export const currentVersion = isReleaseBranch ? `v${version}` : branchName;
export const versionLinks = [
  {
    version: 'next',
    link: 'https://next.fakerjs.dev/',
  },
  ...otherVersions.map((version) => ({
    version,
    link: `https://v${semver.major(version)}.fakerjs.dev/`,
  })),
]
  // Don't link to the current branch's version.
  .filter(({ link }) => link !== `https://${branchName}.fakerjs.dev/`);

export const algoliaIndex = isReleaseBranch
  ? `fakerjs-v${semver.major(version)}`
  : 'fakerjs-next';
