import type { LocaleDefinition } from './definitions';
import { FakerError } from './errors/faker-error';

/**
 * A proxy for LocaleDefinitions that marks all properties as required and throws an error when an entry is accessed that is not defined.
 */
export type LocaleAccess = Readonly<{
  [key in keyof LocaleDefinition]-?: Readonly<
    Required<NonNullable<LocaleDefinition[key]>>
  >;
}>;

/**
 * Creates a proxy for LocaleDefinition that throws an error when a property is accessed that is not defined.
 *
 * @param locale The locale definition to create the proxy for.
 */
export function createLocaleAccess(locale: LocaleDefinition): LocaleAccess {
  return new Proxy({} as LocaleDefinition, {
    has(): true {
      return true;
    },

    get(
      target,
      categoryName: keyof LocaleDefinition
    ): LocaleDefinition[keyof LocaleDefinition] {
      if (categoryName in target) {
        return target[categoryName];
      }

      return (target[categoryName] = createCategoryProxy(
        categoryName,
        locale[categoryName]
      ));
    },

    set(): never {
      throw new FakerError('LocaleAccess is read-only.');
    },

    deleteProperty(): never {
      throw new FakerError('LocaleAccess is read-only.');
    },

    ownKeys(): Array<keyof LocaleAccess> {
      return Object.keys(locale);
    },
  }) as LocaleAccess;
}

/**
 * Creates a proxy for a category that throws an error when a property is accessed that is not defined.
 *
 * @param categoryName The name of the category.
 * @param categoryData The module to create the proxy for.
 */
function createCategoryProxy<T extends Record<string | symbol, unknown>>(
  categoryName: string,
  categoryData: T = {} as T
): Required<T> {
  return new Proxy({} as Required<T>, {
    has(_, entryName: keyof T): boolean {
      const value = categoryData[entryName];
      return value != null && (!Array.isArray(value) || value.length !== 0);
    },

    get(_, entryName: keyof T): T[keyof T] {
      const value = categoryData[entryName];
      if (value == null) {
        throw new FakerError(
          `The locale data for '${categoryName}.${entryName.toString()}' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://next.fakerjs.dev/guide/localization.html`
        );
      } else if (Array.isArray(value) && value.length === 0) {
        throw new FakerError(
          `The locale data for '${categoryName}.${entryName.toString()}' aren't applicable to this locale.
  If you think this is a bug, please report it at: https://github.com/faker-js/faker`
        );
      } else {
        return value;
      }
    },

    set(): never {
      throw new FakerError('LocaleAccess is read-only.');
    },

    deleteProperty(): never {
      throw new FakerError('LocaleAccess is read-only.');
    },

    ownKeys(): Array<string | symbol> {
      return Object.keys(categoryData);
    },
  });
}
