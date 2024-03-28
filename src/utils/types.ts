/**
 * Type that provides auto-suggestions but also any string.
 *
 * @see https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
 */
export type LiteralUnion<TSuggested extends TBase, TBase = string> =
  | TSuggested
  | (TBase & { zz_IGNORE_ME?: never });

/**
 * A function that returns a value.
 *
 * `Function` cannot be used instead because it doesn't accept class declarations.
 * These would fail when invoked since they are invoked without the `new` keyword.
 */
export type Callable = (
  // TODO @Shinigami92 2023-02-14: This `any` type can be fixed by anyone if they want to.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => unknown;

/**
 * Type that represents a single method/function name of the given type.
 */
export type MethodOf<TObjectType, TSignature extends Callable = Callable> = {
  [Key in keyof TObjectType]: TObjectType[Key] extends TSignature
    ? Key extends string
      ? Key
      : never
    : never;
}[keyof TObjectType];

/**
 * Type that represents all method/function names of the given type.
 */
export type MethodsOf<
  TObjectType,
  TSignature extends Callable = Callable,
> = ReadonlyArray<MethodOf<TObjectType, TSignature>>;

/**
 * Taken from type-fest ReadonlyTuple.
 *
 * @see https://github.com/sindresorhus/type-fest/blob/main/source/readonly-tuple.d.ts
 */
type BuildTuple<
  TValue,
  TLength extends number,
  TCache extends ReadonlyArray<TValue>,
> = TCache['length'] extends TLength
  ? [...TCache]
  : BuildTuple<TValue, TLength, [TValue, ...TCache]>;
type BuildLooseTuple<
  TValue,
  TLength extends number,
  TCache extends ReadonlyArray<TValue>,
> = TCache['length'] extends TLength
  ? [...TCache, ...TValue[]]
  : BuildLooseTuple<TValue, TLength, [TValue, ...TCache]>;

export type TupleOf<TValue, TLength extends number> = number extends TLength
  ? TValue[] // Because `TLength extends number` and `number extends TLength`, then `TLength` is not a specific finite number.
  : BuildTuple<TValue, TLength, []>;

export type LooseTupleOf<
  TValue,
  TLength extends number,
> = number extends TLength
  ? TValue[] // Because `TLength extends number` and `number extends TLength`, then `TLength` is not a specific finite number.
  : BuildLooseTuple<TValue, TLength, []>;
