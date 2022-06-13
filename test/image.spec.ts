import { describe, expect, it, vi } from 'vitest';
import { faker } from '../src';

describe('image', () => {
  describe('lorempicsum', () => {
    describe('imageUrl()', () => {
      it('should return a random image url from lorempixel', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl();

        expect(imageUrl).toBe('https://picsum.photos/640/480');
      });

      it('should return a random image url from lorem picsum with width and height', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(100, 100);

        expect(imageUrl).toBe('https://picsum.photos/100/100');
      });

      it('should return a random image url grayscaled', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(100, 100, true);

        expect(imageUrl).toBe('https://picsum.photos/100/100?grayscale');
      });

      it('should return a random image url grayscaled and blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(100, 100, true, 2);

        expect(imageUrl).toBe('https://picsum.photos/100/100?grayscale&blur=2');
      });

      it('should return a random image url blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(
          100,
          100,
          undefined,
          2
        );

        expect(imageUrl).toBe('https://picsum.photos/100/100?blur=2');
      });

      it('should return a random image url with seed', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(
          100,
          100,
          undefined,
          undefined,
          'picsum'
        );

        expect(imageUrl).toBe('https://picsum.photos/seed/picsum/100/100');
      });
    });

    describe('avatar()', () => {
      it('should return a random avatar from cloudflare-ipfs', () => {
        expect(
          faker.image.lorempicsum
            .avatar()
            .includes(
              'cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar'
            )
        ).toBeTruthy();
      });
    });

    describe('imageGrayscale()', () => {
      it('should return a random URL with grayscale image', () => {
        const imageUrl = faker.image.lorempicsum.imageGrayscale(100, 100, true);

        expect(imageUrl).toBe('https://picsum.photos/100/100?grayscale');
      });
    });

    describe('imageBlurred()', () => {
      it('should return a random image url blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageBlurred(100, 100, 2);

        expect(imageUrl).toBe('https://picsum.photos/100/100?blur=2');
      });
    });

    describe('imageRandomSeeded()', () => {
      it('should return a random image url blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageRandomSeeded(
          100,
          100,
          undefined,
          undefined,
          'picsum'
        );

        expect(imageUrl).toBe('https://picsum.photos/seed/picsum/100/100');
      });
    });
  });

  describe('lorempixel', () => {
    describe('imageUrl()', () => {
      it('should return a random image url from lorempixel', () => {
        const imageUrl = faker.image.lorempixel.imageUrl();

        expect(imageUrl).toBe('https://lorempixel.com/640/480');
      });

      it('should return a random image url from lorempixel with width and height', () => {
        const imageUrl = faker.image.lorempixel.imageUrl(100, 100);

        expect(imageUrl).toBe('https://lorempixel.com/100/100');
      });

      it('should return a random image url for a specified category', () => {
        const imageUrl = faker.image.lorempixel.imageUrl(100, 100, 'abstract');

        expect(imageUrl).toBe('https://lorempixel.com/100/100/abstract');
      });
    });

    describe('avatar()', () => {
      it('should return a random avatar from cloudflare-ipfs', () => {
        expect(
          faker.image.lorempixel
            .avatar()
            .includes(
              'cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar'
            )
        ).toBeTruthy();
      });
    });

    const categories = [
      'abstract',
      'animals',
      'business',
      'cats',
      'city',
      'food',
      'nightlife',
      'fashion',
      'people',
      'nature',
      'sports',
      'technics',
      'transport',
    ];

    for (const category of categories) {
      describe(`${category}()`, () => {
        it(`should return a random ${category} image url`, () => {
          const actual = faker.image.lorempixel[category]();
          expect(actual).toBe(`https://lorempixel.com/640/480/${category}`);
        });
      });
    }
  });

  describe('unsplash', () => {
    describe('categories', () => {
      it('should log a deprecation message', () => {
        const consoleSpy = vi.spyOn(console, 'warn');

        faker.image.unsplash.categories;

        expect(consoleSpy).toHaveBeenCalled();

        const logMessage = consoleSpy.mock.calls[0][0];
        expect(logMessage).toContain('faker.image.unsplash.categories');
        expect(logMessage).toContain('v7.3.0');
        expect(logMessage).toContain('v8.0.0');
      });
    });
    describe('imageUrl()', () => {
      it('should return a random image url from unsplash', () => {
        const imageUrl = faker.image.unsplash.imageUrl();

        expect(imageUrl).toBe('https://source.unsplash.com/640x480');
      });

      it('should return a random image url from unsplash with width and height', () => {
        const imageUrl = faker.image.unsplash.imageUrl(100, 100);

        expect(imageUrl).toBe('https://source.unsplash.com/100x100');
      });

      it('should return a random image url for a specified category', () => {
        const imageUrl = faker.image.unsplash.imageUrl(100, 100, 'food');

        expect(imageUrl).toBe(
          'https://source.unsplash.com/category/food/100x100'
        );
      });

      it('should return a random image url with correct keywords for a specified category', () => {
        const imageUrl = faker.image.unsplash.imageUrl(
          100,
          100,
          'food',
          'keyword1,keyword2'
        );

        expect(imageUrl).toBe(
          'https://source.unsplash.com/category/food/100x100?keyword1,keyword2'
        );
      });

      it('should return a random image url without keyword which format is wrong for a specified category', () => {
        const imageUrl = faker.image.unsplash.imageUrl(
          100,
          100,
          'food',
          'keyword1,?ds)0123$*908932409'
        );

        expect(imageUrl).toBe(
          'https://source.unsplash.com/category/food/100x100'
        );
      });
    });

    describe('image()', () => {
      it('should return a searching image url with keyword', () => {
        const imageUrl = faker.image.unsplash.image(
          100,
          200,
          'keyword1,keyword2,keyword3'
        );
        expect(imageUrl).toBe(
          'https://source.unsplash.com/100x200?keyword1,keyword2,keyword3'
        );
      });
    });

    const categories = [
      'buildings',
      'food',
      'nature',
      'objects',
      'people',
      'technology',
    ];

    for (const category of categories) {
      describe(`${category}()`, () => {
        it(`should return a random ${category} image url`, () => {
          const actual = faker.image.unsplash[category]();
          expect(actual).toBe(
            `https://source.unsplash.com/category/${category}/640x480`
          );
        });
      });
    }
  });

  describe('dataUri', () => {
    it('should return a blank data', () => {
      const dataUri = faker.image.dataUri(200, 300);
      expect(dataUri).toBe(
        'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x300%3C%2Ftext%3E%3C%2Fsvg%3E'
      );
    });

    it('should return a custom background color data URI', () => {
      const dataUri = faker.image.dataUri(200, 300, 'red');
      expect(dataUri).toBe(
        'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22red%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x300%3C%2Ftext%3E%3C%2Fsvg%3E'
      );
    });
  });
});
