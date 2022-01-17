# 本地化

从 `v2.0.0` 版本开始，Faker 支持多个地区的本地化内容。

默认语言区域设置为英语。

设置新的语言环境很简单：

```js
// sets locale to de
faker.setLocale('de');
// or
faker.locale = 'de';
```

- az
- cz
- de
- de_AT
- de_CH
- en
- en_AU
- en_BORK
- en_CA
- en_GB
- en_IE
- en_IND
- en_US
- en_ZA
- en_au_ocker
- es
- es_MX
- fa
- fr
- fr_CA
- ge
- id_ID
- it
- ja
- ko
- nb_NO
- nep
- nl
- pl
- pt_BR
- pt_PT
- ru
- sk
- sv
- tr
- uk
- vi
- zh_CN
- zh_TW

## 本地化包

从 `v3.0.0` 版本开始，Faker 支持增量加载语言环境。

默认情况下，导入 `faker` 将包括所有的语言环境数据。

在生产环境中，您可能只想包含特定区域设置的区域设置数据。

```js
// 只加载德国的区域设置
const faker = require('faker/locale/de');
```
