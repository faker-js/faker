export interface FunctionReplacement {
  source: string;
  alternative: string;
}

export type DeprecatedOptions = string | FunctionReplacement;

/**
 * Logs a warning message to the console prefixed with `Deprecation Warning: `.
 *
 * @param deprecatedOptions The options to log.
 */
export function deprecated(deprecatedOptions: DeprecatedOptions): void {
  if (typeof deprecatedOptions === 'string') {
    console.warn(`Deprecation Warning: ${deprecatedOptions}`);
  } else {
    console.warn(
      `Deprecation Warning: ${deprecatedOptions.source} is now located in ${deprecatedOptions.alternative}`
    );
  }
}
