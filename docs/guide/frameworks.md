# Frameworks

Faker can easily be used with a variety of testing frameworks. Here are a few examples with popular frameworks, as well as some edge cases you should be aware of.

## Vitest

Faker works about exactly as you would expect with Vitest. Here's a minimal example:

```ts
import { assert, test } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';

test('reverse array', () => {
  let title = faker.name.jobTitle();
  let name = faker.name.fullName();
  let animal = faker.animal.bear();

  let array = [title, name, animal];

  assert.deepEqual(array.reverse(), [animal, name, title]);
});
```

## Jest

Jest integrates similarly. but it will sometimes cache faker immutably, resulting in duplicate values being generated. This is

```ts
import { faker } from '@faker-js/faker/locale/en';

describe('example tests', () => {
  test('reverse array', () => {
    let title = faker.name.jobTitle();
    let name = faker.name.fullName();
    let animal = faker.animal.bear();

    let array = [title, name, animal];
    console.log('1', array);

    expect(array.reverse()).toMatchObject([animal, name, title]);
  });
});
```

Some versions of Jest will attempt to immutably cache Faker, resulting in duplicate values. If you run into this, it can be addressed in a couple ways:

- Run Jest with the '--runInBand' option. This is not preferred as it sacrifices performance.
- Seed faker before each set of tests

One can seed faker at the start of the test file:

```ts
import { faker } from "@faker-js/faker/locale/en";
faker.seed();

...
```

Or within the tests:

```ts
import { faker } from "@faker-js/faker/locale/en";

describe("example tests", () => {
	faker.seed();

	...
});

## Cypress

TODO
```
