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

- address
  - zipCode
  - zipCodeByState
  - city
  - cityPrefix
  - citySuffix
  - cityName
  - streetName
  - streetAddress
  - streetSuffix
  - streetPrefix
  - secondaryAddress
  - county
  - country
  - countryCode
  - state
  - stateAbbr
  - latitude
  - longitude
  - direction
  - cardinalDirection
  - ordinalDirection
  - nearbyGPSCoordinate
  - timeZone
- animal
  - dog
  - cat
  - snake
  - bear
  - lion
  - cetacean
  - horse
  - bird
  - cow
  - fish
  - crocodilia
  - insect
  - rabbit
  - type
- commerce
  - color
  - department
  - productName
  - price
  - productAdjective
  - productMaterial
  - product
  - productDescription
- company
  - suffixes
  - companyName
  - companySuffix
  - catchPhrase
  - bs
  - catchPhraseAdjective
  - catchPhraseDescriptor
  - catchPhraseNoun
  - bsAdjective
  - bsBuzz
  - bsNoun
- database
  - column
  - type
  - collation
  - engine
- datatype
  - number
  - float
  - datetime
  - string
  - uuid
  - boolean
  - hexaDecimal
  - json
  - array
- date
  - past
  - future
  - between
  - betweens
  - recent
  - soon
  - month
  - weekday
- fake
- finance
  - account
  - accountName
  - routingNumber
  - mask
  - amount
  - transactionType
  - currencyCode
  - currencyName
  - currencySymbol
  - bitcoinAddress
  - litecoinAddress
  - creditCardNumber
  - creditCardCVV
  - ethereumAddress
  - iban
  - bic
  - transactionDescription
- git
  - branch
  - commitEntry
  - commitMessage
  - commitSha
  - shortSha
- hacker
  - abbreviation
  - adjective
  - noun
  - verb
  - ingverb
  - phrase
- helpers
  - randomize
  - slugify
  - replaceSymbolWithNumber
  - replaceSymbols
  - replaceCreditCardSymbols
  - repeatString
  - regexpStyleStringParse
  - shuffle
  - mustache
  - createCard
  - contextualCard
  - userCard
  - createTransaction
- image
  - image
  - avatar
  - imageUrl
  - abstract
  - animals
  - business
  - cats
  - city
  - food
  - nightlife
  - fashion
  - people
  - nature
  - sports
  - technics
  - transport
  - dataUri
  - lorempixel
  - unsplash
  - lorempicsum
- internet
  - avatar
  - email
  - exampleEmail
  - userName
  - protocol
  - httpMethod
  - url
  - domainName
  - domainSuffix
  - domainWord
  - ip
  - ipv6
  - port
  - userAgent
  - color
  - mac
  - password
- lorem
  - word
  - words
  - sentence
  - slug
  - sentences
  - paragraph
  - paragraphs
  - text
  - lines
- mersenne
  - rand
  - seed
  - seed_array
- music
  - genre
- name
  - firstName
  - lastName
  - middleName
  - findName
  - jobTitle
  - gender
  - prefix
  - suffix
  - title
  - jobDescriptor
  - jobArea
  - jobType
- phone
  - phoneNumber
  - phoneNumberFormat
  - phoneFormats
- system
  - fileName
  - commonFileName
  - mimeType
  - commonFileType
  - commonFileExt
  - fileType
  - fileExt
  - directoryPath
  - filePath
  - semver
- time
  - recent
- unique
- vehicle
  - vehicle
  - manufacturer
  - model
  - type
  - fuel
  - vin
  - color
  - vrm
  - bicycle

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
