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
    return +b;
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
    return c ? a : +b;
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
   * Test with a function parameters.
   *
   * @param options The function parameter.
   * @param options.a The number parameter.
   * @param options.b The string parameter.
   * @param options.c The boolean parameter.
   */
  optionsParamMethod(options: { a: number; b?: string; c: boolean }): number {
    return options.c ? options.a : +options.b;
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
   * @deprecated
   */
  methodWithDeprecated(): number {
    return 0;
  }
}
