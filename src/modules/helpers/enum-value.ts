import type { FakerCore } from '../../core';
import { arrayElement } from './array-element';

/**
 * Returns a random value from an Enum object.
 *
 * This does the same as `objectValue` except that it ignores (the values assigned to) the numeric keys added for TypeScript enums.
 *
 * @template T Type of generic enums, automatically inferred by TypeScript.
 *
 * @param fakerCore The FakerCore to use.
 * @param enumObject Enum to pick the value from.
 *
 * @example
 * enum Color { Red, Green, Blue }
 * enumValue(fakerCore, Color) // 1 (Green)
 *
 * enum Direction { North = 'North', South = 'South'}
 * enumValue(fakerCore, Direction) // 'South'
 *
 * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
 * enumValue(fakerCore, HttpStatus) // 200 (Ok)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function enumValue<T extends Record<string | number, string | number>>(
  fakerCore: FakerCore,
  enumObject: T
): T[keyof T] {
  // ignore numeric keys added by TypeScript
  const keys: Array<keyof T> = Object.keys(enumObject).filter((key) =>
    Number.isNaN(Number(key))
  );
  const randomKey = arrayElement(fakerCore, keys);
  return enumObject[randomKey];
}
