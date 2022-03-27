/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/require-param */

/** @internal */
export interface DeprecatedOptions {
  deprecated: string;
  proposed?: string;
  since?: string;
  until?: string;
}

/** @internal */
export function deprecated(opts: DeprecatedOptions): void {
  if (opts.since && opts.until && opts.proposed) {
    console.warn(
      `[@faker-js/faker]: ${opts.deprecated} is deprecated since ${opts.since} and will be removed in ${opts.until}. Please use ${opts.proposed} instead.`
    );
  } else if (!opts.since && opts.until && opts.proposed) {
    console.warn(
      `[@faker-js/faker]: ${opts.deprecated} is deprecated and will be removed in ${opts.until}. Please use ${opts.proposed} instead.`
    );
  } else if (opts.since && !opts.until && opts.proposed) {
    console.warn(
      `[@faker-js/faker]: ${opts.deprecated} is deprecated since ${opts.since}. Please use ${opts.proposed} instead.`
    );
  } else if (!opts.since && !opts.until && opts.proposed) {
    console.warn(
      `[@faker-js/faker]: ${opts.deprecated} is deprecated. Please use ${opts.proposed} instead.`
    );
  } else if (!opts.since && opts.until && !opts.proposed) {
    console.warn(
      `[@faker-js/faker]: ${opts.deprecated} is deprecated and will be removed in ${opts.until}`
    );
  } else {
    console.warn(`[@faker-js/faker]: ${opts.deprecated} is deprecated.`);
  }
}
