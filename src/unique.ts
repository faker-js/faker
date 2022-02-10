import * as uniqueExec from './vendor/unique';

/**
 * Module to generate unique entries.
 */
export class Unique {
  // maximum time unique.exec will attempt to run before aborting
  maxTime = 10;

  // maximum retries unique.exec will recurse before aborting ( max loop depth )
  maxRetries = 10;

  // time the script started
  // startTime: number = 0;

  constructor() {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Unique.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a unique result using the results of the given method.
   * Used unique entries will be stored internally and filtered from subsequent calls.
   *
   * @param method The method used to generate the values.
   * @param args The arguments used to call the method.
   * @param opts The optional options used to configure this method.
   * @param opts.startTime The time this execution stared. This will be ignored/overwritten.
   * @param opts.maxTime The time this method may take before throwing an error.
   * @param opts.maxRetries The total number of attempts to try before throwing an error.
   * @param opts.currentIterations The current attempt. This will be ignored/overwritten.
   * @param opts.exclude The value or values that should be excluded/skipped.
   * @param opts.compare The function used to determine whether a value was already returned.
   *
   * @example
   * faker.unique(faker.name.firstName())
   */
  unique<Method extends (args: Args) => string, Args extends any[]>(
    method: Method,
    args: Args,
    opts?: {
      startTime?: number;
      maxTime?: number;
      maxRetries?: number;
      currentIterations?: number;
      exclude?: string | string[];
      compare?: (obj: Record<string, string>, key: string) => 0 | -1;
    }
  ): string {
    opts = opts || {};
    opts.startTime = new Date().getTime();
    if (typeof opts.maxTime !== 'number') {
      opts.maxTime = this.maxTime;
    }
    if (typeof opts.maxRetries !== 'number') {
      opts.maxRetries = this.maxRetries;
    }
    opts.currentIterations = 0;
    return uniqueExec.exec(method, args, opts);
  }
}
