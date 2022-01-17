# 地址

[[toc]]

## 城市

::: v-pre

生成随机的本地化城市名称。格式字符串可以包含使用用 `{{}}` 包装的 faker 提供的任何方法，例如 `{{name.firstName}}` 以构建城市名称。

::: tip
如果未提供格式化字符串，则会在一下几种格式化字符串中随机选择一个：

- `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
- `{{address.cityPrefix}} {{name.firstName}}`
- `{{name.firstName}}{{address.citySuffix}}`
- `{{name.lastName}}{{address.citySuffix}}`

:::

```js
faker.address.city(); // Lake Raoulfort
faker.address.city('{{name.lastName}}{{address.citySuffix}}'); // Powlowski port
```

## 城市前缀

返回一个随机的本地化城市前缀

```js
faker.address.cityPrefix(); // South
```

## 城市后缀

返回一个随机的本地化城市后缀。

```js
faker.address.citySuffix(); // burgh
```

## 县

返回一个随机的县名。

```js
faker.address.county(); // Cambridgeshire
```

## 国家

返回一个随机的国家名。

```js
faker.address.country(); // Papua New Guinea
```

## 国家代码

返回一个随机的国家代码。

```js
faker.address.countryCode(); // SN
```

## 纬度

返回一个随机纬度。

::: warning 可用参数 <Badge text="5.0.0+" type="tip" vertical="middle"/>
| 参数 | 类型 | 默认值 |
| ----- | ------ | :-----: |
| max | number | `90` |
| min | number | `-90` |
:::

```js
faker.address.latitude(); // 78.9197
faker.address.latitude(70, 10); // 40.1239
```

## 经度

返回随机经度。

::: warning 可用参数 <Badge text="5.0.0+" type="tip" vertical="middle"/>
| 参数 | 类型 | 默认值 |
| ----- | ------ | :-----: |
| max | number | `180` |
| min | number | `-180` |
:::

```js
faker.address.longitude(); // 78.9197
faker.address.longitude(70, 10); // 40.1239
```

## 州

返回一个随机的州名。

```js
faker.address.state(); // Montana
```

## 州缩写

返回一个随机的州的缩写。

```js
faker.address.stateAbbr(); // WV
```

## 街道名称

返回一个随机的街道名称。

```js
faker.address.streetName(); // Rowe Coves
```

## 街道地址

返回一个随机的街道地址。传入可选的布尔值 `true` 以获取完整地址。

::: tip
| 参数 | 类型 | 默认值 |
| -------------- | ------- | :-----: |
| useFullAddress | boolean | `false` |
:::

```js
faker.address.streetAddress(); // 294 White Parkways
faker.address.streetAddress(true); // 294 White Parkways Apt. 506
```

## 街道后缀

返回一个随机的街道后缀。

```js
faker.address.streetSuffix(); // Garden
```

## 街道前缀

返回一个随机的街道前缀。

```js
faker.address.streetPrefix(); // c
```

## 辅助地址

返回一个随机的辅助地址。

```js
faker.address.secondaryAddress(); // Suite 123
```

## 邮政编码

生成随机邮政编码。

如果未指定格式，则使用区域设置的 zip 格式。需要使用 [替换符号](/zh-cn/api/helpers.html#replacesymbols-format) 支持的格式。

::: tip
| 参数 | 类型 | 默认值 |
| ------ | ------ | :---------: |
| format | string | `undefined` |
:::

```js
faker.address.zipCode(); // 98101-1234
faker.address.zipCode('#####'); // 98101
```

## 州邮政编码 <Badge text="5.0.0+" type="tip" vertical="middle"/>

从州缩写生成随机邮政编码。

如果未指定州缩写，则会根据区域设置的邮政编码格式生成随机邮政编码。该功能仅适用于具有 `postcode_by_state` 定义的语言环境。如果语言环境没有 `postcode_by_state` 定义，则会根据语言环境的邮政编码格式生成随机邮政编码。

```js
faker.address.zipCodeByState(); // 12302
faker.address.zipCodeByState('wa'); // 98101
```
