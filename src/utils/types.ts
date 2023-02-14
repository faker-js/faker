/**
 * Type that provides auto-suggestions but also any string.
 *
 * @see https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
 */
export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & { zz_IGNORE_ME?: never });

/**
 * A function that returns a value.
 *
 * This is a workaround for the fact that `Function` is a real JS Object like `String` and therefore should not be used as a type.
 */
export type Callable = (...args: any[]) => unknown;

/**
 * Type that represents a single method/function name of the given type.
 */
export type MethodOf<ObjectType, Signature extends Callable = Callable> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends Signature
    ? Key extends string
      ? Key
      : never
    : never;
}[keyof ObjectType];

/**
 * Type that represents all method/function names of the given type.
 */
export type MethodsOf<
  ObjectType,
  Signature extends Callable = Callable
> = ReadonlyArray<MethodOf<ObjectType, Signature>>;
