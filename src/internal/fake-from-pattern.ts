import type { Faker } from '../faker';

/**
 * Generates a value from a locale definition pattern using `faker.helpers.fake()`.
 *
 * This is a convenience wrapper to reduce boilerplate in modules when
 * simply returning a fake value from a locale pattern.
 *
 * @param faker The Faker instance to use.
 * @param pattern The pattern string to interpolate using `fake()`.
 * @returns The interpolated fake value.
 *
 * @internal
 *
 * @example
 * fakeFromPattern(faker, 'Hello {{person.firstName}}!')
 *
 * @since 11.0.0
 */
export function fakeFromPattern(faker: Faker, pattern: string): string {
  return faker.helpers.fake(pattern);
}
