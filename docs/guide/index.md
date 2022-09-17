# Getting Started

## Overview

Faker is a popular library that generates fake (but reasonable) data that can be used for things such as:

- Unit Testing
- Performance Testing
- Building Demos
- Working without a completed backend

Faker was originally written in [Perl](https://metacpan.org/dist/Data-Faker) and this is the JavaScript port. Language bindings also exist for [Ruby](https://github.com/faker-ruby/faker), [Java](https://github.com/DiUS/java-faker), and [Python](https://github.com/joke2k/faker).

This documentation only covers the JavaScript implementation of Faker.

## Environments

You can run Faker in the Browser, within Node, or the many other languages supported by Faker. ([Perl](https://metacpan.org/dist/Data-Faker), [Ruby](https://github.com/faker-ruby/faker), [Java](https://github.com/DiUS/java-faker), and [Python](https://github.com/joke2k/faker))

## Installation

Install it as a Dev Dependency using your favorite package manager.

```shell
npm install @faker-js/faker --save-dev
```

or

```shell
yarn add @faker-js/faker --dev
```

or

```shell
pnpm add @faker-js/faker --save-dev
```

## Usage

### Node.js

```js
import { faker } from '@faker-js/faker';
// or, if using CommonJS
// const { faker } = require('@faker-js/faker');

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

### Browser

```html
<!-- Since v6 only type=module is supported -->
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

### CDN/Deno

```js
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const randomName = faker.name.findName(); // Willie Bahringer
const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
```

:::tip Note
It is highly recommended to use version tags when importing libraries in Deno, e.g: `import { faker } from "https://cdn.skypack.dev/@faker-js/faker@v7.4.0"`. Add `?dts` to import with type definitions: `import { faker } from "https://cdn.skypack.dev/@faker-js/faker@v7.4.0?dts"`.
:::

#### Alternative CDN links

**esm:**

- https://esm.sh/@faker-js/faker
- https://cdn.jsdelivr.net/npm/@faker-js/faker/+esm

**cjs:**

- https://cdn.jsdelivr.net/npm/@faker-js/faker

### TypeScript Support

Since version `v6+` there is native TypeScript support.

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

If you want for whatever reason the versions prior to `v6`,
you can use `@types/faker` and rebind the declarations to the `@faker-js/faker` package with a `faker.d.ts` file in your e.g. src folder.

```ts
// faker.d.ts
declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}
```

## Community

If you have questions or need help, reach out to the community via [Discord](https://chat.fakerjs.dev) and [GitHub Discussions](https://github.com/faker-js/faker/discussions).
