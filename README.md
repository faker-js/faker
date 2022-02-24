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
  const randomCard = faker.helpers.createCard(); // random contact card containing many properties
</script>
```

### Node.js

```js
const { faker } = require('@faker-js/faker');
const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // random contact card containing many properties
```

### CDN/Deno

```js
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const randomName = faker.name.findName(); // Willie Bahringer
const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
const randomCard = faker.helpers.createCard(); // random contact card containing many properties
```

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

An in-depth overview of the API methods is available in the documentation. The API covers the following modules:

| Module   | Example                        | Output                                                                                                                                                                                                                  |
| -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Address  | `faker.address.city()`         | Lake Raoulfort                                                                                                                                                                                                          |
| Animal   | `faker.animal.type()`          | Dog, cat, snake, bear, lion, etc.                                                                                                                                                                                       |
| Commerce | `faker.commerce.product()`     | Polo t-shirt                                                                                                                                                                                                            |
| Company  | `faker.company.companyName()`  | Zboncak and Sons                                                                                                                                                                                                        |
| Database | `faker.database.engine()`      | MyISAM                                                                                                                                                                                                                  |
| Datatype | `faker.datatype.uuid()`        | 1oijf8-3iuhiu-21jddj-1092jf                                                                                                                                                                                             |
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

### API Methods

Faker provides many useful utility functions.

- faker.address

  | API                 | Description                     |
  | ------------------- | ------------------------------- |
  | zipCode             | Get fake zip code               |
  | zipCodeByState      | Get fake zip code by state      |
  | city                | Get fake city                   |
  | cityPrefix          | Get fake city prefix            |
  | citySuffix          | Get fake city suffix            |
  | cityName            | Get fake city name              |
  | streetName          | Get fake street name            |
  | streetAddress       | Get fake street address         |
  | streetSuffix        | Get fake street suffix          |
  | streetPrefix        | Get fake street prefix          |
  | secondaryAddress    | Get fake secondary address      |
  | county              | Get fake county                 |
  | country             | Get fake country                |
  | countryCode         | Get fake country code           |
  | state               | Get fake state                  |
  | stateAbbr           | Get fake state abbreviation     |
  | latitude            | Get fake latitude               |
  | longitude           | Get fake longitude              |
  | direction           | Get fake direction              |
  | cardinalDirection   | Get fake cardinal direction     |
  | ordinalDirection    | Get fake ordinal direction      |
  | nearbyGPSCoordinate | Get fake near by gps coordinate |
  | timeZone            | Get fake timezone               |

- faker.animal

  | API        | Description              |
  | ---------- | ------------------------ |
  | dog        | Get fake dog type        |
  | cat        | Get fake cat type        |
  | snake      | Get fake snake type      |
  | bear       | Get fake bear type       |
  | lion       | Get fake lion type       |
  | cetacean   | Get fake cetacean type   |
  | horse      | Get fake horse type      |
  | bird       | Get fake bird type       |
  | cow        | Get fake cow type        |
  | fish       | Get fake fish type       |
  | crocodilia | Get fake crocodilia type |
  | insect     | Get fake insect type     |
  | rabbit     | Get fake rabbit type     |

- faker.commerce

  | API                | Description                    |
  | ------------------ | ------------------------------ |
  | color              | Get fake color name            |
  | department         | Get fake department name       |
  | productName        | Get fake product name          |
  | price              | Get fake price count           |
  | productAdjective   | Get fake product adjective     |
  | productMaterial    | Get fake product material data |
  | product            | Get fake product name          |
  | productDescription | Get fake product description   |

- faker.company

  | API                   | Description                          |
  | --------------------- | ------------------------------------ |
  | suffixes              | Get fake company suffixes            |
  | companyName           | Get fake company name                |
  | companySuffix         | Get fake company suffix              |
  | bs                    | Get fake company business services   |
  | catchPhraseAdjective  | Get fake product adjective           |
  | catchPhraseDescriptor | Get fake product material data       |
  | catchPhraseNoun       | Get fake product name                |
  | bsAdjective           | Get fake business services adjective |
  | bsBuzz                | Get fake business services buzz      |
  | bsNoun                | Get fake business services noun      |

- faker.database

  | API       | Description                       |
  | --------- | --------------------------------- |
  | column    | Get fake database column name     |
  | type      | Get fake database column datatype |
  | collation | Get fake database collation       |
  | engine    | Get fake database engine          |

- faker.datatype

  | API         | Description                        |
  | ----------- | ---------------------------------- |
  | number      | Generates a random number          |
  | float       | Generates a random floating number |
  | datetime    | Generates a random datetime        |
  | string      | Generates a random string          |
  | uuid        | Generates a valid uuid             |
  | boolean     | Generates a boolean                |
  | hexaDecimal | Generates a hexadecimal            |
  | json        | Generates a valid json object      |
  | array       | Generates an array                 |

- faker.date

  | API      | Description                                                                            |
  | -------- | -------------------------------------------------------------------------------------- |
  | past     | Get a date `N` years into the past                                                     |
  | future   | Get a date `N` years into the future                                                   |
  | between  | Get a random date between the dates given                                              |
  | betweens | Get an array of 3 dates ( by default ) of sorted randoms dates between the dates given |
  | recent   | Get a date `N` days from the recent past                                               |
  | soon     | Get a date `N` days into the future                                                    |
  | month    | Generates a random value of date month                                                 |
  | weekday  | Generates a random value of date weekday                                               |

- faker.fake

- faker.finance

  | API                    | Description                                       |
  | ---------------------- | ------------------------------------------------- |
  | account                | Generates a random finance account                |
  | accountName            | Generates a random finance account name           |
  | routingNumber          | Generates a random finance routing number         |
  | mask                   | Generates a random finance mask template          |
  | amount                 | Generates a random amount of transaction          |
  | transactionType        | Generates a random transaction type               |
  | currencyCode           | Generates a random currency code                  |
  | currencyName           | Generates a random currency name                  |
  | currencySymbol         | Generates a random currency symbol                |
  | bitcoinAddress         | Generates a random bitcoin address                |
  | litecoinAddress        | Generates a random litecoin address               |
  | creditCardNumber       | Generates a random credit card number             |
  | creditCardCVV          | Generates a random credit card CVV                |
  | ethereumAddress        | Generates a random ethereum address (ETH address) |
  | iban                   | Generates a random IBAN                           |
  | bic                    | Generates a random BIC                            |
  | transactionDescription | Generates a random transaction description        |

- faker.git

  | API           | Description                                                      |
  | ------------- | ---------------------------------------------------------------- |
  | branch        | Generates a random branch with hacker noun and verb              |
  | commitEntry   | Generates a random commit entry with git commit message and sha  |
  | commitMessage | Generates a random commit message with hacker noun, adj and verb |
  | commitSha     | Generates a random commit SHA                                    |
  | shortSha      | Generates a random short SHA                                     |

- faker.hacker

  | API          | Description                            |
  | ------------ | -------------------------------------- |
  | abbreviation | Generates a random hacker abbreviation |
  | adjective    | Generates a random hacker adjective    |
  | noun         | Generates a random hacker noun         |
  | verb         | Generates a random hacker verb         |
  | ingverb      | Generates a random hacker ingverb      |
  | phrase       | Generates a random hacker phrase       |

- faker.helpers

  | API                      | Description                                                                                                                                                                  |
  | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | randomize                | Get a random element from an array                                                                                                                                           |
  | slugify                  | Removes unwanted characters from URI string                                                                                                                                  |
  | replaceSymbolWithNumber  | Parses string for a symbol and replace it with a random number from 1-10                                                                                                     |
  | replaceSymbols           | Parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number, ? with letter and \* will be replaced with number or letter) |
  | replaceCreditCardSymbols | Replace symbols in a credit card schema including Luhn checksum                                                                                                              |
  | repeatString             | String repeat helper, alternative to String.prototype.repeat                                                                                                                 |
  | shuffle                  | Takes an array and randomizes it in place then returns it using the modern version of the Fisher-Yates algorithm                                                             |
  | mustache                 | Generates a string with mustache {{ }}                                                                                                                                       |
  | createCard               | Generates a human card                                                                                                                                                       |
  | contextualCard           | Generates a human contextual card                                                                                                                                            |
  | userCard                 | Generates a website user card                                                                                                                                                |
  | createTransaction        | Generates a transaction                                                                                                                                                      |

- faker.image

  | API         | Description                                    |
  | ----------- | ---------------------------------------------- |
  | image       | Generates a random image                       |
  | avatar      | Generates a random avatar                      |
  | imageUrl    | Generates a random image url                   |
  | abstract    | Generates a random abstract image              |
  | animals     | Generates a random animals image               |
  | business    | Generates a random business image              |
  | cats        | Generates a random cats image                  |
  | city        | Generates a random city image                  |
  | food        | Generates a random food image                  |
  | nightlife   | Generates a random nightlife image             |
  | fashion     | Generates a random fashion image               |
  | people      | Generates a random people image                |
  | nature      | Generates a random nature image                |
  | sports      | Generates a random sports image                |
  | technics    | Generates a random technics image              |
  | transport   | Generates a random transport image             |
  | dataUri     | Generates a random data uri                    |
  | lorempixel  | Generates a random image url from lorempixel   |
  | unsplash    | Generates a random image url from unsplash     |
  | lorempicsum | Generates a random image url from lorem picsum |

- faker.internet

  | API          | Description                                          |
  | ------------ | ---------------------------------------------------- |
  | avatar       | Generates a random avatar                            |
  | email        | Generates a random email                             |
  | exampleEmail | Generates a random example email                     |
  | userName     | Generates a random user name                         |
  | protocol     | Generates a random internet protocol (http or https) |
  | httpMethod   | Generates a random http method                       |
  | url          | Generates a random url                               |
  | domainName   | Generates a random domain name                       |
  | domainSuffix | Generates a random domain suffix                     |
  | domainWord   | Generates a random domain word                       |
  | ip           | Generates a random ip                                |
  | ipv6         | Generates a random ipv6                              |
  | port         | Generates a random port number                       |
  | userAgent    | Generates a random user agent                        |
  | color        | Generates a random hexadecimal color                 |
  | mac          | Generates a random mac address                       |
  | password     | Generates a random password                          |

- faker.lorem

  | API        | Description                         |
  | ---------- | ----------------------------------- |
  | word       | Generates a random lorem word       |
  | words      | Generates a random lorem words      |
  | sentence   | Generates a random lorem sentence   |
  | slug       | Generates a random lorem slug       |
  | sentences  | Generates a random lorem sentences  |
  | paragraph  | Generates a random lorem paragraph  |
  | paragraphs | Generates a random lorem paragraphs |
  | text       | Generates a random lorem text       |
  | lines      | Generates a random lorem lines      |

- faker.mersenne

  | API        | Description                                    |
  | ---------- | ---------------------------------------------- |
  | rand       | Generates a random mersenne rand               |
  | seed       | Generates a random mersenne seed               |
  | seed_array | Generates a random datetime seed init by array |

- faker.music

  | API   | Description                    |
  | ----- | ------------------------------ |
  | genre | Generates a random music genre |

- faker.name

  | API           | Description                                                                           |
  | ------------- | ------------------------------------------------------------------------------------- |
  | firstName     | Generates a random human first name                                                   |
  | lastName      | Generates a random human last name                                                    |
  | middleName    | Generates a random human middle name                                                  |
  | findName      | Generates a random human first name and last name                                     |
  | jobTitle      | Generates a random human job title, combination of jobDescriptor, jobArea and jobType |
  | gender        | Generates a random gender                                                             |
  | prefix        | Generates a random locale with gender specific name prefix                            |
  | suffix        | Generates a random locale with gender specific name suffix                            |
  | title         | Generates a random human title                                                        |
  | jobDescriptor | Generates a random human job descriptor                                               |
  | jobArea       | Generates a random human job area                                                     |
  | jobType       | Generates a random human job type                                                     |

- faker.phone

  | API               | Description                                                         |
  | ----------------- | ------------------------------------------------------------------- |
  | phoneNumber       | Generates a random phone number                                     |
  | phoneNumberFormat | Generates a random phone number with requested format (Array index) |
  | phoneFormats      | Generates a random phone number format                              |

- faker.random

  | API           | Description                                                                       |
  | ------------- | --------------------------------------------------------------------------------- |
  | arrayElement  | Takes an array and returns a random element of the array                          |
  | arrayElements | Takes an array and returns a subset with random elements of the array             |
  | objectElement | Takes an object and returns a random key or value                                 |
  | word          | Generates a random word                                                           |
  | words         | Generate `N` random words, with `N` defaulting to a random number between 1 and 3 |
  | locale        | Generates a random locale                                                         |
  | alpha         | Generates lower/upper alphabetic characters                                       |
  | alphaNumeric  | Generates alphanumeric characters                                                 |

- faker.system

  | API            | Description                                                 |
  | -------------- | ----------------------------------------------------------- |
  | fileName       | Generates a random filenames without system path separators |
  | commonFileName | Generates a random filenames without system path separators |
  | mimeType       | Generates a random mimetypes                                |
  | commonFileType | Generates a random commonly used file type                  |
  | commonFileExt  | Generates a random commonly used file extension             |
  | fileType       | Get any file type available as mime-type                    |
  | fileExt        | Generates a random file extension                           |
  | directoryPath  | Generates a random directory path                           |
  | filePath       | Generates a random unix fs file full path                   |
  | semver         | Generate semantic version                                   |

- faker.time

  | API    | Description                              |
  | ------ | ---------------------------------------- |
  | recent | Get recent timestamp in Unix time format |

- faker.unique

- faker.vehicle

  | API          | Description                                  |
  | ------------ | -------------------------------------------- |
  | vehicle      | Generates a random vehicle name              |
  | manufacturer | Generates a random vehicle manufacturer name |
  | model        | Generates a random vehicle model name        |
  | type         | Generates a random vehicle type              |
  | fuel         | Generates a random vehicle fuel type         |
  | vin          | Generates a random vehicle vin number        |
  | color        | Generates a random vehicle color             |
  | vrm          | Generates a random vehicle vrm               |
  | bicycle      | Generates a random bicycle type              |

### Faker.fake()

Faker contains a super useful generator method `Faker.fake` for combining faker API methods using a mustache string format.

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
const faker = require('@faker-js/faker/locale/de');
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

## Contributing

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

## What happened to the original faker.js?

Read the [team update](https://fakerjs.dev/update.html) (January 14th, 2022).
