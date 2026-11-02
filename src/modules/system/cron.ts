import type { FakerCore } from '../../core';
import { fakeDatatypeBoolean } from '../datatype/boolean';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeNumberInt } from '../number/int';

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
 * fakeSystemCron(fakerCore) // '45 23 * * 6'
 * fakeSystemCron(fakerCore, { includeYear: true }) // '45 23 * * 6 2067'
 * fakeSystemCron(fakerCore, { includeYear: false }) // '45 23 * * 6'
 * fakeSystemCron(fakerCore, { includeNonStandard: false }) // '45 23 * * 6'
 * fakeSystemCron(fakerCore, { includeNonStandard: true }) // '@yearly'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemCron(
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
  const minutes = [fakeNumberInt(fakerCore, 59), '*'];
  const hours = [fakeNumberInt(fakerCore, 23), '*'];
  const days = [fakeNumberInt(fakerCore, { min: 1, max: 31 }), '*', '?'];
  const months = [fakeNumberInt(fakerCore, { min: 1, max: 12 }), '*'];
  const daysOfWeek = [
    fakeNumberInt(fakerCore, 6),
    fakeHelpersArrayElement(fakerCore, CRON_DAY_OF_WEEK),
    '*',
    '?',
  ];
  const years = [fakeNumberInt(fakerCore, { min: 1970, max: 2099 }), '*'];

  const minute = fakeHelpersArrayElement(fakerCore, minutes);
  const hour = fakeHelpersArrayElement(fakerCore, hours);
  const day = fakeHelpersArrayElement(fakerCore, days);
  const month = fakeHelpersArrayElement(fakerCore, months);
  let dayOfWeek = fakeHelpersArrayElement(fakerCore, daysOfWeek);
  // `?` ("no specific value") is only valid in one of the two day fields.
  if (day === '?' && dayOfWeek === '?') {
    dayOfWeek = '*';
  }
  const year = fakeHelpersArrayElement(fakerCore, years);

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

  return !includeNonStandard || fakeDatatypeBoolean(fakerCore)
    ? standardExpression
    : fakeHelpersArrayElement(fakerCore, nonStandardExpressions);
}
