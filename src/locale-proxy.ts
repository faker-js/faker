import type { LocaleDefinition } from './definitions';
import { FakerError } from './errors/faker-error';

/**
 * A proxy for LocaleDefinition that marks all properties as required and throws an error when an entry is accessed that is not defined.
 */
export type LocaleProxy = Readonly<{
  [key in keyof LocaleDefinition]-?: LocaleProxyCategory<LocaleDefinition[key]>;
}>;

type LocaleProxyCategory<T> = Readonly<{
  [key in keyof T]-?: LocaleProxyEntry<T[key]>;
}>;

type LocaleProxyEntry<T> = unknown extends T ? T : Readonly<NonNullable<T>>;

const throwReadOnlyError: () => never = () => {
  throw new FakerError('You cannot edit the locale data on the faker instance');
};

/**
 * Creates a proxy for LocaleDefinition that throws an error if an undefined property is accessed.
 *
 * @param locale The locale definition to create the proxy for.
 */
export function createLocaleProxy(locale: LocaleDefinition): LocaleProxy {
  const proxies = {} as LocaleDefinition;
  return new Proxy(locale, {
    has(): true {
      // Categories are always present (proxied), that's why we return true.
      return true;
    },

    get(
      target: LocaleDefinition,
      categoryName: keyof LocaleDefinition
    ): LocaleDefinition[keyof LocaleDefinition] {
      if (typeof categoryName === 'symbol' || categoryName === 'nodeType') {
        return target[categoryName];
      }

      if (categoryName in proxies) {
        return proxies[categoryName];
      }

      return (proxies[categoryName] = createCategoryProxy(
        categoryName,
        target[categoryName]
      ));
    },

    set: throwReadOnlyError,
    deleteProperty: throwReadOnlyError,
  }) as LocaleProxy;
}

/**
 * Creates a proxy for a category that throws an error when accessing an undefined property.
 *
 * @param categoryName The name of the category.
 * @param categoryData The module to create the proxy for.
 */
function createCategoryProxy<
  TCategoryData extends Record<string | symbol, unknown>
>(
  categoryName: string,
  categoryData: TCategoryData = {} as TCategoryData
): Required<TCategoryData> {
  return new Proxy(categoryData, {
    has(target: TCategoryData, entryName: keyof TCategoryData): boolean {
      const value = target[entryName];
      return value != null;
    },

    get(
      target: TCategoryData,
      entryName: keyof TCategoryData
    ): TCategoryData[keyof TCategoryData] {
      const value = target[entryName];
      if (typeof entryName === 'symbol' || entryName === 'nodeType') {
        return value;
      } else if (value === null) {
        throw new FakerError(
          `The locale data for '${categoryName}.${entryName.toString()}' aren't applicable to this locale.
  If you think this is a bug, please report it at: https://github.com/faker-js/faker`
        );
      } else if (value === undefined) {
        throw new FakerError(
          `The locale data for '${categoryName}.${entryName.toString()}' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://next.fakerjs.dev/guide/localization.html`
        );
      } else {
        return value;
      }
    },

    set: throwReadOnlyError,
    deleteProperty: throwReadOnlyError,
  }) as Required<TCategoryData>;
}
