import { describe, describe as vi_describe, expect, it as vi_it } from 'vitest';
import type { Faker } from '../../src/faker';
import type { Callable, MethodOf } from '../../src/utils/types';

export const seededRuns = [42, 1337, 1211];

/**
 * A type allowing only the names of faker modules.
 */
type FakerModules = {
  [Key in keyof Faker]: Faker[Key] extends Callable | string | number | number[]
    ? never
    : Key extends 'definitions' | 'locales'
    ? never
    : Key;
}[keyof Faker];

/**
 * Picks only the methods from the given type.
 */
type OnlyMethods<T> = Pick<T, MethodOf<T>>;

/**
 * A Faker type with modules trimmed to only methods.
 */
type OnlyMethodsFaker = {
  [Key in FakerModules]: OnlyMethods<Faker[Key]>;
};

/**
 * The type allowing only the names of methods that have exactly zero arguments.
 */
type NoArgsMethodOf<ObjectType> = MethodOf<ObjectType> &
  {
    [Key in MethodOf<ObjectType, () => unknown>]: ObjectType[Key] extends (
      arg0: string | number | boolean | Record<string, undefined>,
      ...args
    ) => unknown
      ? Key
      : never;
  }[MethodOf<ObjectType, () => unknown>];

/**
 * Method that prepares seeded tests.
 *
 * It ensures that all methods in that module have exactly one test case or block associated to them.
 * Duplicate calls to `t.it(methodName)` or `t.describe(methodName)` will directly throw an error.
 * Before the method returns it will check that there are tests for all methods of the module.
 *
 * You may add custom vitest's `it` and `describe` blocks both on a module and method level,
 * however these will be ignored by the completeness checks and you have to call the `setup()` callback yourself.
 *
 * @param faker The faker instance to use for the tests.
 * @param module The name of the faker module to test.
 * @param factory The factory used to create the seeded tests. Supports both fluent and individual calls.
 *
 * @example
 * seededTests(faker, 'random', (t) => {
 *  t.it('methodWithoutArgs')
 *    .itRepeated('methodWithoutArgs2', 5)
 *    .describe('methodWithArgs3', (t) => {
 *      t.it('noArgs')
 *        .it('withParam1', 1337)
 *        .it('variant1', { min: 0})
 *        .it('variant2', { max: 1337})
 *        .it('variant1And2', { min: 0, max: 1337})
 *    });
 * })
 */
export function seededTests<
  K extends FakerModules,
  M extends Record<string, Callable> = OnlyMethodsFaker[K]
>(
  faker: Faker,
  module: K,
  factory: (tg: TestGenerator<K, M>, setup: () => void) => void
): void {
  describe.each(seededRuns)('%s', (seed) => {
    const testGenerator: TestGenerator<K, M> = new TestGenerator(
      faker,
      seed,
      module
    );
    factory(testGenerator, () => testGenerator.setup());

    testGenerator.expectAllMethodsToBeTested();
  });
}

/**
 * Generator for seed based tests.
 *
 * The individual methods generate default test blocks, that use test snapshots to verify consistent return values.
 */
class TestGenerator<
  ModuleName extends FakerModules,
  Module extends Record<string, Callable> = OnlyMethodsFaker[ModuleName]
