# Recent Statement and FAQs

_January 11th, 2022_

Due to recent events, folks may have some questions or concerns about the future of Faker.

Here are some answers.

## What happened?

In short, the author deleted the original repository in protest against large companies who did not pay him for maintaining Faker.

In response to all that happened, we have created an entirely new GitHub Organization for the packages and ecosystem under the namespace [faker-js](https://github.com/faker-js).

:::tip Support Open Source Software

🙏 Please ask your company to do their part in sponsoring Open Source projects and contributors.

Seriously, you don't have to sponsor _this_ project, just start having the conversation with your engineering leadership.
:::

## Are these the official docs?

**Yes**. This is the official site and documentation for the Faker library.

## Who maintains Faker now?

**Faker is now maintained by the organization [faker-js](https://github.com/faker-js)** after the original repository was deleted by the author.

## My build broke. Help.

If you have installed `faker` from npm, please uninstall it and migrate to `@faker-js/faker`. Due to the above issues, version 6 of faker.js **does not run** and is why the `@faker-js/faker` package exists.

We will be releasing a new version shortly.

**NPM**

```shell
npm install @faker-js/faker --save-dev
```

**Yarn**

```shell
yarn add @faker-js/faker -D
```

**pnpm**

```shell
pnpm add -D @faker-js/faker
```
