export function exactlyOne<T>(input: ReadonlyArray<T>, property: string): T {
  if (input.length !== 1) {
    throw new Error(
      `Expected exactly one element for ${property}, got ${input.length}`
    );
  }

  return input[0];
}

export function optionalOne<T>(
  input: ReadonlyArray<T>,
  property: string
): T | undefined {
  if (input.length > 1) {
    throw new Error(
      `Expected one optional element for ${property}, got ${input.length}`
    );
  }

  return input[0];
}

export function required<T>(
  input: T | undefined,
  property: string
): NonNullable<T> {
  if (input == null) {
    throw new Error(`Expected a value for ${property}, got undefined`);
  }

  return input;
}

export function allRequired<T>(
  input: ReadonlyArray<T | undefined>,
  property: string
): Array<NonNullable<T>> {
  return input.map((v, i) => required(v, `${property}[${i}]`));
}

export function atLeastOne<T>(
  input: ReadonlyArray<T>,
  property: string
): ReadonlyArray<T> {
  if (input.length === 0) {
    throw new Error(`Expected at least one element for ${property}`);
  }

  return input;
}

export function atLeastOneAndAllRequired<T>(
  input: ReadonlyArray<T | undefined>,
  property: string
): ReadonlyArray<NonNullable<T>> {
  return atLeastOne(allRequired(input, property), property);
}

export function valueForKey<T>(input: Record<string, T>, key: string): T {
  return required(input[key], key);
}

export function valuesForKeys<T>(
  input: Record<string, T>,
  keys: string[]
): T[] {
  return keys.map((key) => valueForKey(input, key));
}
