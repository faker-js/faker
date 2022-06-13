/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/require-param */

type SemVer = `${number}.${number}.${number}`;

/** @internal */
export interface DeprecatedOptions {
  deprecated: string;
  proposed?: string;
  since?: SemVer;
  until?: SemVer;
}

/**
 * @internal
 *
 * @param opts An options object.
 * @param opts.deprecated The name of the function function following the syntax `faker.[module].[function]()`.
 * @param opts.proposed An alternativ solution.
 * @param opts.since The semver since when this is deprecated.
 * @param opts.until The semver when this will be removed.
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
