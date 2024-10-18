# Getting Started

## Overview

Faker is a popular library that generates fake (but reasonable) data that can be used for things such as:

- Unit Testing
- Performance Testing
- Building Demos
- Working without a completed backend

Faker was originally written in [Perl](https://metacpan.org/dist/Data-Faker) and this is the JavaScript port. Faker is also available as a library for [Ruby](https://github.com/faker-ruby/faker), [Java](https://github.com/DiUS/java-faker), and [Python](https://github.com/joke2k/faker).

This documentation only covers the JavaScript implementation of Faker.

## Environments

You can run Faker in the browser, or in Node.js. Faker v9.0 requires Node.js version 18 or above. Both ESM and CommonJS imports are available.

## Installation

Install it as a Dev Dependency using your favorite package manager.

::: code-group

```shell [npm]
npm install @faker-js/faker --save-dev
```

```shell [pnpm]
pnpm add @faker-js/faker --save-dev
```

```shell [yarn]
yarn add @faker-js/faker --dev
```

:::

## Faker Modules

Faker has three types of modules:

- The [`helpers`](/api/datatype) module, with various utility methods to use with your own data
- Modules for basic datatypes: [`datatype`](/api/datatype), [`date`](/api/date), [`number`](/api/number) and [`string`](/api/string)
- And topic specific modules, such as [`animal`](/api/animal), [`food`](/api/food) and many more

For a full list of modules, go to our [Api Search](/api/) page.

If you would like to know how to use Faker, go to our [Usage Guide](/guide/usage) page.

## Community

If you have questions or need help, reach out to the community via [Discord](https://chat.fakerjs.dev) and [GitHub Discussions](https://github.com/faker-js/faker/discussions).

You can see awesome things related to the Faker community at [Awesome Faker](https://github.com/faker-js/awesome-faker).
