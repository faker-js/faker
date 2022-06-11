import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { times } from './support/times';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/468.jpg',
      email: 'Peyton73@yahoo.com',
      exampleEmail: 'Peyton73@example.com',
      userName: 'Garnett.Schinner73',
      protocol: 'http',
      httpMethod: 'POST',
      httpStatusCode: 207,
      url: 'http://stable-vehicle.biz',
      domainName: 'harmonious-shift.org',
      domainSuffix: 'info',
      domainWord: 'harmonious-shift',
      ip: '95.203.243.46',
      ipv6: '5cf2:bc99:2721:07d5:92ba:00fb:df30:2f29',
      port: 24545,
      userAgent:
        'Mozilla/5.0 (Windows; U; Windows NT 6.2) AppleWebKit/538.0.2 (KHTML, like Gecko) Chrome/29.0.815.0 Safari/538.0.2',
      color: '#30667a',
      mac: '5c:f2:bc:99:27:21',
      password: 'Dl2fkYYKLsZdepz',
      emoji: '🕸️',
    },
  },
  {
    seed: 1337,
    expectations: {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/327.jpg',
      email: 'Keith27@gmail.com',
      exampleEmail: 'Keith27@example.org',
      userName: 'Devyn21',
      protocol: 'http',
      httpMethod: 'POST',
      httpStatusCode: 205,
      url: 'http://neat-chopsticks.biz',
      domainName: 'fabulous-might.com',
      domainSuffix: 'biz',
      domainWord: 'fabulous-might',
      ip: '67.143.40.54',
      ipv6: '4823:4870:5389:45f4:b41c:61a5:2bf2:7dcc',
      port: 17172,
      userAgent:
        'Mozilla/5.0 (Windows; U; Windows NT 6.1) AppleWebKit/532.0.0 (KHTML, like Gecko) Chrome/13.0.832.0 Safari/532.0.0',
      color: '#214814',
      mac: '48:23:48:70:53:89',
      password: '9V05TL7RY9fmECg',
      emoji: '💇🏼‍♀️',
    },
  },
  {
    seed: 1211,
    expectations: {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1160.jpg',
      email: 'Jadon.Trantow12@hotmail.com',
      exampleEmail: 'Jadon.Trantow12@example.net',
      userName: 'Tito_Koch22',
      protocol: 'https',
      httpMethod: 'PATCH',
      httpStatusCode: 505,
      url: 'https://joyous-temperature.net',
      domainName: 'verifiable-infection.org',
      domainSuffix: 'org',
      domainWord: 'verifiable-infection',
      ip: '237.117.228.199',
      ipv6: 'e7ec:32f0:a2a3:c652:bbd0:caab:de64:dfdf',
      port: 60851,
      userAgent:
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6 rv:3.0; PT) AppleWebKit/538.2.0 (KHTML, like Gecko) Version/4.1.0 Safari/538.2.0',
      color: '#773a72',
      mac: 'e7:ec:32:f0:a2:a3',
      password: 'yLuj60b5iHB0bhn',
      emoji: '🇮🇸',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'avatar',
  'email',
  'exampleEmail',
  'userName',
  'protocol',
  'httpMethod',
  'httpStatusCode',
  'url',
  'domainName',
  'domainSuffix',
  'domainWord',
  'ip',
  'ipv6',
  'port',
  'userAgent',
  'color',
  'mac',
  'password',
  'emoji',
];

describe('internet', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.internet[functionName]();
          expect(actual).toBeTruthy();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
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

        // TODO @Shinigami92 2022-02-11: When providing params to `email`, it produces some not that predictable data

        it('should return an email with given firstName', () => {
          const email = faker.internet.email('Aiden.Harann55');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).toMatch(/^Aiden.Harann55/);
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it('should return an email with given firstName and lastName', () => {
          const email = faker.internet.email('Aiden', 'Harann');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).toMatch(/^Aiden([._]Harann)?\d*/);
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it('should return an email with japanese characters', () => {
          const email = faker.internet.email('思源_唐3');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).toMatch(/^思源_唐3/);
          expect(faker.definitions.internet.free_email).toContain(suffix);
        });

        it('should return an email with special characters', () => {
          const email = faker.internet.email('Mike', 'Smith', null, {
            allowSpecialCharacters: true,
          });

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(prefix).toMatch(/^Mike([.!#$%&'*+-/=?^_`{|}~]Smith)?\d*/);
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
          const email = faker.internet.exampleEmail('Aiden.Harann55');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^Aiden.Harann55/);
        });

        it('should return an email with the example suffix and given firstName and lastName', () => {
          const email = faker.internet.exampleEmail('Aiden', 'Harann');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^Aiden([._]Harann)?\d*/);
        });

        it('should return an email with the example suffix and japanese characters', () => {
          const email = faker.internet.exampleEmail('思源_唐3');

          expect(email).toBeTruthy();
          expect(email).toBeTypeOf('string');
          expect(email).toSatisfy(validator.isEmail);

          const [prefix, suffix] = email.split('@');

          expect(suffix).toMatch(/^example\.(com|net|org)$/);
          expect(faker.definitions.internet.example_email).toContain(suffix);
          expect(prefix).toMatch(/^思源_唐3/);
        });

        it('should return an email with special characters', () => {
          const email = faker.internet.exampleEmail('Mike', 'Smith', {
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
          const username = faker.internet.userName('Aiden');

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).toMatch(/\w/);
          expect(username).includes('Aiden');
        });

        it('should return a random username with given firstName and lastName', () => {
          const username = faker.internet.userName('Aiden', 'Harann');

          expect(username).toBeTruthy();
          expect(username).toBeTypeOf('string');
          expect(username).toMatch(/\w/);
          expect(username).includes('Aiden');
          // FIXME @Shinigami92 2022-02-11: The lastName is sometimes not taken
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
        it('should return a random IPv4 address with four parts', () => {
          const ip = faker.internet.ip();

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
          const color = faker.internet.color(100, 100, 100);

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
            const password = faker.internet.password(length);

            expect(password).toBeTruthy();
            expect(password).toBeTypeOf('string');
            expect(password).toHaveLength(length);
            expect(password).toMatch(/^\w+$/);
          }
        );

        it('should return memorable password', () => {
          const password = faker.internet.password(12, true);

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(12);
          expect(password).toMatch(/^\w{12}$/);
        });

        it('should return non memorable password', () => {
          const password = faker.internet.password(12, false);

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(12);
          expect(password).toMatch(/^\w{12}$/);
          // TODO @Shinigami92 2022-02-11: I would say a non memorable password should satisfy `validator.isStrongPassword`, but it does not currently
          //expect(password).toSatisfy(validator.isStrongPassword);
        });

        it('should return non memorable strong password with length 32', () => {
          const password = faker.internet.password(
            32,
            false,
            /(!|\?|&|\[|\]|%|\$|[a-zA-Z0-9])/
          );

          expect(password).toBeTruthy();
          expect(password).toBeTypeOf('string');
          expect(password).toHaveLength(32);
          // TODO @Shinigami92 2022-02-11: This should definitely be a strong password, but it doesn't :(
          //expect(password).toSatisfy(validator.isStrongPassword);
        });

        it('should return non memorable strong password with length 32 and given prefix', () => {
          const password = faker.internet.password(
            32,
            false,
            /(!|\?|&|\[|\]|%|\$|[a-zA-Z0-9])/,
            'a!G6'
          );

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
