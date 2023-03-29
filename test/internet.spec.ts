import validator from 'validator';
import { describe, expect, it } from 'vitest';
import { allFakers, faker } from '../src';
import { seededTests } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('internet', () => {
  seededTests(faker, 'internet', (t) => {
    t.itEach(
      'avatar',
      'protocol',
      'httpMethod',
      'domainName',
      'domainSuffix',
      'domainWord',
      'ip',
      'ipv4',
      'ipv6',
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
        })
        .it('with legacy names', 'Jane', 'Doe')
        .it('with legacy provider', undefined, undefined, 'fakerjs.dev')
        .it('with legacy names and provider', 'Jane', 'Doe', 'fakerjs.dev');
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
        })
        .it('with legacy names', 'Jane', 'Doe')
        .it('with legacy names and options', 'Jane', 'Doe', {
          allowSpecialCharacters: true,
        });
    });

    t.describe('userName', (t) => {
      t.it('noArgs')
        .it('with firstName option', { firstName: 'Jane' })
        .it('with lastName option', { lastName: 'Doe' })
        .it('with all option', { firstName: 'Jane', lastName: 'Doe' })
        .it('with legacy names', 'Jane', 'Doe')
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
        .it('with legacy names', 'Jane', 'Doe')
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
        })
        .it('with legacy length', 10)
        .it('with legacy length and memorable', 10, false)
        .it('with legacy length, memorable and pattern', 10, false, /[0-9]/)
        .it(
          'with legacy length, memorable, pattern and prefix',
          10,
          false,
          /[0-9]/,
          'test'
        );
    });

    t.describe('httpStatusCode', (t) => {
      t.it('noArgs').it('with options', { types: ['clientError'] });
    });

    t.describe('color', (t) => {
      t.it('noArgs')
        .it('with blueBase option', { blueBase: 100 })
        .it('with greenBase option', { greenBase: 100 })
        .it('with redBase option', { redBase: 100 })
        .it('with all options', {
          redBase: 100,
          blueBase: 100,
          greenBase: 100,
        })
        .it('with legacy color base', 100, 100, 100);
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
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('avatar', () => {
        it('should return a random avatar url', () => {
          const avatar = faker.internet.avatar();

          expect(avatar).toBeTruthy();
          expect(avatar).toBeTypeOf('string');
          expect(avatar).toSatisfy(validator.isURL);
          expect(avatar).toMatch(
            /^https:\/\/cloudflare-ipfs.com\/ipfs\/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye\/avatar\/\d+.jpg$/
          );
        });
      });

      describe('email()', () => {
        it('should return an email', () => {
          const email = faker.internet.email();

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [, suffix] = email.split('@');
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
            expect(email).toSatisfy(validator.isEmail);
          }
        );

        it('should return an email with given firstName', () => {
          const email = faker.internet.email({ firstName: 'Aiden.Harann55' });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).includes('Aiden.Harann55');
          expect(prefix).toMatch(
            /^(Aiden\.Harann55((\d{1,2})|([._][A-Za-z]*(\d{1,2})?)))/
          );
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it('should not allow an email that starts or ends with a .', () => {
          const email = faker.internet.email('...Aiden...', '...Doe...');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix] = email.split('@');
          expect(prefix).not.toMatch(/^\./);
          expect(prefix).not.toMatch(/\.$/);
        });

        it('should not allow an email with multiple dots', () => {
          const email = faker.internet.email('Ai....den');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix] = email.split('@');
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
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).includes('Aiden');
          expect(prefix).toMatch(
            /^Aiden((\d{1,2})|([._]Harann\d{1,2})|([._](Harann)))/
          );
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
          expect(email).toSatisfy(validator.isEmail);
          const localPart = email.split('@')[0];
          expect(localPart.length).toBeLessThanOrEqual(50);
        });

        it('should return a valid email for names with invalid chars', () => {
          const email = faker.internet.email({
            firstName: 'Matthew (Matt)',
            lastName: 'Smith',
          });
          // should strip invalid chars
          // e.g. MatthewMatt_Smith@yahoo.com
          expect(email).toSatisfy(validator.isEmail);
        });

        it('should return an email with special characters', () => {
          const email = faker.internet.email({
            firstName: 'Mike',
            lastName: 'Smith',
            allowSpecialCharacters: true,
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).toMatch(
            /^Mike((\d{1,2})|([.!#$%&'*+-/=?^_`{|}~]Smith\d{1,2})|([.!#$%&'*+-/=?^_`{|}~]Smith))/
          );
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });
      });

      describe('exampleEmail()', () => {
        it('should return an email with the example suffix', () => {
          const email = faker.internet.exampleEmail();

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const suffix = email.split('@')[1];

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
        });

        it('should return an email with the example suffix and given firstName', () => {
          const email = faker.internet.exampleEmail({
            firstName: 'Aiden.Harann55',
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

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
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^Aiden([._]Harann)?\d*/);
        });

        it('should return an email with special characters', () => {
          const email = faker.internet.exampleEmail({
            firstName: 'Mike',
            lastName: 'Smith',
            allowSpecialCharacters: true,
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^Mike([.!#$%&'*+-/=?^_`{|}~]Smith)?\d*/);
        });
      });

      describe('userName()', () => {
        it('should return a random username', () => {
          const username = faker.internet.userName();

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).toMatch(/\w/);
        });

        it('should return a random username with given firstName', () => {
          const username = faker.internet.userName({ firstName: 'Aiden' });

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).toMatch(/\w/);
          expect(username).includes('Aiden');
        });

        it('should return a random username with given firstName and lastName', () => {
          const username = faker.internet.userName({
            firstName: 'Aiden',
            lastName: 'Harann',
          });

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).includes('Aiden');
          expect(username).toMatch(
            /^Aiden((\d{1,2})|([._]Harann\d{1,2})|([._](Harann)))/
          );
        });

        it('should strip accents', () => {
          const username = faker.internet.userName({
            firstName: 'Adèle',
            lastName: 'Smith',
          });
          expect(username).includes('Adele');
        });

        it('should transliterate Cyrillic', () => {
          const username = faker.internet.userName({
            firstName: 'Амос',
            lastName: 'Васильев',
          });
          expect(username).includes('Amos');
        });

        it('should provide a fallback for Chinese etc', () => {
          const username = faker.internet.userName('大羽', '陳');
          expect(username).includes('hlzp8d');
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
          expect(url).toSatisfy(validator.isURL);
        });

        it('should return a valid url with slash appended at the end', () => {
          const url = faker.internet.url({ appendSlash: true });

          expect(url).toBeTruthy();
          expect(url).toBeTypeOf('string');
          expect(url).toSatisfy(validator.isURL);
          expect(url.endsWith('/')).toBeTruthy();
        });

        it('should return a valid url with given protocol', () => {
          const url = faker.internet.url({ protocol: 'http' });

          expect(url).toBeTruthy();
          expect(url).toBeTypeOf('string');
          expect(url).toSatisfy(validator.isURL);
        });
      });

      describe('domainName()', () => {
        it('should return a domainWord plus a random suffix', () => {
          const domainName = faker.internet.domainName();

          expect(domainName).toBeTruthy();
          expect(domainName).toBeTypeOf('string');
          expect(domainName).toSatisfy(validator.isFQDN);

          const [prefix, suffix] = domainName.split('.');

          expect(prefix).toSatisfy(validator.isSlug);
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
          expect(domainWord).toSatisfy(validator.isSlug);
          expect(domainWord).toSatisfy((value: string) =>
            validator.isFQDN(value, { require_tld: false })
          );
        });
      });

      describe('ip()', () => {
        it('should return a random IPv4 or IPv6 address', () => {
          const ip = faker.internet.ip();

          expect(ip).toBeTruthy();
          expect(ip).toBeTypeOf('string');
          expect(ip).toSatisfy(validator.isIP);
        });
      });

      describe('ipv4()', () => {
        it('should return a random IPv4 with four parts', () => {
          const ip = faker.internet.ipv4();

          expect(ip).toBeTruthy();
          expect(ip).toBeTypeOf('string');
          expect(ip).toSatisfy((value: string) => validator.isIP(value, 4));

          const parts = ip.split('.');

          expect(parts).toHaveLength(4);

          for (const part of parts) {
            expect(part).toMatch(/^\d+$/);
            expect(+part).toBeGreaterThanOrEqual(0);
            expect(+part).toBeLessThanOrEqual(255);
          }
        });
      });

      describe('ipv6()', () => {
        it('should return a random IPv6 address with eight parts', () => {
          const ipv6 = faker.internet.ipv6();

          expect(ipv6).toBeTruthy();
          expect(ipv6).toBeTypeOf('string');
          expect(ipv6).toSatisfy((value: string) => validator.isIP(value, 6));

          const parts = ipv6.split(':');

          expect(parts).toHaveLength(8);
        });
      });

      describe('port()', () => {
        it('should return a random port number', () => {
          const port = faker.internet.port();

          expect(port).toBeTypeOf('number');
          expect(port).toBeGreaterThanOrEqual(0);
          expect(port).toBeLessThanOrEqual(65535);
          expect(String(port)).toSatisfy(validator.isPort);
        });
      });

      describe('userAgent()', () => {
        it('should return a valid user-agent', () => {
          const ua = faker.internet.userAgent();

          expect(ua).toBeTruthy();
          expect(ua).toBeTypeOf('string');
          expect(ua.length).toBeGreaterThanOrEqual(1);
          expect(ua).toMatch(
            /^(([^\d]+\/[\dA-Za-z\.]+(\s\(.*\)))|([^\d]+\/[\dA-Za-z\.]+(\s\(.*\)*))(\s[^\d]+\/[\dA-Za-z\.]+(\s\(.*\)*))*)$/
          );
        });
      });

      describe('color()', () => {
        it('should return a random hex value', () => {
          const color = faker.internet.color();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
          expect(color).toSatisfy(validator.isHexColor);
        });

        it('should return a random hex value with given values', () => {
          const color = faker.internet.color({
            redBase: 100,
            greenBase: 100,
            blueBase: 100,
          });

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
          expect(color).toSatisfy(validator.isHexColor);
        });
      });

      describe('mac()', () => {
        it('should return a random MAC address with 6 hexadecimal digits', () => {
          const mac = faker.internet.mac();

          expect(mac).toBeTruthy();
          expect(mac).toBeTypeOf('string');
          expect(mac).toHaveLength(17);
          expect(mac).toMatch(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/);
          expect(mac).toSatisfy(validator.isMACAddress);
        });

        it('should return a random MAC address with 6 hexadecimal digits and given separator', () => {
          const mac = faker.internet.mac('-');

          expect(mac).toBeTruthy();
          expect(mac).toBeTypeOf('string');
          expect(mac).toHaveLength(17);
          expect(mac).toMatch(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/);
          expect(mac).toSatisfy(validator.isMACAddress);
        });

        it('should return a random MAC address with 6 hexadecimal digits and empty separator', () => {
          const mac = faker.internet.mac('');

          expect(mac).toBeTruthy();
          expect(mac).toBeTypeOf('string');
          expect(mac).toSatisfy(validator.isHexadecimal);
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
            expect(mac).toSatisfy(validator.isMACAddress);
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
          expect(password).toMatch(/^a!G6/);
          expect(password).toSatisfy(validator.isStrongPassword);
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
    }
  });
});
