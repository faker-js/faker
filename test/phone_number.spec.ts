import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('phone_number.js', () => {
  describe('phoneNumber()', () => {
    it('returns a random phoneNumber with a random format', () => {
      const spy_helpers_replaceSymbolWithNumber = vi.spyOn(
        faker.helpers,
        'replaceSymbolWithNumber'
      );

      const phone_number = faker.phone.phoneNumber();

      expect(phone_number).match(/\d/);
      expect(spy_helpers_replaceSymbolWithNumber).toHaveBeenCalled();

      spy_helpers_replaceSymbolWithNumber.mockRestore();
    });
  });

  describe('phoneNumberFormat()', () => {
    it('returns phone number with requested format (Array index)', () => {
      faker.locale = 'en';
      for (let i = 0; i < 10; i++) {
        const phone_number = faker.phone.phoneNumberFormat(1);
        expect(phone_number).match(/\(\d\d\d\) \d\d\d-\d\d\d\d/);
      }
    });

    it('returns phone number with proper format US (Array index)', () => {
      faker.locale = 'en';
      for (let i = 0; i < 25; i++) {
        const phone_number = faker.phone.phoneNumberFormat(1);
        console.log(phone_number);
        expect(phone_number).match(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/);
      }
    });

    it('returns phone number with proper format CA (Array index)', () => {
      faker.locale = 'en_CA';
      for (let i = 0; i < 25; i++) {
        const phone_number = faker.phone.phoneNumberFormat(1);
        expect(phone_number).match(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/);
      }
    });
  });
});
