import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('fake', () => {
  describe('fake()', () => {
    it('replaces a token with a random value for a method with no parameters', () => {
      const name = faker.fake('{{phone.phoneNumber}}');
      expect(name).match(/\d/);
    });

    it('replaces multiple tokens with random values for methods with no parameters', () => {
      const name = faker.fake(
        '{{helpers.randomize}}{{helpers.randomize}}{{helpers.randomize}}'
      );
      expect(name).match(/[abc]{3}/);
    });

    it('replaces a token with a random value for a methods with a simple parameter', () => {
      const random = faker.fake('{{helpers.slugify("Will This Work")}}');
      expect(random).toBe('Will-This-Work');
    });

    it('replaces a token with a random value for a method with an array parameter', () => {
      const arr = ['one', 'two', 'three'];
      const random = faker.fake(
        '{{helpers.randomize(["one", "two", "three"])}}'
      );
      expect(arr).toContain(random);
    });

    it('does not allow undefined parameters', () => {
      expect(() =>
        // @ts-expect-error: The parameter is required
        faker.fake()
      ).toThrowError(Error('string parameter is required!'));
    });

    it('does not allow invalid module name', () => {
      expect(() => faker.fake('{{foo.bar}}')).toThrowError(
        Error('Invalid module: foo')
      );
    });

    it('does not allow invalid method name', () => {
      expect(() => faker.fake('{{address.foo}}')).toThrowError(
        Error('Invalid method: address.foo')
      );
    });

    it('should be able to return empty strings', () => {
      expect(faker.fake('{{helpers.repeatString}}')).toBe('');
    });
  });
});
