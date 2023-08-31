import { describe, expect, it } from 'vitest';
import Twister from '../../../src/internal/mersenne/twister';
import { TWISTER_CO_MAX_VALUE } from './mersenne-test-utils';

function newTwister(seed: number = Math.random() * Number.MAX_SAFE_INTEGER) {
  const twister = new Twister();
  twister.initGenrand(seed);
  return twister;
}

describe('Twister', () => {
  describe('genrandInt32', () => {
    it.todo('should be able to return 0', () => {
      const twister = newTwister(42);
      const actual = twister.genrandInt32();
      expect(actual).toBe(0);
    });

    it('should be able to return 2^32-1', () => {
      const twister = newTwister(2855577693);
      const actual = twister.genrandInt32();
      expect(actual).toBe(2 ** 32 - 1);
    });
  });

  describe('genrandInt53', () => {
    it('should be able to return 0', () => {
      const twister = newTwister();
      twister.genrandInt32 = () => 0;
      const actual = twister.genrandInt53();
      expect(actual).toBe(0);
    });

    it('should be able to return 2^53-1', () => {
      const twister = newTwister();
      twister.genrandInt32 = () => 2 ** 32 - 1;
      const actual = twister.genrandInt53();
      expect(actual).toBe(2 ** 53 - 1);
    });
  });

  describe('genrandRes53CC', () => {
    it('should be able to return 0', () => {
      const twister = newTwister();
      twister.genrandInt53 = () => 0;
      const actual = twister.genrandRes53CC();
      expect(actual).toBe(0);
    });

    it('should be able to return 1', () => {
      const twister = newTwister();
      twister.genrandInt53 = () => 2 ** 53 - 1;
      const actual = twister.genrandRes53CC();
      expect(actual).toBe(1);
    });
  });

  describe('genrandRes53CO', () => {
    it('should be able to return 0', () => {
      const twister = newTwister();
      twister.genrandInt53 = () => 0;
      const actual = twister.genrandRes53CO();
      expect(actual).toBe(0);
    });

    it('should be able to return 1', () => {
      const twister = newTwister();
      twister.genrandInt53 = () => 2 ** 53 - 1;
      const actual = twister.genrandRes53CO();
      expect(actual).toBe(TWISTER_CO_MAX_VALUE);
    });
  });
});
