import { FakerError } from '../../errors/faker-error';

export type RecordKey = string | number | symbol;

/**
 * Uniqueness compare function.
 * Default behavior is to check value as key against object hash.
 *
 * @param obj The object to check.
 * @param key The key to check.
 */
function defaultCompare(
  obj: Record<RecordKey, RecordKey>,
  key: RecordKey
): 0 | -1 {
  if (obj[key] === undefined) {
    return -1;
  }

  return 0;
}

/**
 * Logs the given code as an error and throws it.
 * Also logs a message for helping the user.
 *
 * @param startTime The time the execution started.
 * @param now The current time.
 * @param code The error code.
 * @param store The store of unique entries.
 * @param currentIterations Current iteration or retries of `unique.exec` (current loop depth).
 *
 * @throws The given error code with additional text.
 */
function errorMessage(
  startTime: number,
  now: number,
  code: string,
  store: Record<RecordKey, RecordKey>,
  currentIterations: number
): never {
  console.error('Error', code);
  console.log(
    `Found ${Object.keys(store).length} unique entries before throwing error.
retried: ${currentIterations}
total time: ${now - startTime}ms`
  );
  throw new FakerError(
    `${code} for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`
  );
}

/**
 * Generates a unique result using the results of the given method.
 * Used unique entries will be stored internally and filtered from subsequent calls.
 *
 * @template TMethod The type of the method to execute.
 *
 * @param method The method used to generate the values.
 * @param args The arguments used to call the method.
 * @param options The optional options used to configure this method.
 * @param options.startTime The time this execution stared. Defaults to `new Date().getTime()`.
 * @param options.maxTime The time in milliseconds this method may take before throwing an error. Defaults to `50`.
 * @param options.maxRetries The total number of attempts to try before throwing an error. Defaults to `50`.
 * @param options.currentIterations The current attempt. Defaults to `0`.
 * @param options.exclude The value or values that should be excluded/skipped. Defaults to `[]`.
 * @param options.compare The function used to determine whether a value was already returned. Defaults to check the existence of the key.
 * @param options.store The store of unique entries. Defaults to `GLOBAL_UNIQUE_STORE`.
 */
export function exec<
  TMethod extends (
    // TODO @Shinigami92 2023-02-14: This `any` type can be fixed by anyone if they want to.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...parameters: any[]
  ) => RecordKey
>(
  method: TMethod,
  args: Parameters<TMethod>,
  options: {
    startTime?: number;
    maxTime?: number;
    maxRetries?: number;
    currentIterations?: number;
    exclude?: RecordKey | RecordKey[];
    compare?: (obj: Record<RecordKey, RecordKey>, key: RecordKey) => 0 | -1;
    store?: Record<RecordKey, RecordKey>;
  } = {}
): ReturnType<TMethod> {
  const now = new Date().getTime();

  const {
    startTime = new Date().getTime(),
    maxTime = 50,
    maxRetries = 50,
    compare = defaultCompare,
    store,
  } = options;
  let { exclude } = options;
  options.currentIterations = options.currentIterations ?? 0;

  // Support single exclude argument as string
  if (!Array.isArray(exclude)) {
    exclude = [exclude];
  }

  // if (options.currentIterations > 0) {
  //   console.log('iterating', options.currentIterations)
  // }

  // console.log(now - startTime)
  if (now - startTime >= maxTime) {
    return errorMessage(
      startTime,
      now,
      `Exceeded maxTime: ${maxTime}`,
      store,
      options.currentIterations
    );
  }

  if (options.currentIterations >= maxRetries) {
    return errorMessage(
      startTime,
      now,
      `Exceeded maxRetries: ${maxRetries}`,
      store,
      options.currentIterations
    );
  }

  // Execute the provided method to find a potential satisfied value.
  const result: ReturnType<TMethod> = method(...args) as ReturnType<TMethod>;

  // If the result has not been previously found, add it to the found array and return the value as it's unique.
  if (compare(store, result) === -1 && exclude.indexOf(result) === -1) {
    store[result] = result;
    options.currentIterations = 0;
    return result;
  }

  // console.log('conflict', result);
  options.currentIterations++;
  return exec(method, args, {
    ...options,
    startTime,
    maxTime,
    maxRetries,
    compare,
    exclude,
  });
}
