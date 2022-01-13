# Commerce

[[toc]]

## Color

Return random color name

```js
faker.commerce.color(); // fuchsia
```

## Department

Return random department name

```js
faker.commerce.department(); // Grocery
```

## Price

Generates random price

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

## Product

Return random product

```js
faker.commerce.product(); // Gloves
faker.commerce.productName(); // Rustic Granite Shirt
```

## Product Adjective

Return random product adjective

```js
faker.commerce.productAdjective(); // Handmade
```

## Product Material

Return random product material

```js
faker.commerce.productMaterial(); // Steel
```
