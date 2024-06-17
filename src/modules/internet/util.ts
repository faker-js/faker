/**
 *
 * @param input String to encode to Base64.
 * @returns Base64 URL encoded string.
 * @example const encodedHeader = toBase64Url(JSON.stringify(header));
 */
export function toBase64Url(input: string): string {
  const utf8Bytes = new TextEncoder().encode(input);
  const binaryString = Array.from(utf8Bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join('');
  const base64 = btoa(binaryString);
  return base64
    .replaceAll(/\+/g, '-')
    .replaceAll(/\//g, '_')
    .replaceAll(/=+$/g, '');
}
