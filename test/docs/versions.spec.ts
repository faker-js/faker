import { execSync } from 'node:child_process';
import * as semver from 'semver';
import { describe, expect, it } from 'vitest';
import { versionLinks } from '../../docs/.vitepress/versions';

function isFakerOrigin(): boolean {
  try {
    const originUrl = execSync('git remote get-url origin')
      .toString('utf8')
      .trim();
    return (
      originUrl === 'git@github.com:faker-js/faker' ||
      originUrl === 'git@github.com:faker-js/faker.git' ||
      originUrl === 'https://github.com/faker-js/faker' ||
      originUrl === 'https://github.com/faker-js/faker.git'
    );
  } catch {
    return false;
  }
}

describe.runIf(isFakerOrigin())('docs versions', () => {
  describe('oldVersions', () => {
    it('should have a complete set of oldVersions', () => {
      expect(versionLinks.length).toBeGreaterThanOrEqual(1);

      const versionEntry = versionLinks[0];
      if (versionEntry.version === 'next') {
        expect(versionEntry.link).toBe('https://next.fakerjs.dev/');
      }

      const releaseVersions = versionLinks.filter(({ version }) =>
        semver.valid(version)
      );
      const latestMajorRelease = semver.major(releaseVersions[0].version);
      for (const [index, value] of releaseVersions.entries()) {
        const { version, link } = value;
        const oldMajorVersion = semver.major(version);
        expect(oldMajorVersion).toBe(latestMajorRelease - index);
        expect(link).toBe(`https://v${oldMajorVersion}.fakerjs.dev/`);
      }
    });
  });
});
