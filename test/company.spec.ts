import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('company', () => {
  describe('companyName()', () => {
    it('sometimes returns three last names', () => {
      const spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(2);

      const name = faker.company.companyName();
      const parts = name.split(' ');

      expect(parts.length).toBe(4); // account for word 'and'
      expect(spy_name_lastName).toHaveBeenCalledTimes(3);

      spy_datatype_number.mockRestore();
      spy_name_lastName.mockRestore();
    });

    it('sometimes returns two last names separated by a hyphen', () => {
      const spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(1);

      const name = faker.company.companyName();
      const parts = name.split('-');

      expect(parts.length).greaterThanOrEqual(2);
      expect(spy_name_lastName).toHaveBeenCalledTimes(2);

      spy_datatype_number.mockRestore();
      spy_name_lastName.mockRestore();
    });

    it('sometimes returns a last name with a company suffix', () => {
      const spy_company_companySuffix = vi.spyOn(
        faker.company,
        'companySuffix'
      );
      const spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(0);

      const name = faker.company.companyName();
      const parts = name.split(' ');

      expect(parts.length).greaterThanOrEqual(2);
      expect(spy_name_lastName).toHaveBeenCalledOnce();
      expect(spy_company_companySuffix).toHaveBeenCalledOnce();

      spy_datatype_number.mockRestore();
      spy_name_lastName.mockRestore();
      spy_company_companySuffix.mockRestore();
    });
  });

  describe('companySuffix()', () => {
    it('returns random value from company.suffixes array', () => {
      const suffix = faker.company.companySuffix();
      expect(faker.company.suffixes()).toContain(suffix);
    });
  });

  describe('catchPhrase()', () => {
    it('returns phrase comprising of a catch phrase adjective, descriptor, and noun', () => {
      const spy_random_arrayElement = vi.spyOn(faker.random, 'arrayElement');
      const spy_company_catchPhraseAdjective = vi.spyOn(
        faker.company,
        'catchPhraseAdjective'
      );
      const spy_company_catchPhraseDescriptor = vi.spyOn(
        faker.company,
        'catchPhraseDescriptor'
      );
      const spy_company_catchPhraseNoun = vi.spyOn(
        faker.company,
        'catchPhraseNoun'
      );

      const phrase = faker.company.catchPhrase();

      expect(phrase.split(' ').length).greaterThanOrEqual(3);
      expect(spy_random_arrayElement).toHaveBeenCalledTimes(3);
      expect(spy_company_catchPhraseAdjective).toHaveBeenCalledOnce();
      expect(spy_company_catchPhraseDescriptor).toHaveBeenCalledOnce();
      expect(spy_company_catchPhraseNoun).toHaveBeenCalledOnce();

      spy_random_arrayElement.mockRestore();
      spy_company_catchPhraseAdjective.mockRestore();
      spy_company_catchPhraseDescriptor.mockRestore();
      spy_company_catchPhraseNoun.mockRestore();
    });
  });

  describe('bs()', () => {
    it('returns phrase comprising of a BS buzz, adjective, and noun', () => {
      const spy_random_arrayElement = vi.spyOn(faker.random, 'arrayElement');
      const spy_company_bsBuzz = vi.spyOn(faker.company, 'bsBuzz');
      const spy_company_bsAdjective = vi.spyOn(faker.company, 'bsAdjective');
      const spy_company_bsNoun = vi.spyOn(faker.company, 'bsNoun');

      const bs = faker.company.bs();

      expect(typeof bs).toBe('string');
      expect(spy_random_arrayElement).toHaveBeenCalledTimes(3);
      expect(spy_company_bsBuzz).toHaveBeenCalledOnce();
      expect(spy_company_bsAdjective).toHaveBeenCalledOnce();
      expect(spy_company_bsNoun).toHaveBeenCalledOnce();

      spy_random_arrayElement.mockRestore();
      spy_company_bsBuzz.mockRestore();
      spy_company_bsAdjective.mockRestore();
      spy_company_bsNoun.mockRestore();
    });
  });
});
