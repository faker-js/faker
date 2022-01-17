# 商业

[[toc]]

## 颜色

返回一个随机的颜色名称。

```js
faker.commerce.color(); // fuchsia
```

## 部门

返回一个随机的部门名称。

```js
faker.commerce.department(); // Grocery
```

## 价格

返回一个随机的价格。

::: tip
| Param | Type | Default |
| ------ | ------ | :-----: |
| min | number | `1` |
| max | number | `1000` |
| dec | number | `2` |
| symbol | string | `` |
:::

```js
faker.commerce.price(); // 4.00
faker.commerce.price(2, 22, 1, '$'); // $7.0
```

## 产品

返回一个随机的产品。

```js
faker.commerce.product(); // Gloves
faker.commerce.productName(); // Rustic Granite Shirt
```

## 产品形容词

返回一个随机的产品形容词。

```js
faker.commerce.productAdjective(); // Handmade
```

## 产品材质

返回一个随机的产品材质。

```js
faker.commerce.productMaterial(); // Steel
```
