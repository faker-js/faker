// https://stackoverflow.com/a/53395649/4573065
export type AllOf<T> = ['Needs to be all of', T];

/**
 * Creates a function that requires all keys of the generic type to be used as parameters.
 * The function itself will return the given parameters.
 */
export function allOf<T>(): <U extends T[]>(
  ...array: U & ([T] extends [U[number]] ? unknown : AllOf<T>[])
) => U & ([T] extends [U[number]] ? unknown : AllOf<T>[]) {
  return (...array) => array;
}
