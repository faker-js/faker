# Data Type <Badge text="5.5.0+" type="tip" vertical="middle"/>

[[toc]]

Generate basic data type, starting from `v5.5.0`. Similar functions from `faker.random` will be deprecated.

## Number

Generates random `number` data type.

::: tip
| Param | Type | Default |
| ------- | ----- | :----------------------------------: |
| options | mixed | `{min: 0, max: 99999, precision: 1}` |

**NOTE**: passing a number as the param will set the `max` value to that number and use the `min` and `precision` defaults
:::

```js
faker.datatype.number(); // 3451
faker.datatype.number(86); // 50
faker.datatype.number({ min: 10 }); // 45991
faker.datatype.number({ min: 10, max: 100 }); // 14
faker.datatype.number({ min: 10, max: 100, precision: 0.25 }); // 44.5
```

## Float

Generates random `float` data type.

::: tip
| Param | Type | Default |
| ------- | ----- | :----------------------------------: |
| options | mixed | `{min: 0, max: 99999, precision: 1}` |

**NOTE 1**: passing a number as the param will set the `max` value to that number and use the `min` and `precision` defaults

**NOTE 2**: javascript has single data type `number` for all kinds of numbers. Statement `typeof(faker.datatype.number(10)) === typeof(faker.datatype.float(10))` equals `true`
:::

```js
faker.datatype.float(); // 428
faker.datatype.float(100); // 23
faker.datatype.float({ min: 10 }); // 1635
faker.datatype.float({ min: 10, max: 100 }); // 49
faker.datatype.float({ min: 10, max: 100, precision: 0.1 }); // 81.8
```

## Array

Generates array of random number or string.

::: tip
| Param | Type | Default |
| ----- | ----- | :---------------: |
| length | number | 10 |

**NOTE**: this method has no fine-grained control to create array of numbers or strings only, or specify criteria for array elements
:::

```js
faker.datatype.array(); // [13,'hfa&', 41, 8301, '(6$bH', 2354, 'V73!', 'm*he?', 11911, 'gbdX#']
faker.datatype.array(3); // [47460, 'b&r3#', 9003]
```

## UUID

Generates random UUID

```js
faker.datatype.uuid(); // 54d13fa1-6d84-4717-8fa2-477a62dac76c
```

## Boolean

Generates random `boolean` data type.

```js
faker.datatype.boolean(); // true
```

## String

Generates random `string` data type.

::: tip
| Param | Type | Default |
| ----- | ----- | :---------------: |
| length | number | 10 |
:::

```js
faker.datatype.string(); // 'Y7=bR1.jpW'
faker.datatype.string(5); // '_9Kss'
```

## JSON

Generates random JSON. It has default length of 7, and no options.

::: tip
**NOTE**: The generated data type is `string`. To treat it like javascript `object`, use `JSON.parse()` function.
:::

```js
faker.datatype.json(); // {"foo":61342,"bar":1587,"bike":88807,"a":69894,"b":"A?+(5w)E/Z","name":"U@Y`>Ygls}","prop":35014} (string)
JSON.parse(faker.datatype.json()); // (object)
```

## Hexadecimal

Generates random hex (base-16) number.

::: tip
| Param | Type | Default |
| ----- | ----- | :---------------: |
| length | number | 1 |
**NOTE**: The generated data type is `string`. To treat it like javascript `number`, use `parseInt()` function.
:::

```js
faker.datatype.hexaDecimal(); // '0xA' (string)
faker.datatype.hexaDecimal(5); // '0x8D620' (string)
parseInt(faker.datatype.hexaDecimal(2)); // 0xC1 (number)
```
