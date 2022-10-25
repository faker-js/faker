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
