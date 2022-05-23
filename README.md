<div align="center">
  <img src="./docs/public/logo.svg" width="200"/>
  <h1>Faker</h1>
  <p>Generate massive amounts of fake (but realistic) data for testing and development.</p>
  
  [![Chat on Discord](https://img.shields.io/discord/929487054990110771)](https://chat.fakerjs.dev)
  [![Continuous Integration](https://github.com/faker-js/faker/actions/workflows/ci.yml/badge.svg)](https://github.com/faker-js/faker/actions/workflows/ci.yml)
  [![codecov](https://codecov.io/gh/faker-js/faker/branch/main/graph/badge.svg?token=N61U168G08)](https://codecov.io/gh/faker-js/faker)
  [![npm version](https://badgen.net/npm/v/@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker)
  [![npm downloads](https://badgen.net/npm/dm/@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker)
  [![Open Collective](https://img.shields.io/opencollective/backers/fakerjs)](https://opencollective.com/fakerjs#section-contributors)
  [![sponsor](https://img.shields.io/opencollective/all/fakerjs?label=sponsors)](https://opencollective.com/fakerjs)
  
</div>

### Try it Online ⚡️

[fakerjs.dev/new](https://fakerjs.dev/new)

[![](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://fakerjs.dev/new)

## Installation

Please replace your `faker` dependency with `@faker-js/faker`. This is the official, stable fork of Faker.

```shell
npm install @faker-js/faker --save-dev
```

or yarn

```shell
yarn add @faker-js/faker -D
```

or pnpm

```shell
pnpm install @faker-js/faker -D
```

### Browser

```html
<script src="faker.js" type="text/javascript"></script>
<script>
  const randomName = faker.name.findName(); // Caitlyn Kerluke
  const randomEmail = faker.internet.email(); // Rusty@arne.info
  const randomPhoneNumber = faker.phone.phoneNumber(); // (746) 637-3344 x8083
</script>
```

### Node.js

```js
const { faker } = require('@faker-js/faker');

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomPhoneNumber = faker.phone.phoneNumber(); // (279) 329-8663 x30233
```

### CDN/Deno

```js
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const randomName = faker.name.findName(); // Willie Bahringer
const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
const randomPhoneNumber = faker.phone.phoneNumber(); // 938-672-1359 x418
```

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

## API

An in-depth overview of the API methods is available in the [documentation](https://fakerjs.dev/guide/). The API covers the following modules:

| Module   | Example                        | Output                                                                                                                                                                                                                  |
| -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Address  | `faker.address.city()`         | Lake Raoulfort                                                                                                                                                                                                          |
| Animal   | `faker.animal.type()`          | Dog, cat, snake, bear, lion, etc.                                                                                                                                                                                       |
| Commerce | `faker.commerce.product()`     | Polo t-shirt                                                                                                                                                                                                            |
| Company  | `faker.company.companyName()`  | Zboncak and Sons                                                                                                                                                                                                        |
| Database | `faker.database.engine()`      | MyISAM                                                                                                                                                                                                                  |
| Datatype | `faker.datatype.uuid()`        | 7b16dd12-935e-4acc-8381-b1e457bf0176                                                                                                                                                                                    |
| Date     | `faker.date.past()`            | Sat Oct 20 2018 04:19:38 GMT-0700 (Pacific Daylight Time)                                                                                                                                                               |
| Finance  | `faker.finance.amount()`       | ¥23400 (After setting locale)                                                                                                                                                                                           |
| Git      | `faker.git.commitMessage()`    | feat: add products list page                                                                                                                                                                                            |
| Hacker   | `faker.hacker.phrase()`        | Try to reboot the SQL bus, maybe it will bypass the virtual application!                                                                                                                                                |
| Helpers  | `faker.helpers.userCard()`     | `{ avatar: '...', email: '{ first }{ last }{ number }@{domain}', first: '...' }`<br/><br/>All of the values are self-consistent (e.g. same first + last name in the email, too)                                         |
| Image    | `faker.image.avatar()`         | `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg` <img src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg" width="64"/> |
| Internet | `faker.internet.color()`       | #630c7b                                                                                                                                                                                                                 |
| Lorem    | `faker.lorem.paragraph()`      | Word, words, sentences, slug (lorem-ipsum), paragraph(s), text, lines                                                                                                                                                   |
| Music    | `faker.music.genre()`          | R&B                                                                                                                                                                                                                     |
| Name     | `faker.name.firstName()`       | Cameron                                                                                                                                                                                                                 |
| Phone    | `faker.phone.phoneNumber()`    | +1 291-299-0192                                                                                                                                                                                                         |
| Random   | `faker.random.locale()`        | fr_CA                                                                                                                                                                                                                   |
| System   | `faker.system.directoryPath()` | C:\Documents\Newsletters\                                                                                                                                                                                               |
| Vehicle  | `faker.vehicle.vehicle()`      | 2011 Dodge Caravan                                                                                                                                                                                                      |

### faker.fake()

Faker contains a super useful generator method `faker.fake` for combining faker API methods using a mustache string format.

**Example:**

```js
console.log(
  faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')
);
```

This will interpolate the format string with the value of methods `name.lastName()`, `name.firstName()`, and `name.suffix()`

## Localization

Faker has support for multiple locales.

The default language locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
faker.locale = 'de';
```

See our documentation for a list of [provided languages](https://fakerjs.dev/api/localization.html#localization)

### Individual Localization Packages

Faker supports incremental loading of locales.

```js
// loads only de locale
const { faker } = require('@faker-js/faker/locale/de');
```

## Setting a randomness seed

If you want consistent results, you can set your own seed:

```js
faker.seed(123);

const firstRandom = faker.datatype.number();

// Setting the seed again resets the sequence.
faker.seed(123);

const secondRandom = faker.datatype.number();

console.log(firstRandom === secondRandom);
```

## Sponsors

Faker is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome backers

### Sponsors

![](https://opencollective.com/fakerjs/organizations.svg)

### Backers

![](https://opencollective.com/fakerjs/individuals.svg)

## Contributing

Please make sure to read the [Contributing Guide](https://github.com/faker-js/faker/blob/main/CONTRIBUTING.md) before making a pull request.

### Building Faker

The project is being built by [esbuild](https://esbuild.github.io) (see [bundle.ts](scripts/bundle.ts))

```shell
pnpm install
pnpm run build
```

### Testing

```shell
pnpm install
pnpm run build

pnpm run test
# or
pnpm run coverage
```

You can view a code coverage report generated in `coverage/index.html`.

### Developing the docs

```shell
# build the Faker dist
# it's used inside of certain routes
pnpm run build

pnpm run docs:dev
```

### Building and serving the docs statically

```shell
# build the Faker dist
# it's used inside of certain routes
pnpm run build

pnpm run docs:build # Output docs to /dist
pnpm run docs:serve # Serve docs from /dist
```

### Deploying Documentation

The website is kindly hosted for free by the Netlify team under their Open Source plan. See the [netlify.toml](netlify.toml) for configuration.

### Thank you

Thank you to all the people who already contributed to Faker!

<a href="https://github.com/faker-js/faker/graphs/contributors"><img src="https://opencollective.com/fakerjs/contributors.svg?width=800" /></a>

## What happened to the original faker.js?

Read the [team update](https://fakerjs.dev/update.html) (January 14th, 2022).

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/faker-js/faker/blob/main/CHANGELOG.md).

## License

[MIT](https://github.com/faker-js/faker/blob/main/LICENSE)
