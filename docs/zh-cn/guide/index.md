# 快速入门

## 概述

Faker 是一个流行的库，它生成虚假（但合理的）数据，可用于以下用途：

- 单元测试
- 性能测试
- 构建演示
- 在没有完整后端的情况下工作

Faker 最初是使用 [Perl](https://metacpan.org/dist/Data-Faker) 语言编写的，本项目使其 JavaScript 版本。除此之外，本项目还有使用 [Ruby](https://github.com/faker-ruby/faker)、[Java](https://github.com/DiUS/java-faker) 和 [Python](https://github.com/joke2k/faker) 语言编写的版本。

本文档仅包含 Faker 的 JavaScript 实现。

## 环境

您可以在浏览器、Node.js 或 Faker 支持的其他众多语言（[Perl](https://metacpan.org/dist/Data-Faker)、[Ruby](https://github.com/faker-ruby/faker)、[Java](https://github.com/DiUS/java-faker) 和 [Python](https://github.com/joke2k/faker)）中运行 Faker。

## 安装

使用您最喜欢的包管理器将其安装为开发依赖项。

```shell
npm install @faker-js/faker --save-dev
```

或

```shell
yarn add @faker-js/faker --dev
```

或

```shell
pnpm add @faker-js/faker --save-dev
```

## 使用

### Node.js

```js
import faker from '@faker-js/faker';

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // An object representing a random contact card containing many properties
```

### 浏览器

```html
<script type="text/javascript" src="https://unpkg.com/@faker-js/faker"></script>

<script>
  // Caitlyn Kerluke
  const randomName = faker.name.findName();

  // Rusty@arne.info
  const randomEmail = faker.internet.email();

  // An object representing a random contact card
  // containing many properties
  const randomCard = faker.helpers.createCard();
</script>
```

:::tip 注
使用浏览器非常适合进行实验 👍。然而，因为 Faker 需要存储用于生成假数据的所有字符串，所以它在压缩后的体积仍然很大，约为 1.57 MB。**请避免在您的 Web 应用程序中部署 Faker。**
:::

## 社区

如果您有问题或需要帮助，请通过 Discord 和 GitHub 讨论与社区联系。

## 关于

中文版文档由 [宝硕](https://baoshuo.ren) 翻译，欢迎在 GitHub 上指出翻译中的错误或不恰当之处。
