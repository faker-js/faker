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

And then simply import it like everything else:

```ts
import { faker } from '@faker-js/faker';
```
