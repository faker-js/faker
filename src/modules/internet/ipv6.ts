import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { numberInt } from '../number/int';
import { stringHexadecimal } from '../string/hexadecimal';

export enum IPv6Network {
  /**
   * Equivalent to: `::/0`.
   */
  Any = 'any',
  /**
   * Equivalent to: `::1/128`.
   */
  Loopback = 'loopback',
  /**
   * Locally assigned unique-local addresses: `fd00::/8`.
   *
   * @see [RFC4193](https://www.rfc-editor.org/rfc/rfc4193)
   */
  UniqueLocal = 'unique-local',
  /**
   * Link-local unicast addresses: `fe80::/64`.
   *
   * @see [RFC4291](https://www.rfc-editor.org/rfc/rfc4291#section-2.5.6)
   */
  LinkLocal = 'link-local',
  /**
   * Equivalent to: `ff00::/8`.
   */
  Multicast = 'multicast',
  /**
   * Addresses reserved for documentation: `2001:db8::/32`.
   *
   * @see [RFC3849](https://www.rfc-editor.org/rfc/rfc3849)
   */
  Documentation = 'documentation',
}

export type IPv6NetworkType = `${IPv6Network}`;

const ipv6Networks: Record<IPv6Network, string> = {
  [IPv6Network.Any]: '::/0',
  [IPv6Network.Loopback]: '::1/128',
  [IPv6Network.UniqueLocal]: 'fd00::/8',
  [IPv6Network.LinkLocal]: 'fe80::/64',
  [IPv6Network.Multicast]: 'ff00::/8',
  [IPv6Network.Documentation]: '2001:db8::/32',
};

/**
 * Parses an IPv6 address into eight 16-bit groups, or returns undefined if invalid.
 *
 * @param address The address, optionally compressed or ending in dotted-decimal IPv4.
 */
function parseIPv6Address(address: string): number[] | undefined {
  if (address.length > 45 || /[^\da-f:.]/i.test(address)) {
    return undefined;
  }

  if (address.includes('.')) {
    const lastColon = address.lastIndexOf(':');
    const octets = address.slice(lastColon + 1).split('.');
    if (
      lastColon === -1 ||
      octets.length !== 4 ||
      octets.some(
        (octet) => !/^(0|[1-9]\d{0,2})$/.test(octet) || Number(octet) > 255
      )
    ) {
      return undefined;
    }
    const [a, b, c, d] = octets.map(Number);
    address = `${address.slice(0, lastColon + 1)}${((a << 8) | b).toString(16)}:${((c << 8) | d).toString(16)}`;
  }

  const halves = address.split('::');
  if (halves.length > 2) {
    return undefined;
  }
  const left = halves[0] === '' ? [] : halves[0].split(':');
  const right = halves[1] ? halves[1].split(':') : [];
  const groups = [...left, ...right];
  if (
    groups.some((group) => !/^[\da-f]{1,4}$/i.test(group)) ||
    (halves.length === 1 ? groups.length !== 8 : groups.length >= 8)
  ) {
    return undefined;
  }

  return [
    ...left.map((group) => Number.parseInt(group, 16)),
    ...Array.from({ length: 8 - groups.length }, () => 0),
    ...right.map((group) => Number.parseInt(group, 16)),
  ];
}

/**
 * Generates a random IPv6 address.
 * The result always contains eight lowercase, zero-padded hexadecimal groups.
 * When a CIDR block is given, only the host bits are randomized; any host bits in the input are ignored.
 * Compressed addresses and addresses ending in dotted-decimal IPv4 are accepted.
 * Zone identifiers and URL brackets are not supported.
 *
 * Network presets:
 * - `'any'`: `::/0`.
 * - `'loopback'`: `::1/128`.
 * - `'unique-local'`: `fd00::/8` (locally assigned).
 * - `'link-local'`: `fe80::/64` (unicast).
 * - `'multicast'`: `ff00::/8`.
 * - `'documentation'`: `2001:db8::/32`.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.cidrBlock The IPv6 CIDR block to use, with a prefix length from 0 to 128. Overrides `network` if provided.
 * @param options.network An alias for a well-known CIDR block. Defaults to `'any'`.
 *
 * @throws {FakerError} If the CIDR block contains an invalid IPv6 address or prefix length.
 *
 * @example
 * internetIpv6(fakerCore) // '269f:1230:73e3:318d:842b:daab:326d:897b'
 * internetIpv6(fakerCore, { cidrBlock: '2001:db8:1234::/48' }) // '2001:0db8:1234:318d:842b:daab:326d:897b'
 * internetIpv6(fakerCore, { network: 'loopback' }) // '0000:0000:0000:0000:0000:0000:0000:0001'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetIpv6(
  fakerCore: FakerCore,
  options: {
    /**
     * The IPv6 CIDR block to use, with a prefix length from 0 to 128.
     * Overrides `network` if provided.
     */
    cidrBlock?: string;
    /**
     * An alias for a well-known CIDR block.
     *
     * @default 'any'
     */
    network?: IPv6NetworkType;
  } = {}
): string {
  const { network = 'any', cidrBlock = ipv6Networks[network] } = options;
  const [address, prefix, ...rest] = cidrBlock.split('/');
  const groups = parseIPv6Address(address);
  if (
    groups === undefined ||
    rest.length > 0 ||
    !prefix ||
    /\D/.test(prefix) ||
    prefix.length > 3 ||
    Number(prefix) > 128
  ) {
    throw new FakerError(
      `Invalid CIDR block provided: ${cidrBlock}. Must contain an IPv6 address and a prefix length between 0 and 128.`
    );
  }

  const prefixLength = Number(prefix);
  if (prefixLength !== 0) {
    return groups
      .map((group, index) => {
        const hostBits = Math.min(
          16,
          Math.max(0, (index + 1) * 16 - prefixLength)
        );
        const hostMask = 2 ** hostBits - 1;
        const host = hostBits === 0 ? 0 : numberInt(fakerCore, hostMask);
        return ((group & ~hostMask) | host).toString(16).padStart(4, '0');
      })
      .join(':');
  }

  return Array.from({ length: 8 }, () =>
    stringHexadecimal(fakerCore, {
      length: 4,
      casing: 'lower',
      prefix: '',
    })
  ).join(':');
}
