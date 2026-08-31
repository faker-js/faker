import type { FakerCore } from '../../core';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { hex } from '../number/hex';

/**
 * Returns a UUID ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * uuid(fakerCore) // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function uuid(fakerCore: FakerCore): string;
/**
 * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.version The specific UUID version to use.
 *
 * @example
 * uuid(fakerCore, { version: 4 }) // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function uuid(
  fakerCore: FakerCore,
  options: {
    /**
     * The specific UUID version to use.
     */
    version: 4;
  }
): string;
/**
 * Returns a UUID v7 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.version The specific UUID version to use.
 * @param options.refDate The timestamp to encode into the uuid.
 * The encoded timestamp is represented by the first 12 characters of the result.
 * Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @example
 * uuid(fakerCore) // '019be2c5-58de-70fe-a693-2ccbff1f0780'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function uuid(
  fakerCore: FakerCore,
  options: {
    /**
     * The specific UUID version to use.
     */
    version: 7;
    /**
     * The timestamp to encode into the uuid.
     * The encoded timestamp is represented by the first 12 characters of the result.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate: string | Date | number;
  }
): string;
/**
 * Returns a UUID ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @param fakerCore The FakerCore to use.
 * @param options An optional options object.
 * @param options.version The specific UUID version to use. Defaults to `4`.
 * @param options.refDate The timestamp to encode into the UUID.
 * This parameter is only relevant for UUID v7.
 * Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @example
 * uuid(fakerCore) // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
 * uuid(fakerCore, { version: 4 }) // 'd5482c1f-c30d-4bbc-b151-d95145bae71b'
 * uuid(fakerCore, { version: 7 }) // '01948b54-1b78-75fb-9922-0d9b0fd32248'
 * uuid(fakerCore, { version: 7, refDate: '2020-01-01T00:00:00.000Z' }) // '016f5e66-e800-725e-b078-f413f23aaff0'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function uuid(
  fakerCore: FakerCore,
  options?: {
    /**
     * The specific UUID version to use.
     */
    version?: 4 | 7;
    /**
     * The timestamp to encode into the UUID.
     * This parameter is only relevant for UUID v7.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  }
): string;
export function uuid(
  fakerCore: FakerCore,
  options: {
    version?: 4 | 7;
    refDate?: string | Date | number;
  } = {}
): string {
  const { version = 4, refDate = getDefaultRefDate(fakerCore) } = options;
  switch (version) {
    case 7: {
      return uuidV7(fakerCore, toDate(refDate));
    }

    default: {
      return uuidV4(fakerCore);
    }
  }
}

/**
 * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @param fakerCore The FakerCore to use.
 */
function uuidV4(fakerCore: FakerCore): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replaceAll('x', () => hex(fakerCore, { min: 0x0, max: 0xf }))
    .replaceAll('y', () => hex(fakerCore, { min: 0x8, max: 0xb }));
}

/**
 * Returns a UUID v7 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @param fakerCore The FakerCore to use.
 * @param refDate The reference date to retrieve the unix timestamp from.
 */
function uuidV7(fakerCore: FakerCore, refDate: Date): string {
  const unixTimeMs = refDate.valueOf();
  const unixTimeMsNormalized = Math.max(unixTimeMs, 0);
  const unixTimeMsHex = unixTimeMsNormalized
    .toString(16)
    .padStart(12, '0')
    .slice(-12);

  const unixTimePart = [
    unixTimeMsHex.substring(0, 8),
    unixTimeMsHex.substring(8),
  ].join('-');

  const randomPart = '7xxx-yxxx-xxxxxxxxxxxx'
    .replaceAll('x', () => hex(fakerCore, { min: 0x0, max: 0xf }))
    .replaceAll('y', () => hex(fakerCore, { min: 0x8, max: 0xb }));

  return `${unixTimePart}-${randomPart}`;
}
