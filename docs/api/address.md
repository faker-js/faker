# Address

[[toc]]

## City

::: v-pre
Generates a random localized city name. The format string can contain any method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in order to build the city name.

::: tip
If no format string is provided one of the following is randomly used:

- `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
- `{{address.cityPrefix}} {{name.firstName}}`
- `{{name.firstName}}{{address.citySuffix}}`
- `{{name.lastName}}{{address.citySuffix}}`
  :::

```js
faker.address.city(); // Lake Raoulfort
faker.address.city('{{name.lastName}}{{address.citySuffix}}'); // Powlowski port
```

## City Prefix

Return a random localized city prefix

```js
faker.address.cityPrefix(); // South
```

## City Suffix

Return a random localized city suffix

```js
faker.address.citySuffix(); // burgh
```

## County

Returns a random county

```js
faker.address.county(); // Cambridgeshire
```

## Country

Returns a random country

```js
faker.address.country(); // Papua New Guinea
```

## Country Code

Returns a random country code

```js
faker.address.countryCode(); // SN
```

## Latitude

Returns a random latitude.

::: warning Params Available <Badge text="5.0.0+" type="tip" vertical="middle"/>
| Param | Type | Default |
| ----- | ------ | :-----: |
| max | number | `90` |
| min | number | `-90` |
:::

```js
faker.address.latitude(); // 78.9197
faker.address.latitude(70, 10); // 40.1239
```

## Longitude

Returns a random longitude.

::: warning Params Available <Badge text="5.0.0+" type="tip" vertical="middle"/>
| Param | Type | Default |
| ----- | ------ | :-----: |
| max | number | `180` |
| min | number | `-180` |
:::

```js
faker.address.longitude(); // 78.9197
faker.address.longitude(70, 10); // 40.1239
```

## State

Returns a random state

```js
faker.address.state(); // Montana
```

## State Abbreviation

Returns a random state abbreviation

```js
faker.address.stateAbbr(); // WV
```

## Street Name

Returns a random localized street name

```js
faker.address.streetName(); // Rowe Coves
```

## Street Address

Returns a random localized street address. Pass in optional object boolean to get a full address.

::: tip
| Param | Type | Default |
| -------------- | ------- | :-----: |
| useFullAddress | boolean | `false` |
:::

```js
faker.address.streetAddress(); // 294 White Parkways
faker.address.streetAddress(true); // 294 White Parkways Apt. 506
```

## Street Suffix

Returns a random localized street suffix.

```js
faker.address.streetSuffix(); // Garden
```

## Street Prefix

Returns a random localized street prefix.

```js
faker.address.streetPrefix(); // c
```

## Secondary Address

Returns a random Secondary Address

```js
faker.address.secondaryAddress(); // Suite 123
```

## Zip Code

Generates random zip code. If format is not specified, the locale's zip format is used. Use formats that are supported with [replaceSymbols](/api/helpers.html#replacesymbols-format)

::: tip
| Param | Type | Default |
| ------ | ------ | :---------: |
| format | string | `undefined` |
:::

```js
faker.address.zipCode(); // 98101-1234
faker.address.zipCode('#####'); // 98101
```

## Zip Code By State <Badge text="5.0.0+" type="tip" vertical="middle"/>

Generates random Zip Code from state abbreviation. If state abbreviation is not specified, a random zip code is generated according to the locale's zip format. Only works for locales with `postcode_by_state` definition. If a locale does not have a `postcode_by_state` definition, a random zip code is generated according to the locale's zip format.

```js
faker.address.zipCodeByState(); // 12302
faker.address.zipCodeByState('wa'); // 98101
```
