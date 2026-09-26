import type { FakerCore } from '../../core';
import { datatypeBoolean } from '../datatype/boolean';
import { helpersArrayElement } from '../helpers/array-element';
import { numberInt } from '../number/int';

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
 * systemCron(fakerCore) // '45 23 * * 6'
 * systemCron(fakerCore, { includeYear: true }) // '45 23 * * 6 2067'
 * systemCron(fakerCore, { includeYear: false }) // '45 23 * * 6'
 * systemCron(fakerCore, { includeNonStandard: false }) // '45 23 * * 6'
 * systemCron(fakerCore, { includeNonStandard: true }) // '@yearly'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemCron(
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
  const minutes = [numberInt(fakerCore, 59), '*'];
  const hours = [numberInt(fakerCore, 23), '*'];
  const days = [numberInt(fakerCore, { min: 1, max: 31 }), '*', '?'];
  const months = [numberInt(fakerCore, { min: 1, max: 12 }), '*'];
  const daysOfWeek = [
    numberInt(fakerCore, 6),
    helpersArrayElement(fakerCore, CRON_DAY_OF_WEEK),
    '*',
    '?',
  ];
  const years = [numberInt(fakerCore, { min: 1970, max: 2099 }), '*'];

  const minute = helpersArrayElement(fakerCore, minutes);
  const hour = helpersArrayElement(fakerCore, hours);
  const day = helpersArrayElement(fakerCore, days);
  const month = helpersArrayElement(fakerCore, months);
  const dayOfWeek = helpersArrayElement(fakerCore, daysOfWeek);
  const year = helpersArrayElement(fakerCore, years);

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

  return !includeNonStandard || datatypeBoolean(fakerCore)
    ? standardExpression
    : helpersArrayElement(fakerCore, nonStandardExpressions);
}
