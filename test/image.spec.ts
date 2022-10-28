import { describe, expect, it } from 'vitest';
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

  describe('placeholder', () => {
    describe('imageUrl()', () => {
      it('should return a random image url from placeholder', () => {
        const imageUrl = faker.image.placeholder.imageUrl();

        expect(imageUrl).toBe('https://via.placeholder.com/640x640');
      });

      it('should return a square random image url from placeholder with width and height', () => {
        const imageUrl = faker.image.placeholder.imageUrl(100);

        expect(imageUrl).toBe('https://via.placeholder.com/100x100');
      });

      it('should return a random image url with a gif format', () => {
        const imageUrl = faker.image.placeholder.imageUrl(
          100,
          100,
          undefined,
          'gif'
        );

        expect(imageUrl).toBe('https://via.placeholder.com/100x100.gif');
      });

      it('should return a random image url with correct text for a specified format', () => {
        const imageUrl = faker.image.placeholder.imageUrl(
          100,
          100,
          'I love food',
          'png'
        );

        expect(imageUrl).toBe(
          'https://via.placeholder.com/100x100.png?text=I+love+food'
        );
      });

      it('should return a random image url with specified background color and text color', () => {
        const imageUrl = faker.image.placeholder.imageUrl(
          100,
          100,
          undefined,
          undefined,
          '000000',
          'ffffff'
        );

        expect(imageUrl).toBe(
          'https://via.placeholder.com/100x100/000000/FFFFFF'
        );
      });

      it('should return a random image url with specified background color and color without the #', () => {
        const imageUrl = faker.image.placeholder.imageUrl(
          100,
          100,
          undefined,
          undefined,
          '#000000',
          '#ffffff'
        );

        expect(imageUrl).toBe(
          'https://via.placeholder.com/100x100/000000/FFFFFF'
        );
      });

      it('should return a random image url given all parameter', () => {
        const imageUrl = faker.image.placeholder.imageUrl(
          100,
          200,
          'I love food',
          'jpg',
          '000000',
          'ffffff'
        );

        expect(imageUrl).toBe(
          'https://via.placeholder.com/100x200/000000/FFFFFF.jpg?text=I+love+food'
        );
      });
    });

    describe('randomUrl()', () => {
      it('should return a random url with specified width and height', () => {
        const imageUrl = faker.image.placeholder.randomUrl(200, 150);

        // https://via.placeholder.com/150/000000/FFFFFF/
        const urlSpilt = imageUrl.split('/');

        console.log(imageUrl);

        expect(urlSpilt[0]).toBe('https:');
        expect(urlSpilt[2]).toBe('via.placeholder.com');
        expect(urlSpilt[3]).toBe('200x150');
        expect(urlSpilt[4]).toHaveLength(6);
        expect(urlSpilt[5].split('?')[0]).toHaveLength(6);
        expect(urlSpilt[5].split('?')[1]).toContain('text=');
      });
      it('should return a random url with specified width and height and format', () => {
        const imageUrl = faker.image.placeholder.randomUrl(200, 150, 'png');

        const urlSpilt = imageUrl.split('/');

        expect(urlSpilt[0]).toBe('https:');
        expect(urlSpilt[2]).toBe('via.placeholder.com');
        expect(urlSpilt[3]).toBe('200x150');
        expect(urlSpilt[4]).toHaveLength(6);
        expect(urlSpilt[5].split('?')[0]).toHaveLength(10);
        expect(urlSpilt[5].split('?')[0]).toContain('.png');
        expect(urlSpilt[5].split('?')[1]).toContain('text=');
      });
    });
  });

  describe('dataUri', () => {
    it('should return a blank data', () => {
      const dataUri = faker.image.dataUri({ width: 200, height: 300 });
      expect(dataUri).toMatchSnapshot();
    });

    it('should return a custom background color data URI', () => {
      const dataUri = faker.image.dataUri({
        width: 200,
        height: 300,
        color: 'red',
      });
      expect(dataUri).toMatchSnapshot();
    });
  });
});
