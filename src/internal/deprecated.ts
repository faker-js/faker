/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/require-param */

type SemVer = `${number}.${number}.${number}`;

/** @internal */
export interface DeprecatedOptions {
  /**
   * The name of the function function following the syntax `faker.[module].[function]()`.
   */
  deprecated: string;
  /**
   * An alternativ solution.
   */
  proposed?: string;
  /**
   * The semver since when this is deprecated.
   */
  since?: SemVer;
  /**
   * The semver when this will be removed.
   */
  until?: SemVer;
}

/**
 * @internal
 */
export function deprecated(opts: DeprecatedOptions): void {
  let message = `[@faker-js/faker]: ${opts.deprecated} is deprecated`;

  if (opts.since) {
    message += ` since v${opts.since}`;
  }

  if (opts.until) {
    message += ` and will be removed in v${opts.until}`;
  }

  if (opts.proposed) {
    message += `. Please use ${opts.proposed} instead`;
  }

  console.warn(`${message}.`);
}
