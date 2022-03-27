export interface FunctionReplacement {
  old: string;
  new: string;
}

export type DeprecatedOptions = string | FunctionReplacement;

/**
 * Logs a warning message to the console prefixed with `Deprecation Warning: `.
 *
 * @param deprecatedOptions The options to log.
 *
 * @internal
 */
export function deprecated(deprecatedOptions: DeprecatedOptions): void {
  if (typeof deprecatedOptions === 'string') {
    console.warn(`Deprecation Warning: ${deprecatedOptions}`);
  } else {
    console.warn(
      `Deprecation Warning: ${deprecatedOptions.old} is now located in ${deprecatedOptions.new}`
    );
  }
}
