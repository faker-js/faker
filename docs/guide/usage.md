# Usage

## Node.js

Using Faker is as easy as importing it from `@faker-js/faker`.

```js
import { faker } from '@faker-js/faker';

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

Or if you using CommonJS

```js
const { faker } = require('@faker-js/faker');

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

## Browser

```html
<script type="module">
  import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

  // Caitlyn Kerluke
  const randomName = faker.name.fullName();

  // Rusty@arne.info
  const randomEmail = faker.internet.email();
</script>
```

:::tip Note
Using the browser is great for experimenting 👍. However, due to all of the strings Faker uses to generate fake data, **Faker is a large package**. It's `> 5 MiB` minified. **Please avoid deploying the full Faker in your web app.**
:::

## CDN/Deno

```js
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const randomName = faker.name.findName(); // Willie Bahringer
const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
```

:::tip Note
It is highly recommended to use version tags when importing libraries in Deno, e.g: `import { faker } from "https://cdn.skypack.dev/@faker-js/faker@v7.4.0"`. Add `?dts` to import with type definitions: `import { faker } from "https://cdn.skypack.dev/@faker-js/faker@v7.4.0?dts"`.
:::

### Alternative CDN links

**esm:**

- https://esm.sh/@faker-js/faker
- https://cdn.jsdelivr.net/npm/@faker-js/faker/+esm

**cjs:**

- https://cdn.jsdelivr.net/npm/@faker-js/faker

## TypeScript Support

Faker has native TypeScript support, out of the box. So you don't have to install any extra packages.

In order to have faker working properly, you need to check if these `compilerOptions` are set correctly in your `tsconfig` file:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "Node"
  }
}
```

## Create complex objects

Faker mostly generates vales for primitives.
This is because in the real world most object schemas simply look way too different.
So if you want to create an object you most likely need to write a factory function for it.

For our example, we use typescript to strongly type our model.
The models we will use are described below:

```ts
import type { SexType } from '@faker-js/faker';

type SubscriptionTier = 'free' | 'basic' | 'business';

class User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstname: string;
  lastname: string;
  sex: SexType;
  subscriptionTier: SubscriptionTier;
}
```

As you can see, your `User` model probably looks completly different from the one you have in your codebase.
One thing to keep an eye on is the `subscriptionTier` property, as it is not simply a string, but only one of the strings defined in the `SubscriptionTier` type (`'free'` or `'basic'` or `'business'`).
Also, in a real scenario your model should not depend on a type of a third party library (`SexType` in this case).

Let's create our first user factory function.

```ts
import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstname: faker.name.firstname(),
    lastname: faker.name.lastname(),
    sex: faker.name.sexType();
    subscriptionTier: faker.helpers.arrayElement([
      'free',
      'basic',
      'business',
    ]),
  };
}

const user = createRandomUser();
```


