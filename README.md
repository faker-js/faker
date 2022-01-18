
<div align="center">
  <img src="./docs/public/logo.svg" width="200"/>
  <h1>Faker</h1>
  <p>Generate massive amounts of fake (but realistic) data for testing and development.</p>
  
  [![Chat on Discord](https://img.shields.io/discord/929487054990110771)](https://discord.com/invite/4qDjAmDj4P)
  [![Continuous Integration](https://github.com/faker-js/faker/actions/workflows/ci.yml/badge.svg)](https://github.com/faker-js/faker/actions/workflows/ci.yml)

</div>

## Installation

Please replace your `faker` dependency with `@faker-js/faker`. This is the official, stable fork of Faker.

```shell
npm install @faker-js/faker --save-dev
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
const faker = require('@faker-js/faker');
const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // random contact card containing many properties
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

## API

An in-depth overview of the API methods is available in the documentation. The API covers the following modules:
| Module   	| Example                        	| Output                                                                                                                                                                                                    	|
|----------	|--------------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Address  	| `faker.address.city()`         	| Lake Raoulfort                                                                                                                                                                                            	|
| Animal   	| `faker.animal.type()`          	| Dog, cat, snake, bear, lion, etc.                                                                                                                                                                         	|
| Commerce 	| `faker.commerce.product()`     	| Polo t-shirt                                                                                                                                                                                              	|
| Company  	| `faker.company.companyName()`   | Zboncak and Sons                                                                                                                                                                                          	|
| Database 	| `faker.database.engine()`      	| MyISAM                                                                                                                                                                                                    	|
| Datatype 	| `faker.datatype.uuid()`        	| 1oijf8-3iuhiu-21jddj-1092jf                                                                                                                                                                               	|
| Date     	| `faker.date.past()`            	| Sat Oct 20 2018 04:19:38 GMT-0700 (Pacific Daylight Time)                                                                                                                                                 	|
| Finance  	| `faker.finance.amount()`       	| ¥23400 (After setting locale)                                                                                                                                                                             	|
| Git      	| `faker.git.commitMessage()`    	| feat: add products list page                                                                                                                                                                              	|
| Hacker   	| `faker.hacker.phrase()`        	| Try to reboot the SQL bus, maybe it will bypass the virtual application!                                                                                                                                  	|
| Helpers  	| `faker.helpers.userCard()`     	| `{  avatar: ‘...’, email: ‘{ first }{ last }{ number }@{domain}’, first: '...' }`<br/><br/>All of the values are self-consistent (e.g. same first + last name in the email, too) 	|
| Image    	| `faker.image.avatar()`         	| `https://s3.amazonaws.com/uifaces/faces/twitter/martip07/128.jpg` <img src=“https://s3.amazonaws.com/uifaces/faces/twitter/martip07/128.jpg” width=“64”/>                                                 	|
| Internet 	| `faker.internet.color()`       	| #630c7b                                                                                                                                                                                                   	|
| Lorem    	| `faker.lorem.paragraph()`      	| Word, words, sentences, slug (lorem-ipsum), paragraph(s), text, lines                                                                                                                                     	|
| Music    	| `faker.music.genre()`          	| R&B                                                                                                                                                                                                       	|
| Name     	| `faker.name.firstName()`       	| Cameron                                                                                                                                                                                                   	|
| Phone    	| `faker.phone.phoneNumber()`    	| +1 291-299-0192                                                                                                                                                                                           	|
| System   	| `faker.system.directoryPath()` 	| C:\Documents\Newsletters\                                                                                                                                                                                 	|
| Vehicle  	| `faker.vehicle.vehicle()`      	| 2011 Dodge Caravan                                                                                                                                                                                        	|

### Localization

As of version `v2.0.0` Faker has support for multiple localities.

The default language locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
faker.locale = 'de';
```

**List of locales:** az, ar, cz, de, de_AT, de_CH, en, en_AU, en_AU_ocker, en_BORK, en_CA, en_GB, en_IE, en_IND, en_US, en_ZA, es, es_MX, fa, fi, fr, fr_CA, fr_CH, ge, hy, hr, id_ID, it, ja, ko, nb_NO, ne, nl, nl_BE, pl, pt_BR, pt_PT, ro, ru, sk, sv, tr, uk, vi, zh_CN, zh_TW

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

Faker uses [gulp](http://gulpjs.com/) to automate its build process. Each build operation is a separate task which can be run independently.

### Browser Bundle

```shell
npm run browser
```

### Testing

```shell
npm install .
npm run test
```

You can view a code coverage report generated in coverage/lcov-report/index.html.

### Developing the docs

```shell
# build the Faker library for the browser
# it's used inside of certain routes
npm run browser

npm run docs:dev
```

### Building and serving the docs statically

```shell
# build the Faker library for the browser
# it's used inside of certain routes
npm run browser

npm run docs:build # Output docs to /dist
npm run docs:serve # Serve docs from /dist
```

### Deploying Documentation

The website is kindly hosted for free by the Netlify team under their Open Source plan. See the netlify.toml for configuration.

### Building JSDocs

[JSDOC](https://jsdoc.app/) v3 HTML API documentation

```shell
npm run jsdoc
```

## What happened to the original faker.js?
Read the [team update](https://fakerjs.dev/update.html) (January 14th, 2022).
