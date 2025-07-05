---
outline: [2, 3]
---

# Upgrading to v10

This is the migration guide for upgrading from v9 to v10.

::: tip
v10 has not yet been released. This page contains a work-in-progress list of breaking changes in v10.
:::

::: info Not the version you are looking for?

- [Upgrading to v9](https://v9.fakerjs.dev/guide/upgrading.html)
- [Upgrading to v8](https://v8.fakerjs.dev/guide/upgrading.html)
- [Upgrading to v7](https://v7.fakerjs.dev/guide/upgrading.html)
- [Upgrading to v6](https://v6.fakerjs.dev/migration-guide-v5/)

:::

## General Breaking Changes

### Node v18 no longer supported

Support for Node.js v18 has been discontinued as this versions have reached their [end-of-life](https://github.com/nodejs/Release). Faker.js v10 requires a minimum of Node.js v20.19.0 or Node v22.13.0 or Node 24.0.0.

### CommonJS still supported, but check your Node version

Technically Node v10 is now an ESM-only package. However, the good news is you can still use it from your CommonJS packages without code changes thanks to the [ESM Modules require feature](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require) in recent version of Node js.

If you are using Node 20, ensure you are using a sufficiently recent minor version - Node v20.19+ or Node v22.13+ is required.

```ts
const { faker, fakerES } = require('@faker-js/faker'); //this still works
```

If your version of Node.js is too old, you may see an error like:

```
Uncaught:
Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/matt/Documents/git/faker/dist/index.js not supported.
Instead change the require of index.js in null to a dynamic import() which is available in all CommonJS modules.
```

### Removals of Deprecated Code

A number of methods which were deprecated in v9 are completely removed in v10. To prepare for the upgrade, it is recommended to first upgrade to the latest version of v9 (e.g. `npm install --save-dev faker@9`) and fix any deprecation warnings issued by your code.

| Removed Method           | Replacement / Notes         |
|-------------------------|-----------------------------|
| `faker.address.*`       | `faker.location.*`          |
| `faker.name.*`          | `faker.person.*`            |
| `faker.internet.userName` | `faker.internet.username`  |

Some methods do not have exact replacements, so check your code carefully.

| Removed Method               | Replacement / Notes                                      |
| ---------------------------- | -------------------------------------------------------- |
| `faker.internet.color`       | `faker.color.rgb()`                                      |
| `faker.image.urlPlaceholder` | `faker.image.dataUri`                                    |
| `faker.finance.maskedNumber` | See [#3201](https://github.com/faker-js/faker/pull/3201) |
| `faker.image.avatarLegacy` | `faker.image.avatar`                                   |
