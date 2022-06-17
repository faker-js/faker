import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { FakerError } from '../src/errors/faker-error';

describe('fake', () => {
  describe('fake()', () => {
    it('replaces a token with a random value for a method with no parameters', () => {
      const name = faker.fake('{{phone.number}}');
      expect(name).toMatch(/\d/);
    });

    it('replaces multiple tokens with random values for methods with no parameters', () => {
      const name = faker.fake(
        '{{helpers.arrayElement}}{{helpers.arrayElement}}{{helpers.arrayElement}}'
      );
      expect(name).toMatch(/[abc]{3}/);
    });

    it('replaces a token with a random value for a methods with a simple parameter', () => {
      const random = faker.fake('{{helpers.slugify("Will This Work")}}');
      expect(random).toBe('Will-This-Work');
    });

    it('replaces a token with a random value for a method with an array parameter', () => {
      const arr = ['one', 'two', 'three'];
      const random = faker.fake(
        '{{helpers.arrayElement(["one", "two", "three"])}}'
      );
      expect(arr).toContain(random);
    });

    it('does not allow undefined parameters', () => {
      expect(() =>
        // @ts-expect-error: The parameter is required
        faker.fake()
      ).toThrowError(new FakerError('string parameter is required!'));
    });

    it('does not allow invalid module name', () => {
      expect(() => faker.fake('{{foo.bar}}')).toThrowError(
        new FakerError(`Invalid module method or definition: foo.bar
- faker.foo.bar is not a function
- faker.definitions.foo.bar is not an array`)
      );
    });

    it('does not allow missing method name', () => {
      expect(() => faker.fake('{{address}}')).toThrowError(
        new FakerError(`Invalid module method or definition: address
- faker.address is not a function
- faker.definitions.address is not an array`)
      );
    });

    it('does not allow invalid method name', () => {
      expect(() => faker.fake('{{address.foo}}')).toThrowError(
        new FakerError(`Invalid module method or definition: address.foo
- faker.address.foo is not a function
- faker.definitions.address.foo is not an array`)
      );
    });

    it('does not allow invalid definitions data', () => {
      expect(() => faker.fake('{{finance.credit_card}}')).toThrowError(
        new FakerError(`Invalid module method or definition: finance.credit_card
- faker.finance.credit_card is not a function
- faker.definitions.finance.credit_card is not an array`)
      );
    });

    it('should be able to return empty strings', () => {
      expect(faker.fake('{{helpers.repeatString}}')).toBe('');
    });

    it('should be able to return locale definition strings', () => {
      expect(faker.definitions.cell_phone.formats).toContain(
        faker.fake('{{cell_phone.formats}}')
      );
    });

    it('should be able to return locale definition strings that starts with the name of an existing module', () => {
      expect(faker.definitions.address.city_name).toContain(
        faker.fake('{{address.city_name}}')
      );
    });

    it('should be able to handle only {{ brackets', () => {
      expect(faker.fake('{{hello')).toBe('{{hello');
      expect(faker.fake('hello{{')).toBe('hello{{');
    });

    it('should be able to handle only }} brackets', () => {
      expect(faker.fake('hello}}')).toBe('hello}}');
      expect(faker.fake('}}hello')).toBe('}}hello');
    });

    it('should be able to handle reverted brackets', () => {
      expect(faker.fake('}}hello{{')).toBe('}}hello{{');
    });

    it('should be able to handle random }} brackets', () => {
      expect(faker.fake('}}hello{{random.alpha}}')).toMatch(/^}}hello[a-z]$/);
    });

    it('should be able to handle connected brackets', () => {
      expect(faker.fake('{{{random.alpha}}}')).toMatch(/^{[a-z]}$/);
    });

    it('should be able to handle empty brackets', () => {
      expect(faker.fake('{{}}')).toBe('{{}}');
    });

    it('should be able to handle special replacement patterns', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (faker.random as any).special = () => '$&';

      expect(faker.fake('{{random.special}}')).toBe('$&');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (faker.random as any).special;
    });
  });
});
