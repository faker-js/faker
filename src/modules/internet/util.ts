/**
 * This is tailored for handling JSON Web Tokens (JWTs),
 * as outlined in RFC 7515 - Appendix C.
 * This works the same as `Buffer.from(input).toString('base64url')`
 * to work on both Node.js and browser environment.
 *
 * @internal
 *
 * @param input JSON.stringified string to encode to Base64.
 *
 * @returns Base64 URL encoded string.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7515#appendix-C
 *
 * @example const encodedHeader = toBase64Url(JSON.stringify(header));
 */
export function toBase64Url(input: string): string {
  const utf8Bytes = new TextEncoder().encode(input);
  const binaryString = Array.from(utf8Bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join('');
  const base64 = btoa(binaryString);
  return base64
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll(/=+$/g, '');
}
