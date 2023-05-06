import type { Casing, ColorFormat } from '../../../src';
import { FakerError } from '../../../src/errors/faker-error';
import type { AlphaNumericChar } from '../../../src/modules/string';
import type { LiteralUnion } from '../../../src/utils/types';
// explicitly export types so they show up in the docs as decomposed types
export type { NumberColorFormat, StringColorFormat } from '../../../src';
export { Casing, ColorFormat, AlphaNumericChar, LiteralUnion };

/**
 * Parameter options type with default from signature.
 */
export type ParameterOptionsTypeA = {
  /**
   * Options value.
   */
  value?: number;
};

/**
 * Parameter options type with default from jsdocs. Defaults to `{value: 0}`.
 */
export type ParameterOptionsTypeB = {
  /**
   * Options value.
   */
  value?: number;
};

/**
 * Parameter options type with default from inner jsdocs.
 */
export type ParameterOptionsTypeC = {
  /**
   * Options value. Defaults to `0`.
   */
  value?: number;
};

/**
 * Parameter options type with default from signature.
 */
export interface ParameterOptionsInterfaceA {
  /**
   * Options value.
   */
  value?: number;
}

/**
 * Parameter options type with default from jsdocs.
 */
export interface ParameterOptionsInterfaceB {
  /**
   * Options value.
   */
  value?: number;
}

/**
 * Parameter options type with default from inner jsdocs.
 */
export interface ParameterOptionsInterfaceC {
  /**
   * Options value. Defaults to `0`.
   */
  value?: number;
}

/**
 * A or B.
 */
export type AB = 'a' | 'b';

export class SignatureTest {
  /**
   * Test with no parameters.
   */
  noParamMethod(): number {
    return 0;
  }

  /**
   * Test with a required parameter.
   *
   * @param a The number parameter.
   */
  requiredNumberParamMethod(a: number): number {
    return a;
  }

  /**
   * Test with an optional parameter.
   *
   * @param b The string parameter.
   */
  optionalStringParamMethod(b?: string): number {
    return b ? 0 : 1;
  }

  /**
   * Test with a default parameter.
   *
   * @param c The boolean parameter.
   */
  defaultBooleanParamMethod(c: boolean = true): number {
    return c ? 1 : 0;
  }

  /**
   * Test with multiple parameters.
   *
   * @param a The number parameter.
   * @param b The string parameter.
   * @param c The boolean parameter.
   */
  multiParamMethod(a: number, b?: string, c: boolean = true): number {
    return c ? a : b ? 0 : 1;
  }

  /**
   * Test with a function parameters.
   *
   * @param fn The function parameter.
   */
  functionParamMethod(fn: (a: string) => number): number {
    return fn('a');
  }

  /**
   * Test with string union.
   *
   * @param value `'a'` or `'b'`.
   * @param options The options parameter.
   * @param options.casing The casing parameter.
   * @param options.format The format parameter.
   * @param options.excludes The excludes parameter.
   */
  stringUnionParamMethod(
    value: 'a' | 'b',
    options?: {
      casing?: Casing;
      format?: 'hex' | ColorFormat;
      excludes?: ReadonlyArray<AlphaNumericChar>;
    }
  ): string {
    return options?.format ?? value;
  }

  /**
   * Test with LiteralUnion.
   *
   * @param value `'a'` or `'b'`.
   * @param namedValue `'a'` or `'b'`.
   * @param array Array of `'a'` or `'b'`.
   * @param namedArray Array of `'a'` or `'b'`.
   * @param mixed Value `'a'` or `'b'` or an array thereof.
   * @param namedMixed Value `'a'` or `'b'` or an array thereof.
   */
  literalUnionParamMethod(
    value: LiteralUnion<'a' | 'b'>,
    namedValue: LiteralUnion<AB>,
    array: ReadonlyArray<LiteralUnion<'a' | 'b'>>,
    namedArray: ReadonlyArray<LiteralUnion<AB>>,
    mixed: LiteralUnion<'a' | 'b'> | ReadonlyArray<LiteralUnion<'a' | 'b'>>,
    namedMixed: ReadonlyArray<LiteralUnion<AB>> | LiteralUnion<AB>
  ): string {
    return (
      value +
      namedValue +
      array.join('') +
      namedArray.join('') +
      String(mixed) +
      String(namedMixed)
    );
  }