> {
  private readonly tested: Set<MethodOf<Module>> = new Set();
  private readonly module: Module;

  constructor(
    private readonly faker: Faker,
    private readonly seed: number,
    private readonly moduleName: ModuleName
  ) {
    this.module = this.faker[moduleName] as unknown as Module;
  }

  /**
   * Ensures that there is only one test block for each method.
   *
   * @param method The method name to check.
   */
  private expectNotTested(method: MethodOf<Module>): void {
    expect(
      this.tested.has(method),
      `${method} not to be tested yet`
    ).toBeFalsy();
    this.tested.add(method);
  }

  /**
   * Should never be called from tests.
   *
   * Configures the faker instance for the test by resetting the seed.
   *
   * This method will automatically be called by the default methods
   * and should be called at the beginning of custom vitest's `it` blocks.
   */
  setup(): void {
    this.faker.seed(this.seed);
    this.faker.locale = 'en';
  }

  /**
   * Runs the instructions for a vitest's `it` block.
   *
   * @param method The method name to call.
   * @param args The arguments to call it with.
   * @param repetitions The number of times to call it.
   */
  private callAndVerify<MethodName extends MethodOf<Module>>(
    method: MethodName,
    args: Parameters<Module[MethodName]>,
    repetitions: number = 1
  ): void {
    this.setup();
    for (let i = 0; i < repetitions; i++) {
      const callable = this.module[method];
      const value = callable(...args);
      expect(value).toMatchSnapshot();
    }
  }

  /**
   * Permanently ignores this method.
   *
   * @param method The name of the method.
   */
  skip(method: MethodOf<Module>): this {
    this.expectNotTested(method);
    vi_it.skip(method);
    return this;
  }

  /**
   * Temporarily ignores this method. Useful for testing purposes.
   *
   * @param method The name of the method.
   *
   * @deprecated Implement a proper test.
   */
  todo(method: MethodOf<Module>): this {
    this.expectNotTested(method);
    vi_it.todo(method);
    return this;
  }

  /**
   * Generates a test for a method without arguments.
   *
   * @param method The name of the method.
   */
  it<MethodName extends NoArgsMethodOf<Module>>(method: MethodName): this {
    return this.itRepeated(method, 1);
  }

  /**
   * Generates a repeated test for a method without arguments.
   * The seed is not reset between repetitions.
   *
   * @param method The name of the method.
   * @param repetitions The number of repetitions to run.
   */
  itRepeated<MethodName extends NoArgsMethodOf<Module>>(
    method: MethodName,
    repetitions: number
  ): this {
    this.expectNotTested(method);
    vi_it(method, () =>
      this.callAndVerify(
        method,
        [] as Parameters<Module[MethodName]>,
        repetitions
      )
    );
    return this;
  }

  /**
   * Generates no argument tests for the given methods.
   *
   * @param methods The names of the methods.
   */
  itEach<MethodName extends NoArgsMethodOf<Module>>(
    ...methods: MethodName[]
  ): this {
    for (const method of methods) {
      this.it(method);
    }
    return this;
  }

  /**
   * Generates a test section for a method.
   * Useful to cover multiple argument variations.
   *
   * @param method The name of the method.
   * @param factory The factory used to generate the individual tests.
   */
  describe<MethodName extends MethodOf<Module>>(
    method: MethodName,
    factory: (tester: MethodTester<Module[MethodName]>) => void
  ): this {
    this.expectNotTested(method);
    const callAndVerify: TestGenerator<ModuleName, Module>['callAndVerify'] =
      this.callAndVerify.bind(this);
    const tester: MethodTester<Module[MethodName]> = {
      it(name: string, ...args: Parameters<Module[MethodName]>) {
        vi_it(name, () => callAndVerify(method, args));
        return tester;
      },
      itRepeated(
        name: string,
        repetitions: number,
        ...args: Parameters<Module[MethodName]>
      ) {
        vi_it(name, () => callAndVerify(method, args, repetitions));
        return tester;
      },
    };
    vi_describe(method, () => {
      factory(tester);
    });
    return this;
  }

  /**
   * Generates a test section for multiple methods with a similar signature.
   * Useful to cover multiple argument variations.
   *
   * @param methods The names of the methods to generate the tests for.
   */
  describeEach<MethodName extends MethodOf<Module>>(
    ...methods: MethodName[]
  ): (factory: (tester: MethodTester<Module[MethodName]>) => void) => this {
    return (factory) => {
      for (const method of methods) {
        this.describe(method, factory);
      }
      return this;
    };
  }

  /**
   * Should never be called from tests.
   *
   * Checks that all methods in the module have associated tests.
   * This method will be called automatically at the end of each run.
   */
  expectAllMethodsToBeTested(): void {
    const actual = Array.from(this.tested).sort();
    const expected = Object.entries(this.module)
      .filter(([, value]) => typeof value === 'function')
      .map(([key]) => key)
      .sort();
    vi_it('should test all methods', () => {
      expect(actual).toEqual(expected);
    });
  }
}

/**
 * Simple interface for a test generator for a given method.
 */
interface MethodTester<Method extends Callable> {
  /**
   * Generates a test for the method.
   *
   * @param name The name of the test case.
   * @param args The arguments to use in the test.
   */
  it(name: string, ...args: Parameters<Method>): this;

  /**
   * Generates a repeated test for the method.
   * The seed is not reset between repetitions.
   *
   * @param name The name of the test case.
   * @param repetitions The number of repetitions to run.
   * @param args The arguments to use in the test.
   */
  itRepeated(
    name: string,
    repetitions: number,
    ...args: Parameters<Method>
  ): this;
}
