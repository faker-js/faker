import { describe, expect, it, vi } from 'vitest';
import { faker } from '../src';
import validator from 'validator';

describe('internet', () => {
  describe('email()', () => {
    it('returns an email', () => {
      const spy_internet_userName = vi
        .spyOn(faker.internet, 'userName')
        .mockReturnValue('Aiden.Harann55');

      const email = faker.internet.email('Aiden.Harann55');
      const res = email.split('@')[0];

      expect(res).toBe('Aiden.Harann55');
      expect(email).satisfy(validator.isEmail);

      spy_internet_userName.mockRestore();
    });

    it('returns an email with japanese characters', () => {
      const spy_internet_userName = vi
        .spyOn(faker.internet, 'userName')
        .mockReturnValue('思源_唐3');

      const email = faker.internet.email('思源_唐3');
      const res = email.split('@')[0];

      expect(res).toBe('思源_唐3');
      expect(email).satisfy(validator.isEmail);

      spy_internet_userName.mockRestore();
    });

    it('email() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const email = faker.internet.email();

        expect(email).satisfy(validator.isEmail);
      }
    });
  });

  describe('exampleEmail()', () => {
    it('returns an email with the correct name', () => {
      const spy_internet_userName = vi
        .spyOn(faker.internet, 'userName')
        .mockReturnValue('Aiden.Harann55');

      const email = faker.internet.exampleEmail('Aiden.Harann55');
      const res = email.split('@')[0];

      expect(res).toBe('Aiden.Harann55');
      expect(email).satisfy(validator.isEmail);

      spy_internet_userName.mockRestore();
    });

    it('uses the example.[org|com|net] host', () => {
      const email = faker.internet.exampleEmail();

      expect(email).match(/@example\.(org|com|net)$/);
      expect(email).satisfy(validator.isEmail);
    });

    it('exampleEmail() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const email = faker.internet.exampleEmail();

        expect(email).satisfy(validator.isEmail);
      }
    });
  });

  describe('userName()', () => {
    it('occasionally returns a single firstName', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(0);
      const spy_name_firstName = vi.spyOn(faker.name, 'firstName');

      const username = faker.internet.userName();

      expect(username).toBeTruthy();
      expect(spy_name_firstName).toHaveBeenCalled();

      spy_datatype_number.mockRestore();
      spy_name_firstName.mockRestore();
    });

    it('occasionally returns a firstName with a period or hyphen and a lastName', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(1);
      const spy_name_firstName = vi.spyOn(faker.name, 'firstName');
      const spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      const spy_random_arrayElement = vi.spyOn(faker.random, 'arrayElement');

      const username = faker.internet.userName();

      expect(username).toBeTruthy();
      expect(spy_name_firstName).toHaveBeenCalled();
      expect(spy_name_lastName).toHaveBeenCalled();
      expect(spy_random_arrayElement).toHaveBeenCalledWith(['.', '_']);

      spy_datatype_number.mockRestore();
      spy_name_firstName.mockRestore();
      spy_name_lastName.mockRestore();
      spy_random_arrayElement.mockRestore();
    });
  });

  describe('domainName()', () => {
    it('returns a domainWord plus a random suffix', () => {
      const spy_internet_domainWord = vi
        .spyOn(faker.internet, 'domainWord')
        .mockReturnValue('bar');
      const spy_internet_domainSuffix = vi
        .spyOn(faker.internet, 'domainSuffix')
        .mockReturnValue('net');

      const domain_name = faker.internet.domainName();

      expect(domain_name).toBe('bar.net');
      expect(domain_name).satisfy(validator.isFQDN);

      spy_internet_domainWord.mockRestore();
      spy_internet_domainSuffix.mockRestore();
    });

    it('domainName() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const domainName = faker.internet.domainName();

        expect(domainName).satisfy(validator.isFQDN);
      }
    });
  });

  describe('domainWord()', () => {
    it('returns a lower-case adjective + noun', () => {
      const spy_word_adjective = vi
        .spyOn(faker.word, 'adjective')
        .mockReturnValue('RANDOM');
      const spy_word_noun = vi
        .spyOn(faker.word, 'noun')
        .mockReturnValue('WORD');

      const domain_word = faker.internet.domainWord();

      expect(domain_word).toBeTruthy();
      expect(domain_word).toBe('random-word');

      spy_word_adjective.mockRestore();
      spy_word_noun.mockRestore();
    });

    describe('when the firstName used contains a apostrophe', () => {
      it('should remove the apostrophe', () => {
        const spy_word_adjective = vi
          .spyOn(faker.word, 'adjective')
          .mockReturnValue("an'other");
        const spy_word_noun = vi
          .spyOn(faker.word, 'noun')
          .mockReturnValue("no'un");

        const domain_word = faker.internet.domainWord();

        expect(domain_word).toBe('another-noun');
        expect(domain_word).satisfy((value) =>
          validator.isFQDN(value, { require_tld: false })
        );

        spy_word_adjective.mockRestore();
        spy_word_noun.mockRestore();
      });
    });

    it('domainWord() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const domainWord = faker.internet.domainWord();

        expect(domainWord).satisfy((value) =>
          validator.isFQDN(value, { require_tld: false })
        );
      }
    });
  });

  describe('protocol()', () => {
    it('returns a valid protocol', () => {
      const protocol = faker.internet.protocol();
      expect(protocol).toBeTruthy();
    });

    it('should occasionally return http', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(0);

      const protocol = faker.internet.protocol();

      expect(protocol).toBeTruthy();
      expect(protocol).toBe('http');

      spy_datatype_number.mockRestore();
    });

    it('should occasionally return https', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockReturnValue(1);

      const protocol = faker.internet.protocol();

      expect(protocol).toBeTruthy();
      expect(protocol).toBe('https');

      spy_datatype_number.mockRestore();
    });
  });

  describe('httpMethod()', () => {
    it('returns a valid http method', () => {
      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      const method = faker.internet.httpMethod();
      expect(httpMethods).toContain(method);
    });
  });

  describe('url()', () => {
    it('returns a valid url', () => {
      const spy_internet_protocol = vi
        .spyOn(faker.internet, 'protocol')
        .mockReturnValue('http');
      const spy_internet_domainWord = vi
        .spyOn(faker.internet, 'domainWord')
        .mockReturnValue('bar');
      const spy_internet_domainSuffix = vi
        .spyOn(faker.internet, 'domainSuffix')
        .mockReturnValue('net');

      const url = faker.internet.url();

      expect(url).toBeTruthy();
      expect(url).toBe('http://bar.net');
      expect(url).satisfy(validator.isURL);

      spy_internet_protocol.mockRestore();
      spy_internet_domainWord.mockRestore();
      spy_internet_domainSuffix.mockRestore();
    });

    it('url() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const url = faker.internet.url();

        expect(url).satisfy(validator.isURL);
      }
    });
  });

  describe('ip()', () => {
    it('returns a random IPv4 address with four parts', () => {
      const ip = faker.internet.ip();
      const parts = ip.split('.');

      expect(parts).toHaveLength(4);
      expect(ip).satisfy(validator.isIP);
    });

    it('ip() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const ip = faker.internet.ip();

        expect(ip).satisfy(validator.isIP);
      }
    });
  });

  describe('ipv6()', () => {
    it('returns a random IPv6 address with eight parts', () => {
      const ip = faker.internet.ipv6();
      const parts = ip.split(':');

      expect(parts).toHaveLength(8);
      expect(ip).satisfy(validator.isIP);
    });

    it('ipv6() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const ip = faker.internet.ipv6();

        expect(ip).satisfy(validator.isIP);
      }
    });
  });

  describe('port()', () => {
    it('returns a random port number', () => {
      const port = faker.internet.port();

      expect(Number.isInteger(port)).toBe(true);
      expect(port).greaterThanOrEqual(0);
      expect(port).lessThanOrEqual(65535);
      expect(String(port)).satisfy(validator.isPort);
    });

    it('port() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const port = faker.internet.port();

        expect(String(port)).satisfy(validator.isPort);
      }
    });
  });

  describe('userAgent()', () => {
    it('returns a valid user-agent', () => {
      const ua = faker.internet.userAgent();
      expect(ua).toBeTruthy();
    });

    it('is deterministic', () => {
      faker.seed(1);
      const ua1 = faker.internet.userAgent();
      faker.seed(1);
      const ua2 = faker.internet.userAgent();
      expect(ua1).toBe(ua2);
    });
  });

  describe('color()', () => {
    it('returns a valid hex value (like #ffffff)', () => {
      const color = faker.internet.color(100, 100, 100);

      expect(color).satisfy(validator.isHexColor);
    });

    it('color() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const color = faker.internet.color();

        expect(color).satisfy(validator.isHexColor);
      }
    });
  });

  describe('mac()', () => {
    it('returns a random MAC address with 6 hexadecimal digits', () => {
      const mac = faker.internet.mac();
      expect(mac).match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/);
    });

    it('uses the dash separator if we pass it in as our separator', () => {
      const mac = faker.internet.mac('-');
      expect(mac).match(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/);
    });

    it('uses no separator if we pass in an empty string', () => {
      const mac = faker.internet.mac('');
      expect(mac).match(/^[a-f0-9]{12}$/);
    });

    it('uses the default colon (:) if we provide an unacceptable separator', () => {
      let mac = faker.internet.mac('!');
      expect(mac).match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/);

      mac = faker.internet.mac('&');
      expect(mac).match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/);
    });

    it('mac() to return valid values', () => {
      for (let i = 0; i < 10000; i++) {
        const mac = faker.internet.mac();

        expect(mac).satisfy(validator.isMACAddress);
      }
    });
  });
});
