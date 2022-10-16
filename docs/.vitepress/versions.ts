import { execSync } from 'node:child_process';
import { version } from '../../package.json';

const NEXT_TEXT = 'Next';

export function extractMajorVersionNumber(version: string): number {
  if (version.startsWith('v')) {
    return Number(version.split('.')[0].substring(1));
  } else {
    return NaN;
  }
}

export function pickLatest(version1: string, version2: string): string {
  const parts1 = version1.split('-', 2);
  const parts2 = version2.split('-', 2);
  let compare = parts1[0].localeCompare(parts2[0]);
  if (compare === 0) {
    if (parts1.length === 1) {
      compare = 1;
    } else if (parts2.length === 1) {
      compare = -1;
    } else {
      compare = parts1[1].localeCompare(parts2[1]);
    }
  }
  return compare > 0 ? version1 : version2;
}

function readBranchName(): string {
  try {
    return execSync('git branch --show-current').toString('utf8') || NEXT_TEXT;
  } catch {
    return NEXT_TEXT;
  }
}

function readOtherLatestReleaseTagNames(): string[] {
  const currentMajorVersion = extractMajorVersionNumber(`v${version}`);
  try {
    const latestReleaseTagNames = execSync('git tag -l')
      .toString('utf8')
      .split('\n')
      .reduce<Record<string, string>>((acc, tag) => {
        const majorVersion = extractMajorVersionNumber(tag);
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
          acc[`v${majorVersion}`] = pickLatest(acc[majorVersion] || '', tag);
        }
        return acc;
      }, {});

    return Object.values(latestReleaseTagNames).sort(
      (a, b) => extractMajorVersionNumber(b) - extractMajorVersionNumber(a)
    );
  } catch {
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
    link: `https://v${extractMajorVersionNumber(version)}.fakerjs.dev/`,
  })),
];

console.log(oldVersions);
