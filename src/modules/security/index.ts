import type { Faker } from '../..';
import { faker } from '../..';
import { toDate } from '../../internal/toDate';

/**
 * The possible definitions related to
 * Common Vulnerability Scoring System (CVSS).
 */
export interface Cvss {
  /**
   * A value ranging from 0 to 10.
   */
  score: number;

  /**
   * A compressed textual representation of the values used to derive a score
   */
  vector: string;

  /**
   * A textual representation of the numeric score.
   *
   * Where:
   * - None – 0
   * - Low – 0.1 - 3.9
   * - Medium – 4.0 - 6.9
   * - High – 7.0 - 8.9
   * - Critical – 9.0 - 10.0
   */
  rating: SeverityRating;
}

/**
 * Possible textual rating definitions for a CVSS identifier
 */
export type SeverityRating = 'none' | 'low' | 'medium' | 'high' | 'critical';

/**
 * Module to generate security related entries.
 */
export class SecurityModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(SecurityModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random CVE between the given boundaries.
   * Based on:
   * https://www.cve.org/
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.from The lower date boundary. Defaults to `1999-01-01T00:00:00.000Z`.
   * @param options.to The upper date boundary. Defaults to `now`.
   *
   * @example
   * faker.security.cve() // 'CVE-2011-0762'
   * faker.security.cve({ from:'2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // 'CVE-2028-0762'
   * faker.security.cve({ from:'2020-01-01T00:00:00.000Z' }) // 'CVE-2028-0762'
   * faker.security.cve({ to: '2019-12-31T00:00:00.000Z' }) // 'CVE-2018-0762'
   *
   * @since 8.0.0
   */
  cve(
    options: {
      from?: string | Date | number;
      to?: string | Date | number;
    } = {}
  ): string {
    const fromDateTime = toDate(options?.from || '1999-01-01T00:00:00.000Z');
    const toDateTime = toDate(options?.to);

    return [
      'CVE',
      // Year
      this.faker.date.between(fromDateTime, toDateTime).getFullYear(),
      // Sequence in the year
      this.faker.random.numeric(5, { allowLeadingZeros: true }),
    ].join('-');
  }

  /**
   * Generates a random CWE (Common Weakness Enumeration) identifier.
   * Based on:
   * https://cwe.mitre.org/data/index.html
   *
   * @example
   * faker.security.cwe() // 'CWE-123'
   *
   * @since 8.0.0
   */
  cwe(): string {
    return ['CWE', this.faker.datatype.number({ min: 0, max: 1388 })].join('-');
  }

  /**
   * Generates random CVSS (Common Vulnerability Scoring System) data.
   * Based on:
   * https://www.first.org/cvss/calculator/3.1
   *
   * @example
   * faker.security.cvss() // { score: 3.8, vector: 'CVSS:3.1/AV:P/AC:H/PR:H/UI:R/S:U/C:H/I:N/A:N/E:P/RL:W/RC:C', rating: 'low' }
   *
   * @since 8.0.0
   */
  cvss(): Cvss {
    const score = this.faker.datatype.float({
      min: 0,
      max: 10,
      precision: 0.1,
    });
    return {
      score,
      vector: [
        'CVSS:3.1',
        `AV:${randomCharFromString('NALP')}`,
        `AC:${randomCharFromString('LH')}`,
        `PR:${randomCharFromString('NLH')}`,
        `UI:${randomCharFromString('NR')}`,
        `S:${randomCharFromString('UC')}`,
        `C:${randomCharFromString('NLH')}`,
        `I:${randomCharFromString('NLH')}`,
        `A:${randomCharFromString('NLH')}`,
      ].join('/'),
      rating: getRating(score),
    };
  }
}

/**
 * Returns a random character from a string.
 *
 * @param string
 *
 * @example
 * randomCharFromString('abc'); // 'b'
 */
function randomCharFromString(string: string): string {
  return String(faker.helpers.arrayElement(string.split('')));
}

/**
 * Returns the textual representation of a score.
 *
 * @param score A number between 0 and 10. Defaults to `0`.
 *
 * @example
 * getRating(1); // 'low'
 */
function getRating(score: number = 0): SeverityRating {
  if (score === 0) {
    return 'none';
  }

  if (score >= 0.1 && score <= 3.9) {
    return 'low';
  }
  if (score >= 4.0 && score <= 6.9) {
    return 'medium';
  }
  if (score >= 7.0 && score <= 8.9) {
    return 'high';
  }
  if (score >= 9.0 && score <= 10.0) {
    return 'critical';
  }

  return 'none';
}
