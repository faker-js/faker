# Upgrading to v8

This is the migration guide for upgrading from v7 to v8.

Since v8 has not yet been released, this is a work in progress list of any major and breaking changes in v8.

::: info Not the version you are looking for?

- [Upgrading to v7](https://v7.fakerjs.dev/guide/upgrading.html)
- [Upgrading to v6](https://v6.fakerjs.dev/migration-guide-v5/)

:::

## Breaking changes

### Removed ability to change the locale on existing `Faker` instances

::: tip Note
If you are using only the default (`en`) locale, then you don't have to change anything.
:::

In order to facilitate better and easier locale fallback mechanics, we removed the methods to change the locales on existing `Faker` instances.
Now, we expose specific faker instances for each locale that you can use:

**Old**

```ts
import { faker } from '@faker-js/faker';

faker.setLocale('de_CH');
// or
faker.locale = 'de_CH';
faker.fallbackLocale = 'en';
```

**New**

```ts
import { fakerDE_CH as faker } from '@faker-js/faker';
```

This also fixes issues where more than two locales are required:

**Old**

```ts
import { faker } from '@faker-js/faker';

const customFaker = new Faker({
  locale: 'de_CH', // the expected locale
  fallbackLocale: 'de', // ensure we have a German fallbacks for addresses
  locales: { de_CH, de, en },
});
const a = customFaker.internet.email();
customFaker.locale = 'en'; // neither 'de_CH' nor 'de' have emojis
const b = customFaker.internet.emoji();
```

**New**

```ts
import { Faker, de_CH, de, en, base } from '@faker-js/faker';

// same as fakerDE_CH
export const customFaker = new Faker({
  // Now multiple fallbacks are supported
  locale: [de_CH, de, en, base],
});
const a = customFaker.internet.email();
const b = customFaker.internet.emoji();
```

If you wish to create entries for multiple locales, you can still do so:

**Old**

```ts
import { faker } from '@faker-js/faker';

for (let user of users) {
  const lang = faker.helpers.arrayElement(['de', 'en', 'fr']);
  faker.locale = lang;
  user.email = faker.internet.email();
}
```

**New**

```ts
import { faker, fakerDE, fakerEN, fakerFR } from '@faker-js/faker';

for (let user of users) {
  const currentFaker = faker.helpers.arrayElement([fakerDE, fakerEN, fakerFR]);
  user.email = currentFaker.internet.email();
}
```

For more information refer to our [Localization Guide](localization).

### `faker.mersenne` and `faker.helpers.repeatString` removed

`faker.mersenne` and `faker.helpers.repeatString` were only ever intended for internal use, and are no longer available.

### `faker.location.zipCodeByState`

The `faker.location.zipCodeByState` method has been deprecated, but will also now throw an error if the current locale does not have a `postcode_by_state` definition.

### Methods will throw on empty data set inputs

The methods `faker.helpers.arrayElement` and `faker.helpers.arrayElements` previously defaulted the `array` argument to a simple string array if none was provided.
This behavior is no longer supported, as the default value has been removed.
You are now required to provide an argument.

Additionally, by providing an empty array argument (`[]`) the functions previously returned `undefined`.
This behavior was undesired and has been removed.
The methods will now throw an `FakerError` instead.

The same thing happens now if you provide an empty object `{}` to `faker.helpers.objectKey` or `faker.helpers.objectValue`.

**Old**

```ts
const allTags = ['dogs', 'cats', 'fish', 'horses', 'sheep'];
const tags = faker.helpers.arrayElements(allTags, { min: 0, max: 3 });
// `tags` might be an empty array which was no problem in v7
const featuredTag = faker.helpers.arrayElement(tags);
// `featureTag` will be typed as `string` but could actually be `undefined`
```

**New**

```ts
const allTags = ['dogs', 'cats', 'fish', 'horses', 'sheep'];
const tags = faker.helpers.arrayElements(allTags, { min: 0, max: 3 });
// `tags` might be an empty array which will throw in v8
const featuredTag =
  tags.length === 0 ? undefined : faker.helpers.arrayElement(tags);
// `featureTag` has to be explicitly set to `undefined` on your side

// OR

const allTags = ['dogs', 'cats', 'fish', 'horses', 'sheep'];
const tags = faker.helpers.arrayElements(allTags, { min: 0, max: 3 });
let featuredTag: string | undefined;
try {
  featuredTag = faker.helpers.arrayElement(post.tags);
} catch (e) {
  // handle error and do something special
}
```

### Other deprecated methods removed/replaced

| Old method                      | New method                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `faker.unique`                  | `faker.helpers.unique` (:warning: please have a look at [#1785](https://github.com/faker-js/faker/issues/1785)) |
| `faker.fake`                    | `faker.helpers.fake`                                                                                            |
| `faker.commerce.color`          | `faker.color.human`                                                                                             |
| `faker.company.companyName`     | `faker.company.name`                                                                                            |
| `faker.phone.phoneNumber`       | `faker.phone.number`                                                                                            |
| `faker.phone.phoneNumberFormat` | No direct replacement, see documentation for `faker.phone.number`                                               |
| `faker.phone.phoneFormats`      | No direct replacement, see documentation for `faker.phone.number`                                               |
| `faker.name.findName`           | _Removed, replace with `faker.person.fullName`_                                                                 |
| `faker.address.cityPrefix`      | _Removed_                                                                                                       |
| `faker.address.citySuffix`      | _Removed_                                                                                                       |
| `faker.address.streetPrefix`    | _Removed_                                                                                                       |
| `faker.address.streetSuffix`    | _Removed_                                                                                                       |
| `faker.image.lorempixel`        | _Removed, as the LoremPixel service is no longer available_                                                     |

### Definitions removed

Some data definitions, which were only available via the `faker.helpers.fake` method, or the undocumented `faker.definitions`, have been removed.

| Removed data                                          | Alternative                        |
| ----------------------------------------------------- | ---------------------------------- |
| `faker.definitions.business.credit_card_numbers`      | `faker.finance.creditCardNumber()` |
| `faker.definitions.business.credit_card_types`        | `faker.finance.creditCardIssuer()` |
| `faker.definitions.business.credit_card_expiry_dates` | `faker.date.future()`              |

## Deprecations and other changes

### `faker.name` changed to `faker.person`

The whole `faker.name` module is now located at `faker.person`, as it contains more information than just names.
The `faker.name.*` methods will continue to work as an alias in v8 and v9, but it is recommended to change to `faker.person.*`

| Old method                 | New method                                      |
| -------------------------- | ----------------------------------------------- |
| `faker.name.firstName`     | `faker.person.firstName`                        |
| `faker.name.lastName`      | `faker.person.lastName`                         |
| `faker.name.middleName`    | `faker.person.middleName`                       |
| `faker.name.fullName`      | `faker.person.fullName`                         |
| `faker.name.gender`        | `faker.person.gender`                           |
| `faker.name.sex`           | `faker.person.sex`                              |
| `faker.name.sexType`       | `faker.person.sexType`                          |
| `faker.name.prefix`        | `faker.person.prefix`                           |
| `faker.name.suffix`        | `faker.person.suffix`                           |
| `faker.name.jobTitle`      | `faker.person.jobTitle`                         |
| `faker.name.jobDescriptor` | `faker.person.jobDescriptor`                    |
| `faker.name.jobArea`       | `faker.person.jobArea`                          |
| `faker.name.jobType`       | `faker.person.jobType`                          |
| `faker.name.findName`      | _Removed, replace with `faker.person.fullName`_ |

### `faker.address` changed to `faker.location`

The whole `faker.address` module is now located at `faker.location`, as it contains more information than just addresses.
The `faker.address.*` methods will continue to work as an alias in v8 and v9, but it is recommended to change to `faker.location.*`

| Old method                          | New method                           |
| ----------------------------------- | ------------------------------------ |
| `faker.address.buildingNumber`      | `faker.location.buildingNumber`      |
| `faker.address.cardinalDirection`   | `faker.location.cardinalDirection`   |
| `faker.address.city`                | `faker.location.city`                |
| `faker.address.cityName`            | `faker.location.cityName`            |
| `faker.address.country`             | `faker.location.country`             |
| `faker.address.countryCode`         | `faker.location.countryCode`         |
| `faker.address.county`              | `faker.location.county`              |
| `faker.address.direction`           | `faker.location.direction`           |
| `faker.address.faker`               | `faker.location.faker`               |
| `faker.address.latitude`            | `faker.location.latitude`            |
| `faker.address.longitude`           | `faker.location.longitude`           |
| `faker.address.nearbyGPSCoordinate` | `faker.location.nearbyGPSCoordinate` |
| `faker.address.ordinalDirection`    | `faker.location.ordinalDirection`    |
| `faker.address.secondaryAddress`    | `faker.location.secondaryAddress`    |
| `faker.address.state`               | `faker.location.state`               |
| `faker.address.stateAbbr`           | `faker.location.stateAbbr`           |
| `faker.address.street`              | `faker.location.street`              |
| `faker.address.streetAddress`       | `faker.location.streetAddress`       |
| `faker.address.streetName`          | `faker.location.streetName`          |
| `faker.address.timeZone`            | `faker.location.timeZone`            |
| `faker.address.zipCode`             | `faker.location.zipCode`             |
| `faker.address.zipCodeByState`      | `faker.location.zipCodeByState`      |
| `faker.address.cityPrefix`          | _Removed_                            |
| `faker.address.citySuffix`          | _Removed_                            |
| `faker.address.streetPrefix`        | _Removed_                            |
| `faker.address.streetSuffix`        | _Removed_                            |

### Number methods of `faker.datatype` moved to new `faker.number` module

The number-related methods previously found in `faker.datatype` have been moved to a new `faker.number` module.
For the old `faker.datatype.number` method you should replace with `faker.number.int` or `faker.number.float` depending on the precision required.

By default, `faker.number.float` no longer defaults to a precision of 0.01

```js
// OLD
faker.datatype.number({ max: 100 }); // 35
faker.datatype.number({ max: 100, precision: 0.01 }); // 35.21
faker.datatype.float({ max: 100 }); // 35.21
faker.datatype.float({ max: 100, precision: 0.001 }); // 35.211

// NEW
faker.number.int({ max: 100 }); // 35
faker.number.float({ max: 100 }); // 35.21092065742612
faker.number.float({ max: 100, precision: 0.01 }); // 35.21
```

| Old method              | New method                                 |
| ----------------------- | ------------------------------------------ |
| `faker.datatype.number` | `faker.number.int` or `faker.number.float` |
| `faker.datatype.float`  | `faker.number.float`                       |
| `faker.datatype.bigInt` | `faker.number.bigInt`                      |

### Deprecation of `faker.datatype.array`

The method `faker.datatype.array` has been deprecated and will be removed in v9.
If you need an array of useful values, you are better off creating your own one using `faker.helpers.multiple`.

### `allowLeadingZeros` behavior change in `faker.string.numeric`

The `allowLeadingZeros` boolean parameter in `faker.string.numeric` (in the new `string` module) now defaults to `true`. `faker.string.numeric` will now generate numeric strings that could have leading zeros by default.

### Simplified MIME type data

The functions `faker.system.mimeType`, `faker.system.fileType` and `faker.system.fileExt` now return data from a smaller set of more common MIME types, filetypes and extensions.

### `faker.helpers.unique` is planned to be outsourced

The `faker.helpers.unique` method is planned to be outsourced to a separate package.  
Please have a look at issue [#1785](https://github.com/faker-js/faker/issues/1785) for more details.

### Locales renamed

The `en_IND` (English, India) locale was renamed to `en_IN` for consistency with other locales.

The `cz` (Czech) locale was renamed to `cs_CZ` to use the standard ISO codes for language and country.

The `ge` (Georgian) locale was renamed to `ka_GE` to use the standard ISO codes for language and country.
