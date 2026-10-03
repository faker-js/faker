import { describe, expectTypeOf, it } from 'vitest';
import type { IPv6NetworkType } from '../../src';
import { IPv6Network, faker } from '../../src';

describe('internet', () => {
  it('should accept IPv6 network enums and their string values', () => {
    expectTypeOf<IPv6Network>().toExtend<IPv6NetworkType>();
    expectTypeOf(
      faker.internet.ipv6({ network: IPv6Network.UniqueLocal })
    ).toBeString();
    expectTypeOf(
      faker.internet.ipv6({ network: 'documentation' })
    ).toBeString();
    expectTypeOf(
      faker.internet.ipv6({ network: 'any', cidrBlock: '2001:db8::/32' })
    ).toBeString();
    expectTypeOf(faker.internet.ipv6).toBeCallableWith();
    expectTypeOf(faker.internet.ipv6).toBeCallableWith({});
    expectTypeOf(faker.internet.ipv6).toBeCallableWith({
      // @ts-expect-error IPv4-only presets are not valid IPv6 networks.
      network: 'private-a',
    });
  });
});
