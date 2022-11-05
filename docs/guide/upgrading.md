# Upgrading to v8

This is the migration guide for upgrading from v7 to v8.

Since v8 has not yet been released, this is a work in progress list of any major and breaking changes in v8.

::: info
Not the version you are looking for?

- [Upgrading to v6](https://v6.fakerjs.dev/migration-guide-v5/)
- [Upgrading to v7](https://v7.fakerjs.dev/guide/upgrading.html)

:::

## faker.mersenne and faker.helpers.repeatString removed

`faker.mersenne` and `faker.helpers.repeatString` were only ever intended for internal use, and are no longer available.

## Other deprecated methods replaced

| Old method                    | New method                                                         |
| ----------------------------- | ------------------------------------------------------------------ |
| faker.unique                  | faker.helpers.unique                                               |
| faker.fake                    | faker.helpers.fake                                                 |
| faker.commerce.color          | faker.color.human                                                  |
| faker.company.companyName     | faker.company.name                                                 |
| faker.phone.phoneNumber       | faker.phone.number                                                 |
| faker.phone.phoneNumberFormat | No direct replacement, `faker.phone.number` has a format parameter |
| faker.phone.phoneFormats      | No direct replacement, `faker.phone.number` has a format parameter |

## faker.name changed to faker.person

The whole `faker.name` module is now located at `faker.person`, as it contains more information than just names.
The `faker.name.*` methods will continue to work as an alias in v8 and v9, but it is recommended to change to `faker.person.*`

| Old method               | New method                                    |
| ------------------------ | --------------------------------------------- |
| faker.name.firstName     | faker.person.firstName                        |
| faker.name.lastName      | faker.person.lastName                         |
| faker.name.middleName    | faker.person.middleName                       |
| faker.name.fullName      | faker.person.fullName                         |
| faker.name.gender        | faker.person.gender                           |
| faker.name.sex           | faker.person.sex                              |
| faker.name.sexType       | faker.person.sexType                          |
| faker.name.prefix        | faker.person.prefix                           |
| faker.name.suffix        | faker.person.suffix                           |
| faker.name.jobTitle      | faker.person.jobTitle                         |
| faker.name.jobDescriptor | faker.person.jobDescriptor                    |
| faker.name.jobArea       | faker.person.jobArea                          |
| faker.name.jobType       | faker.person.jobType                          |
| faker.name.findName      | _Removed, replace with faker.person.fullName_ |

## faker.address changed to faker.location

The whole `faker.address` module is now located at `faker.location`, as it contains more information than just addresses.
The `faker.address.*` methods will continue to work as an alias in v8 and v9, but it is recommended to change to `faker.location.*`

| Old method                        | New method                         |
| --------------------------------- | ---------------------------------- |
| faker.address.buildingNumber      | faker.location.buildingNumber      |
| faker.address.cardinalDirection   | faker.location.cardinalDirection   |
| faker.address.city                | faker.location.city                |
| faker.address.cityName            | faker.location.cityName            |
| faker.address.country             | faker.location.country             |
| faker.address.countryCode         | faker.location.countryCode         |
| faker.address.county              | faker.location.county              |
| faker.address.direction           | faker.location.direction           |
| faker.address.faker               | faker.location.faker               |
| faker.address.latitude            | faker.location.latitude            |
| faker.address.longitude           | faker.location.longitude           |
| faker.address.nearbyGPSCoordinate | faker.location.nearbyGPSCoordinate |
| faker.address.ordinalDirection    | faker.location.ordinalDirection    |
| faker.address.secondaryAddress    | faker.location.secondaryAddress    |
| faker.address.state               | faker.location.state               |
| faker.address.stateAbbr           | faker.location.stateAbbr           |
| faker.address.street              | faker.location.street              |
| faker.address.streetAddress       | faker.location.streetAddress       |
| faker.address.streetName          | faker.location.streetName          |
| faker.address.timeZone            | faker.location.timeZone            |
| faker.address.zipCode             | faker.location.zipCode             |
| faker.address.zipCodeByState      | faker.location.zipCodeByState      |
| faker.address.cityPrefix          | _Removed_                          |
| faker.address.citySuffix          | _Removed_                          |
| faker.address.streetPrefix        | _Removed_                          |
| faker.address.streetSuffix        | _Removed_                          |

## Locale renamed

The `en-IND` (English, India) locale was renamed to `en-IN` for consistency with other locales.
