import { BlockList, isIPv6 } from 'node:net';
import { beforeEach, describe, expect, it } from 'vitest';
import { IPv6Network, createFakerCore, faker } from '../../src';
import { FakerError } from '../../src/errors/faker-error';
import { internetIpv6 } from '../../src/modules/internet/ipv6';

describe('internet.ipv6 subnets', () => {
  beforeEach(() => {
    faker.seed(1337);
  });

  it.each(Array.from({ length: 129 }, (_, index) => index))(
    'should keep generated addresses inside a /%i subnet',
    (prefix) => {
      const address = 'a5a5:5a5a:abcd:1234:fedc:5678:9abc:ffff';
      const subnet = new BlockList();
      subnet.addSubnet(address, prefix, 'ipv6');
      const addresses = Array.from({ length: 10 }, () =>
        faker.internet.ipv6({ cidrBlock: `${address}/${prefix}` })
      );

      for (const generated of addresses) {
        expect(isIPv6(generated)).toBe(true);
        expect(generated).toMatch(/^(?:[\da-f]{4}:){7}[\da-f]{4}$/);
        expect(subnet.check(generated, 'ipv6')).toBe(true);
      }
    }
  );

  it.each([
    ['::', '0000:0000:0000:0000:0000:0000:0000:0000'],
    ['::1', '0000:0000:0000:0000:0000:0000:0000:0001'],
    ['1::', '0001:0000:0000:0000:0000:0000:0000:0000'],
    ['1:2:3:4:5:6:7::', '0001:0002:0003:0004:0005:0006:0007:0000'],
    ['::1:2:3:4:5:6:7', '0000:0001:0002:0003:0004:0005:0006:0007'],
    ['1:2:3::4:5:6:7', '0001:0002:0003:0000:0004:0005:0006:0007'],
    ['2001:DB8::AbCd', '2001:0db8:0000:0000:0000:0000:0000:abcd'],
    ['1:2:3:4:5:6:7:8', '0001:0002:0003:0004:0005:0006:0007:0008'],
    ['::ffff:192.0.2.128', '0000:0000:0000:0000:0000:ffff:c000:0280'],
    ['::192.0.2.1', '0000:0000:0000:0000:0000:0000:c000:0201'],
    ['1:2:3:4:5:6:192.0.2.1', '0001:0002:0003:0004:0005:0006:c000:0201'],
    [
      'ffff:ffff:ffff:ffff:ffff:ffff:255.255.255.255',
      'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
    ],
  ])('should normalize %s for a /128 subnet', (address, expected) => {
    expect(faker.internet.ipv6({ cidrBlock: `${address}/128` })).toBe(expected);
  });

  it.each([
    ['2001:db8:1234:ffff::/48', '2001:db8:1234::/48'],
    ['2001:db8:1234:5fff:ffff:ffff:ffff:ffff/53', '2001:db8:1234:5800::/53'],
    ['::ffff:192.0.2.255/120', '0:0:0:0:0:ffff:c000:200/120'],
    ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/0', '::/0'],
  ])('should ignore host bits in %s', (cidrBlock, normalized) => {
    const actual = faker.internet.ipv6({ cidrBlock });
    faker.seed(1337);
    expect(actual).toBe(faker.internet.ipv6({ cidrBlock: normalized }));
  });

  it.each([
    [IPv6Network.Any, '::', 0],
    [IPv6Network.Loopback, '::1', 128],
    [IPv6Network.UniqueLocal, 'fd00::', 8],
    [IPv6Network.LinkLocal, 'fe80::', 64],
    [IPv6Network.Multicast, 'ff00::', 8],
    [IPv6Network.Documentation, '2001:db8::', 32],
  ] as const)(
    'should generate addresses in the %s network',
    (network, address, prefix) => {
      const subnet = new BlockList();
      subnet.addSubnet(address, prefix, 'ipv6');
      const actual = faker.internet.ipv6({ network });
      expect(subnet.check(actual, 'ipv6')).toBe(true);
      faker.seed(1337);
      expect(actual).toBe(
        faker.internet.ipv6({ cidrBlock: `${address}/${prefix}` })
      );
    }
  );

  it('should let an explicit CIDR block override the network preset', () => {
    expect(
      faker.internet.ipv6({ network: 'documentation', cidrBlock: '::1/128' })
    ).toBe('0000:0000:0000:0000:0000:0000:0000:0001');
  });

  it('should preserve the default seeded output and randomizer position', () => {
    const expected = Array.from({ length: 8 }, () =>
      faker.string.hexadecimal({ length: 4, casing: 'lower', prefix: '' })
    ).join(':');
    const next = faker.number.int();

    for (const options of [
      undefined,
      {},
      { network: 'any' },
      { cidrBlock: '::/0' },
    ] as const) {
      faker.seed(1337);
      expect(faker.internet.ipv6(options)).toBe(expected);
      expect(faker.number.int()).toBe(next);
    }
  });

  it('should not consume randomness for a /128 subnet', () => {
    const next = faker.number.int();
    faker.seed(1337);
    faker.internet.ipv6({ cidrBlock: '2001:db8::1234/128' });
    expect(faker.number.int()).toBe(next);
  });

  it('should support the standalone function without locale data', () => {
    const core = createFakerCore({ seed: 1337 });
    const options = { cidrBlock: '2001:db8::/32' };
    expect(internetIpv6(core, options)).toBe(faker.internet.ipv6(options));
  });

  it.each([
    [0, '2001:0db8:1234:5800:0000:0000:0000:0000'],
    [1 - Number.EPSILON, '2001:0db8:1234:5fff:ffff:ffff:ffff:ffff'],
  ])(
    'should include the subnet endpoint for random value %s',
    (value, expected) => {
      const core = createFakerCore();
      core.randomizer.next = () => value;
      expect(internetIpv6(core, { cidrBlock: '2001:db8:1234:5abc::/53' })).toBe(
        expected
      );
    }
  );

  it.each([
    '',
    '/64',
    '::',
    '::/',
    '::/-1',
    '::/129',
    '::/999',
    '::/0640',
    '::/6.4',
    '::/+64',
    '::/0x40',
    '::/1e2',
    '::/64/0',
    '::/64 ',
    '::/64\n',
    '::/ 64',
    ' ::/64',
    '::\n/64',
    '[::1]/128',
    'fe80::1%eth0/64',
    '192.0.2.1/24',
    '1:2:3:4:5:6:7/64',
    '1:2:3:4:5:6:7:8:9/64',
    '1:2:3:4:5:6:7:8::/64',
    '::1:2:3:4:5:6:7:8/64',
    '1::2::3/64',
    '1:::2/64',
    ':1:2:3:4:5:6:7/64',
    '1:2:3:4:5:6:7:/64',
    '2001:db8:10000::/64',
    '2001:db8:gggg::/64',
    '::ffff:256.0.2.1/120',
    '::ffff:192.00.2.1/120',
    '::ffff:192.0.2/120',
    '::ffff:192.0.2.1.2/120',
    '::ffff:192..2.1/120',
    '::ffff:192.0.2.1::/120',
    '1:2:3:4:5:192.0.2.1/120',
    '1:2:3:4:5:6::192.0.2.1/120',
    '::ffff:192.0.2.1:abcd/120',
  ])(
    'should reject malformed CIDR %j without consuming randomness',
    (cidrBlock) => {
      const next = faker.number.int();
      faker.seed(1337);
      expect(() => faker.internet.ipv6({ cidrBlock })).toThrow(
        new FakerError(
          `Invalid CIDR block provided: ${cidrBlock}. Must contain an IPv6 address and a prefix length between 0 and 128.`
        )
      );
      expect(faker.number.int()).toBe(next);
    }
  );
});
