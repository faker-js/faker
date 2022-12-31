import * as semver from 'semver';
import { describe, expect, it } from 'vitest';
import { oldVersions } from '../../docs/.vitepress/versions';

describe('docs versions', () => {
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
