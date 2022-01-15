# Helpers

[[toc]]

## Randomize Array

Returns a random value from the provided array

::: tip
| Param | Type | Default |
| ----- | ----- | :---------------: |
| array | array | `["a", "b", "c"]` |
:::

```js
faker.helpers.randomize(); // a
faker.helpers.randomize(['bob', 'joe', 'tim']); // joe
```

## Slugify

slugify the provided string

::: tip
| Param | Type | Default |
| ------ | ------ | :-----: |
| string | string | `""` |
:::

```js
faker.helpers.slugify(); // ""
faker.helpers.slugify('bob was here'); // bob-was-here
```

## Replace Symbol From Number

Replace a symbol with a number

::: tip
| Param | Type | Default |
| ------ | ------ | :-----: |
| string | string | `""` |
| symbol | string | `"#"` |
:::

```js
faker.helpers.replaceSymbolWithNumber(); // ""
faker.helpers.replaceSymbolWithNumber('bob###@example.com'); // bob790@example.com
faker.helpers.replaceSymbolWithNumber('bob????##???', '?'); // bob6269##849
```

## Replace Symbols

Parses string for symbols (numbers or letters) and replaces them appropriately.

- `#` will be replaced with a number,
- `?` with be replaced with a letter
- `*` will be replaced with a number or a letter

::: tip
| Param | Type | Default |
| ------ | ------ | :-----: |
| format | string | `""` |
:::

```js
faker.helpers.replaceSymbols('#####'); // 98101
faker.helpers.replaceSymbols('???'); // ABC
faker.helpers.replaceSymbols('bob-###-42-??'); // bob-226-42-KB
```

## Shuffle Array

Takes an array and returns it randomized

::: tip
| Param | Type | Default |
| ----- | ----- | :-----: |
| array | array | `[]` |
:::

```js
faker.helpers.shuffle(); // []
faker.helpers.shuffle(['a', 'b', 'c']); // ["c", "a", "b"]
```

## Mustache

replaces mustache variable in string with provided key pair

::: tip
| Param | Type | Default |
| ----- | ------ | :-----: |
| str | string | `n/a` |
| data | object | `n/a` |
:::

```js
faker.helpers.mustache(); // ""
faker.helpers.mustache('{{foo}} was {{baz}}', { foo: 'bar', baz: 42 }); // bar was 42
```

## Create Card

Returns an object, but the data is not consistent within itself. Please use [Contextual Card](/api/helpers.html#contextual-card) for data that is self-consistent.

```js
faker.helpers.createCard();
```

```json
{
  "name": "Glen Hahn",
  "username": "Darrin_Champlin84",
  "email": "Benton_Swift30@hotmail.com",
  "address": {
    "streetA": "Dickinson Forest",
    "streetB": "63914 Eldora Forge",
    "streetC": "095 Bella Lodge Apt. 590",
    "streetD": "Apt. 980",
    "city": "East Allan",
    "state": "Nebraska",
    "country": "Liechtenstein",
    "zipcode": "08027",
    "geo": { "lat": "3.4797", "lng": "-123.6115" }
  },
  "phone": "(015) 568-3818 x649",
  "website": "lysanne.org",
  "company": {
    "name": "Funk - Nicolas",
    "catchPhrase": "Face to face dedicated moratorium",
    "bs": "turn-key benchmark web services"
  },
  "posts": [
    {
      "words": "enim molestias architecto",
      "sentence": "Beatae repellat deserunt eos.",
      "sentences": "Vero quae laudantium. Vel autem corrupti eligendi. Reiciendis itaque delectus deserunt ea error molestiae aperiam.",
      "paragraph": "Et sed nostrum placeat debitis maiores. Eos illum qui qui necessitatibus. Officiis a quisquam labore."
    },
    {
      "words": "qui dolor nihil",
      "sentence": "Occaecati asperiores rerum magni aspernatur eius id officiis.",
      "sentences": "Explicabo accusantium enim consequatur. Repellat placeat hic facere natus sint velit eligendi est distinctio.",
      "paragraph": "Fugiat maiores corrupti similique laboriosam enim culpa maiores velit. Distinctio consequatur illo commodi fuga quo repellendus. Nihil sequi dolor non. Nihil et blanditiis rerum cupiditate est et facilis aliquam."
    },
    {
      "words": "nesciunt iusto qui",
      "sentence": "Sapiente commodi facere laborum aut.",
      "sentences": "Molestias nemo fugiat itaque expedita est aspernatur praesentium explicabo repellat. Ea incidunt quia sint cupiditate saepe et tempora. Autem doloribus dolor eius omnis dolor. Eos laborum nesciunt iste rem placeat ut autem. Commodi error est non sapiente a.",
      "paragraph": "Eius maxime enim ut repellendus illum eum aut blanditiis. Quaerat qui omnis ab qui ipsum sint. Officiis iste neque ab qui dolor doloremque rerum quos sed."
    }
  ],
  "accountHistory": [
    {
      "amount": "251.84",
      "date": "2012-02-02T08:00:00.000Z",
      "business": "Breitenberg - Turcotte",
      "name": "Checking Account 0226",
      "type": "payment",
      "account": "66727594"
    },
    {
      "amount": "740.75",
      "date": "2012-02-02T08:00:00.000Z",
      "business": "Shields - Heller",
      "name": "Checking Account 3782",
      "type": "invoice",
      "account": "64889716"
    },
    {
      "amount": "378.68",
      "date": "2012-02-02T08:00:00.000Z",
      "business": "Dickens and Sons",
      "name": "Home Loan Account 1699",
      "type": "withdrawal",
      "account": "69892278"
    }
  ]
}
```

## Contextual Card

Returns an object where the name, username, and email are self-referrential.

```js
faker.helpers.contextualCard();
```

```json
{
  "name": "Joan",
  "username": "Joan39",
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ripplemdk/128.jpg",
  "email": "Joan39_Weimann93@gmail.com",
  "dob": "1973-09-26T20:12:25.191Z",
  "phone": "650-151-6699 x271",
  "address": {
    "street": "Boyle Points",
    "suite": "Apt. 093",
    "city": "Julioville",
    "zipcode": "79041",
    "geo": { "lat": "63.9355", "lng": "-150.2784" }
  },
  "website": "laurianne.info",
  "company": {
    "name": "Hudson and Sons",
    "catchPhrase": "Streamlined transitional firmware",
    "bs": "value-added incentivize communities"
  }
}
```

## User Card

Returns an object representing a user.

```js
faker.helpers.userCard();
```

```json
{
  "name": "Adriel Dach",
  "username": "Lawson.Rutherford83",
  "email": "Kassandra86@gmail.com",
  "address": {
    "street": "Gislason View",
    "suite": "Apt. 409",
    "city": "Tellyside",
    "zipcode": "00051",
    "geo": { "lat": "69.6104", "lng": "-109.3244" }
  },
  "phone": "1-685-232-7348",
  "website": "dakota.org",
  "company": {
    "name": "DuBuque Group",
    "catchPhrase": "Mandatory multi-state ability",
    "bs": "real-time grow methodologies"
  }
}
```

## Create Transaction

Returns an object representing a transaction.

```js
faker.helpers.createTransaction();
```

```json
{
  "amount": "883.74",
  "date": "2012-02-02T08:00:00.000Z",
  "business": "Brakus LLC",
  "name": "Credit Card Account 9671",
  "type": "deposit",
  "account": "54758588"
}
```
