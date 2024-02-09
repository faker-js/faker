# Usage

## Node.js

Using Faker is as easy as importing it from `@faker-js/faker`.

::: code-group

```js [esm]
import { faker } from '@faker-js/faker';
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

```js [cjs]
const { faker } = require('@faker-js/faker');
// or, if desiring a different locale
// const { fakerDE: faker } = require('@faker-js/faker');

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

:::

For more information about changing and customizing the locales, please refer to our [Localization Guide](localization).

## Browser

```html
<script type="module">
  import { faker } from 'https://esm.sh/@faker-js/faker';

  // Caitlyn Kerluke
  const randomName = faker.person.fullName();

  // Rusty@arne.info
  const randomEmail = faker.internet.email();
</script>
```

::: info Note
Using the browser is great for experimenting 👍. However, due to all of the strings Faker uses to generate fake data, **Faker is a large package**. It's `> 5 MiB` minified. **Please avoid deploying the full Faker in your web app.**
:::

## CDN/Deno

```js
import { faker } from 'https://esm.sh/@faker-js/faker';

const randomName = faker.person.fullName(); // Willie Bahringer
const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
```

::: info Note
It is highly recommended to use version tags when importing libraries in Deno, e.g: `import { faker } from "https://esm.sh/@faker-js/faker@v8.4.0"`.
:::

### Alternative CDN links

**esm:**

- https://cdn.jsdelivr.net/npm/@faker-js/faker/+esm

**cjs:**

- https://cdn.jsdelivr.net/npm/@faker-js/faker

## TypeScript Support

Faker supports TypeScript out of the box, so you don't have to install any extra packages.

In order to have Faker working properly, you need to check if these `compilerOptions` are set correctly in your `tsconfig` file:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "Node"
  }
}
```

## Reproducible results

Normally Faker will give you different random values each time it is used.

```ts
faker.music.genre(); // "Soul"
faker.music.genre(); // "Reggae"
```

If you want consistent results, you can set your own seed:

```ts
faker.seed(123);

const firstRandom = faker.number.int();

// Setting the seed again resets the sequence.
faker.seed(123);

const secondRandom = faker.number.int();

console.log(firstRandom === secondRandom);
```

::: info Note
When upgrading to a new version of Faker, you may get different values for the same seed, as the underlying data (lists of names, words etc) may have changed.
:::

There are a few methods which use relative dates for which setting a random seed is not sufficient to have reproducible results, for example: `faker.date.past`, `faker.date.future`, `faker.date.birthdate`, `faker.date.recent`, `faker.date.soon` and `faker.git.commitEntry`. This is because these methods default to creating a date before or after "today", and "today" depends on when the code is run. To fix this, you can specify a fixed reference date as a Date or string, for example:

```ts
// creates a date soon after 2023-01-01
faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' });
```

or alternatively you can set a default reference date for all these methods:

```ts
// affects all future faker.date.* calls
faker.setDefaultRefDate('2023-01-01T00:00:00.000Z');
```

## Simple data generation

Faker provides a `simpleFaker` that can be used to generate data that are not based on any locales like numbers and strings.  
Also **helpers** like `arrayElement` or `multiple` are available.

This is useful if you just want to generate e.g. `uuid`s for your test environment, but don't want/need to initiate/load a full Faker instance, which would include at least 500KB of locale data.

```ts
import { simpleFaker } from '@faker-js/faker';

const uuid = simpleFaker.string.uuid();
```

See more about `SimpleFaker` in the [API docs](/api/simpleFaker).

## Create complex objects

Faker mostly generates values for primitives.
This is because in the real world, most object schemas simply look very different.
So, if you want to create an object, you most likely need to write a factory function for it.

For our example, we use TypeScript to strongly type our model.
The models we will use are described below:

```ts
import type { SexType } from '@faker-js/faker';

type SubscriptionTier = 'free' | 'basic' | 'business';

interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: SexType;
  subscriptionTier: SubscriptionTier;
}
```

As you can see, our `User` model probably looks completely different from the one you have in your codebase.
One thing to keep an eye on is the `subscriptionTier` property, as it is not simply a string, but only one of the strings defined in the `SubscriptionTier` type (`'free'` or `'basic'` or `'business'`).
Also, in a real scenario, your model should not depend on a type of a third party library (`SexType` in this case).

Let's create our first user factory function:

```ts
import { faker } from '@faker-js/faker';

interface User { ... }

