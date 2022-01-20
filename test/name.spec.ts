import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../lib';

function assertInArray(value, array) {
  const idx = array.indexOf(value);
  expect(idx).not.toBe(1);
}

describe('name', () => {
  describe('firstName()', () => {
    it('returns a random name', () => {
      const spy_name_firstName = vi
        .spyOn(faker.name, 'firstName')
        .mockReturnValue('foo');

      const first_name = faker.name.firstName();

      expect(first_name).toBe('foo');

      spy_name_firstName.mockRestore();
    });

    it('returns a gender-specific name when passed a number', () => {
      for (let q = 0; q < 30; q++) {
        const gender = Math.floor(Math.random() * 2);
        const name = faker.name.firstName(gender);
        if (gender === 0) {
          assertInArray(name, faker.definitions.name.male_first_name);
        } else {
          assertInArray(name, faker.definitions.name.female_first_name);
        }
      }
    });

    it('returns a gender-specific name when passed a string', () => {
      for (let q = 0; q < 30; q++) {
        const gender = Math.floor(Math.random() * 2);
        const genderString = gender === 0 ? 'male' : 'female';
        const name = faker.name.firstName(genderString);
        assertInArray(
          name,
          faker.definitions.name[genderString + '_first_name']
        );
      }
    });
  });

  describe('lastName()', () => {
    it('returns a random name', () => {
      const spy_name_lastName = vi
        .spyOn(faker.name, 'lastName')
        .mockReturnValue('foo');

      const last_name = faker.name.lastName();

      expect(last_name).toBe('foo');

      spy_name_lastName.mockRestore();
    });
  });

  describe('middleName()', () => {
    it('returns a random middle name', () => {
      const spy_name_middleName = vi
        .spyOn(faker.name, 'middleName')
        .mockReturnValue('foo');

      const middle_name = faker.name.middleName();

      expect(middle_name).toBe('foo');

      spy_name_middleName.mockRestore();
    });

    describe('when using a locale with gender specific middle names', () => {
      let oldLocale: string;

      beforeEach(() => {
        oldLocale = faker.locale;
        faker.locale = 'TEST';

        // @ts-expect-error
        faker.locales.TEST = {
          name: {
            male_middle_name: ['Genaddiesvich'],
            female_middle_name: ['Genaddievna'],
          },
        };
      });

      afterEach(() => {
        faker.locale = oldLocale;
        // @ts-expect-error
        delete faker.locale.TEST;
      });

      it('returns male prefix', () => {
        const middle_name = faker.name.middleName(0);

        expect(middle_name).toBe('Genaddiesvich');
      });

      it('returns female prefix', () => {
        const middle_name = faker.name.middleName(1);

        expect(middle_name).toBe('Genaddievna');
      });
    });
  });

  describe('findName()', () => {
    it('usually returns a first name and last name', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(5);

      const name = faker.name.findName();

      expect(name).toBeTruthy();

      const parts = name.split(' ');

      expect(parts).toHaveLength(2);

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns a first name and last name with a prefix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(0);

      const name = faker.name.findName();
      const parts = name.split(' ');

      expect(parts.length).greaterThanOrEqual(3);

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns a male full name with a prefix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation((opt) =>
          opt === 8
            ? 0 // with prefix
            : opt === 1
            ? 0 // gender male
            : undefined
        );

      const spy_name_prefix = vi
        .spyOn(faker.name, 'prefix')
        .mockImplementation((arg) => (arg === 0 ? 'X' : undefined));
      const spy_name_firstName = vi
        .spyOn(faker.name, 'firstName')
        .mockImplementation((arg) => (arg === 0 ? 'Y' : undefined));
      const spy_name_lastName = vi
        .spyOn(faker.name, 'lastName')
        .mockImplementation((arg) => (arg === 0 ? 'Z' : undefined));

      const name = faker.name.findName();

      expect(name).toBe('X Y Z');

      spy_datatype_number.mockRestore();
      spy_name_prefix.mockRestore();
      spy_name_firstName.mockRestore();
      spy_name_lastName.mockRestore();
    });

    it('occasionally returns a female full name with a prefix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation((opt) =>
          opt === 8
            ? 0 // with prefix
            : opt === 1
            ? 1 // gender female
            : undefined
        );

      const spy_name_prefix = vi
        .spyOn(faker.name, 'prefix')
        .mockImplementation((arg) => (arg === 1 ? 'J' : undefined));
      const spy_name_firstName = vi
        .spyOn(faker.name, 'firstName')
        .mockImplementation((arg) => (arg === 1 ? 'K' : undefined));
      const spy_name_lastName = vi
        .spyOn(faker.name, 'lastName')
        .mockImplementation((arg) => (arg === 1 ? 'L' : undefined));

      const name = faker.name.findName();

      expect(name).toBe('J K L');

      spy_datatype_number.mockRestore();
      spy_name_prefix.mockRestore();
      spy_name_firstName.mockRestore();
      spy_name_lastName.mockRestore();
    });

    it('occasionally returns a first name and last name with a suffix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(1);
      const spy_name_suffix = vi
        .spyOn(faker.name, 'suffix')
        .mockReturnValue('Jr.');

      const name = faker.name.findName();
      const parts = name.split(' ');

      expect(parts.length).greaterThanOrEqual(3);
      expect(parts[parts.length - 1]).toBe('Jr.');

      spy_name_suffix.mockRestore();
      spy_datatype_number.mockRestore();
    });

    it.todo(
      'needs to work with specific locales and respect the fallbacks',
      () => {
        faker.locale = 'en_US';
        // this will throw if this is broken
        const name = faker.name.findName();
        // TODO @Shinigami92 2022-01-20: This test doesn't check anything
      }
    );
  });

  describe('title()', () => {
    it('returns a random title', () => {
      const spy_name_title = vi
        .spyOn(faker.name, 'title')
        .mockReturnValue('Lead Solutions Supervisor');

      const title = faker.name.title();

      expect(title).toBe('Lead Solutions Supervisor');

      spy_name_title.mockRestore();
    });
  });

  describe('jobTitle()', () => {
    it('returns a job title consisting of a descriptor, area, and type', () => {
      const spy_random_arrayElement = vi.spyOn(faker.random, 'arrayElement');
      const spy_name_jobDescriptor = vi.spyOn(faker.name, 'jobDescriptor');
      const spy_name_jobArea = vi.spyOn(faker.name, 'jobArea');
      const spy_name_jobType = vi.spyOn(faker.name, 'jobType');

      const jobTitle = faker.name.jobTitle();

      expect(typeof jobTitle).toBe('string');
      expect(spy_random_arrayElement).toHaveBeenCalledTimes(3);
      expect(spy_name_jobDescriptor).toHaveBeenCalledOnce();
      expect(spy_name_jobArea).toHaveBeenCalledOnce();
      expect(spy_name_jobType).toHaveBeenCalledOnce();

      spy_random_arrayElement.mockRestore();
      spy_name_jobDescriptor.mockRestore();
      spy_name_jobArea.mockRestore();
      spy_name_jobType.mockRestore();
    });
  });

  describe('prefix()', () => {
    describe('when using a locale with gender specific name prefixes', () => {
      let oldLocale: string;

      beforeEach(() => {
        oldLocale = faker.locale;
        faker.locale = 'TEST';

        // @ts-expect-error
        faker.locales.TEST = {
          name: {
            male_prefix: ['Mp'],
            female_prefix: ['Fp'],
          },
        };
      });

      afterEach(() => {
        faker.locale = oldLocale;
        // @ts-expect-error
        delete faker.locale.TEST;
      });

      it('returns male prefix', () => {
        const prefix = faker.name.prefix(0);
        expect(prefix).toBe('Mp');
      });

      it('returns female prefix', () => {
        const prefix = faker.name.prefix(1);
        expect(prefix).toBe('Fp');
      });

      it('returns either prefix', () => {
        const prefix = faker.name.prefix();
        expect(['Mp', 'Fp']).toContain(prefix);
      });
    });

    describe('when using a locale without gender specific name prefixes', () => {
      let oldLocale: string;

      beforeEach(() => {
        oldLocale = faker.locale;
        faker.locale = 'TEST';

        // @ts-expect-error
        faker.locales.TEST = {
          name: {
            prefix: ['P'],
          },
        };
      });

      afterEach(() => {
        faker.locale = oldLocale;
        // @ts-expect-error
        delete faker.locale.TEST;
      });

      it('returns a prefix', () => {
        const prefix = faker.name.prefix();

        expect(prefix).toBe('P');
      });
    });
  });
});
