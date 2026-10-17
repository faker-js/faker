import type { FakerCore } from '../../core';
import { toBase64Url } from '../../internal/base64';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { fakeCompanyName } from '../company/name';
import { fakeDateAnytime } from '../date/anytime';
import { fakeDateRecent } from '../date/recent';
import { fakeDateSoon } from '../date/soon';
import { fakeStringAlphanumeric } from '../string/alphanumeric';
import { fakeStringUuid } from '../string/uuid';
import { fakeInternetJwtAlgorithm } from './jwt-algorithm';

/**
 * Generates a random JWT (JSON Web Token).
 *
 * Please note that this method generates a random signature instead of a valid one.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.header The Header to use for the token. Defaults to a random object with the following fields: `alg` and `typ`.
 * @param options.payload The Payload to use for the token. Defaults to a random object with the following fields: `iat`, `exp`, `nbf`, `iss`, `sub`, `aud`, and `jti`.
 * @param options.refDate The date to use as reference point for the newly generated date.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7519
 * @see fakeInternetJwtAlgorithm(fakerCore): For generating random JWT (JSON Web Token) Algorithm.
 *
 * @example
 * fakeInternetJwt(fakerCore) // 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzI2MzgxMDYsImV4cCI6MTczMjY5MjUwOSwibmJmIjoxNzA1MDgxNjQ4LCJpc3MiOiJHdXRrb3dza2kgYW5kIFNvbnMiLCJzdWIiOiJlMzQxZjMwNS0yM2I2LTRkYmQtOTY2ZC1iNDRiZmM0ZGIzMGUiLCJhdWQiOiI0YzMwZGE3Yi0zZDUzLTQ4OGUtYTAyZC0zOWI2MDZiZmYxMTciLCJqdGkiOiJiMGZmOTMzOC04ODMwLTRmNDgtYjA3Ny1kNDNmMjU2OGZlYzAifQ.oDLVR73M0u5SjMPlc1aruxbdK7l2titXSeo9J5M1JUd65a1X9MhCz7FOobtX8eaj'
 * fakeInternetJwt(fakerCore, { header: { alg: 'HS256' }}) // 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTg2MTM3MTIsImV4cCI6MTcxODYzMzY3OSwibmJmIjoxNjk3MjYzNjMwLCJpc3MiOiJEb3lsZSBhbmQgU29ucyIsInN1YiI6IjYxYWRkYWFmLWY4MjktNDkzZS1iNTI1LTJjMGJkNjkzOTdjNyIsImF1ZCI6IjczNjcyMjVjLWIwMWMtNGE1My1hYzQyLTYwOWJkZmI1MzBiOCIsImp0aSI6IjU2Y2ZkZjAxLWRhMzMtNGUxNi04MzJiLTFlYTk3ZGY1MTQ2YSJ9.5iUgaCaFVPZ8d1QD0xMjoeJbmPVyUfKfoRQ6Njzm5MLp5F4UMh5REbPCrW70fAkr'
 * fakeInternetJwt(fakerCore, { payload: { iss: 'Acme' }}) // 'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBY21lIn0.syUt0GBukNac8Cn1AGKFq2SWAXWy1YIfl0uOYiwg6TZ3omAW0c7FGWY6bC7ZOFSt'
 * fakeInternetJwt(fakerCore, { refDate: '2020-01-01T00:00:00.000Z' }) // 'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzc4MDY4NDUsImV4cCI6MTU3Nzg0NjI4MCwibmJmIjoxNTgxNTQyMDYwLCJpc3MiOiJLcmVpZ2VyLCBBbHRlbndlcnRoIGFuZCBQYXVjZWsiLCJzdWIiOiI5NzVjMjMyOS02MDlhLTRjYTYtYjBkZi05ZmY4MGZiNDUwN2QiLCJhdWQiOiI0ODQxZWYwNi01OWYwLTQzMWEtYmFmZi0xMjkxZmRhZDdhNjgiLCJqdGkiOiJmNDBjZTJiYi00ZWYyLTQ1MjMtOGIxMy1kN2Q4NTA5N2M2ZTUifQ.cuClEZQ0CyPIMVS5uxrMwWXz0wcqFFdt0oNne3PMryyly0jghkxVurss2TapMC3C'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetJwt(
  fakerCore: FakerCore,
  options: {
    /**
     * The header to use for the token. If present, it will replace any default values.
     *
     * @default
     * {
     *   alg: fakeInternetJwtAlgorithm(fakerCore),
     *   typ: 'JWT'
     * }
     */
    header?: Record<string, unknown>;
    /**
     * The payload to use for the token. If present, it will replace any default values.
     *
     * @default
     * {
     *   iat: fakeDateRecent(fakerCore),
     *   exp: fakeDateSoon(fakerCore),
     *   nbf: fakeDateAnytime(fakerCore),
     *   iss: fakeCompanyName(fakerCore),
     *   sub: fakeStringUuid(fakerCore),
     *   aud: fakeStringUuid(fakerCore),
     *   jti: fakeStringUuid(fakerCore)
     * }
     */
    payload?: Record<string, unknown>;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  } = {}
): string {
  const { refDate = getDefaultRefDate(fakerCore) } = options;

  const iatDefault = fakeDateRecent(fakerCore, { refDate });

  const {
    header = {
      alg: fakeInternetJwtAlgorithm(fakerCore),
      typ: 'JWT',
    },
    payload = {
      iat: Math.round(iatDefault.valueOf() / 1000),
      exp: Math.round(
        fakeDateSoon(fakerCore, { refDate: iatDefault }).valueOf() / 1000
      ),
      nbf: Math.round(fakeDateAnytime(fakerCore, { refDate }).valueOf() / 1000),
      iss: fakeCompanyName(fakerCore),
      sub: fakeStringUuid(fakerCore),
      aud: fakeStringUuid(fakerCore),
      jti: fakeStringUuid(fakerCore),
    },
  } = options;

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = fakeStringAlphanumeric(fakerCore, 64);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
