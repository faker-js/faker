import { major as semverMajor } from 'semver';
import { describe, expect, it } from 'vitest';
import {
  currentVersion,
  NEXT_TEXT,
  oldVersions,
} from '../../docs/.vitepress/versions';
import { version } from '../../package.json';

describe('docs versions', () => {
  describe('oldVersions', () => {
    it('should have a complete set of oldVersions', () => {
      const versionText = `v${version}`;

      expect(oldVersions.length).toBeGreaterThanOrEqual(2);
      const currentMajorVersion = semverMajor(versionText);

      if (currentVersion === NEXT_TEXT) {
        expect(oldVersions[0]).toEqual({
          version: versionText,
          link: 'https://fakerjs.dev/',
        });

        for (let i = 0; i < oldVersions.length; i++) {
          const oldMajorVersion = semverMajor(oldVersions[i].version);
          expect(oldMajorVersion).toBe(currentMajorVersion - i);
        }
      } else {
        expect(oldVersions[0]).toEqual({
          version: NEXT_TEXT,
          link: 'https://next.fakerjs.dev/',
        });

        for (let i = 1; i < oldVersions.length; i++) {
          const entry = oldVersions[i];
          const oldMajorVersion = semverMajor(entry.version);
          expect(oldMajorVersion).toBe(currentMajorVersion - i);
          expect(entry.link).toMatch(/https:\/\/v\d+\.fakerjs\.dev/);
        }
      }
    });
  });
});
