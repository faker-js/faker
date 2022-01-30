// https://stackoverflow.com/a/53395649/4573065
type AllOf<T> = ['Needs to be all of', T];

export function allOf<T>(): <U extends T[]>(
  ...array: U & ([T] extends [U[number]] ? unknown : AllOf<T>[])
) => U & ([T] extends [U[number]] ? unknown : AllOf<T>[]) {
  return (...array) => array;
}

// A list of values that can be used as is.
export type Values<T> = readonly T[];
export type Texts = Values<string>;
// A strings that might contain a placeholder for fake().
export type Format = string;
export type Formats = readonly Format[];

export type Range = {
  min: number;
  max: number;
};
