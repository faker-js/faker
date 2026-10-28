import { describe, expect, it } from 'vitest';
import type { FakerCore } from '../../src/core';
import { createFakerCore } from '../../src/core';
import { bindThisToMemberFunctions } from '../../src/internal/bind-this-to-member-functions';
import { fakeNumberInt } from '../../src/modules/number/int';

describe('internal', () => {
  describe('bind-this-to-member-functions', () => {
    it('should bind this to member functions', () => {
      class SomeModule {
        constructor(private readonly fakerCore: FakerCore) {}

        someMethod(): number {
          return fakeNumberInt(this.fakerCore);
        }
      }

      const fakerCore = createFakerCore();
      const someModule = new SomeModule(fakerCore);

      const someMethodWithoutBind = someModule.someMethod;

      expect(() => someMethodWithoutBind()).toThrow(
        new TypeError(
          "Cannot read properties of undefined (reading 'fakerCore')"
        )
      );

      bindThisToMemberFunctions(someModule);

      const someMethod = someModule.someMethod;

      expect(() => someMethod()).not.toThrow();
    });
  });
});
