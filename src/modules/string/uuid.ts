import type { SimpleFaker } from '../../';

/**
 * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @internal
 *
 * @param faker The faker instance to use.
 */
export function uuidV4(faker: SimpleFaker): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replaceAll('x', () => faker.number.hex({ min: 0x0, max: 0xf }))
    .replaceAll('y', () => faker.number.hex({ min: 0x8, max: 0xb }));
}

/**
 * Returns a UUID v7 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
 *
 * @internal
 *
 * @param faker The faker instance to use.
 * @param refDate The reference date to retrieve the unix timestamp from.
 */
export function uuidV7(faker: SimpleFaker, refDate: Date): string {
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
    .replaceAll('x', () => faker.number.hex({ min: 0x0, max: 0xf }))
    .replaceAll('y', () => faker.number.hex({ min: 0x8, max: 0xb }));

  return `${unixTimePart}-${randomPart}`;
}
