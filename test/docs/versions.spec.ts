import { major as semverMajor } from 'semver';
import { describe, expect, it } from 'vitest';
import { oldVersions } from '../../docs/.vitepress/versions';
import { version } from '../../package.json';

describe('docs versions', () => {
  describe('oldVersions', () => {
    it('should have a complete set of oldVersions', () => {
      const versionText = `v${version}`;

      expect(oldVersions.length).toBeGreaterThanOrEqual(2);
      const currentMajorVersion = semverMajor(versionText);

      expect(oldVersions[0]).toEqual({
        version: 'latest',
        link: 'https://fakerjs.dev/',
      });
      expect(oldVersions[1]).toEqual({
        version: 'next',
        link: 'https://next.fakerjs.dev/',
      });

      for (let i = 2; i < oldVersions.length; i++) {
        const oldMajorVersion = semverMajor(oldVersions[i].version);
        expect(oldMajorVersion).toBe(currentMajorVersion - i + 1);
      }
    });
  });
});
