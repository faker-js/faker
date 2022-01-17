# 网络

[[toc]]

## 头像

返回一个随机的头像链接。

```js
faker.internet.avatar();
// https://s3.amazonaws.com/uifaces/faces/twitter/dnezkumar/128.jpg
```

## 安全的电子邮件地址 <Badge type="tip" vertical="middle" text="Recommended" />

生成在 [安全域名](https://zh.wikipedia.org/wiki/Example.com) 下的电子邮件地址。

::: tip
| 参数 | 类型 | 默认值 |
| --------- | ------ | :----------------------: |
| firstName | string | `faker.name.firstName()` |
| lastName | string | `faker.name.lastName()` |
:::

```js
faker.internet.exampleEmail(); // Rhiannon_Von81@example.com
faker.internet.exampleEmail('bob'); // bob26@example.net
faker.internet.exampleEmail('bob', 'jon'); // bob_jon@example.com
```

## 电子邮件地址 <Badge type="danger" vertical="middle" text="Not recommended" />

生成随机的电子邮件地址。

::: danger 警告
这使用了真实的域名，因此很可能会创建一个 “真实” 的电子邮件地址。使用 `exampleEmail()` 是安全的。
:::

::: tip
| 参数 | 类型 | 默认值 |
| --------- | ------ | :-----------------------------------: |
| firstName | string | `faker.name.firstName()` |
| lastName | string | `faker.name.lastName()` |
| provider | string | `gmail.com` `yahoo.com` `hotmail.com` |
:::

```js
faker.internet.email(); // Ottis_Cremin16@yahoo.com
faker.internet.email('bob'); // bob_jon@example.com
faker.internet.email('bob', 'jon'); // bob_jon73@hotmail.com
faker.internet.email('bob', 'jon', 'somedomain.com'); // bob_jon@somedomain.com
```

## 用户名

根据几种模式之一生成用户名。

该模式是从以下之一中随机选择的：`firstname#` `firstname.lastname` `firstname.lastname#` `firstnamelastname` `firstnamelastname#`

::: tip
| 参数 | 类型 | 默认值 |
| --------- | ------ | :----------------------: |
| firstName | string | `faker.name.firstName()` |
| lastName | string | `faker.name.lastName()` |
:::

```js
faker.internet.userName(); // Maci12
faker.internet.userName('bob')); // bob_Considine30
faker.internet.userName('bob', 'jon')); // bob.jon61
```

## 协议

随机返回 http 或 https 协议。

```js
faker.internet.protocol(); // https
```

## 网址

返回一个随机的 URL。这个 URL 可能是安全的或不安全的。

```js
faker.internet.url(); // http://chloe.net
```

## 域名

返回一个随机的域名。

```js
faker.internet.domainName(); // hailie.biz
```

## 域名后缀

返回一个随机的域名后缀。

```js
faker.internet.domainSuffix(); // org
```

## 域名词

返回一个随机的域名词。

```js
faker.internet.domainWord(); // mattie
```

## IP 地址

返回一个随机的 IP 地址。

```js
faker.internet.ip(); // 165.20.179.86
```

## IPv6 地址

返回一个随机的 IPv6 地址。

```js
faker.internet.ipv6(); // 0e1a:48d6:8da6:b933:be58:442d:71db:42d7
```

## 用户代理

返回一个随机的用户代理（User Agent）。

```js
faker.internet.userAgent();
// Mozilla/5.0 (Windows NT 6.1; rv:6.0) Gecko/20100101 Firefox/6.0.0
```

## 十六进制颜色

根据 [这个很棒的想法](http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette) 生成随机的十六进制颜色。

::: tip
| 参数 | 类型 | 默认值 |
| ------------ | ------ | :-----: |
| baseRed255 | number | `0` |
| baseGreen255 | number | `0` |
| baseBlue255 | number | `0` |
:::

```js
faker.internet.color(); // #630c7b
faker.internet.color(128); // #910145
faker.internet.color(122, 148); // #a06a09
faker.internet.color(42, 22, 11); // #48166d
```

## MAC 地址

返回一个随机的硬件地址。

```js
faker.internet.mac(); // 00:87:14:24:31:ba
```

## 密码

返回一个随机的密码。

::: tip
| 参数 | 类型 | 默认值 |
| --------- | ------- | :-----: |
| len | number | `15` |
| memorable | boolean | `false` |
| pattern | regex | `/\w/` |
| prefix | string | `''` |

**注意：** 如果 `memorable` 选项设置为 `true`，`pattern` 参数将被忽略。
:::

```js
faker.internet.password(); // 0ViHvR3Qp7AAsir
faker.internet.password(8); // m9Qw6dzR
faker.internet.password(8, true); // qecuquha
faker.internet.password(8, false, /^[A-Z]*$/); // PQGGVATB
faker.internet.password(8, false, /^[A-Z]*$/, 'bob'); // bobTXMPD
```
