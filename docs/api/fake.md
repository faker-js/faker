# Fake

Useful generator method `faker.fake()` for combining faker API methods using a mustache string format.

```js
faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
// Wintheiser, Shaylee Sr.

faker.fake('{{company.bs}} is short for {{address.streetName}}');
// cutting-edge leverage web services is short for Flatley Rue
```
