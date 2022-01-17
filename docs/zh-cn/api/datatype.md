# 数据类型 <Badge text="5.5.0+" type="tip" vertical="middle"/>

[[toc]]

生成基本数据类型，从 `v5.5.0` 开始。 `faker.random` 中的类似功能将被弃用。

## Number

生成随机 “数字” 数据类型。

::: tip
| 参数 | 类型 | 默认值 |
| ------- | ----- | :----------------------------------: |
| options | mixed | `{ min: 0, max: 99999, precision: 1 }` |

**注**：传递一个数字作为参数会将 `max` 值设置为该数字，`min` 和 `precision` 使用默认值。
:::

```js
faker.datatype.number(); // 3451
faker.datatype.number(86); // 50
faker.datatype.number({ min: 10 }); // 45991
faker.datatype.number({ min: 10, max: 100 }); // 14
faker.datatype.number({ min: 10, max: 100, precision: 0.25 }); // 44.5
```

## Float

生成随机的浮点数。

::: tip
| 参数 | 类型 | 默认值 |
| ------- | ----- | :----------------------------------: |
| options | mixed | `{ min: 0, max: 99999, precision: 1 }` |

**注 1**：传递一个数字作为参数会将 `max` 值设置为该数字，`min` 和 `precision` 使用默认值。

**注 2**：JavaScript 对所有类型的数字都有单一的数据类型 `number`。 语句 `typeof(faker.datatype.number(10)) === typeof(faker.datatype.float(10))` 等价于 `true`。
:::

```js
faker.datatype.float(); // 428
faker.datatype.float(100); // 23
faker.datatype.float({ min: 10 }); // 1635
faker.datatype.float({ min: 10, max: 100 }); // 49
faker.datatype.float({ min: 10, max: 100, precision: 0.1 }); // 81.8
```

## 数组

生成随机的包含数字和字符串的数组。

::: tip
| 参数 | 类型 | 默认值 |
| ----- | ----- | :---------------: |
| length | number | 10 |

**注**：此方法没有细粒度的控制方式指定数组元素的组成。
:::

```js
faker.datatype.array(); // [13,'hfa&', 41, 8301, '(6$bH', 2354, 'V73!', 'm*he?', 11911, 'gbdX#']
faker.datatype.array(3); // [47460, 'b&r3#', 9003]
```

## UUID

生成随机的 UUID。

```js
faker.datatype.uuid(); // 54d13fa1-6d84-4717-8fa2-477a62dac76c
```

## 布尔值

生成随机的布尔值。

```js
faker.datatype.boolean(); // true
```

## 字符串

生成随机字符串。

::: tip
| 参数 | 类型 | 默认值 |
| ----- | ----- | :---------------: |
| length | number | 10 |
:::

```js
faker.datatype.string(); // 'Y7=bR1.jpW'
faker.datatype.string(5); // '_9Kss'
```

## JSON

生成随机的 JSON 字符串。

生成的 JSON 数据元素数量固定为 7。

::: tip
**注意**：生成的数据类型是 `string`。 要将其视为 JavaScript 中的 `object`，请使用 `JSON.parse()` 函数。
:::

```js
faker.datatype.json(); // {"foo":61342,"bar":1587,"bike":88807,"a":69894,"b":"A?+(5w)E/Z","name":"U@Y`>Ygls}","prop":35014} (string)
JSON.parse(faker.datatype.json()); // (object)
```

## 十六进制

生成随机十六进制数字。

::: tip
| 参数 | 类型 | 默认值 |
| ----- | ----- | :---------------: |
| length | number | 1 |

**注**：生成的数据类型是 `string`。 要将其视为 JavaScript 中的 `number`，请使用 `parseInt()` 函数。
:::

```js
faker.datatype.hexaDecimal(); // '0xA' (string)
faker.datatype.hexaDecimal(5); // '0x8D620' (string)
parseInt(faker.datatype.hexaDecimal(2)); // 0xC1 (number)
```
