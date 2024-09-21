import https from 'node:https';
import { resolve as urlResolve } from 'node:url';
import isDataURI from 'validator/lib/isDataURI';
import { describe, expect, it } from 'vitest';
import { CI_PREFLIGHT } from '../../scripts/env';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';

/**
 * Checks that the given address is a working https address. An address is considered valid, if it
 *
 * - is a string
 * - starts with https
 * - is a proper url
 * - returns a http-200 (after redirects)
 *
 * @param address The address to check.
 */
async function assertWebAddress(address: string): Promise<void> {
  expect(address).toBeTypeOf('string');
  expect(address).toMatch(/^https:\/\//);
  expect(() => new URL(address)).not.toThrow();

  if (CI_PREFLIGHT) {
    await expect(checkWebAddress(address)).resolves.toBe(true);
  }
}

/**
 * Checks whether a call to the given url returns a http-200 (after redirects).
 *
 * @param address The address to check.
 */
async function checkWebAddress(address: string): Promise<boolean> {
  return new Promise((resolve) => {
    https
      .get(address, ({ statusCode, headers: { location } }) => {
        if (statusCode == null) {
          console.error('Got no statusCode expected 200');
          resolve(false);
        } else if (statusCode === 200) {
          resolve(true);
        } else if (statusCode >= 300 && statusCode < 400 && location) {
          const newAddress = urlResolve(address, location);
          checkWebAddress(newAddress)
            .then(resolve)
            .catch((error: unknown) => {
              console.error('Failed to resolve redirect to', location, error);
              resolve(false);
            });
        } else {
          console.error(`Got statusCode: ${statusCode} expected 200`);
          resolve(false);
        }
      })
      .on('error', (error: unknown) => {
        console.error('Got request error', error);
        resolve(false);
      });
  });
}

describe('image', () => {
  seededTests(faker, 'image', (t) => {
    t.itEach('avatar', 'avatarGitHub', 'avatarLegacy');

    t.describe('url', (t) => {
      t.it('noArgs')
        .it('with width', { width: 128 })
        .it('with height', { height: 128 })
        .it('with width and height', { width: 128, height: 128 });
    });

    t.describe('urlLoremFlickr', (t) => {
      t.it('noArgs')
        .it('with width', { width: 128 })
        .it('with height', { height: 128 })
        .it('with width and height', { width: 128, height: 128 })
        .it('with category', { category: 'cats' })
        .it('with all options', {
          width: 128,
          height: 128,
          category: 'cats',
        });
    });

    t.describe('urlPicsumPhotos', (t) => {
      t.it('noArgs')
        .it('with width', { width: 128 })
        .it('with height', { height: 128 })
        .it('with width and height', { width: 128, height: 128 })
        .it('with blur', { blur: 6 })
        .it('with blur and grayscale', { blur: 3, grayscale: true })
        .it('with all options', {
          width: 128,
          height: 128,
          blur: 4,
          grayscale: true,
        });
    });

    t.describe('urlPlaceholder', (t) => {
      t.it('noArgs')
        .it('with width', { width: 128 })
        .it('with height', { height: 128 })
        .it('with width and height', { width: 128, height: 128 })
        .it('with backgroundColor', { backgroundColor: 'FF0000' })
        .it('with textColor', { textColor: '0000FF' })
        .it('with format', { format: 'webp' })
        .it('with text', { text: 'Hello' })
        .it('with all options', {
          width: 128,
          height: 128,
          backgroundColor: 'FF0000',
          textColor: '0000FF',
          format: 'png',
          text: 'hello',
        })
        .it('with empty colors and text', {
          width: 128,
          height: 128,
          backgroundColor: '',
          textColor: '',
          format: 'png',
          text: '',
        });
    });

    t.describe('dataUri', (t) => {
      t.it('noArgs')
        .it('with width', { width: 128 })
        .it('with height', { height: 128 })
        .it('with width and height', { width: 128, height: 128 })
        .it('with color', { color: 'blue' })
        .it('with type', { type: 'svg-base64' })
        .it('with all options+base64', {
          width: 2,
          height: 1337,
          color: '#643218',
          type: 'svg-base64',
        })
        .it('with all options+uri', {
          width: 42,
          height: 314,
          color: 'red',
          type: 'svg-uri',
        });
    });
  });

  describe('avatar', () => {
    it('should return a random avatar url', async () => {
      const avatarUrl = faker.image.avatar();

      await assertWebAddress(avatarUrl);
    });
  });

  describe('avatarGitHub', () => {
    it('should return a random avatar url from GitHub', async () => {
      const avatarUrl = faker.image.avatarGitHub();

      expect(avatarUrl).toBeTypeOf('string');
      expect(avatarUrl).toMatch(
        /^https:\/\/avatars\.githubusercontent\.com\/u\/\d+$/
      );
      await assertWebAddress(avatarUrl);
    });
  });

  describe('avatarLegacy', () => {
    it('should return a random avatar url from cloudflare-ipfs', () => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const avatarUrl = faker.image.avatarLegacy();

      expect(avatarUrl).toBeTypeOf('string');
      expect(avatarUrl).toMatch(
        /^https:\/\/cloudflare-ipfs\.com\/ipfs\/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye\/avatar\/\d{1,4}\.jpg$/
      );
      // The links aren't working anymore - there is nothing we can do about it
      // await assertWebAddress(avatarUrl);
    });
  });

  describe('url', () => {
    it('should return a random image url', async () => {
      const imageUrl = faker.image.url();

      await assertWebAddress(imageUrl);
    });

    it('should return a random image url with a width', async () => {
      const width = 100;
      const imageUrl = faker.image.url({ width });

      await assertWebAddress(imageUrl);
      expect(imageUrl).include(`${width}`);
    });

    it('should return a random image url with a height', async () => {
      const height = 100;
      const imageUrl = faker.image.url({ height });

      await assertWebAddress(imageUrl);
      expect(imageUrl).include(`${height}`);
    });

    it('should return a random image url with a width and height', async () => {
      const width = 128;
      const height = 64;
      const imageUrl = faker.image.url({ width, height });

      await assertWebAddress(imageUrl);
      expect(imageUrl).include(`${width}`);
      expect(imageUrl).include(`${height}`);
    });
  });

  describe('urlLoremFlickr', () => {
    it('should return a random image url from LoremFlickr', async () => {
      const imageUrl = faker.image.urlLoremFlickr();

      await assertWebAddress(imageUrl);
      expect(imageUrl).toMatch(
        /^https:\/\/loremflickr\.com\/\d+\/\d+\?lock=\d+$/
      );
    });
  });

  describe('urlPicsumPhotos', () => {
    it('should return a random image url from PicsumPhotos', async () => {
      const imageUrl = faker.image.urlPicsumPhotos();

      await assertWebAddress(imageUrl);
      expect(imageUrl).toMatch(
        /^https:\/\/picsum\.photos\/seed\/[0-9a-zA-Z]+\/\d+\/\d+(\?(grayscale&?)?(blur=\d+)?)?$/
      );
    });
  });

  describe('urlPlaceholder', () => {
    it('should return a random image url from Placeholder', async () => {
      const imageUrl = faker.image.urlPlaceholder();

      await assertWebAddress(imageUrl);
      expect(imageUrl).toMatch(
        /^https:\/\/via\.placeholder\.com\/\d+x\d+\/[0-9a-fA-F]{6}\/[0-9a-fA-F]{6}\.[a-z]{3,4}\?text=.+$/
      );
    });
  });

  describe('dataUri', () => {
    it('should return an image data uri', () => {
      const dataUri = faker.image.dataUri();
      expect(dataUri).toMatch(/^data:image\/svg\+xml;/);
      expect(dataUri).toSatisfy(isDataURI);
    });

    it('should return an uri-encoded image data uri', () => {
      const dataUri = faker.image.dataUri({ type: 'svg-uri' });
      expect(dataUri).toMatch(/^data:image\/svg\+xml;charset=UTF-8,/);
      expect(dataUri).toSatisfy(isDataURI);
    });

    it('should return a base64 image data uri', () => {
      const dataUri = faker.image.dataUri({ type: 'svg-base64' });
      expect(dataUri).toMatch(/^data:image\/svg\+xml;base64,/);
      expect(dataUri).toSatisfy(isDataURI);
    });

    it('should return an image data uri with fixed size', () => {
      const dataUri = faker.image.dataUri({
        width: 200,
        height: 300,
        type: 'svg-uri', // required for the regex check
      });
      expect(dataUri).toMatch(/^data:image\/svg\+xml;charset=UTF-8,/);
      expect(dataUri).toMatch(/width%3D%22200%22%20height%3D%22300/);
      expect(dataUri).toSatisfy(isDataURI);
    });

    it('should return an image data uri with a fixed background color', () => {
      const dataUri = faker.image.dataUri({
        color: 'red',
        type: 'svg-uri', // required for the regex check
      });
      expect(dataUri).toMatch(/^data:image\/svg\+xml;charset=UTF-8,/);
      expect(dataUri).toMatch(/fill%3D%22red/);
      expect(dataUri).toSatisfy(isDataURI);
    });
  });
});
