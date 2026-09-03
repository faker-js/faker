import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';
import { arrayElement } from '../helpers/array-element';
import { int } from '../number/int';

const CRON_DAY_OF_WEEK = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
] as const;

/**
 * Returns a random cron expression.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options to use.
 * @param options.includeYear Whether to include a year in the generated expression. Defaults to `false`.
 * @param options.includeNonStandard Whether to include a `@yearly`, `@monthly`, `@daily`, etc text labels in the generated expression. Defaults to `false`.
 *
 * @example
 * cron(fakerCore) // '45 23 * * 6'
 * cron(fakerCore, { includeYear: true }) // '45 23 * * 6 2067'
 * cron(fakerCore, { includeYear: false }) // '45 23 * * 6'
 * cron(fakerCore, { includeNonStandard: false }) // '45 23 * * 6'
 * cron(fakerCore, { includeNonStandard: true }) // '@yearly'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cron(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to include a year in the generated expression.
     *
     * @default false
     */
    includeYear?: boolean;
    /**
     * Whether to include a `@yearly`, `@monthly`, `@daily`, etc text labels in the generated expression.
     *
     * @default false
     */
    includeNonStandard?: boolean;
  } = {}
): string {
  const { includeYear = false, includeNonStandard = false } = options;

  // create the arrays to hold the available values for each component of the expression
  const minutes = [int(fakerCore, 59), '*'];
  const hours = [int(fakerCore, 23), '*'];
  const days = [int(fakerCore, { min: 1, max: 31 }), '*', '?'];
  const months = [int(fakerCore, { min: 1, max: 12 }), '*'];
  const daysOfWeek = [
    int(fakerCore, 6),
    arrayElement(fakerCore, CRON_DAY_OF_WEEK),
    '*',
    '?',
  ];
  const years = [int(fakerCore, { min: 1970, max: 2099 }), '*'];

  const minute = arrayElement(fakerCore, minutes);
  const hour = arrayElement(fakerCore, hours);
  const day = arrayElement(fakerCore, days);
  const month = arrayElement(fakerCore, months);
  const dayOfWeek = arrayElement(fakerCore, daysOfWeek);
  const year = arrayElement(fakerCore, years);

  // create and return the cron expression string
  let standardExpression = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;
  if (includeYear) {
    standardExpression += ` ${year}`;
  }

  const nonStandardExpressions = [
    '@annually',
    '@daily',
    '@hourly',
    '@monthly',
    '@reboot',
    '@weekly',
    '@yearly',
  ];

  return !includeNonStandard || boolean(fakerCore)
    ? standardExpression
    : arrayElement(fakerCore, nonStandardExpressions);
}
