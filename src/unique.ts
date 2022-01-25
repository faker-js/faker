import * as uniqueExec from './vendor/unique';

export class Unique {
  // maximum time unique.exec will attempt to run before aborting
  maxTime: number = 10;

  // maximum retries unique.exec will recurse before aborting ( max loop depth )
  maxRetries: number = 10;

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
   * unique
   *
   * @method unique
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
    opts ||= {};
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
