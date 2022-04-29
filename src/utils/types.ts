/**
 * Type that represents a single method/function name of the given type.
 */
export type MethodOf<
  ObjectType,
  Signature extends (...args) => unknown = (...args) => unknown
> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends Signature ? Key : never;
}[keyof ObjectType];

/**
 * Type that represents all method/function names of the given type.
 */
export type MethodsOf<
  ObjectType,
  Signature extends (...args) => unknown = (...args) => unknown
> = ReadonlyArray<MethodOf<ObjectType, Signature>>;
