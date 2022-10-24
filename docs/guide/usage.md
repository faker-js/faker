# Usage

## Node.js

Using Faker is as easy as importing it from `@faker-js/faker`.

```js
import { faker } from '@faker-js/faker';

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

Or if you're using CommonJS:

```js
const { faker } = require('@faker-js/faker');

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

## Browser

```html
<script type="module">
  import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

  // Caitlyn Kerluke
  const randomName = faker.person.fullName();

  // Rusty@arne.info
  const randomEmail = faker.internet.email();
</script>
```

::: info NOTE
Using the browser is great for experimenting 👍. However, due to all of the strings Faker uses to generate fake data, **Faker is a large package**. It's `> 5 MiB` minified. **Please avoid deploying the full Faker in your web app.**
:::

## CDN/Deno

```js
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const randomName = faker.person.findName(); // Willie Bahringer
const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
```

::: info NOTE
It is highly recommended to use version tags when importing libraries in Deno, e.g: `import { faker } from "https://cdn.skypack.dev/@faker-js/faker@v7.4.0"`. Add `?dts` to import with type definitions: `import { faker } from "https://cdn.skypack.dev/@faker-js/faker@v7.4.0?dts"`.
:::

### Alternative CDN links

**esm:**

- https://esm.sh/@faker-js/faker
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

## Create complex objects

Faker mostly generates values for primitives.
This is because in the real world, most object schemas simply look very different.
So, if you want to create an object, you most likely need to write a factory function for it.

For our example, we use TypeScript to strongly type our model.
The models we will use are described below:

```ts
import type { SexType } from '@faker-js/faker';

type SubscriptionTier = 'free' | 'basic' | 'business';

class User {
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

As you can see, your `User` model probably looks completely different from the one you have in your codebase.
One thing to keep an eye on is the `subscriptionTier` property, as it is not simply a string, but only one of the strings defined in the `SubscriptionTier` type (`'free'` or `'basic'` or `'business'`).
Also, in a real scenario, your model should not depend on a type of a third party library (`SexType` in this case).

Let's create our first user factory function:

```ts
import { faker } from '@faker-js/faker';

class User { ... }

function createRandomUser(): User {
  return {
    _id: faker.datatype.uuid(),
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
  const sex = this.faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email(firstName, lastName);

  return {
    _id: faker.datatype.uuid(),
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

```ts {7-9}
import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  const sex = this.faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);

  return {
    _id: faker.datatype.uuid(),
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

Congratulations, you should now be able to create any complex object you desire. Happy faking 🥳.
