import { describe, expect, it, vi } from 'vitest';
import { FakerError, faker } from '../../src';
import { fakeEval } from '../../src/modules/helpers/eval';

// A hostile definition that resolves to a function returning a function,
// mirroring the original GHSA-qxc2-j82w-r537 proof-of-concept.
const noop = (): void => undefined;
const functionReturningFunction = (): (() => void) => noop;

describe('fakeEval()', () => {
  it('does not allow empty string input', () => {
    expect(() => fakeEval('', faker)).toThrow(
      new FakerError('Eval expression cannot be empty.')
    );
  });

  it('does not allow empty entrypoints', () => {
    expect(() => fakeEval('foobar', faker, [])).toThrow(
      new FakerError('Eval entrypoints cannot be empty.')
    );
  });

  it('supports single pattern part invocations', () => {
    const actual = fakeEval('string', faker);
    expect(actual).toBeTypeOf('object');
    expect(actual).toBe(faker.string);
  });

  it('supports simple method calls', () => {
    const spy = vi.spyOn(faker.string, 'numeric');
    const actual = fakeEval('string.numeric', faker);
    expect(spy).toHaveBeenCalledWith();
    expect(actual).toBeTypeOf('string');
    expect(actual).toMatch(/^\d$/);
  });

  it('supports method calls without arguments', () => {
    const spy = vi.spyOn(faker.string, 'numeric');
    const actual = fakeEval('string.numeric()', faker);
    expect(spy).toHaveBeenCalledWith();
    expect(actual).toBeTypeOf('string');
    expect(actual).toMatch(/^\d$/);
  });

  it('supports method calls with simple arguments', () => {
    const spy = vi.spyOn(faker.string, 'numeric');
    const actual = fakeEval('string.numeric(5)', faker);
    expect(spy).toHaveBeenCalledWith(5);
    expect(actual).toBeTypeOf('string');
    expect(actual).toMatch(/^\d{5}$/);
  });

  it('supports method calls with complex arguments', () => {
    const spy = vi.spyOn(faker.string, 'numeric');
    const actual = fakeEval(
      'string.numeric({ "length": 5, "allowLeadingZeros": true, "exclude": ["5"] })',
      faker
    );
    expect(spy).toHaveBeenCalledWith({
      length: 5,
      allowLeadingZeros: true,
      exclude: ['5'],
    });
    expect(actual).toBeTypeOf('string');
    expect(actual).toMatch(/^[0-46-9]{5}$/);
  });

  it('supports method calls with multiple arguments', () => {
    const spy = vi.spyOn(faker.helpers, 'mustache');
    const actual = fakeEval(
      'helpers.mustache("{{foo}}", { "foo": "bar" })',
      faker
    );
    expect(spy).toHaveBeenCalledWith('{{foo}}', { foo: 'bar' });
    expect(actual).toBeTypeOf('string');
    expect(actual).toBe('bar');
  });

  it('supports method calls with unquoted string argument', () => {
    const spy = vi.spyOn(faker.helpers, 'slugify');
    const actual = fakeEval('helpers.slugify(This Works)', faker);
    expect(spy).toHaveBeenCalledWith('This Works');
    expect(actual).toBeTypeOf('string');
    expect(actual).toBe('This-Works');
  });

  it('supports method calls with wrongly quoted argument', () => {
    const spy = vi.spyOn(faker.helpers, 'slugify');
    const actual = fakeEval("helpers.slugify('')", faker);
    expect(spy).toHaveBeenCalledWith("''");
    expect(actual).toBeTypeOf('string');
    expect(actual).toBe('');
  });

  it('should be able to return empty strings', () => {
    const actual = fakeEval('string.alphanumeric(0)', faker);
    expect(actual).toBeTypeOf('string');
    expect(actual).toBe('');
  });

  it('supports returning complex objects', () => {
    const actual = fakeEval('airline.airline', faker);
    expect(actual).toBeTypeOf('object');
    expect(faker.definitions.airline.airline).toContain(actual);
  });

  it('supports returning lazy results', () => {
    faker.rawDefinitions.custom = {
      lazy: () => ({
        key: 'lazy result',
      }),
    };
    const actual = fakeEval('custom.lazy.key', faker);
    expect(actual).toBeTypeOf('string');
    expect(actual).toBe('lazy result');
  });

  it('supports patterns after a function call', () => {
    const actual = fakeEval('airline.airline().name', faker);
    expect(actual).toBeTypeOf('string');
    expect(faker.definitions.airline.airline.map(({ name }) => name)).toContain(
      actual
    ); // function().name
  });

  it('supports patterns after a function reference', () => {
    const actual = fakeEval('airline.airline.iataCode', faker);
    expect(actual).toBeTypeOf('string');
    expect(
      faker.definitions.airline.airline.map(({ iataCode }) => iataCode)
    ).toContain(actual);
  });

  it('requires a dot after a function call', () => {
    expect(() => fakeEval('airline.airline()iataCode', faker)).toThrow(
      new FakerError(
        "Expected dot ('.'), open parenthesis ('('), or nothing after function call but got 'i'"
      )
    );
  });

  it('requires a function for parameters', () => {
    expect(faker.definitions.person.first_name.generic).toBeDefined();
    expect(() => fakeEval('person.first_name().generic', faker)).toThrow(
      new FakerError("Cannot resolve expression 'person.first_name().generic'")
    );
  });

  it('requires a valid expression (missing value)', () => {
    expect(() => fakeEval('foo.bar', faker)).toThrow(
      new FakerError("Cannot resolve expression 'foo.bar'")
    );
  });

  it('requires a valid expression (trailing dot)', () => {
    expect(() => fakeEval('airline.airline.', faker)).toThrow(
      new FakerError("Found dot without property name in 'airline.'")
    );
    expect(() => fakeEval('airline.airline.()', faker)).toThrow(
      new FakerError("Found dot without property name in 'airline.()'")
    );
    expect(() => fakeEval('airline.airline.().iataCode', faker)).toThrow(
      new FakerError("Found dot without property name in 'airline.().iataCode'")
    );
  });

  it('requires a valid expression (unclosed parenthesis)', () => {
    expect(() => fakeEval('airline.airline(', faker)).toThrow(
      new FakerError("Missing closing parenthesis in '('")
    );
    expect(() => fakeEval('airline.airline(.iataCode', faker)).toThrow(
      new FakerError("Missing closing parenthesis in '(.iataCode'")
    );
  });

  // Regression test for GHSA-qxc2-j82w-r537: fake()/fakeEval() must never evaluate the expression as JavaScript.
  // In particular, a (hostile) definition that resolves to a function must not expose the `Function` constructor via a `.constructor` chain, which would allow arbitrary code execution.
  // Functions are always invoked (never property-accessed), so the constructor chain can never reach `Function`.
  describe('does not allow arbitrary code execution (GHSA-qxc2-j82w-r537)', () => {
    const globalWithFlag = globalThis as Record<string, unknown>;

    const attacks = [
      'evil.constructor(return 1)',
      'evil().constructor(return 1)',
      'evil.constructor.constructor(globalThis.__fakerPwned = true)',
      'evil.constructor.constructor(globalThis.__fakerPwned = true)()',
      'string.constructor.constructor(globalThis.__fakerPwned = true)()',
    ];

    it('via fakeEval()', () => {
      globalWithFlag.__fakerPwned = false;
      // A hostile definition resolving to a function returning a function, mirroring the original proof-of-concept.
      (faker.rawDefinitions as Record<string, unknown>).evil =
        functionReturningFunction;

      try {
        for (const attack of attacks) {
          let result: unknown;
          try {
            result = fakeEval(attack, faker);
          } catch (error) {
            // Rejecting the expression is a safe outcome, but it must fail with the library's own error type, never a raw JS engine error.
            expect(error, attack).toBeInstanceOf(FakerError);
          }

          expect(globalWithFlag.__fakerPwned, attack).toBe(false);
          expect(result, attack).not.toBe(Function);
        }
      } finally {
        delete (faker.rawDefinitions as Record<string, unknown>).evil;
        delete globalWithFlag.__fakerPwned;
      }
    });

    it('via helpers.fake()', () => {
      globalWithFlag.__fakerPwned = false;
      (faker.rawDefinitions as Record<string, unknown>).evil =
        functionReturningFunction;

      try {
        expect(() =>
          faker.helpers.fake(
            '{{evil.constructor.constructor(globalThis.__fakerPwned = true)()}}'
          )
        ).toThrow(FakerError);
        expect(globalWithFlag.__fakerPwned).toBe(false);
      } finally {
        delete (faker.rawDefinitions as Record<string, unknown>).evil;
        delete globalWithFlag.__fakerPwned;
      }
    });
  });
});
