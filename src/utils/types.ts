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
 * `Function` cannot be used instead because it doesn't accept class declarations.
 * These would fail when invoked since they are invoked without the `new` keyword.
 */
export type Callable = (
  // TODO christopher 2023-02-14: This `any` type can be fixed by anyone if they want to.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => unknown;

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
