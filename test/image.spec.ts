import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

describe('image', () => {
  describe('lorempicsum', () => {
    describe('imageUrl()', () => {
      it('returns a random image url from lorempixel', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl();

        expect(imageUrl).toBe('https://picsum.photos/640/480');
      });

      it('returns a random image url from lorem picsum with width and height', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(100, 100);

        expect(imageUrl).toBe('https://picsum.photos/100/100');
      });

      it('returns a random image url grayscaled', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(100, 100, true);

        expect(imageUrl).toBe('https://picsum.photos/100/100?grayscale');
      });

      it('returns a random image url grayscaled and blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(100, 100, true, 2);

        expect(imageUrl).toBe('https://picsum.photos/100/100?grayscale&blur=2');
      });

      it('returns a random image url blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageUrl(
          100,
          100,
          undefined,
          2
        );

        expect(imageUrl).toBe('https://picsum.photos/100/100?blur=2');
      });

      it('returns a random image url with seed', () => {
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
      it('return a random avatar from cloudflare-ipfs', () => {
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
      it('returns a random URL with grayscale image', () => {
        const imageUrl = faker.image.lorempicsum.imageGrayscale(100, 100, true);

        expect(imageUrl).toBe('https://picsum.photos/100/100?grayscale');
      });
    });

    describe('imageBlurred()', () => {
      it('returns a random image url blurred', () => {
        const imageUrl = faker.image.lorempicsum.imageBlurred(100, 100, 2);

        expect(imageUrl).toBe('https://picsum.photos/100/100?blur=2');
      });
    });

    describe('imageRandomSeeded()', () => {
      it('returns a random image url blurred', () => {
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
      it('returns a random image url from lorempixel', () => {
        const imageUrl = faker.image.lorempixel.imageUrl();

        expect(imageUrl).toBe('https://lorempixel.com/640/480');
      });

      it('returns a random image url from lorempixel with width and height', () => {
        const imageUrl = faker.image.lorempixel.imageUrl(100, 100);

        expect(imageUrl).toBe('https://lorempixel.com/100/100');
      });

      it('returns a random image url for a specified category', () => {
        const imageUrl = faker.image.lorempixel.imageUrl(100, 100, 'abstract');

        expect(imageUrl).toBe('https://lorempixel.com/100/100/abstract');
      });
    });

    describe('avatar()', () => {
      it('return a random avatar from cloudflare-ipfs', () => {
        expect(
          faker.image.lorempixel
            .avatar()
            .includes(
              'cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar'
            )
        ).toBeTruthy();
      });
    });

    describe('abstract()', () => {
      it('returns a random abstract image url', () => {
        const abstract = faker.image.lorempixel.abstract();
        expect(abstract).toBe('https://lorempixel.com/640/480/abstract');
      });
    });

    describe('animals()', () => {
      it('returns a random animals image url', () => {
        const animals = faker.image.lorempixel.animals();
        expect(animals).toBe('https://lorempixel.com/640/480/animals');
      });
    });

    describe('business()', () => {
      it('returns a random business image url', () => {
        const business = faker.image.lorempixel.business();
        expect(business).toBe('https://lorempixel.com/640/480/business');
      });
    });

    describe('cats()', () => {
      it('returns a random cats image url', () => {
        const cats = faker.image.lorempixel.cats();
        expect(cats).toBe('https://lorempixel.com/640/480/cats');
      });
    });

    describe('city()', () => {
      it('returns a random city image url', () => {
        const city = faker.image.lorempixel.city();
        expect(city).toBe('https://lorempixel.com/640/480/city');
      });
    });

    describe('food()', () => {
      it('returns a random food image url', () => {
        const food = faker.image.lorempixel.food();
        expect(food).toBe('https://lorempixel.com/640/480/food');
      });
    });

    describe('nightlife()', () => {
      it('returns a random nightlife image url', () => {
        const nightlife = faker.image.lorempixel.nightlife();
        expect(nightlife).toBe('https://lorempixel.com/640/480/nightlife');
      });
    });

    describe('fashion()', () => {
      it('returns a random fashion image url', () => {
        const fashion = faker.image.lorempixel.fashion();
        expect(fashion).toBe('https://lorempixel.com/640/480/fashion');
      });
    });

    describe('people()', () => {
      it('returns a random people image url', () => {
        const people = faker.image.lorempixel.people();
        expect(people).toBe('https://lorempixel.com/640/480/people');
      });
    });

    describe('nature()', () => {
      it('returns a random nature image url', () => {
        const nature = faker.image.lorempixel.nature();
        expect(nature).toBe('https://lorempixel.com/640/480/nature');
      });
    });

    describe('sports()', () => {
      it('returns a random sports image url', () => {
        const sports = faker.image.lorempixel.sports();
        expect(sports).toBe('https://lorempixel.com/640/480/sports');
      });
    });

    describe('technics()', () => {
      it('returns a random technics image url', () => {
        const technics = faker.image.lorempixel.technics();
        expect(technics).toBe('https://lorempixel.com/640/480/technics');
      });
    });

    describe('transport()', () => {
      it('returns a random transport image url', () => {
        const transport = faker.image.lorempixel.transport();
        expect(transport).toBe('https://lorempixel.com/640/480/transport');
      });
    });
  });

  describe('unsplash', () => {
    describe('imageUrl()', () => {
      it('returns a random image url from unsplash', () => {
        const imageUrl = faker.image.unsplash.imageUrl();

        expect(imageUrl).toBe('https://source.unsplash.com/640x480');
      });

      it('returns a random image url from unsplash with width and height', () => {
        const imageUrl = faker.image.unsplash.imageUrl(100, 100);

        expect(imageUrl).toBe('https://source.unsplash.com/100x100');
      });

      it('returns a random image url for a specified category', () => {
        const imageUrl = faker.image.unsplash.imageUrl(100, 100, 'food');

        expect(imageUrl).toBe(
          'https://source.unsplash.com/category/food/100x100'
        );
      });

      it('returns a random image url with correct keywords for a specified category', () => {
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

      it('returns a random image url without keyword which format is wrong for a specified category', () => {
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
      it('returns a searching image url with keyword', () => {
        const food = faker.image.unsplash.image(
          100,
          200,
          'keyword1,keyword2,keyword3'
        );
        expect(food).toBe(
          'https://source.unsplash.com/100x200?keyword1,keyword2,keyword3'
        );
      });
    });

    describe('food()', () => {
      it('returns a random food image url', () => {
        const food = faker.image.unsplash.food();
        expect(food).toBe('https://source.unsplash.com/category/food/640x480');
      });
    });

    describe('people()', () => {
      it('returns a random people image url', () => {
        const people = faker.image.unsplash.people();
        expect(people).toBe(
          'https://source.unsplash.com/category/people/640x480'
        );
      });
    });

    describe('nature()', () => {
      it('returns a random nature image url', () => {
        const nature = faker.image.unsplash.nature();
        expect(nature).toBe(
          'https://source.unsplash.com/category/nature/640x480'
        );
      });
    });

    describe('technology()', () => {
      it('returns a random technology image url', () => {
        const transport = faker.image.unsplash.technology();
        expect(transport).toBe(
          'https://source.unsplash.com/category/technology/640x480'
        );
      });
    });
    describe('objects()', () => {
      it('returns a random objects image url', () => {
        const transport = faker.image.unsplash.objects();
        expect(transport).toBe(
          'https://source.unsplash.com/category/objects/640x480'
        );
      });
    });
    describe('buildings()', () => {
      it('returns a random buildings image url', () => {
        const transport = faker.image.unsplash.buildings();
        expect(transport).toBe(
          'https://source.unsplash.com/category/buildings/640x480'
        );
      });
    });
  });
  describe('dataUri', () => {
    it('returns a blank data', () => {
      const dataUri = faker.image.dataUri(200, 300);
      expect(dataUri).toBe(
        'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x300%3C%2Ftext%3E%3C%2Fsvg%3E'
      );
    });
    it('returns a customed background color data URI', () => {
      const dataUri = faker.image.dataUri(200, 300, 'red');
      expect(dataUri).toBe(
        'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22red%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x300%3C%2Ftext%3E%3C%2Fsvg%3E'
      );
    });
  });
});
