import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('internet.js', () => {
  describe('email()', () => {
    it('returns an email', () => {
      const spy_internet_userName = vi
        .spyOn(faker.internet, 'userName')
        .mockReturnValue('Aiden.Harann55');

      const email = faker.internet.email('Aiden.Harann55');
      const res = email.split('@')[0];

      expect(res).toBe('Aiden.Harann55');

      spy_internet_userName.mockRestore();
    });

    it('returns an email with japanese characters', () => {
      const spy_internet_userName = vi
        .spyOn(faker.internet, 'userName')
        .mockReturnValue('思源_唐3');

      const email = faker.internet.email('思源_唐3');
      const res = email.split('@')[0];

      expect(res).toBe('思源_唐3');

      spy_internet_userName.mockRestore();
    });
  });

  describe('exampleEmail', () => {
    it('returns an email with the correct name', () => {
      const spy_internet_userName = vi
        .spyOn(faker.internet, 'userName')
        .mockReturnValue('Aiden.Harann55');

      const email = faker.internet.email('Aiden.Harann55');
      const res = email.split('@')[0];

      expect(res).toBe('Aiden.Harann55');

      spy_internet_userName.mockRestore();
    });

    it('uses the example.[org|com|net] host', () => {
      const email = faker.internet.exampleEmail();
      expect(email).match(/@example\.(org|com|net)$/);
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

      spy_internet_domainWord.mockRestore();
      spy_internet_domainSuffix.mockRestore();
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

        spy_word_adjective.mockRestore();
        spy_word_noun.mockRestore();
      });
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
      vi.spyOn(faker.internet, 'protocol').mockReturnValue('http');
      vi.spyOn(faker.internet, 'domainWord').mockReturnValue('bar');
      vi.spyOn(faker.internet, 'domainSuffix').mockReturnValue('net');

      const url = faker.internet.url();

      expect(url).toBeTruthy();
      expect(url).toBe('http://bar.net');
    });
  });

  describe('ip()', () => {
    it('returns a random IP address with four parts', () => {
      const ip = faker.internet.ip();
      const parts = ip.split('.');
      expect(parts).toHaveLength(4);
    });
  });

  describe('ipv6()', () => {
    it('returns a random IPv6 address with eight parts', () => {
      const ip = faker.internet.ipv6();
      const parts = ip.split(':');
      expect(parts).toHaveLength(8);
    });
  });

  describe('port()', () => {
    it('returns a random port number', () => {
      const port = faker.internet.port();
      expect(Number.isInteger(port)).toBe(true);
      expect(port).greaterThanOrEqual(0);
      expect(port).lessThanOrEqual(65535);
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
      expect(color).match(/^#[a-f0-9]{6}$/);
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
  });
});
