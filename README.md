# Faker

Generate massive amounts of fake data in the Browser and Node.js.

[![Chat on Discord](https://img.shields.io/discord/929487054990110771)](https://discord.com/invite/4qDjAmDj4P)
[![Continuous Integration](https://github.com/faker-js/faker/actions/workflows/ci.yml/badge.svg)](https://github.com/faker-js/faker/actions/workflows/ci.yml)

## Installation

Please replace your `faker` dependency with `@faker-js/faker`. This is the official, stable fork of Faker.

```shell
npm install @faker-js/faker -D
```

### Typescript Support

Types are available via the `@types/faker` package. You must manually link them using a `*.d.ts` file, like so:

```typescript
// faker.d.ts
declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}
```

## FAQ - What happened to the original faker.js?

This project was originally created and hosted at https://github.com/marak/Faker.js/ - however around 4th Jan, 2022 - the author decided to delete the repository (for unknown reasons).

In the interest of the community, it has been decided that Faker will continue to be maintained here and all help in its development will be appreciated.

## Demo

Coming soon!

## Usage

### Browser

```html
<script src="faker.js" type="text/javascript"></script>
<script>
  var randomName = faker.name.findName(); // Caitlyn Kerluke
  var randomEmail = faker.internet.email(); // Rusty@arne.info
  var randomCard = faker.helpers.createCard(); // random contact card containing many properties
</script>
```

### Node.js

```js
var faker = require('faker');
var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties
```

## API

### API Methods

Faker provides many useful utilities functions.

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
  | verb         | Generates a random hacker noun         |
  | ingverb      | Generates a random hacker ingverb      |
  | phrase       | Generates a random hacker phrase       |

- faker.helpers

  | API                                                          | Description                                                                                                     |
  | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
  | randomize                                                    | Get a random element from an array                                                                              |
  | slugify                                                      | Removes unwanted characters from URI string                                                                     |
  | replaceSymbolWithNumber                                      | Parses string for a symbol and replace it with a random number from 1-10                                        |
  | replaceSymbols                                               | Parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number, |
  | ? with letter and \* will be replaced with number or letter) |
  | replaceCreditCardSymbols                                     | Replace symbols in a credit card schems including Luhn checksum                                                 |
  | repeatString                                                 | String repeat helper, alternative to String.prototype.repeat.... See PR #382                                    |
  | shuffle                                                      | Takes an array and randomizes it in place then returns it uses the modern version of the Fisher–Yates algorithm |
  | mustache                                                     | Generates a string with mustache {{ }}                                                                          |
  | createCard                                                   | Generates a human card                                                                                          |
  | contextualCard                                               | Generates a human contextual card                                                                               |
  | userCard                                                     | Generates a website user card                                                                                   |
  | createTransaction                                            | Generates a transaction                                                                                         |

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

As of version `v2.0.0` Faker has support for multiple localities.

The default language locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
faker.locale = 'de';
```

- az
- ar
- cz
- de
- de_AT
- de_CH
- en
- en_AU
- en_AU_ocker
- en_BORK
- en_CA
- en_GB
- en_IE
- en_IND
- en_US
- en_ZA
- es
- es_MX
- fa
- fi
- fr
- fr_CA
- fr_CH
- ge
- hy
- hr
- id_ID
- it
- ja
- ko
- nb_NO
- ne
- nl
- nl_BE
- pl
- pt_BR
- pt_PT
- ro
- ru
- sk
- sv
- tr
- uk
- vi
- zh_CN
- zh_TW

### Individual Localization Packages

Faker supports incremental loading of locales.

By default, requiring `faker` will include _all_ locale data.

In a production environment, you may only want to include the locale data for a specific set of locales.

```js
// loads only de locale
var faker = require('faker/locale/de');
```

## Setting a randomness seed

If you want consistent results, you can set your own seed:

```js
faker.seed(123);

var firstRandom = faker.datatype.number();

// Setting the seed again resets the sequence.
faker.seed(123);

var secondRandom = faker.datatype.number();

console.log(firstRandom === secondRandom);
```

## Documentation

Faker is currently in the process of migrating its documentation to Vitepress (the successor of Vuepress).

**Developing the docs**

```shell
# build the Faker library for the browser
# it's used inside of certain routes
npm run browser

npm run docs:dev
```

**Building and serving the docs statically**

```shell
# build the Faker library for the browser
# it's used inside of certain routes
npm run browser

npm run docs:build # Output docs to /dist
npm run docs:serve # Serve docs from /dist
```

## Deploying Documentation

The website is kindly hosted for free by the Netlify team under their Open Source plan. See the netlify.toml for configuration.

## Tests

```shell
npm install .
npm run test
```

You can view a code coverage report generated in coverage/lcov-report/index.html.

## Building Faker

Faker uses [gulp](http://gulpjs.com/) to automate its build process. Each build operation is a separate task which can be run independently.

### Browser Bundle

```shell
npm run browser
```

### Building JSDocs

[JSDOC](https://jsdoc.app/) v3 HTML API documentation

```shell
npm run jsdoc
```
