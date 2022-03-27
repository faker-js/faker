export interface FunctionReplacement {
  old: string;
  new: string;
}

export type DeprecatedOptions = string | FunctionReplacement;

/**
 * Logs a warning message to the console.
 *
 * @param opts The options to log.
 *
 * @internal
 */
export function deprecated(opts: DeprecatedOptions): void {
  if (typeof opts === 'string') {
    console.warn(`[@faker-js/faker]: ${opts}`);
  } else {
    console.warn(
      `[@faker-js/faker]: ${opts.old} is deprecated. Please use ${opts.new} instead.`
    );
  }
}
