/**
 * Type that represents a single method/function name of the given type.
 */
export type MethodOf<
  T,
  M extends (...args) => unknown = (...args) => unknown
> = {
  [P in keyof T]: T[P] extends M ? P : never;
}[keyof T];

/**
 * Type that represents a single method/function name of the given type.
 */
export type MethodsOf<
  T,
  M extends (...args) => unknown = (...args) => unknown
> = ReadonlyArray<MethodOf<T, M>>;
