import { execSync } from 'node:child_process';
import * as semver from 'semver';
import { version } from '../../package.json';

export const NEXT_TEXT = 'next';

function pickLatest(version1: string, version2: string): string {
  return semver.compare(version1, version2) > 0 ? version1 : version2;
}

function readBranchName(): string {
  try {
    return (
      execSync('git branch --show-current').toString('utf8').trim() || NEXT_TEXT
    );
  } catch (e) {
    console.error('Failed to read branch name', e);
    return NEXT_TEXT;
  }
}

function readOtherLatestReleaseTagNames(): string[] {
  const currentMajorVersion = semver.major(version);
  try {
    const latestReleaseTagNames = execSync('git tag -l')
      .toString('utf8')
      .split('\n')
      .filter((tagName) => tagName.startsWith('v'))
      .reduce<Record<string, string>>((acc, tag) => {
        const majorVersion = semver.major(tag);
        if (
          // Only consider tags that are version tags
          !isNaN(majorVersion) &&
          // and that are created after we took the project over
          majorVersion >= 6 &&
          // and that are not the current version (because we are already on that branch)
          // also ignore later version, to avoid changing the deployed version list
          majorVersion < currentMajorVersion
        ) {
          if (/\d{2,}/.test(tag)) {
            // if this happens, we have to update the version compare logic
            throw new Error(`Unsupported tag name: ${tag}`);
          }
          acc[`v${majorVersion}`] = pickLatest(acc[majorVersion] || tag, tag);
        }
        return acc;
      }, {});
    return Object.values(latestReleaseTagNames).sort(semver.rcompare);
  } catch (e) {
    console.error('Failed to read tags', e);
    return [];
  }
}

const branchName = readBranchName();
const isNext = !/^v\d+$/.test(branchName);
const nextVersion = { version: NEXT_TEXT, link: 'https://next.fakerjs.dev/' };
const latestVersion = { version: `v${version}`, link: 'https://fakerjs.dev/' };
const otherVersions = readOtherLatestReleaseTagNames();

export const currentVersion = isNext ? NEXT_TEXT : `v${version}`;
export const oldVersions = [
  isNext ? latestVersion : nextVersion,
  ...otherVersions.map((version) => ({
    version,
    link: `https://v${semver.major(version)}.fakerjs.dev/`,
  })),
];

console.log(oldVersions);
