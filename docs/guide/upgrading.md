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

### Node v18 No Longer Supported

Support for Node.js v18 has been discontinued, as this version has reached its [end-of-life](https://github.com/nodejs/Release). Faker.js v10 requires a minimum of Node.js v20.19.0, v22.13.0, or v24.0.0.

### CommonJS Still Supported, but Check Your Node Version

Technically, Faker v10 is now an ESM-only package. However, the good news is that you can still use it from your CommonJS packages without code changes, thanks to the [ESM Modules require feature](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require) in recent versions of Node.js.

If you are using Node 20, ensure you are using a sufficiently recent minor version—Node v20.19+ or Node v22.13+ is required.

```ts
const { faker, fakerES } = require('@faker-js/faker'); // this still works
```

If your version of Node.js is too old, you may see an error like:

```
Uncaught:
Error [ERR_REQUIRE_ESM]: require() of ES Module <path>/faker/dist/index.js not supported.
Instead, change the require of index.js in null to a dynamic import(), which is available in all CommonJS modules.
```

### Removal of Deprecated Code

A number of methods that were deprecated in v9 have been completely removed in v10. To prepare for the upgrade, it is recommended to first upgrade to the latest version of v9 (e.g., `npm install --save-dev faker@9`) and fix any deprecation warnings issued by your code.

| Removed Method            | Replacement / Notes       |
| ------------------------- | ------------------------- |
| `faker.address.*`         | `faker.location.*`        |
| `faker.name.*`            | `faker.person.*`          |
| `faker.internet.userName` | `faker.internet.username` |

Some methods do not have exact replacements, so check your code carefully.

| Removed Method               | Replacement / Notes                                      |
| ---------------------------- | -------------------------------------------------------- |
| `faker.internet.color`       | `faker.color.rgb`                                        |
| `faker.image.urlPlaceholder` | `faker.image.dataUri`                                    |
| `faker.finance.maskedNumber` | See [#3201](https://github.com/faker-js/faker/pull/3201) |
| `faker.image.avatarLegacy`   | `faker.image.avatar`                                     |

### Word Methods Default Resolution Strategy

The default resolution strategy for the methods in the word module changed to 'fail'.
This means that methods in the word module will throw an error if no words for your input criteria exist.

```ts
// There are no nouns between 20-25 characters long in the word list
faker.word.noun({ length: { min: 20, max: 25 } });
// In v9, this would return a random noun of any length, like 'plastic'
// In v10, this throws an error `FakerError: No words found that match the given length.`
```

Previously, the methods would return a random word, completly ignoring the the length requirements you specified.
If you want to restore this behaviour, you can provide the 'any-length' strategy to the word methods.

| Method in v9                | Method in v10 with v9 behaviour                       |
| --------------------------- | ----------------------------------------------------- |
| `faker.word.adjective()`    | `faker.word.adjective({ strategy: 'any-length' })`    |
| `faker.word.adverb()`       | `faker.word.adverb({ strategy: 'any-length' })`       |
| `faker.word.conjunction()`  | `faker.word.conjunction({ strategy: 'any-length' })`  |
| `faker.word.interjection()` | `faker.word.interjection({ strategy: 'any-length' })` |
| `faker.word.noun()`         | `faker.word.noun({ strategy: 'any-length' })`         |
| `faker.word.preposition()`  | `faker.word.preposition({ strategy: 'any-length' })`  |
| `faker.word.sample()`       | `faker.word.sample({ strategy: 'any-length' })`       |
| `faker.word.verb()`         | `faker.word.verb({ strategy: 'any-length' })`         |
