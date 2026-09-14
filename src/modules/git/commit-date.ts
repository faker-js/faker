import type { FakerCore } from '../../core';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { recent } from '../date/recent';
import { int } from '../number/int';

/**
 * Generates a date string for a git commit using the same format as `git log`.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.refDate The date to use as reference point for the commit. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @example
 * commitDate(fakerCore) // 'Mon Nov 7 14:40:58 2022 +0600'
 * commitDate(fakerCore, { refDate: '2020-01-01' }) // 'Tue Dec 31 05:40:59 2019 -0400'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commitDate(
  fakerCore: FakerCore,
  options: {
    /**
     * The date to use as reference point for the commit.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  } = {}
): string {
  const { refDate = getDefaultRefDate(fakerCore) } = options;
  // Git uses a non-standard date format for commits by default per https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-log.html
  // --date=default is the default format, and is based on ctime(3) output. It shows a single line with three-letter day of the week, three-letter month, day-of-month, hour-minute-seconds in "HH:MM:SS" format, followed by 4-digit year, plus timezone information, unless the local time zone is used, e.g. Thu Jan 1 00:00:00 1970 +0000.
  // To avoid relying on the Intl global which may not be available in all environments, we implement a custom date format using built-in Javascript date functions.
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = recent(fakerCore, { days: 1, refDate });
  const day = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const timezone = int(fakerCore, { min: -11, max: 12 });
  const timezoneHours = Math.abs(timezone).toString().padStart(2, '0');
  const timezoneMinutes = '00';
  const timezoneSign = timezone >= 0 ? '+' : '-';
  return `${day} ${month} ${dayOfMonth} ${hours}:${minutes}:${seconds} ${year} ${timezoneSign}${timezoneHours}${timezoneMinutes}`;
}
