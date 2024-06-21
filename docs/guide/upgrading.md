---
outline: [2, 3]
---

# Upgrading to v9

This is the migration guide for upgrading from v8 to v9.

::: info Not the version you are looking for?

- [Upgrading to v8](https://v8.fakerjs.dev/guide/upgrading.html)
- [Upgrading to v7](https://v7.fakerjs.dev/guide/upgrading.html)
- [Upgrading to v6](https://v6.fakerjs.dev/migration-guide-v5/)

:::

v9 has not yet been released. This page contains a work-in-progress list of breaking changes in v9.

## General Breaking Changes

### Requires Node v18+

Support for Node.js v14 and v16 has been discontinued as these versions have reached their [end-of-life](https://github.com/nodejs/Release). Faker.js v9 requires a minimum of Node.js v18.

### Upgrade to TypeScript v5

We now use TypeScript v5 for our project (previously v4).
While generally not breaking for users, this might have small side effects on our types.

#### Usage of TypeScript 5 Features

The helpers module now uses TS5 features, so if you are using Faker with TypeScript, you must use TS5.

```ts
// v8
faker.helpers.arrayElement([1, 2, 3]); // number
faker.helpers.arrayElement([1, 2, 3] as const); // 1 | 2 | 3

// v9
faker.helpers.arrayElement([1, 2, 3]); // 1 | 2 | 3
```

### Fix Tree Shaking

Prior to this version, there was an issue where all locales would be bundled even if only one was used. Users had to resort to a workaround by importing specific faker instances from dedicated paths.

```ts
import { faker } from '@faker-js/faker/locale/de';
```

With this fix, the workaround should no longer be necessary. You will be able to import different localized faker instances from the root of your package with the bundle only including those specific locales.

```ts
import { fakerDE, fakerES, fakerFR } from '@faker-js/faker';
```

The dedicated import paths are kept in v9, to allow a gradual migration for our users.

While this is not a breaking change according to semantic versioning guidelines, it does impact the behavior of users' bundlers.

### Use High Precision RNG by Default

TLDR: Many Faker methods return a different result in v9 compared to v8 for the same seed.

In v9 we switch from a 32 bit random value to a 53 bit random value.
We don't change the underlying algorithm much, but we now consume two seed values each step instead of one.
This affects generated values in two ways:

- In large lists or long numbers the values are spread more evenly.
  This also reduces the number of duplicates it generates.
  For `faker.number.int()` this reduces the number of duplicates from `1 / 10_000` to less than `1 / 8_000_000`.
- If you start with the same initial seed to generate a value, you might see some changes in the results you get.
  This is because we're now working with a higher precision, which affects how numbers are rounded off.
  As a result, the methods we use might produce slightly different outcomes.
  And since we are now using two seed values each time subsequent results appear to skip a value each time.

```ts
import {
  SimpleFaker,
  generateMersenne32Randomizer,
  generateMersenne53Randomizer,
} from '@faker-js/faker';

// < v9 default
const f32 = new SimpleFaker({ randomizer: generateMersenne32Randomizer() });
f32.seed(123);
const r32 = f32.helpers.multiple(() => f32.number.int(10), { count: 10 });
// > v9 default
const f53 = new SimpleFaker({ randomizer: generateMersenne53Randomizer() });
f53.seed(123);
const r53 = f53.helpers.multiple(() => f53.number.int(10), { count: 5 });

diff(r32, r53);
//[
//  7,
//  7, // [!code --]
//  3,
//  4, // [!code --]
//  2,
//  7, // [!code --]
//  6,
//  7, // [!code --]
//  7,
//  5, // [!code --]
//]
```

#### Adoption

- If you don't have any seeded tests and just want some random values, then you don't have to change anything.
- If you have seeded tests, you have to update most test snapshots or similar comparisons to new values.
- If you are using [vitest](https://vitest.dev), you can do that using `pnpm vitest run -u`.

#### Keeping the Old Behavior

You can keep the old behavior, if you create your own `Faker` instance
and pass a `Randomizer` instance from the `generateMersenne32Randomizer()` function to it.

```ts{8}
import {
  Faker,
  generateMersenne32Randomizer, // < v9 default
  generateMersenne53Randomizer, // > v9 default
} from '@faker-js/faker';

const faker = new Faker({
  randomizer: generateMersenne32Randomizer(),
  ...
});
```

### Using `tsup` for the Build Process

After the switch to [tsup](https://tsup.egoist.dev), the `dist` folder now contains minified and chunked files for CJS. However, as we officially support only `exports` defined via `package.json`, this should not affect your code.

## Removals of Deprecated Code

A large number of methods which were deprecated in v8 are completely removed in v9. To prepare for the upgrade, it is recommended to first upgrade to the latest version of v8 (e.g. `npm install --save-dev faker@8`) and fix any deprecation warnings issued by your code.

The following sections contain more information about these changes.

### Constructor and JS Backwards-Compatibility Methods

Removed deprecated faker constructor, so you can no longer just pass a locale string identifier.

Also removed the accessors and method that were only for JS backwards compatibility.

- `get/set locales`
- `get/set locale`
- `get/set localeFallback`
- `setLocale`

To use the new constructor, you need to pass a locale object like:

```ts
import { Faker, es, base } from '@faker-js/faker';

// A custom faker instance that does not have any fallbacks
const customEsFakerWithoutFallback = new Faker({ locale: es });

// A custom faker instance that has only base-data as fallback, but not english data
const customEsFakerWithFallback = new Faker({ locale: [es, base] });
```

### Commerce Module

Removed deprecated commerce methods

| old                                           | replacement                                       |
| --------------------------------------------- | ------------------------------------------------- |
| `faker.commerce.price(min, max, dec, symbol)` | `faker.commerce.price({ min, max, dec, symbol })` |

### Company Module

Removed deprecated company methods

| old                           | replacement                   |
| ----------------------------- | ----------------------------- |
| `faker.company.suffixes`      | Part of `faker.company.name`  |
| `faker.company.companySuffix` | Part of `faker.company.name`  |
| `faker.company.bs`            | `faker.company.buzzPhrase`    |
| `faker.company.bsAdjective`   | `faker.company.buzzAdjective` |
| `faker.company.bsBuzz`        | `faker.company.buzzVerb`      |
| `faker.company.bsNoun`        | `faker.company.buzzNoun`      |

### Datatype Module

Removed deprecated datatype methods

| old                                     | replacement                                                  |
| --------------------------------------- | ------------------------------------------------------------ |
| `faker.datatype.number()`               | `faker.number.int()` or `faker.number.float()`               |
| `faker.datatype.float()`                | `faker.number.float()`                                       |
| `faker.datatype.datetime({ min, max })` | `faker.date.between({ from, to })` or `faker.date.anytime()` |
| `faker.datatype.string()`               | `faker.string.sample()`                                      |
| `faker.datatype.uuid()`                 | `faker.string.uuid()`                                        |
| `faker.datatype.hexadecimal()`          | `faker.string.hexadecimal()` or `faker.number.hex()`         |
| `faker.datatype.json()`                 | your own function to generate complex objects                |
| `faker.datatype.array()`                | your own function to build complex arrays                    |
| `faker.datatype.bigInt()`               | `faker.number.bigInt()`                                      |

### Date Module

Removed deprecated date methods

| old                                    | replacement                                |
| -------------------------------------- | ------------------------------------------ |
| `faker.date.past(years, refDate)`      | `faker.date.past({ years, refDate })`      |
| `faker.date.future(years, refDate)`    | `faker.date.future({ years, refDate })`    |
| `faker.date.between(from, to)`         | `faker.date.between({ from, to })`         |
| `faker.date.betweens(from, to, count)` | `faker.date.betweens({ from, to, count })` |
| `faker.date.recent(days, refDate)`     | `faker.date.recent({ days, refDate })`     |
| `faker.date.soon(days, refDate)`       | `faker.date.soon({ days, refDate })`       |
| `faker.date.month({ abbr })`           | `faker.date.month({ abbreviated })`        |
| `faker.date.weekday({ abbr })`         | `faker.date.weekday({ abbreviated })`      |

### Finance Module

Removed deprecated finance methods

| old                                                       | replacement                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `faker.finance.account`                                   | `faker.finance.accountNumber`                                 |
| `faker.finance.mask`                                      | `faker.finance.maskedNumber`                                  |
| `faker.finance.amount(min, max, dec, symbol, autoFormat)` | `faker.finance.amount({ min, max, dec, symbol, autoFormat })` |
| `faker.finance.iban(formatted, countryCode)`              | `faker.finance.iban({ formatted, countryCode })`              |

### Git Module

Removed deprecated git methods

| old                    | replacement                          |
| ---------------------- | ------------------------------------ |
| `faker.git.shortSha()` | `faker.git.commitSha({ length: 7 })` |

### Helpers Module

Removed deprecated helpers methods

| old                                     | replacement                                                    |
| --------------------------------------- | -------------------------------------------------------------- |
| `faker.helpers.replaceSymbolWithNumber` | `string.replace(/#+/g, (m) => faker.string.numeric(m.length))` |
| `faker.helpers.regexpStyleStringParse`  | `faker.helpers.fromRegExp`                                     |
| `faker.helpers.unique`                  | `import { UniqueEnforcer } from 'enforce-unique';`             |

Note these are not exact replacements:

#### `faker.helpers.replaceSymbolWithNumber`

The `replaceSymbolWithNumber` method was deprecated in Faker v8.4 and removed in v9.0. The method parsed the given string symbol by symbol and replaces the `#` symbol with digits (`0` - `9`) and the `!` symbol with digits >=2 (`2` - `9`). This was primarily used internally by Faker for generating phone numbers. If needed, you can use a simple string replace combined with `faker.string.numeric` to replace this

```ts
// old
faker.helpers.replaceSymbolWithNumber('#####-##'); // '04812-67'

// new
'#####-##'.replace(/#+/g, (m) => faker.string.numeric(m.length));

// old
faker.helpers.replaceSymbolWithNumber('!#####'); // '123152'

// new
'!#####'
  .replace(/#+/g, (m) => faker.string.numeric(m.length))
  .replace(/!+/g, (m) =>
    faker.string.numeric({ length: m.length, exclude: ['0', '1'] })
  );
```

#### `faker.helpers.regexpStyleStringParse`

The `regexpStyleStringParse` method in `faker.helpers` was deprecated in Faker v8.1 and removed in v9.0. A likely replacement is the more powerful `faker.helpers.fromRegExp`.

```ts
faker.helpers.regexpStyleStringParse('a{3,6}'); // aaaaa
faker.helpers.fromRegExp('a{3,6}'); // aaaaa
```

However, please note that `faker.helpers.fromRegExp` is not an exact replacement for `faker.helpers.regexpStyleStringParse` as `fromRegExp` cannot handle numeric ranges. This now needs to be handled separately.

```ts
faker.helpers.regexpStyleStringParse('a{3,6}[1-100]'); // "aaaa53", etc.
faker.helpers.fromRegExp('a{3,6}') + faker.number.int({ min: 1, max: 100 });
```

#### `faker.helpers.unique`

Prior to v9, Faker provided a [`faker.helpers.unique()`](https://v8.fakerjs.dev/api/helpers.html#unique) method which had a global store to keep track of duplicates. This was removed in v9.

Please see the [unique values guide](/guide/unique) for alternatives.

For example, many simple use cases can use [`faker.helpers.uniqueArray`](https://v8.fakerjs.dev/api/helpers.html#uniqueArray). Or you can migrate to a recommended third party package such as [`enforce-unique`](https://www.npmjs.com/package/enforce-unique):

Basic example:

```ts
// OLD
const name = faker.helpers.unique(faker.person.firstName);

// NEW
import { UniqueEnforcer } from 'enforce-unique';
//const { UniqueEnforcer } = require("enforce-unique") // CJS

const enforcerName = new UniqueEnforcer();
const name = enforcerName.enforce(faker.person.firstName);
```

With parameters:

```ts
// OLD
const stateCode = faker.helpers.unique(faker.location.state, [
  {
    abbreviated: true,
  },
]);

// NEW
import { UniqueEnforcer } from 'enforce-unique';

const enforcerState = new UniqueEnforcer();
const stateCode = enforcerState.enforce(() =>
  faker.location.state({
    abbreviated: true,
  })
);
```

With options:

```ts
// OLD
const city = faker.helpers.unique(faker.location.city, [], {
  maxRetries: 100,
  maxTime: 1000,
});

// NEW
import { UniqueEnforcer } from 'enforce-unique';

const enforcer = new UniqueEnforcer();
const city = enforcer.enforce(faker.location.city, {
  maxRetries: 100,
  maxTime: 1000,
});
```

::: tip Note
`enforce-unique` does not directly support the `store` option previously available in `faker.helpers.unique`. If you were previously using this parameter, check the [documentation](https://www.npmjs.com/package/enforce-unique). If you need to reset the store, you can call the `reset()` method on the `UniqueEnforcer` instance.
:::

#### `faker.helpers.arrayElement` and `faker.helpers.arrayElements`

The following only affects usage in Javascript, as in Typescript this usage would already throw a compile-time error.

Previously, the `arrayElement` and `arrayElements` methods would throw a dedicated error, when called without arguments.

```ts
faker.helpers.arrayElement(undefined); // FakerError: Calling `faker.helpers.arrayElement()` without arguments is no longer supported.
```

Now, it throws a JS native error:

```ts
faker.helpers.arrayElement(undefined); // TypeError: Cannot read properties of undefined (reading 'length')
```

Calling the methods with an empty array instead still behaves as before.

### Image Module

Removed deprecated image methods

| old                       | replacement                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| `faker.image.image()`     | `faker.image.url()`                                                            |
| `faker.image.imageUrl()`  | `faker.image.url()`                                                            |
| `faker.image.abstract()`  | `faker.image.urlLoremFlickr({ category: 'abstract' })` or `faker.image.url()`  |
| `faker.image.animals()`   | `faker.image.urlLoremFlickr({ category: 'animals' })` or `faker.image.url()`   |
| `faker.image.business()`  | `faker.image.urlLoremFlickr({ category: 'business' })` or `faker.image.url()`  |
| `faker.image.cats()`      | `faker.image.urlLoremFlickr({ category: 'cats' })` or `faker.image.url()`      |
| `faker.image.city()`      | `faker.image.urlLoremFlickr({ category: 'city' })` or `faker.image.url()`      |
| `faker.image.food()`      | `faker.image.urlLoremFlickr({ category: 'food' })` or `faker.image.url()`      |
| `faker.image.nightlife()` | `faker.image.urlLoremFlickr({ category: 'nightlife' })` or `faker.image.url()` |
| `faker.image.fashion()`   | `faker.image.urlLoremFlickr({ category: 'fashion' })` or `faker.image.url()`   |
| `faker.image.people()`    | `faker.image.urlLoremFlickr({ category: 'people' })` or `faker.image.url()`    |
| `faker.image.nature()`    | `faker.image.urlLoremFlickr({ category: 'nature' })` or `faker.image.url()`    |
| `faker.image.sports()`    | `faker.image.urlLoremFlickr({ category: 'sports' })` or `faker.image.url()`    |
| `faker.image.technics()`  | `faker.image.urlLoremFlickr({ category: 'technics' })` or `faker.image.url()`  |
| `faker.image.transport()` | `faker.image.urlLoremFlickr({ category: 'transport' })` or `faker.image.url()` |

#### Image Providers

Removed deprecated image providers from `faker.image`. They already returned broken image URLs anyway.

| old                                         | replacement                                              |
| ------------------------------------------- | -------------------------------------------------------- |
| `faker.image.lorempicsum.image`             | `faker.image.urlPicsumPhotos`                            |
| `faker.image.lorempicsum.imageGrayscale`    | `faker.image.urlPicsumPhotos({ grayscale: true })`       |
| `faker.image.lorempicsum.imageBlurred`      | `faker.image.urlPicsumPhotos({ blur: 4 })`               |
| `faker.image.lorempicsum.imageRandomSeeded` | `faker.image.urlPicsumPhotos`                            |
| `faker.image.lorempicsum.imageUrl`          | `faker.image.urlPicsumPhotos`                            |
| `faker.image.placeholder.imageUrl`          | `faker.image.urlPlaceholder`                             |
| `faker.image.placeholder.randomUrl`         | `faker.image.urlPlaceholder`                             |
| `faker.image.unsplash.image`                | `faker.image.url`                                        |
| `faker.image.unsplash.imageUrl`             | `faker.image.url`                                        |
| `faker.image.unsplash.food`                 | `faker.image.urlLoremFlickr({ category: 'food' })`       |
| `faker.image.unsplash.people`               | `faker.image.urlLoremFlickr({ category: 'people' })`     |
| `faker.image.unsplash.nature`               | `faker.image.urlLoremFlickr({ category: 'nature' })`     |
| `faker.image.unsplash.technology`           | `faker.image.urlLoremFlickr({ category: 'technology' })` |
| `faker.image.unsplash.objects`              | `faker.image.urlLoremFlickr({ category: 'objects' })`    |
| `faker.image.unsplash.buildings`            | `faker.image.urlLoremFlickr({ category: 'buildings' })`  |

### Internet Module

Removed deprecated internet methods

| old                                                            | replacement                                                       |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `faker.internet.avatar()`                                      | `faker.image.avatarLegacy()` or `faker.image.avatar()`            |
| `faker.internet.email(firstName, lastName, provider, options)` | `faker.internet.email({ firstName, lastName, provider, ... })`    |
| `faker.internet.exampleEmail(firstName, lastName, options)`    | `faker.internet.exampleEmail({ firstName, lastName, ... })`       |
| `faker.internet.userName(firstName, lastName)`                 | `faker.internet.userName({ firstName, lastName })`                |
| `faker.internet.displayName(firstName, lastName)`              | `faker.internet.displayName({ firstName, lastName })`             |
| `faker.internet.color(redBase, greenBase, blueBase)`           | `faker.internet.color({ redBase, greenBase, blueBase })`          |
| `faker.internet.password(length, memorable, pattern, prefix)`  | `faker.internet.password({ length, memorable, pattern, prefix })` |

### Location Module

Removed deprecated location methods

| old                                                                | replacement                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `faker.location.zipCodeByState`                                    | `faker.location.zipCode({ state })`                                |
| `faker.location.cityName`                                          | `faker.location.city`                                              |
| `faker.location.streetName`                                        | `faker.location.street`                                            |
| `faker.location.stateAbbr()`                                       | `faker.location.state({ abbreviated: true })`                      |
| `faker.location.latitude(max, min, precision)`                     | `faker.location.latitude({ max, min, precision })`                 |
| `faker.location.longitude(max, min, precision)`                    | `faker.location.longitude({ max, min, precision })`                |
| `faker.location.direction(abbreviated)`                            | `faker.location.direction({ abbreviated })`                        |
| `faker.location.cardinalDirection(abbreviated)`                    | `faker.location.cardinalDirection({ abbreviated })`                |
| `faker.location.ordinalDirection(abbreviated)`                     | `faker.location.ordinalDirection({ abbreviated })`                 |
| `faker.location.nearbyGPSCoordinate(coordinate, radius, isMetric)` | `faker.location.nearbyGPSCoordinate({ origin, radius, isMetric })` |

#### Direction definitions reorganized

The locale definitions used by `faker.location.direction()`, `faker.location.cardinalDirection()` and `faker.location.ordinalDirection()` have been reorganized.
Previously, they were located under `definitions.location.direction` and `definitions.location.direction_abbr` and their values were required to be in a specific order.
Now, all values are nested under `definitions.location.direction` with descriptive property names.
If you are using the public methods, no changes are required.
You only need to change your code if you are accessing the raw definitions e.g. in `faker.helpers.fake()`.

| Before                    | After                                                                   |
| ------------------------- | ----------------------------------------------------------------------- |
| `location.direction`      | `location.direction.cardinal` or `location.direction.ordinal`           |
| `location.direction_abbr` | `location.direction.cardinal_abbr` or `location.direction.ordinal_abbr` |

#### Default country definitions removed

The `faker.definitions.location.default_country` definition has been removed, as they were not used by any public method, and were not useful for locales which don't correspond directly to a single country, like `ar`.

### Number Module

Removed deprecated number parameter

| old                                 | replacement                          |
| ----------------------------------- | ------------------------------------ |
| `faker.number.float({ precision })` | `faker.number.float({ multipleOf })` |

### Person Module

#### Changed Definitions

The locale definitions used by `faker.person.jobTitle()`, `faker.person.jobDescriptor()`, `faker.person.jobArea()` and `faker.person.jobType()` have been reorganized and are no longer nested under `definitions.person.title`. If you are using the public methods, no changes are required. You only need to change your code if you are accessing the raw definitions e.g. in `faker.helpers.fake()`.

| Before                    | After                   |
| ------------------------- | ----------------------- |
| `person.title.descriptor` | `person.job_descriptor` |
| `person.title.level`      | `person.job_area`       |
| `person.title.job`        | `person.job_type`       |

### Phone Module

Removed deprecated phone methods

| old                          | replacement                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `faker.phone.number(format)` | `faker.phone.number()`, `faker.string.numeric()` or `faker.helpers.fromRegExp()` |

### Random Module

Removed deprecated random module

| old                           | replacement                                     |
| ----------------------------- | ----------------------------------------------- |
| `faker.random.alpha()`        | `faker.string.alpha()`                          |
| `faker.random.alphaNumeric()` | `faker.string.alphanumeric()`                   |
| `faker.random.locale()`       | `faker.helpers.objectKey(allLocales/allFakers)` |
| `faker.random.numeric()`      | `faker.string.numeric()`                        |
| `faker.random.word()`         | `faker.lorem.word()` or `faker.word.sample()`   |
| `faker.random.words()`        | `faker.lorem.words()` or `faker.word.words()`   |

### Locale Aliases

Renamed deprecated locale aliases `cz`, `en_IND`, `ge` and removed `global`.

| old                                                     | replacement                                            |
| ------------------------------------------------------- | ------------------------------------------------------ |
| `import { faker } from '@faker-js/faker/locale/cz'`     | `import { faker } from '@faker-js/faker/locale/cs_CZ'` |
| `import { faker } from '@faker-js/faker/locale/en_IND'` | `import { faker } from '@faker-js/faker/locale/en_IN'` |
| `import { faker } from '@faker-js/faker/locale/ge'`     | `import { faker } from '@faker-js/faker/locale/ka_GE'` |
| `import { faker } from '@faker-js/faker/locale/global'` | `import { faker } from '@faker-js/faker/locale/base'`  |

### Renamed Locale Definitions

The following locale definitions have been adjusted to align with Faker's locale definition naming standard:

| old                                         | replacement                                  |
| ------------------------------------------- | -------------------------------------------- |
| `faker.definitions.science.chemicalElement` | `faker.definitions.science.chemical_element` |
| `faker.definitions.system.directoryPaths`   | `faker.definitions.system.directory_path`    |
| `faker.definitions.system.mimeTypes`        | `faker.definitions.system.mime_type`         |
| `faker.definitions.lorem.words`             | `faker.definitions.lorem.word`               |

With that now all our locale data use the following naming scheme:

```txt
faker.definitions.category_name.entry_name
```

Please keep in mind that property keys of complex objects remain in camel-case.

```txt
faker.definitions.science.chemical_element.atomicNumber
```

### Type Aliases

Removed deprecated type aliases

| old                              | replacement                     |
| -------------------------------- | ------------------------------- |
| `AddressDefinitions`             | `LocationDefinition`            |
| `AirlineDefinitions`             | `AirlineDefinition`             |
| `AnimalDefinitions`              | `AnimalDefinition`              |
| `ColorDefinitions`               | `ColorDefinition`               |
| `CommerceDefinitions`            | `CommerceDefinition`            |
| `CommerceProductNameDefinitions` | `CommerceProductNameDefinition` |
| `CompanyDefinitions`             | `CompanyDefinition`             |
| `DatabaseDefinitions`            | `DatabaseDefinition`            |
| `DateDefinitions`                | `DateDefinition`                |
| `FinanceDefinitions`             | `FinanceDefinition`             |
| `HackerDefinitions`              | `HackerDefinition`              |
| `InternetDefinitions`            | `InternetDefinition`            |
| `LoremDefinitions`               | `LoremDefinition`               |
| `MusicDefinitions`               | `MusicDefinition`               |
| `NameDefinitions`                | `PersonDefinition`              |
| `PhoneNumberDefinitions`         | `PhoneNumberDefinition`         |
| `ScienceDefinitions`             | `ScienceDefinition`             |
| `SystemDefinitions`              | `SystemDefinition`              |
| `SystemMimeTypeEntryDefinitions` | `SystemMimeTypeEntryDefinition` |
| `VehicleDefinitions`             | `VehicleDefinition`             |
| `WordDefinitions`                | `WordDefinition`                |
| `CSSFunction`                    | `CssFunctionType`               |
| `CSSSpace`                       | `CssSpaceType`                  |
| `AddressModule`                  | `LocationModule`                |
| `NameModule`                     | `PersonModule`                  |

## Breaking Changes to Specific Methods

### Birthdate New Default Mode

Previously, the `faker.date.birthdate()` method had defaults that were unclear in their specific impact.
Now, the method requires either none or all of the `min`, `max` and `mode` options.

We also improved the error messages in case of invalid min/max age/year ranges.

### Fail on Invalid Dates

Various methods in the `faker.date` module allow you to pass a `Date`-ish value:
that is, either a Javascript Date, or a timestamp number or string that can be converted to a `Date` via the `new Date()` constructor.

Previously, if you passed something which could not be parsed to a `Date`, it would fall back to the current reference date.
Now, this throws an error raising awareness of that bad value.

This affects the `refDate` parameter of the `anytime()`, `birthdate()`, `past()`, `future()`, `recent()` and `soon()`, methods as well as the `from` and `to` parameters of `between()` and `betweens()`.

### Separate Timezone Methods

The `timeZone` functionality has been divided to enhance specificity:

- Use `faker.date.timeZone()` to generate a random global time zone.
- Use `faker.location.timeZone()` to obtain time zone specific to the current locale.

We haven't updated all locale dependent time zone data yet, so if you encounter unexpected values, please create a new issue.

### Prices Now Return More Price-Like Values

The `faker.commerce.price()` method now produces values that also return fractional values.

Old price: 828.00
New price: 828.59

The last digit of the price is adjusted to be more price-like:

- 50% of the time: `9`
- 30% of the time: `5`
- 10% of the time: `0`
- 10% of the time: a random digit from `0` to `9`

We plan to rethink this method some more in the future: [#2579](https://github.com/faker-js/faker/issues/2579)

### Images Have Random Options by Default

`faker.image.url()` now returns an image url with a random width and height by default. To obtain the previous behavior, pass `{width: 640, height: 480}`.

`faker.image.urlLoremFlickr()` now returns an image url with a random width and height by default. To obtain the previous behavior, pass `{width: 640, height: 480}`.

`faker.image.urlPicsumPhotos()` now returns an image url with a random width and height by default, additionally images may be converted to grayscale and blurred at random. To obtain the previous behavior, pass `{width: 640, height: 480, blur: 0, grayscale: false}`

`faker.image.dataUri()` now returns an image url with a random width and height by default, additionally the type of the image is now random. To obtain the previous behavior, pass `{width: 640, height: 480, type: 'svg-uri'}`.

### Require `from` and `to` in `faker.date.between` and `betweens`

Previously, in `faker.date.between()` and `faker.date.betweens()` if the `from` or `to` parameter was omitted (in Javascript) or an invalid date (in Javascript or Typescript), they would default to the current date or reference date. Now, both boundaries must be given explicitly. If you still need the old behavior, you can pass `Date.now()` or the reference date for `from` or `to`.

### Stricter Checking for Function Signature Passed to `faker.helpers.multiple` Method

The `faker.helpers.multiple` method takes a function reference as its first parameter. Previously you may have written code like this to generate multiple values.

```ts
faker.helpers.multiple(faker.date.past, { count: 2 });
```

However this code has a bug - `faker.helpers.multiple` passes the loop index as the second parameter to the method, which in this case would set the `refDate` of the `faker.date.past()` call to 0, making all dates before 1970.

Instead you should generally use a lambda function like

```ts
faker.helpers.multiple(() => faker.date.past(), { count: 2 });
```

to get the desired behavior. In v9.0, we use stricter type-checking in Typescript to detect when a function is called which is not compatible with `(v: unknown, index: number)` which can cause compile-time errors in places where previously there were potential runtime errors.

**Bad**

```ts
faker.helpers.multiple(faker.person.firstName, ...); // ❗
// In Typescript, this is now a compile time error
// Argument of type '(sex?: "female" | "male" | undefined) => string'
// is not assignable to parameter of type '(v: unknown, index: number) => unknown'.
```

**Good**

```ts
faker.helpers.multiple(() => faker.person.firstName(), ...); // ✔
```

The new types also allow for easier use-cases where the index is part of the generated data e.g. as id.

```ts
faker.helpers.multiple((_, index) => ({ id: index, ...}), ...); // [{id: 0, ...}, ...]
```

### Stricter Enum Value Usage

Some methods would previously fallback to a default value for an option when an unknown value was passed for a enum parameter.
Now, these methods return undefined instead.
This only affects usage in Javascript, as in Typescript this usage would already throw a compile-time error.

For example:

```ts
faker.color.rgb({ format: 'unexpectedvalue' });
// in Faker v8, is [110, 82, 190] like { format: "decimal" }
// in Faker v9, is undefined
```

This affects:

- The `format` property of `faker.color.rgb()` must be one of `'binary' | 'css' | 'decimal' | 'hex'` if provided
- The `format` property of `faker.color.cmyk()`, `faker.color.hsl()`, `faker.color.hwb()`, `faker.color.lab()`, `faker.color.lch()` must be one of `'binary' | 'css' | 'decimal'` if provided
- The `variant` property of `faker.location.countryCode()` must be one of `alpha-2`, `alpha-3`, `numeric` if provided
- The `casing` property of `faker.string.alpha()` and `faker.string.alphanumeric()` must be one of `'upper' | 'lower' | 'mixed'` if provided

### Phone Number `style` Replaces Explicit `format`

`faker.phone.number()` generates a phone number for the current locale. Previously, there was little control over the generated number, which may or may not have included country codes, extensions, white space, and punctuation.

If you wanted more control over the number, it was previously necessary to pass an explicit `format` parameter. This has now been removed. Instead, you can consider one of two options:

1. The new `style` parameter has convenient options for common use cases. There are three possible values.
   - `'human'`: (default, existing behavior) A human-input phone number, e.g. `555-770-7727` or `555.770.7727 x1234`
   - `'national'`: A phone number in a standardized national format, e.g. `(555) 123-4567`.
   - `'international'`: A phone number in a E.123 standard international format with country code, e.g. `+15551234567`

The styles are locale-aware, so for example if you use pt_PT, phone numbers suitable for Portugal would be generated.

2. If none of the `style`s match your needs, you can use `faker.string.numeric()` or `faker.helpers.fromRegExp()` to create a custom pattern.
