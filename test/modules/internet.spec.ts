import { BlockList, isIPv6 } from 'node:net';
import {
  isEmail,
  isFQDN,
  isHexadecimal,
  isIP,
  isJWT,
  isMACAddress,
  isPort,
  isSlug,
  isStrongPassword,
  isURL,
} from 'validator';
import { beforeEach, describe, expect, it } from 'vitest';
import { allFakers, createFakerCore, faker, fakerKO } from '../../src';
import { FakerError } from '../../src/errors/faker-error';
import { IPv4Network, IPv6Network } from '../../src/modules/internet';
import { internetIpv6 } from '../../src/modules/internet/ipv6';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 5;

const refDate = '2020-01-01T00:00:00.000Z';

describe('internet', () => {
  seededTests(faker, 'internet', (t) => {
    t.itEach(
      'protocol',
      'httpMethod',
      'domainName',
      'domainSuffix',
      'domainWord',
      'ip',
      'jwtAlgorithm',
      'port',
      'userAgent'
    );

    t.describe('email', (t) => {
      t.it('noArgs')
        .it('with firstName option', { firstName: 'Jane' })
        .it('with lastName option', { lastName: 'Doe' })
        .it('with provider option', { provider: 'fakerjs.dev' })
        .it('with allowSpecialCharacters option', {
          allowSpecialCharacters: true,
        })
        .it('with all options', {
          allowSpecialCharacters: true,
          firstName: 'Jane',
          lastName: 'Doe',
          provider: 'fakerjs.dev',
        });
    });

    t.describe('exampleEmail', (t) => {
      t.it('noArgs')
        .it('with firstName option', { firstName: 'Jane' })
        .it('with lastName option', { lastName: 'Doe' })
        .it('with allowSpecialCharacters option', {
          allowSpecialCharacters: true,
        })
        .it('with all options', {
          allowSpecialCharacters: true,
          firstName: 'Jane',
          lastName: 'Doe',
        });
    });

    t.describe('username', (t) => {
      t.it('noArgs')
        .it('with firstName option', { firstName: 'Jane' })
        .it('with lastName option', { lastName: 'Doe' })
        .it('with all option', { firstName: 'Jane', lastName: 'Doe' })
        .it('with Latin names', { firstName: 'Jane', lastName: 'Doe' })
        .it('with accented names', { firstName: 'Hélene', lastName: 'Müller' })
        .it('with Cyrillic names', {
          firstName: 'Фёдор',
          lastName: 'Достоевский',
        })
        .it('with Chinese names', { firstName: '大羽', lastName: '陳' });
    });

    t.describe('displayName', (t) => {
      t.it('noArgs')
        .it('with firstName option', { firstName: 'Jane' })
        .it('with lastName option', { lastName: 'Doe' })
        .it('with all option', { firstName: 'Jane', lastName: 'Doe' })
        .it('with Latin names', { firstName: 'Jane', lastName: 'Doe' })
        .it('with accented names', { firstName: 'Hélene', lastName: 'Müller' })
        .it('with Cyrillic names', {
          firstName: 'Фёдор',
          lastName: 'Достоевский',
        })
        .it('with Chinese names', { firstName: '大羽', lastName: '陳' });
    });

    t.describe('password', (t) => {
      t.it('noArgs')
        .it('with length option', { length: 10 })
        .it('with memorable option', {
          memorable: false,
        })
        .it('with pattern option', {
          pattern: /[0-9]/,
        })
        .it('with prefix option', {
          prefix: 'test',
        })
        .it('with length, memorable, pattern and prefix option', {
          length: 10,
          memorable: false,
          pattern: /[0-9]/,
          prefix: 'test',
        });
    });

    t.describe('httpStatusCode', (t) => {
      t.it('noArgs').it('with options', { types: ['clientError'] });
    });

    t.describe('mac', (t) => {
      t.it('noArgs')
        .it('with separator', ':')
        .it('with separator option', { separator: '-' });
    });

    t.describe('emoji', (t) => {
      t.it('noArgs').it('with options', { types: ['nature'] });
    });

    t.describe('url', (t) => {
      t.it('noArgs')
        .it('with slash appended', { appendSlash: true })
        .it('without slash appended and with http protocol', {
          appendSlash: false,
          protocol: 'http',
        });
    });

    t.describe('ipv4', (t) => {
      t.it('noArgs')
        .it('with cidrBlock', { cidrBlock: '192.168.13.37/24' })
        .it('with network', { network: IPv4Network.Multicast });
    });

    t.describe('ipv6', (t) => {
      t.it('noArgs')
        .it('with cidrBlock', { cidrBlock: '2001:db8:1234:5678::/53' })
        .it('with dotted-decimal IPv4', { cidrBlock: '::ffff:192.0.2.128/120' })
        .it('with network', { network: IPv6Network.LinkLocal })
        .it('with cidrBlock overriding network', {
          cidrBlock: '2001:db8::/32',
          network: IPv6Network.Loopback,
        });
    });

    t.describe('jwt', (t) => {
      t.it('noArgs', { refDate })
        .it('with custom header', { header: { alg: 'ES256' }, refDate })
        .it('with custom payload', { payload: { iss: 'Acme' }, refDate });
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('email()', () => {
        it('should return an email', () => {
          const email = faker.internet.email();

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [, suffix] = email.split('@', 2);
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it.each(Object.entries(allFakers))(
          'should return a valid email in %s',
          (locale, localeFaker) => {
            if (locale === 'base') {
              return;
            }

            const email = localeFaker.internet.email();

            expect(email).toBeTruthy();
            expect(email).toBeTypeOf('string');
            expect(email).toSatisfy(isEmail);
          }
        );

        it('should return an email with given firstName', () => {
          const email = faker.internet.email({ firstName: 'Aiden.Harann55' });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix, suffix] = email.split('@', 2);

          expect(prefix).includes('Aiden.Harann55');
          expect(prefix).toMatch(
            /^(Aiden\.Harann55((\d{1,2})|([._][A-Za-z]*(\d{1,2})?)))/
          );
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it('should not allow an email that starts or ends with a .', () => {
          const email = faker.internet.email({
            firstName: '...Aiden...',
            lastName: '...Doe...',
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix] = email.split('@', 1);
          expect(prefix).not.toMatch(/^\./);
          expect(prefix).not.toMatch(/\.$/);
        });

        it('should not allow an email with multiple dots', () => {
          const email = faker.internet.email({ firstName: 'Ai....den' });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix] = email.split('@', 1);
          //expect it not to contain multiple .s
          expect(prefix).not.toMatch(/\.{2,}/);
        });

        it('should return an email with given firstName and lastName', () => {
          const email = faker.internet.email({
            firstName: 'Aiden',
            lastName: 'Harann',
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix, suffix] = email.split('@', 2);

          expect(prefix).includes('Aiden');
          expect(prefix).includes('Harann');
          expect(prefix).toMatch(/^Aiden[._]Harann\d*/);
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it('should return a valid email for very long names', () => {
          const longFirstName =
            'Elizabeth Alexandra Mary Jane Annabel Victoria';
          const longSurname = 'Smith Jones Davidson Brown White Greene Black';
          const email = faker.internet.email({
            firstName: longFirstName,
            lastName: longSurname,
          });
          // should truncate to 50 chars
          // e.g. ElizabethAlexandraMaryJaneAnnabelVictoria.SmithJon@yahoo.com
          expect(email).toSatisfy(isEmail);
          const localPart = email.split('@', 1)[0];
          expect(localPart.length).toBeLessThanOrEqual(50);
        });

        it('should return a valid email for names with invalid chars', () => {
          const email = faker.internet.email({
            firstName: 'Matthew (Matt)',
            lastName: 'Smith',
          });
          // should strip invalid chars
          // e.g. MatthewMatt_Smith@yahoo.com
          expect(email).toSatisfy(isEmail);
        });

        it('should return an email with special characters', () => {
          const email = faker.internet.email({
            firstName: 'Mike',
            lastName: 'Smith',
            allowSpecialCharacters: true,
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix, suffix] = email.split('@', 2);

          expect(prefix).toMatch(/^Mike[.!#$%&'*+-/=?^_`{|}~]Smith\d*/);
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });
      });

      describe('exampleEmail()', () => {
        it('should return an email with the example suffix', () => {
          const email = faker.internet.exampleEmail();

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const suffix = email.split('@', 2)[1];

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
        });

        it('should return an email with the example suffix and given firstName', () => {
          const email = faker.internet.exampleEmail({
            firstName: 'Aiden.Harann55',
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix, suffix] = email.split('@', 2);

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^Aiden.Harann55/);
        });

        it('should return an email with the example suffix and given firstName and lastName', () => {
          const email = faker.internet.exampleEmail({
            firstName: 'Aiden',
            lastName: 'Harann',
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix, suffix] = email.split('@', 2);
          expect(email).includes('Aiden');
          expect(email).includes('Harann');

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^Aiden[._]Harann\d*/);
        });

        it('should return an email with special characters', () => {
          const email = faker.internet.exampleEmail({
            firstName: 'Mike',
            lastName: 'Smith',
            allowSpecialCharacters: true,
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(isEmail);

          const [prefix, suffix] = email.split('@', 2);

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).includes('Mike');
          expect(prefix).includes('Smith');
          expect(prefix).toMatch(/^Mike[.!#$%&'*+-/=?^_`{|}~]Smith\d*/);
        });
      });

      describe('username()', () => {
        it('should return a random username', () => {
          const username = faker.internet.username();

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).toMatch(/\w/);
        });

        it('should return a random username with given firstName', () => {
          const username = faker.internet.username({ firstName: 'Aiden' });

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).toMatch(/\w/);
          expect(username).includes('Aiden');
        });

        it('should return a random username with given firstName and lastName', () => {
          const username = faker.internet.username({
            firstName: 'Aiden',
            lastName: 'Harann',
          });

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).includes('Aiden');
          expect(username).includes('Harann');
          expect(username).toMatch(/^Aiden[._]Harann\d*/);
        });

        it('should strip accents', () => {
          const username = faker.internet.username({
            firstName: 'Adèle',
            lastName: 'Smith',
          });
          expect(username).includes('Adele');
          expect(username).includes('Smith');
        });

        it('should transliterate Cyrillic', () => {
          const username = faker.internet.username({
            firstName: 'Амос',
            lastName: 'Васильев',
          });
          expect(username).includes('Amos');
        });

        it('should provide a fallback for Chinese etc', () => {
          const username = faker.internet.username({
            firstName: '大羽',
            lastName: '陳',
          });
          expect(username).includes('hlzp8d');
        });

        it('should provide a fallback special unicode characters', () => {
          const username = faker.internet.username({
            firstName: '🐼',
            lastName: '❤️',
          });
          expect(username).includes('2qt8');
        });
      });

      describe('displayName()', () => {
        it('should return a random display name', () => {
          const displayName = faker.internet.displayName();

          expect(displayName).toBeTruthy();
          expect(displayName).toBeTypeOf('string');
          expect(displayName).toMatch(/\w/);
        });

        it('should return a random display name with given firstName', () => {
          const displayName = faker.internet.displayName({
            firstName: 'Aiden',
          });

          expect(displayName).toBeTruthy();
          expect(displayName).toBeTypeOf('string');
          expect(displayName).toMatch(/\w/);
          expect(displayName).includes('Aiden');
        });

        it('should return a random display name with given firstName and lastName', () => {
          const displayName = faker.internet.displayName({
            firstName: 'Aiden',
            lastName: 'Harann',
          });

          expect(displayName).toBeTruthy();
          expect(displayName).toBeTypeOf('string');
          expect(displayName).includes('Aiden');
          expect(displayName).toMatch(
            /^Aiden((\d{1,2})|([._]Harann\d{1,2})|([._](Harann)))/
          );
        });
      });

      describe('protocol()', () => {
        it('should return a valid protocol', () => {
          const protocol = faker.internet.protocol();
          expect(protocol).toBeTruthy();
          expect(protocol).toBeTypeOf('string');
          expect(protocol).toMatch(/^https?$/);
        });
      });

      describe('httpMethod()', () => {
        const httpMethods = [
          'GET',
          'POST',
          'PUT',
          'DELETE',
          'PATCH',
          'HEAD',
          'OPTIONS',
        ];

        it('should return a valid http method', () => {
          const httpMethod = faker.internet.httpMethod();

          expect(httpMethod).toBeTruthy();
          expect(httpMethod).toBeTypeOf('string');
          expect(httpMethods).toContain(httpMethod);
        });
      });

      describe('httpStatusCode', () => {
        it('should return a random HTTP status code', () => {
          const httpStatusCode = faker.internet.httpStatusCode();

          expect(httpStatusCode).toBeTruthy();
          expect(httpStatusCode).toBeTypeOf('number');
          expect(httpStatusCode).toBeLessThanOrEqual(600);
        });

        it('should return a correct status code for multiple classes', () => {
          const httpStatusCode = faker.internet.httpStatusCode({
            types: ['informational', 'success', 'redirection'],
          });

          expect(httpStatusCode).toBeTruthy();
          expect(httpStatusCode).toBeTypeOf('number');
          expect(httpStatusCode).toBeGreaterThanOrEqual(100);
          expect(httpStatusCode).toBeLessThan(400);
        });

        it('should return a correct status code for a single class', () => {
          const httpStatusCode = faker.internet.httpStatusCode({
            types: ['serverError'],
          });

          expect(httpStatusCode).toBeTruthy();
          expect(httpStatusCode).toBeTypeOf('number');
          expect(httpStatusCode).toBeGreaterThanOrEqual(500);
          expect(httpStatusCode).toBeLessThan(600);
        });
      });

      describe('url()', () => {
        it('should return a valid url', () => {
          const url = faker.internet.url();

          expect(url).toBeTruthy();
          expect(url).toBeTypeOf('string');
          expect(url).toSatisfy(isURL);
        });

        it('should return a valid url with slash appended at the end', () => {
          const url = faker.internet.url({ appendSlash: true });

          expect(url).toBeTruthy();
          expect(url).toBeTypeOf('string');
          expect(url).toSatisfy(isURL);
          expect(url.endsWith('/')).toBeTruthy();
        });

        it('should return a valid url with given protocol', () => {
          const url = faker.internet.url({ protocol: 'http' });

          expect(url).toBeTruthy();
          expect(url).toBeTypeOf('string');
          expect(url).toSatisfy(isURL);
        });
      });

      describe('domainName()', () => {
        it('should return a domainWord plus a random suffix', () => {
          const domainName = faker.internet.domainName();

          expect(domainName).toBeTruthy();
          expect(domainName).toBeTypeOf('string');
          expect(domainName).toSatisfy(isFQDN);

          const [prefix, suffix] = domainName.split('.', 2);

          expect(prefix).toSatisfy(isSlug);
          expect(faker.definitions.internet.domain_suffix).toContain(suffix);
        });
      });

      describe('domainSuffix', () => {
        it('should return a random domainSuffix', () => {
          const domainSuffix = faker.internet.domainSuffix();

          expect(domainSuffix).toBeTruthy();
          expect(domainSuffix).toBeTypeOf('string');
          expect(faker.definitions.internet.domain_suffix).toContain(
            domainSuffix
          );
        });
      });

      describe('domainWord()', () => {
        it('should return a lower-case adjective + noun', () => {
          const domainWord = faker.internet.domainWord();

          expect(domainWord).toBeTruthy();
          expect(domainWord).toBeTypeOf('string');
          expect(domainWord).toSatisfy(isSlug);
          expect(domainWord).toSatisfy((value: string) =>
            isFQDN(value, { require_tld: false })
          );
        });

        it('should return a lower-case domain in non-ASCII locales', () => {
          const domainWord = fakerKO.internet.domainWord();

          expect(domainWord).toBeTruthy();
          expect(domainWord).toBeTypeOf('string');
          expect(domainWord).toSatisfy(isSlug);
          expect(domainWord).toSatisfy((value: string) =>
            isFQDN(value, { require_tld: false })
          );
        });
      });

      describe('ip()', () => {
        it('should return a random IPv4 or IPv6 address', () => {
          const ip = faker.internet.ip();

          expect(ip).toBeTruthy();
          expect(ip).toBeTypeOf('string');
          expect(ip).toSatisfy(isIP);
        });
      });

      describe('ipv4()', () => {
        it('should return a random IPv4 with four parts', () => {
          const ip = faker.internet.ipv4();

          expect(ip).toBeTruthy();
          expect(ip).toBeTypeOf('string');
          expect(ip).toSatisfy((value: string) => isIP(value, 4));

          const parts = ip.split('.');

          expect(parts).toHaveLength(4);

          for (const part of parts) {
            expect(part).toMatch(/^\d+$/);
            expect(+part).toBeGreaterThanOrEqual(0);
            expect(+part).toBeLessThanOrEqual(255);
          }
        });

        it('should return a random IPv4 for a given CIDR block', () => {
          const actual = faker.internet.ipv4({
            cidrBlock: '192.168.42.255/24',
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).toSatisfy((value: string) => isIP(value, 4));
          expect(actual).toMatch(/^192\.168\.42\.\d{1,3}$/);
        });

        it('should return a random IPv4 for a given CIDR block non-8ish network mask', () => {
          const actual = faker.internet.ipv4({
            cidrBlock: '192.168.0.255/20',
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).toSatisfy((value: string) => isIP(value, 4));

          const [first, second, third, fourth] = actual.split('.').map(Number);
          expect(first).toBe(192);
          expect(second).toBe(168);
          expect(third).toBeGreaterThanOrEqual(0);
          expect(third).toBeLessThanOrEqual(15);
          expect(fourth).toBeGreaterThanOrEqual(0);
          expect(fourth).toBeLessThanOrEqual(255);
        });

        it('should return the input IPv4 for a /32 CIDR block', () => {
          const actual = faker.internet.ipv4({
            cidrBlock: '192.168.0.255/32',
          });

          expect(actual).toBe('192.168.0.255');
        });

        it.each([
          '',
          '...',
          '.../',
          '.0.0.0/0',
          '0..0.0/0',
          '0.0..0/0',
          '0.0.0./0',
          '0.0.0.0/',
          'a.0.0.0/0',
          '0.b.0.0/0',
          '0.0.c.0/0',
          '0.0.0.d/0',
          '0.0.0.0/e',
        ])(
          'should throw an error if not following the x.x.x.x/y format',
          (cidrBlock) => {
            expect(() =>
              faker.internet.ipv4({
                cidrBlock,
              })
            ).toThrow(
              new FakerError(
                `Invalid CIDR block provided: ${cidrBlock}. Must be in the format x.x.x.x/y.`
              )
            );
          }
        );

        it('should throw an error for CIDR prefix lengths above 32', () => {
          const cidrBlock = '192.168.0.0/33';

          expect(() =>
            faker.internet.ipv4({
              cidrBlock,
            })
          ).toThrow(
            new FakerError(
              `Invalid CIDR block provided: ${cidrBlock}. Prefix length must be between 0 and 32.`
            )
          );
        });

        it('should throw an error for CIDR blocks with octets above 255', () => {
          const cidrBlock = '192.168.0.256/24';

          expect(() =>
            faker.internet.ipv4({
              cidrBlock,
            })
          ).toThrow(
            new FakerError(
              `Invalid CIDR block provided: ${cidrBlock}. Each octet must be between 0 and 255.`
            )
          );
        });

        it.each([
          [IPv4Network.Any, /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/],
          [IPv4Network.Loopback, /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/],
          [IPv4Network.PrivateA, /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/],
          [
            IPv4Network.PrivateB,
            /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/,
          ],
          [IPv4Network.PrivateC, /^192\.168\.\d{1,3}\.\d{1,3}$/],
          [IPv4Network.TestNet1, /^192\.0\.2\.\d{1,3}$/],
          [IPv4Network.TestNet2, /^198\.51\.100\.\d{1,3}$/],
          [IPv4Network.TestNet3, /^203\.0\.113\.\d{1,3}$/],
          [IPv4Network.LinkLocal, /^169\.254\.\d{1,3}\.\d{1,3}$/],
          [
            IPv4Network.Multicast,
            /^2(2[4-9]|3[0-9])\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
          ],
        ] as const)(
          'should return a random IPv4 for %s network',
          (network, regex) => {
            const actual = faker.internet.ipv4({ network });

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');
            expect(actual).toSatisfy((value: string) => isIP(value, 4));
            expect(actual).toMatch(regex);
          }
        );
      });

      describe('ipv6()', () => {
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
          expect(faker.internet.ipv6({ cidrBlock: `${address}/128` })).toBe(
            expected
          );
        });

        it.each([
          ['2001:db8:1234:ffff::/48', '2001:db8:1234::/48'],
          [
            '2001:db8:1234:5fff:ffff:ffff:ffff:ffff/53',
            '2001:db8:1234:5800::/53',
          ],
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

        it.each(['invalid', 'toString'])(
          'should reject the unknown network %s with a helpful error',
          (network) => {
            expect(() =>
              faker.internet.ipv6({ network: network as IPv6Network })
            ).toThrow(
              new FakerError(
                `Invalid network provided: ${network}. Must be one of: any, loopback, unique-local, link-local, multicast, documentation.`
              )
            );
          }
        );

        it.each(['documentation', 'invalid', 'toString'])(
          'should let an explicit CIDR block override the network %s',
          (network) => {
            expect(
              faker.internet.ipv6({
                network: network as IPv6Network,
                cidrBlock: '::1/128',
              })
            ).toBe('0000:0000:0000:0000:0000:0000:0000:0001');
          }
        );

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
          expect(internetIpv6(core, options)).toBe(
            faker.internet.ipv6(options)
          );
        });

        it.each([
          [0, '2001:0db8:1234:5800:0000:0000:0000:0000'],
          [1 - Number.EPSILON, '2001:0db8:1234:5fff:ffff:ffff:ffff:ffff'],
        ])(
          'should include the subnet endpoint for random value %s',
          (value, expected) => {
            const core = createFakerCore();
            core.randomizer.next = () => value;
            expect(
              internetIpv6(core, { cidrBlock: '2001:db8:1234:5abc::/53' })
            ).toBe(expected);
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

        it('should return a random IPv6 address with eight parts', () => {
          const ipv6 = faker.internet.ipv6();

          expect(ipv6).toBeTruthy();
          expect(ipv6).toBeTypeOf('string');
          expect(ipv6).toSatisfy((value: string) => isIP(value, 6));

          const parts = ipv6.split(':');

          expect(parts).toHaveLength(8);
        });
      });

      describe('port()', () => {
        it('should return a random port number', () => {
          const port = faker.internet.port();

          expect(port).toBeTypeOf('number');
          expect(port).toBeGreaterThanOrEqual(1);
          expect(port).toBeLessThanOrEqual(65535);
          expect(String(port)).toSatisfy(isPort);
        });
      });

      describe('userAgent()', () => {
        it('should return a valid user-agent', () => {
          const ua = faker.internet.userAgent();

          expect(ua).toBeTruthy();
          expect(ua).toBeTypeOf('string');
          expect(ua.length).toBeGreaterThanOrEqual(1);
          expect(ua).includes('/');
        });
      });

      describe('mac()', () => {
        it('should return a random MAC address with 6 hexadecimal digits', () => {
          const mac = faker.internet.mac();

          expect(mac).toBeTruthy();
          expect(mac).toBeTypeOf('string');
          expect(mac).toHaveLength(17);
          expect(mac).toMatch(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/);
          expect(mac).toSatisfy(isMACAddress);
        });

        it('should return a random MAC address with 6 hexadecimal digits and given separator', () => {
          const mac = faker.internet.mac('-');

          expect(mac).toBeTruthy();
          expect(mac).toBeTypeOf('string');
          expect(mac).toHaveLength(17);
          expect(mac).toMatch(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/);
          expect(mac).toSatisfy(isMACAddress);
        });

        it('should return a random MAC address with 6 hexadecimal digits and empty separator', () => {
          const mac = faker.internet.mac('');

          expect(mac).toBeTruthy();
          expect(mac).toBeTypeOf('string');
          expect(mac).toSatisfy(isHexadecimal);
          expect(mac).toHaveLength(12);
          // It's not a valid MAC address
        });

        it.each(['!', '&', '%', '?', '$'])(
          "uses the default (':') if we provide an unacceptable separator ('%s')",
          (separator) => {
            const mac = faker.internet.mac(separator);

            expect(mac).toBeTruthy();
            expect(mac).toBeTypeOf('string');
            expect(mac).toHaveLength(17);
            expect(mac).toMatch(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/);
            expect(mac).toSatisfy(isMACAddress);
          }
        );
      });

      describe('password', () => {
        it('should return random password', () => {
          const password = faker.internet.password();

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(15);
          expect(password).toMatch(/^\w{15}$/);
        });

        it.each(times(32))(
          'should return random password with length %i',
          (length) => {
            const password = faker.internet.password({ length });

            expect(password).toBeTruthy();
            expect(password).toBeTypeOf('string');
            expect(password).toHaveLength(length);
            expect(password).toMatch(/^\w+$/);
          }
        );

        it('should return memorable password', () => {
          const password = faker.internet.password({
            length: 12,
            memorable: true,
          });

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(12);
          expect(password).toMatch(/^\w{12}$/);
        });

        it('should return non memorable password', () => {
          const password = faker.internet.password({
            length: 12,
            memorable: false,
          });

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(12);
          expect(password).toMatch(/^\w{12}$/);
          // TODO @Shinigami92 2022-02-11: I would say a non memorable password should satisfy `validator.isStrongPassword`, but it does not currently
          //expect(password).toSatisfy(validator.isStrongPassword);
        });

        it('should return non memorable strong password with length 32', () => {
          const password = faker.internet.password({
            length: 32,
            memorable: false,
            pattern: /(!|\?|&|\[|\]|%|\$|[a-zA-Z0-9])/,
          });

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(32);
          // TODO @Shinigami92 2022-02-11: This should definitely be a strong password, but it doesn't :(
          //expect(password).toSatisfy(validator.isStrongPassword);
        });

        it('should return non memorable strong password with length 32 and given prefix', () => {
          const password = faker.internet.password({
            length: 32,
            memorable: false,
            pattern: /(!|\?|&|\[|\]|%|\$|[a-zA-Z0-9])/,
            prefix: 'a!G6',
          });

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(32);
          expect(password).toStartWith('a!G6');
          expect(password).toSatisfy(isStrongPassword);
        });

        it('should generate long passwords without overflowing the call stack', () => {
          // Regression test: password generation used to recurse once per character, throwing a RangeError for lengths of ~5000 and above.
          const length = 100_000;

          expect(() => faker.internet.password({ length })).not.toThrow();
        });
      });

      describe('emoji', () => {
        it('should return a random emoji', () => {
          const emoji = faker.internet.emoji();

          expect(emoji).toBeTruthy();
          expect(emoji).toBeTypeOf('string');
          expect(emoji.length).toBeGreaterThanOrEqual(1);
        });
      });

      describe('jwt', () => {
        it('should return a random jwt', () => {
          const jwt = faker.internet.jwt();

          expect(jwt).toBeTruthy();
          expect(jwt).toBeTypeOf('string');
          expect(jwt).toSatisfy(isJWT);
        });

        it('should return the header and payload values from the token', () => {
          const header = {
            kid: faker.string.alphanumeric(),
          };

          const payload = {
            nonce: faker.string.alphanumeric(),
          };

          const actual = faker.internet.jwt({ header, payload });

          expect(actual).toBeTypeOf('string');
          expect(actual).toSatisfy(isJWT);

          const parts = actual.split('.');

          expect(
            JSON.parse(Buffer.from(parts[0], 'base64url').toString('ascii'))
          ).toMatchObject(header);
          expect(
            JSON.parse(Buffer.from(parts[1], 'base64url').toString('ascii'))
          ).toMatchObject(payload);
        });
      });
    }
  );
});
