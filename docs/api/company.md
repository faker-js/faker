# Company

[[toc]]

## Company Name

Return random company name. Using one of the following format options
::: v-pre

- `{{name.lastName}} {{company.companySuffix}}`
- `{{name.lastName}} - {{name.lastName}}`
- `{{name.lastName}}, {{name.lastName}} and {{name.lastName}}`
  :::

::: tip
| Param | Type | Default |
| ----------- | ------ | :-----: |
| formatIndex | number | `0-2` |
:::

```js
faker.company.companyName(); // Zboncak and Sons
faker.company.companyName(0); // Nikolaus Group
faker.company.companyName(1); // Keeling - Lind
faker.company.companyName(2); // Swaniawski, Howe and Leffler
```

## Company Suffix

Return random company suffix

```js
faker.company.companySuffix(); // and Sons
```

## Company Suffixes

Return **array** of company suffixes

```js
faker.company.suffixes(); // ["Inc", "and Sons", "LLC", "Group"]
```

## Catchphrase

Return random company catch phrase

```js
faker.company.catchPhrase(); // Team-oriented context-sensitive conglomeration
```

## Catchphrase Adjective

Return random catch phrase adjective

```js
faker.company.catchPhraseAdjective(); // Down-sized
```

## Catchphrase Descriptor

Return random catch phrase descriptor

```js
faker.company.catchPhraseDescriptor(); // bi-directional
```

## Catchphrase Noun

Return random catch phrase noun

```js
faker.company.catchPhraseNoun(); // complexity
```

## Company BS 💩

Return random company bs

```js
faker.company.bs(); // ubiquitous empower e-business
```

## BS Adjective

Return random company bs adjective

```js
faker.company.bsAdjective(); // granular
```

## BS Buzzword

Return random company bs buzz word

```js
faker.company.bsBuzz(); // facilitate
```

## BS Noun

Return random company bs noun

```js
faker.company.bsNoun(); // models
```