function createRandomUser(): User {
  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

const user = createRandomUser();
```

At this point, we have a perfectly working function that will work for most purposes.
But we can take this a step further.
Currently, all properties are just randomly generated.
This can lead to some undesirable values being produced.
For example: The `sex` property having value `'female'` while `firstName` is `'Bob'`.

Let's refactor our current code:

```ts {4-7,13-16}
import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

const user = createRandomUser();
```

As you can see, we changed the order in which we generate our values.
First, we generate a `sex` value to use it as input for the generation of `firstName`.
Then we generate the `lastName`.
Here, we could also pass in the `sex` value as argument, but in our use-case there are no special cases in where a female last name would differ from a male one.
By doing this first, we are able to pass both names into the `email` generation function.
This allows the value to be more reasonable based on the provided arguments.

But we can take this even another step further.
Opposite to the `_id` property that uses an `uuid` implementation, which is unique by design, the `email` property potentially isn't.
But, in most use-cases, this would be desirable.

Faker has your back, with another helper method:

```ts {7-10}
import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

const user = createRandomUser();
```

By wrapping Faker's `email` function with the [`unique`](../api/helpers.md#unique) helper function, we ensure that the return value of `email` is always unique.

::: warning
The `faker.helpers.unique` is targeted to be removed from Faker in the future.  
Please have a look at the issue [#1785](https://github.com/faker-js/faker/issues/1785).  
We will update these docs once a replacement is available.
:::

Congratulations, you should now be able to create any complex object you desire. Happy faking 🥳.

## Create multiple complex objects

Sometimes having a single one of your complex objects isn't enough.
Imagine having a list view/database of some kind you want to populate:

| ID        | First Name | Last Name |
| --------- | ---------- | --------- |
| 6fbe024f… | Tatyana    | Koch      |
| 862f3ccb… | Hans       | Donnelly  |
| b452acd6… | Judy       | Boehm     |

The values are directly created using this method:

```ts
import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  return {
    _id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}

const users = Array.from({ length: 3 }, () => createRandomUser());
```

After some time you notice that you need a new column `createdDate`.

You modify the method to also create that:

```ts
function createRandomUser(): User {
  return {
    _id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    createdDate: faker.date.past(),
  };
}
```

Now let's have a look at our table again:

| ID        | First Name | Last Name | Created Date |
| --------- | ---------- | --------- | ------------ |
| 6fbe024f… | Tatyana    | Koch      | 2022-12-28   |
| 62f3ccbf… | Kacie      | Pouros    | 2023-04-06   |
| 52acd600… | Aron       | Von       | 2023-05-04   |

Suddenly the second line onwards look different.

Why? Because calling `faker.date.past()` consumes a value from the seed changing all subsequent values.

There are two solutions to that:

1. Set the seed explicitly before creating the data for that row:

```ts
const users = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i);
  return createRandomUser();
});
```

Which is very straightforward, but comes at the disadvantage, that you change the seed of your faker instance.
This might cause issues, if you have lists of groups that contains lists of users. Each group contains the same users because the seed is reset.

2. Derive a new faker instance for each user you create.

```ts
function createRandomUser(faker: Faker): User {
  const derivedFaker = faker.derive();
  return {
    _id: derivedFaker.string.uuid(),
    firstName: derivedFaker.person.firstName(),
    lastName: derivedFaker.person.lastName(),
    createdDate: derivedFaker.date.past(),
  };
}

const users = Array.from({ length: 3 }, () => createRandomUser(faker));
```

The `faker.derive()` call clones the instance and re-initializes the seed of the clone with a generated value from the original.
This decouples the generation of the list from generating a user.
It does not matter how many properties you add to or remove from the `User` the following rows will not change.

::: tip Note
The following is only relevant, if you want to avoid changing your generated objects as much as possible:

When adding one or more new properties, we recommend generating them last, because if you create a new property in the middle of your object, then the properties after that will still change (due to the extra seed consumption).
When removing properties, you can continue calling the old method (or a dummy method) to consume the same amount of seed values.
:::

This also works for deeply nested complex objects:

```ts
function createLegalAgreement(faker: Faker) {
  const derivedFaker = faker.derive();
  return {
    _id: derivedFaker.string.uuid(),
    partyA: createRandomUser(derivedFaker),
    partyB: createRandomUser(derivedFaker),
  };
}

function createRandomUser(faker: Faker): User {
  const derivedFaker = faker.derive();
  return {
    _id: derivedFaker.string.uuid(),
    firstName: derivedFaker.person.firstName(),
    lastName: derivedFaker.person.lastName(),
    createdDate: derivedFaker.date.past(),
    address: createRandomAddress(derivedFaker),
  };
}

function createRandomAddress(faker: Faker): Address {
  const derivedFaker = faker.derive();
  return {
    _id: derivedFaker.string.uuid(),
    streetName: derivedFaker.location.street(),
  };
}
```

::: warning Warning
Migrating your existing data generators will still change all data once, but after that they are independent.
So we recommend writing your methods like this from the start.
:::

::: info Note
Depending on your preferences and requirements you can design the methods either like this:

```ts
function createRandomXyz(faker: Faker): Xyz {
  return {
    _id: faker.string.uuid(),
  };
}

createRandomXyz(faker.derive());
createRandomXyz(faker.derive());
createRandomXyz(faker.derive());
```

or this

```ts
function createRandomXyz(faker: Faker): Xyz {
  const derivedFaker = faker.derive();
  return {
    _id: derivedFaker.string.uuid(),
  };
}

createRandomXyz(faker);
createRandomXyz(faker);
createRandomXyz(faker);
```

The sole difference being more or less explicit about deriving a faker instance (writing more or less code).
:::

## Create identical complex objects

If you want to create two identical objects, e.g. one to mutate and one to compare it to,
then you can use `faker.clone()` to create a faker instance with the same settings and seed as the original.

```ts
const clonedFaker = faker.clone();
const user1 = createRandomUser(faker);
const user2 = createRandomUser(clonedFaker);
expect(user1).toEqual(user2); ✅

subscribeToNewsletter(user1);
// Check that the user hasn't been modified
expect(user1).toEqual(user2); ✅
```

::: info Note
Calling `faker.clone()` is idempotent. So you can call it as often as you want, it doesn't have an impact on the original faker instance.
:::
