export function toBase64Url(input: string): string {
  const utf8Bytes = new TextEncoder().encode(input);
  const binaryString = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join('');
  const base64 = btoa(binaryString);
 return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
