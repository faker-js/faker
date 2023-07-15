import { describe, expect, it } from 'vitest';
import type { Faker } from '../../src';
import { faker } from '../../src';
import { bindThisToMemberFunctions } from '../../src/internal/bind-this-to-member-functions';

describe('internal', () => {
  describe('bind-this-to-member-functions', () => {
    it('should bind this to member functions', () => {
      class SomeModule {
        constructor(private readonly faker: Faker) {}

        someMethod(): number {
          return this.faker.number.int();
        }
      }

      const someModule = new SomeModule(faker);

      const someMethodWithoutBind = someModule.someMethod;

      // The second error message is for NodeJS v14 support
      expect(() => someMethodWithoutBind()).toThrow(
        /^(Cannot read properties of undefined \(reading 'faker'\)|Cannot read property 'faker' of undefined)$/
      );

      bindThisToMemberFunctions(someModule);

      const someMethod = someModule.someMethod;

      expect(() => someMethod()).not.toThrow();
    });
  });
});
