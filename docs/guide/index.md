# Getting Started

## Overview

faker.js is a popular library that generates fake (but reasonable) data that can be used for things such as:
* Unit Testing
* Performance Testing
* Building Demos
* Working without a completed backend

faker.js was originally written in [Perl](https://metacpan.org/dist/Data-faker.js) and this is the JavaScript port. Language bindings also exist for [Ruby](https://github.com/faker-ruby/faker), [Java](https://github.com/DiUS/java-faker), and [Python](https://github.com/joke2k/faker).

This documentation only covers the JavaScript implementation of faker.js.

## Environments

You can run faker.js in the Browser, within Node, or the many other languages supported by faker.js. ([Perl](https://metacpan.org/dist/Data-faker.js), [Ruby](https://github.com/faker-ruby/faker), [Java](https://github.com/DiUS/java-faker), and [Python](https://github.com/joke2k/faker))

## Installation
Install it as a Dev Dependency using your favorite package manager.

```shell
# Do not install the @latest tag.
# There are issues.
npm install faker@5.5.3 --save-dev
```

## Usage

### Node.js
```js
import faker from 'faker'

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // An object representing a random contact card containing many properties
```


### Browser

```html
<script type="text/javascript" src="https://unpkg.com/faker@5.5.3/dist/faker.min.js"></script>

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

:::tip Note
Using the browser is great for experimenting 👍. However, due to all of the strings faker.js uses to generate fake data, **faker.js is a large package**. It's around `1.57 MB` minified. **Please avoid deploying faker.js in your web app.**
:::

## Community

If you have questions or need help, reach out to the community via Discord and GitHub Discussions.
