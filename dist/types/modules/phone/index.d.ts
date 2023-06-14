import type { Faker } from '../..';
/**
 * Module to generate phone-related data.
 *
 * ### Overview
 *
 * For a phone number, use [`number()`](https://fakerjs.dev/api/phone.html#number). Many locales provide country-specific formats.
 */
export declare class PhoneModule {
    private readonly faker;
    constructor(faker: Faker);
    /**
     * Generates a random phone number.
     *
     * @param format Format of the phone number. Defaults to a random phone number format.
     *
     * @example
     * faker.phone.number() // '961-770-7727'
     * faker.phone.number('501-###-###') // '501-039-841'
     * faker.phone.number('+48 91 ### ## ##') // '+48 91 463 61 70'
     *
     * @since 7.3.0
     */
    number(format?: string): string;
    /**
     * Generates IMEI number.
     *
     * @example
     * faker.phone.imei() // '13-850175-913761-7'
     *
     * @since 6.2.0
     */
    imei(): string;
}
