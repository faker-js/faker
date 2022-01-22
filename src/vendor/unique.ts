// global results store
// currently uniqueness is global to entire faker instance
// this means that faker should currently *never* return duplicate values across all API methods when using `Faker.unique`
// it's possible in the future that some users may want to scope found per function call instead of faker instance
const found = {};

// global exclude list of results
// defaults to nothing excluded
const exclude = [];

// current iteration or retries of unique.exec ( current loop depth )
let currentIterations = 0;

// uniqueness compare function
// default behavior is to check value as key against object hash
function defaultCompare<T, Key extends keyof T>(obj: T, key: Key): 0 | -1 {
  if (typeof obj[key] === 'undefined') {
    return -1;
  }
  return 0;
}

// common error handler for messages
function errorMessage(
  now: number,
  code: string,
  opts: { startTime: number }
): never {
  console.error('error', code);
  console.log(
    'found',
    Object.keys(found).length,
    'unique entries before throwing error. \nretried:',
    currentIterations,
    '\ntotal time:',
    now - opts.startTime,
    'ms'
  );
  throw new Error(
    code +
      ' for uniqueness check \n\nMay not be able to generate any more unique values with current settings. \nTry adjusting maxTime or maxRetries parameters for faker.unique()'
  );
}

export function exec<Method extends Function, Args extends any[], Result>(
  method: Method,
  args: Args,
  opts: {
    maxTime?: number;
    maxRetries?: number;
    exclude?: any[];
    compare?: (obj: any, key: string) => 0 | -1;
    currentIterations?: number;
    startTime?: number;
  }
): Result {
  const now = new Date().getTime();

  opts = opts || {};
  opts.maxTime = opts.maxTime || 3;
  opts.maxRetries = opts.maxRetries || 50;
  opts.exclude = opts.exclude || exclude;
  opts.compare = opts.compare || defaultCompare;

  if (typeof opts.currentIterations !== 'number') {
    opts.currentIterations = 0;
  }

  if (typeof opts.startTime === 'undefined') {
    opts.startTime = new Date().getTime();
  }

  const startTime = opts.startTime;

  // support single exclude argument as string
  if (typeof opts.exclude === 'string') {
    opts.exclude = [opts.exclude];
  }

  if (opts.currentIterations > 0) {
    // console.log('iterating', currentIterations)
  }

  // console.log(now - startTime)
  if (now - startTime >= opts.maxTime) {
    return errorMessage(
      now,
      'Exceeded maxTime:' + opts.maxTime,
      // @ts-expect-error: we know that opts.startTime is defined
      opts
    );
  }

  if (opts.currentIterations >= opts.maxRetries) {
    return errorMessage(
      now,
      'Exceeded maxRetries:' + opts.maxRetries,
      // @ts-expect-error: we know that opts.startTime is defined
      opts
    );
  }

  // execute the provided method to find a potential satisfied value
  const result = method.apply(this, args);

  // if the result has not been previously found, add it to the found array and return the value as it's unique
  if (
    opts.compare(found, result) === -1 &&
    opts.exclude.indexOf(result) === -1
  ) {
    found[result] = result;
    opts.currentIterations = 0;
    return result;
  } else {
    // console.log('conflict', result);
    opts.currentIterations++;
    return exec(method, args, opts);
  }
}
