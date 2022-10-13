import { describe, expect, it } from 'vitest';
import { currentVersion, oldVersions } from '../../docs/.vitepress/versions';
import { version } from '../../package.json';

function extractMajorVersionNumber(version: string): number {
  return Number(version.split('.')[0].substring(1));
}

describe('docs versions', () => {
  it('should have a complete set of oldVersions', () => {
    const versionText = `v${version}`;

    expect(oldVersions.length).toBeGreaterThanOrEqual(1);
    const currentMajorVersion = extractMajorVersionNumber(versionText);

    if (currentVersion === 'Next') {
      expect(oldVersions[0]).toEqual({
        version: versionText,
        link: 'https://fakerjs.dev/',
      });

      for (let i = 0; i < oldVersions.length; i++) {
        const oldMajorVersion = extractMajorVersionNumber(
          oldVersions[i].version
        );
        expect(oldMajorVersion).toBe(currentMajorVersion - i);
      }
    } else {
      for (let i = 0; i < oldVersions.length; i++) {
        const oldMajorVersion = extractMajorVersionNumber(
          oldVersions[i].version
        );
        expect(oldMajorVersion).toBe(currentMajorVersion - i - 1);
      }
    }
  });
});
