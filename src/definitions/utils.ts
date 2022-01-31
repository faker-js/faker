// https://stackoverflow.com/a/53395649/4573065
export type AllOf<T> = ['Needs to be all of', T];

export function allOf<T>(): <U extends T[]>(
  ...array: U & ([T] extends [U[number]] ? unknown : AllOf<T>[])
) => U & ([T] extends [U[number]] ? unknown : AllOf<T>[]) {
  return (...array) => array;
}
