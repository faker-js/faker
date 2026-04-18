import { FakerError } from '../errors/faker-error';

/**
 * Checks that the value is not null or undefined and throws an error if it is.
 *
 * @param value The value to check.
 * @param path The path to the locale data.
 *
 * @returns The value if it's not null or undefined.
 *
 * @throws {FakerError} If the value is null or undefined.
 */
export function assertLocaleData<T>(
  value: T,
  ...path: string[]
): NonNullable<T> {
  if (value === null) {
    throw new FakerError(
      `The locale data for '${path.join('.')}' aren't applicable to this locale.
  If you think this is a bug, please report it at: https://github.com/faker-js/faker`
    );
  } else if (value === undefined) {
    throw new FakerError(
      `The locale data for '${path.join('.')}' are missing in this locale.
  If this is a custom Faker instance, please make sure all required locales are used e.g. '[de_AT, de, en, base]'.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://fakerjs.dev/guide/localization.html`
    );
  }

  return value;
}
