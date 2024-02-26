# Randomizer

The [`Randomizer`](/api/randomizer) interface allows you to use a custom randomness source within Faker.

::: warning Important
Faker's default `Randomizer` is sufficient in most cases.
Change this only if you want to use it to achieve a specific goal, such as sharing the same random generator with other instances/tools.
:::

There are two connected use cases we have considered where this might be needed:

1. Re-Use of the same `Randomizer` within multiple `Faker` instances.
2. The use of a random number generator from a third party library.

## Built-In `Randomizer`s

Faker ships with two variations

```ts
import {
  generateMersenne32Randomizer, // Default prior to v9
  generateMersenne53Randomizer, // Default since v9
} from '@faker-js/faker';

const randomizer = generateMersenne53Randomizer();
```

The 32bit `Randomizer` is faster, but the 53bit `Randomizer` generates better random values (with significantly fewer duplicates).

But you can also implement your own by implementing the [related interface](/api/randomizer.html).

## Using `Randomizer`s

A `Randomizer` has to be set during construction of the instance:

```ts
import { Faker, Randomizer } from '@faker-js/faker';

const customFaker = new Faker({
  locale: ...,
  randomizer: ...,
});
```

The following methods take a `Randomizer` as argument:

- [new SimpleFaker(...)](/api/simpleFaker#constructor)
- [new Faker(...)](/api/faker#constructor)

## Re-Using a `Randomizer`

Sometimes it might be required to generate values in two different locales.
E.g. a Chinese person might have an English identity to simplify the communication with foreigners.
While this could also be achieved with two independent `Faker` instances like this:

```ts
import { fakerEN, fakerZH_TW } from '@faker-js/faker';

fakerZH_TW.seed(5);
fakerEN.seed(5);

const firstName = fakerZH_TW.person.firstName(); // 炫明
const alias = fakerEN.person.firstName(); // Arthur
```

There might be issues regarding reproducibility, when seeding only one of them.

By sharing a `Randomizer` between the two instances, you omit this issue by affecting all instances simultaneously.

::: tip Note
This gets more important if the seeding happens at a different location than the data generation (e.g. due to nesting).
:::

```ts
import { en, Faker, Randomizer, zh_TW } from '@faker-js/faker';

const randomizer: Randomizer = ...;

const customFakerEN = new Faker({
  locale: en,
  randomizer,
});

const customFakerZH_TW = new Faker({
  locale: [zh_TW, en],
  randomizer,
});

randomizer.seed(5);
// customFakerEN.seed(5); // Redundant
// customFakerZH_TW.seed(5); // Redundant

const firstName = fakerZH_TW.person.firstName(); // 炫明
const alias = fakerEN.person.firstName(); // John (different from before, because it is now the second call)
```

This is also relevant when trying to use faker's random number generator in third party libraries.
E.g. some libraries that can generate `string`s from a `RegExp` can be customized with a custom random number generator as well,
and since they will be used in the same context it makes sense to rely on the same randomness source to ensure the values are reproducible.

## Third-Party `Randomizer`s

Sometimes you might want to use a custom/third-party random number generator.
This can be achieved by implementing your own `Randomizer` and passing it to [supported methods](#using-randomizers).

::: tip Note
Faker does not ship `Randomizers` for third-party libraries and does not provide support for bridging the gap between libraries.
The following examples show how the interface can be implemented, but they are not tested for correctness.
Feel free to submit more `Randomizer` examples for other popular packages.
:::

### Pure-Rand

The following is an example for a [pure-rand](https://github.com/dubzzz/pure-rand) based `Randomizer`:

```ts
import { Faker, Randomizer, SimpleFaker } from '@faker-js/faker';
import { RandomGenerator, xoroshiro128plus } from 'pure-rand';

export function generatePureRandRandomizer(
  seed: number | number[] = Date.now() ^ (Math.random() * 0x100000000),
  factory: (seed: number) => RandomGenerator = xoroshiro128plus
): Randomizer {
  const self = {
    next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000,
    seed: (seed: number | number[]) => {
      self.generator = factory(typeof seed === 'number' ? seed : seed[0]);
    },
  } as Randomizer & { generator: RandomGenerator };
  self.seed(seed);
  return self;
}
```