  /**
   * Test with a function parameters.
   *
   * @param options The function parameter.
   * @param options.a The number parameter.
   * @param options.b The string parameter.
   * @param options.c The boolean parameter.
   * @param options.d The method parameter.
   */
  optionsParamMethod(options: {
    a: number;
    b?: string;
    c: boolean;
    d: () => string;
    /**
     * A parameter with inline documentation.
     *
     * @default 'a'
     */
    e: LiteralUnion<'a' | 'b'>;
  }): number {
    return options.a;
  }

  /**
   * Test with a function parameters (inline types) with defaults.
   *
   * @param a Parameter with signature default.
   * It also has a more complex description.
   * @param a.value The number parameter.
   * @param b Parameter with jsdocs default.
   *
   * It also has a more complex description.
   *
   * Defaults to `{ value: 1 }`.
   * @param b.value The number parameter.
   * @param c Parameter with inner jsdocs default.
   * @param c.value The number parameter. It also has a more complex description. Defaults to `2`.
   */
  optionsInlineParamMethodWithDefaults(
    a: { value?: number } = { value: 1 },
    b: { value?: number },
    c: { value?: number }
  ): number {
    return a.value ?? b.value ?? c.value ?? -1;
  }

  /**
   * Test with a function parameters with defaults.
   *
   * @param a Parameter with signature default.
   * @param a.value The number parameter.
   * @param b Parameter with jsdocs default. Defaults to `{ value: 1 }`.
   * @param b.value The number parameter.
   * @param c Parameter with inner jsdocs default.
   * @param c.value The number parameter. Defaults to `2`.
   */
  optionsTypeParamMethodWithDefaults(
    a: ParameterOptionsTypeA = { value: 1 },
    b: ParameterOptionsTypeB,
    c: ParameterOptionsTypeC
  ): number {
    return a.value ?? b.value ?? c.value ?? -1;
  }

  /**
   * Test with a function parameters with defaults.
   *
   * @param a Parameter with signature default.
   * @param a.value The number parameter.
   * @param b Parameter with jsdocs default. Defaults to `{ value: 1 }`.
   * @param b.value The number parameter.
   * @param c Parameter with inner jsdocs default.
   * @param c.value The number parameter. Defaults to `2`.
   */
  optionsInterfaceParamMethodWithDefaults(
    a: ParameterOptionsInterfaceA = { value: 1 },
    b: ParameterOptionsInterfaceB,
    c: ParameterOptionsInterfaceC
  ): number {
    return a.value ?? b.value ?? c.value ?? -1;
  }

  /**
   * Test with example marker.
   *
   * @example
   * test.apidoc.methodWithExample() // 0
   */
  methodWithExample(): number {
    return 0;
  }

  /**
   * Test with deprecated and see marker.
   *
   * @see test.apidoc.methodWithExample()
   *
   * @deprecated do something else
   */
  methodWithDeprecated(): number {
    return 0;
  }

  /**
   * Test with throws
   *
   * @throws a Faker error
   */
  methodWithThrows(): number {
    throw new FakerError('Test error');
  }

  /**
   * Test with deprecated option.
   *
   * @param option The options.
   * @param option.a Some deprecated option.
   * @param option.b Some other deprecated option.
   * @param option.c Some other option.
   */
  methodWithDeprecatedOption(option: {
    /**
     * Some deprecated option.
     *
     * @deprecated do something else.
     */
    a: string;
    /**
     * Some other deprecated option.
     *
     * @deprecated do something else.
     */
    b: () => number;
    /**
     * Some other option.
     */
    c: number;
  }): number {
    return option.c;
  }

  /**
   * Test with multiple see markers.
   *
   * @see test.apidoc.methodWithExample()
   * @see test.apidoc.methodWithDeprecated()
   */
  methodWithMultipleSeeMarkers(): number {
    return 0;
  }

  /**
   * Test with multiple see markers and backticks.
   *
   * @see test.apidoc.methodWithExample() with parameter `foo`.
   * @see test.apidoc.methodWithDeprecated() with parameter `bar` and `baz`.
   */
  methodWithMultipleSeeMarkersAndBackticks(): number {
    return 0;
  }

  /**
   * Test with since marker.
   *
   * @since 1.0.0
   */
  methodWithSinceMarker(): number {
    return 0;
  }

  /**
   * Complex array parameter.
   *
   * @template T The type of the entries to pick from.
   *
   * @param array Array to pick the value from.
   * @param array[].weight The weight of the value.
   * @param array[].value The value to pick.
   */
  complexArrayParameter<T>(
    array: ReadonlyArray<{
      /**
       * The weight of the value.
       */
      weight: number;
      /**
       * The value to pick.
       */
      value: T;
    }>
  ): T {
    return array[0].value;
  }
}
