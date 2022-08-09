# Migrating from Faker v6 to v7

[[toc]]

### Node 12 no longer supported

You need at least Node 14 to use faker.

### Default export removed

If you were previously importing faker like this:

```js
import faker from '@faker-js/faker';
```

You should instead use:

```js
import { faker } from '@faker-js/faker';
```

### Deprecated methods changed

Several methods were renamed or moved.

| Old method                 | New alternative                                        |
| -------------------------- | ------------------------------------------------------ |
| faker.random.number        | faker.datatype.number                                  |
| faker.random.float         | faker.datatype.float                                   |
| faker.random.arrayElement  | faker.helpers.arrayElement                             |
| faker.random.arrayElements | faker.helpers.arrayElements                            |
| faker.random.objectElement | faker.helpers.objectKey <br> faker.helpers.objectValue |
| faker.random.uuid          | faker.datatype.uuid                                    |
| faker.random.boolean       | faker.datatype.boolean                                 |
| faker.random.image         | faker.image.image                                      |
| faker.random.hexaDecimal   | faker.datatype.hexadecimal                             |
| faker.helpers.randomize    | faker.helpers.arrayElement                             |
| faker.datatype.hexaDecimal | faker.datatype.hexadecimal                             |
| faker.name.title           | faker.name.jobTitle                                    |

### Deprecated methods removed

Some methods were removed without a direct alternative. If you are using any of these methods you should build an object containing the specific properties you need.

| Removed method                  |
| ------------------------------- |
| faker.helpers.createCard        |
| faker.helpers.contextualCard    |
| faker.helpers.userCard          |
| faker.time                      |
| faker.helpers.createTransaction |
