export function onlyOne<T>(input: ReadonlyArray<T>, property: string): T {
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

export function atLeastOne<T>(input: T[], property: string): T[] {
  if (input.length === 0) {
    throw new Error(
      `Expected at least one element for ${property}, got ${input.length}`
    );
  }

  return input;
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

export function onlyOneRequired<T>(
  input: ReadonlyArray<T>,
  property: string
): NonNullable<T> {
  return required(onlyOne(input, property), property);
}

export function allRequired<T>(
  input: ReadonlyArray<T | undefined>,
  property: string
): Array<NonNullable<T>> {
  return input.map((v, i) => required(v, `${property}[${i}]`));
}

export function mapBy<TInput, TValue>(
  input: TInput[],
  keyExtractor: (item: TInput) => string,
  valueExtractor: (item: TInput) => TValue
): Record<string, TValue> {
  return Object.fromEntries(
    input.map((item) => [keyExtractor(item), valueExtractor(item)])
  );
}
