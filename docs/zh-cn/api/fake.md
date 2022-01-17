# Fake

通过 `faker.fake()` 方法可以使用 mustache 字符串格式组合 faker API。

```js
faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
// Wintheiser, Shaylee Sr.

faker.fake('{{company.bs}} is short for {{address.streetName}}');
// cutting-edge leverage web services is short for Flatley Rue
```
