# 公司

[[toc]]

## 公司名称

::: v-pre

返回一个随机的公司名称。

::: tip
如果指定格式化字符串，则会在一下几种格式化字符串中随机选择一个：

- `{{name.lastName}} {{company.companySuffix}}`
- `{{name.lastName}} - {{name.lastName}}`
- `{{name.lastName}}, {{name.lastName}} and {{name.lastName}}`
  :::

::: tip
| 参数 | 类型 | 默认值 |
| ----------- | ------ | :-----: |
| formatIndex | number | `0-2` |
:::

```js
faker.company.companyName(); // Zboncak and Sons
faker.company.companyName(0); // Nikolaus Group
faker.company.companyName(1); // Keeling - Lind
faker.company.companyName(2); // Swaniawski, Howe and Leffler
```

## 公司后缀

返回一个随机的公司后缀。

```js
faker.company.companySuffix(); // and Sons
```

## 多个公司后缀

返回一个具有多个随机公司后缀的数组。

```js
faker.company.suffixes(); // ["Inc", "and Sons", "LLC", "Group"]
```

## 标语

返回一个随机的公司标语。

```js
faker.company.catchPhrase(); // Team-oriented context-sensitive conglomeration
```

## 标语形容词

返回一个随机的标语形容词。

```js
faker.company.catchPhraseAdjective(); // Down-sized
```

## 标语描述符

返回一个随机的标语描述符

```js
faker.company.catchPhraseDescriptor(); // bi-directional
```

## 标语名词

返回一个随机的标语名词。

```js
faker.company.catchPhraseNoun(); // complexity
```

## 商业研究

返回一个随机的商业研究

```js
faker.company.bs(); // ubiquitous empower e-business
```

## 商业研究形容词

返回一个随机的商业研究形容词

```js
faker.company.bsAdjective(); // granular
```

## 商业研究流行语

返回一个随机的商业研究流行语

```js
faker.company.bsBuzz(); // facilitate
```

## 商业研究名词

返回一个随机的商业研究名词

```js
faker.company.bsNoun(); // models
```
