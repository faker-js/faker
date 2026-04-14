export function exactlyOne<T>(
  input: ReadonlyArray<T>,
  property: string,
  extraDescription: string = ''
): T {
  if (input.length !== 1) {
    throw new Error(
      `Expected exactly one ${property} element, got ${input.length}. ${extraDescription}`
    );
  }

  return input[0];
}

export function optionalOne<T>(
  input: ReadonlyArray<T>,
  property: string,
  extraDescription: string = ''
): T | undefined {
  if (input.length > 1) {
    throw new Error(
      `Expected one optional ${property} element, got ${input.length}. ${extraDescription}`
    );
  }

  return input[0];
}

export function required<T>(
  input: T | undefined,
  property: string,
  extraDescription: string = ''
): NonNullable<T> {
  if (input == null) {
    throw new Error(
      `Expected a value for ${property}, got undefined. ${extraDescription}`
    );
  }

  return input;
}

export function allRequired<T>(
  input: ReadonlyArray<T | undefined>,
  property: string,
  extraDescription: string = ''
): Array<NonNullable<T>> {
  return input.map((v, i) =>
    required(v, `${property}[${i}]`, extraDescription)
  );
}

export function atLeastOne<T>(
  input: ReadonlyArray<T>,
  property: string,
  extraDescription: string = ''
): ReadonlyArray<T> {
  if (input.length === 0) {
    throw new Error(
      `Expected at least one ${property} element. ${extraDescription}`
    );
  }

  return input;
}

export function atLeastOneAndAllRequired<T>(
  input: ReadonlyArray<T | undefined>,
  property: string,
  extraDescription: string = ''
): ReadonlyArray<NonNullable<T>> {
  return atLeastOne(
    allRequired(input, property, extraDescription),
    property,
    extraDescription
  );
}

export function valueForKey<T>(
  input: Record<string, T>,
  key: string,
  extraDescription: string = ''
): T {
  return required(input[key], key, extraDescription);
}

export function valuesForKeys<T>(
  input: Record<string, T>,
  keys: string[],
  extraDescription: string = ''
): T[] {
  return keys.map((key) => valueForKey(input, key, extraDescription));
}
