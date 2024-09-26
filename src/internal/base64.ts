let toBase64_: (input: string) => string;
if (typeof Buffer === 'undefined') {
  toBase64_ = (input: string): string => {
    const utf8Bytes = new TextEncoder().encode(input);
    const binaryString = Array.from(utf8Bytes, (byte) =>
      String.fromCodePoint(byte)
    ).join('');
    return btoa(binaryString);
  };
} else {
  toBase64_ = (input: string): string => Buffer.from(input).toString('base64');
}

/**
 * This works the same as `Buffer.from(input).toString('base64')`
 * to work on both Node.js and browser environment.
 *
 * @internal
 *
 * @param input The string to encode to Base64.
 *
 * @returns Base64 encoded string.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc4648
 *
 * @example const encodedHeader = toBase64(JSON.stringify(header));
 */
export const toBase64 = toBase64_;
