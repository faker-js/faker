import { describe, expect, it, vi } from 'vitest';
import type { FakerConfig } from '../src/config';
import { createFakerCore } from '../src/core';
import type { LocaleDefinition } from '../src/definitions/definitions';
import { createLocaleProxy } from '../src/internal/locale-proxy';
import type { Randomizer } from '../src/randomizer';
import { generateMersenne53Randomizer } from '../src/utils/mersenne';

describe('createFakerCore', () => {
  describe('locale', () => {
    it('should handle missing options', () => {
      const actual = createFakerCore();

      expect(actual.locale).toEqual({});
    });

    it('should handle empty options', () => {
      const actual = createFakerCore({});

      expect(actual.locale).toEqual({});
    });

    it('should handle undefined locale options', () => {
      const actual = createFakerCore({ locale: undefined });

      expect(actual.locale).toEqual({});
    });

    it('should handle empty locale array', () => {
      const actual = createFakerCore({ locale: [] });

      expect(actual.locale).toEqual({});
    });

    it('should handle single locale', () => {
      const locale: LocaleDefinition = { test: { test: 'test' } };
      const actual = createFakerCore({ locale });

      expect(actual.locale).toEqual(locale);
    });

    it('should handle multiple locales', () => {
      const locale1: LocaleDefinition = { test1: { test: 'test1' } };
      const locale2: LocaleDefinition = { test2: { test: 'test2' } };
      const actual = createFakerCore({ locale: [locale1, locale2] });

      expect(actual.locale).toEqual({ ...locale1, ...locale2 });
    });

    it('should handle LocaleProxy', () => {
      const locale: LocaleDefinition = { test1: { test: 'test1' } };
      const proxy = createLocaleProxy(locale);
      const actual = createFakerCore({ locale: proxy });

      expect(actual.locale).toBe(proxy);
      expect(actual.locale).toEqual(locale);
      expect(actual.locale.raw).toBe(locale);
    });
  });

  describe('randomizer', () => {
    it('should handle missing options', () => {
      const actual = createFakerCore();

      expect(actual.randomizer).toBeDefined();
    });

    it('should handle undefined randomizer options', () => {
      const actual = createFakerCore({ randomizer: undefined });

      expect(actual.randomizer).toBeDefined();
    });

    it('should use provided randomizer', () => {
      const randomizer: Randomizer = { next: () => 0, seed: () => {} };
      const actual = createFakerCore({ randomizer });

      expect(actual.randomizer).toBe(randomizer);
    });
  });

  describe('config', () => {
    it('should handle missing options', () => {
      const actual = createFakerCore();

      expect(actual.config).toEqual({});
    });

    it('should handle undefined config options', () => {
      const actual = createFakerCore({ config: undefined });

      expect(actual.config).toEqual({});
    });

    it('should use provided config', () => {
      const config: FakerConfig = {
        defaultRefDate: () => new Date('2020-01-01'),
      };
      const actual = createFakerCore({ config });

      expect(actual.config).toBe(config);
    });
  });

  describe('seed', () => {
    it('should not re-seed when only randomizer is provided', () => {
      const randomizer = generateMersenne53Randomizer(0);

      const spy = vi.spyOn(randomizer, 'seed');

      const actual = createFakerCore({ randomizer });

      expect(spy).not.toHaveBeenCalled();
      expect(actual.randomizer.next()).toBe(0.5488135039273248);
    });

    it('should seed when only seed is provided', () => {
      const actual = createFakerCore({ seed: 123 });

      expect(actual.randomizer.next()).toBe(0.6964691855978616);
    });

    it('should re-seed when both are provided', () => {
      const randomizer = generateMersenne53Randomizer(0);

      const spy = vi.spyOn(randomizer, 'seed');

      const actual = createFakerCore({ randomizer, seed: 123 });

      expect(spy).toHaveBeenCalledWith(123);
      expect(actual.randomizer.next()).toBe(0.6964691855978616);
    });
  });
});
