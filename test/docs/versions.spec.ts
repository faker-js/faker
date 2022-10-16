import { describe, expect, it } from 'vitest';
import {
  currentVersion,
  extractMajorVersionNumber,
  oldVersions,
  pickLatest,
} from '../../docs/.vitepress/versions';
import { version } from '../../package.json';

describe('docs versions', () => {
  describe('extractMajorVersionNumber', () => {
    it('should extract major version number', () => {
      expect(extractMajorVersionNumber('v6.0.0')).toBe(6);
      expect(extractMajorVersionNumber('v6.0.0-beta.1')).toBe(6);
      expect(extractMajorVersionNumber('V6.0.0')).toBeNaN();
      expect(extractMajorVersionNumber('Very.Important.Tag')).toBeNaN();
    });
  });

  describe('pickLatest', () => {
    it('should pick the latest version', () => {
      // Same versions
      expect(pickLatest('v6.0.0', 'v6.0.0')).toBe('v6.0.0');
      expect(pickLatest('v6.0.0-alpha.0', 'v6.0.0-alpha.0')).toBe(
        'v6.0.0-alpha.0'
      );
      // Major versions
      expect(pickLatest('v6.0.0', 'v7.0.0')).toBe('v7.0.0');
      expect(pickLatest('v7.0.0', 'v6.0.0')).toBe('v7.0.0');
      // Minor versions
      expect(pickLatest('v6.0.0', 'v6.1.0')).toBe('v6.1.0');
      expect(pickLatest('v6.1.0', 'v6.0.0')).toBe('v6.1.0');
      // Patch versions
      expect(pickLatest('v6.0.0', 'v6.0.1')).toBe('v6.0.1');
      expect(pickLatest('v6.0.1', 'v6.0.0')).toBe('v6.0.1');
      // Tag
      expect(pickLatest('v6.0.0', 'v6.0.0-alpha.0')).toBe('v6.0.0');
      expect(pickLatest('v6.0.0-alpha.0', 'v6.0.0')).toBe('v6.0.0');
      expect(pickLatest('v6.0.0-alpha.0', 'v6.0.0-alpha.1')).toBe(
        'v6.0.0-alpha.1'
      );
      expect(pickLatest('v6.0.0-alpha.1', 'v6.0.0-alpha.0')).toBe(
        'v6.0.0-alpha.1'
      );
      expect(pickLatest('v6.0.0-alpha.0', 'v6.0.0-beta.0')).toBe(
        'v6.0.0-beta.0'
      );
      expect(pickLatest('v6.0.0-beta.0', 'v6.0.0-alpha.0')).toBe(
        'v6.0.0-beta.0'
      );
      // Vastly different versions
      expect(pickLatest('v7.0.0', 'v6.0.0-alpha.1')).toBe('v7.0.0');
      expect(pickLatest('v7.0.0-alpha.1', 'v6.0.0')).toBe('v7.0.0-alpha.1');
      expect(pickLatest('v7.0.0-alpha.1', 'v6.0.0-beta.3')).toBe(
        'v7.0.0-alpha.1'
      );
    });
  });

  describe('oldVersions', () => {
    it('should have a complete set of oldVersions', () => {
      const versionText = `v${version}`;

      expect(oldVersions.length).toBeGreaterThanOrEqual(2);
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
        expect(oldVersions[0]).toEqual({
          version: 'Next',
          link: 'https://next.fakerjs.dev/',
        });

        for (let i = 1; i < oldVersions.length; i++) {
          const entry = oldVersions[i];
          const oldMajorVersion = extractMajorVersionNumber(entry.version);
          expect(oldMajorVersion).toBe(currentMajorVersion - i);
          expect(entry.link).toMatch(/https:\/\/v\d+\.fakerjs\.dev/);
        }
      }
    });
  });
});
