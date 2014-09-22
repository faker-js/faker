#CHANGELOG

## v2.0.0

* Adds i18n internalization of fake data sets
  - contributed by Marak
* Reduces surface of API, removes redundant API calls
  - contributed by Marak
* Replaces legacy build system with GulpJS
  - contributed by Marak
* Replaces legacy browserifying system with Browserify
  - contributed by Marak
* Adds basic financial generators
 - contributed by josefsalyer
* Adds internet.userAgent using `random-ua` library
  - contributed by Marak
* Adds currency codes and symbols using `random-ua` library
  - contributed by MQuy
* Replaces use of Math.random in favor of `node-mersenne` package
 - contributed by Marak
* Adds bower support
 - contributed by daytonn
* avatarUrl optimization
 - contributed by MQuy
* Fix - Remove `this` scope
 - contributed by goliatone
* Fix - IE9 charAt() bug
  - contributed by beastlike
* Fix - faker.date now returns a Date object instead of JSON
 - contributed by Marak

##v1.1.0

* Fixes random date functions that did not distribute results.
  - contributed by pmalouin
* Fixes context of findName
  - contributed by juampi92
* Updates to switch changes over to using 2 args to support min/max
  - contributed by avanderhoorn & edshadi
* Added ISO 3166 countries
  - contributed by MaerF0x0
* UMD support
  - contirbuted by xaka
* Uk Postal Codes
  - contributed by schmtw
* Undefined global object for webworker fix
  - contributed by dnbard