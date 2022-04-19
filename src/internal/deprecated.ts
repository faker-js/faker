/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/require-param */

/** @internal */
export interface DeprecatedOptions {
  deprecated: string;
  proposed?: string;
  similar?: string;
  since?: string;
  until?: string;
}

/** @internal */
export function deprecated(opts: DeprecatedOptions): void {
  let message = `[@faker-js/faker]: ${opts.deprecated} is deprecated`;

  if (opts.since) {
    message += ` since ${opts.since}`;
  }

  if (opts.until) {
    message += ` and will be removed in ${opts.until}`;
  }

  if (opts.proposed) {
    message += `. Please use ${opts.proposed} instead`;
  }

  if (opts.similar) {
    message += `. You might want to use ${opts.similar}, which is similar (check docs for more details)`;
  }

  console.warn(message + '.');
}
