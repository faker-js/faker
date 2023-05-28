import { execSync } from 'node:child_process';
import * as semver from 'semver';
import { describe, expect, it } from 'vitest';
import { oldVersions } from '../../docs/.vitepress/versions';

function isFakerOrigin(): boolean {
  try {
    const originUrl = execSync('git remote get-url origin')
      .toString('utf8')
      .trim();
    return (
      originUrl === 'git@github.com:faker-js/faker.git' ||
      originUrl === 'https://github.com/faker-js/faker.git'
    );
  } catch {
    return false;
  }
}

describe.runIf(isFakerOrigin())('docs versions', () => {
  describe('oldVersions', () => {
    it('should have a complete set of oldVersions', () => {
      expect(oldVersions.length).toBeGreaterThanOrEqual(2);

      expect(oldVersions[0]).toEqual({
        version: 'latest',
        link: 'https://fakerjs.dev/',
      });

      const versionEntry = oldVersions[1];
      if (versionEntry.version === 'next') {
        expect(versionEntry.link).toBe('https://next.fakerjs.dev/');
      }

      const releaseVersions = oldVersions.filter(({ version }) =>
        semver.valid(version)
      );
      const latestMajorRelease = semver.major(releaseVersions[0].version);
      for (let i = 0; i < releaseVersions.length; i++) {
        const { version, link } = releaseVersions[i];
        const oldMajorVersion = semver.major(version);
        expect(oldMajorVersion).toBe(latestMajorRelease - i);
        expect(link).toBe(`https://v${oldMajorVersion}.fakerjs.dev/`);
      }
    });
  });
});
