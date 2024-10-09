# Unique Values

In general, Faker methods do not return unique values.

```ts
faker.seed(55);
faker.animal.type(); //'cat'
faker.animal.type(); //'bird'
faker.animal.type(); //'horse'
faker.animal.type(); //'horse'
```

Some methods and locales use much smaller data sets than others. For example, `faker.animal.type` has only 13 possible animals to choose from. In contrast, `faker.person.fullName()` pulls from a list of hundreds of first names, surnames, and prefixes/suffixes, so it can generate hundreds of thousands of unique names. Even then, the [birthday paradox](https://en.wikipedia.org/wiki/Birthday_Paradox) means that duplicate values will quickly be generated.

Sometimes, you want to generate unique values. For example, you may wish to have unique values in a database email column.  
There are a few possible strategies for this:

1. Use `faker.helpers.uniqueArray()` if you want to generate all the values at one time. For example:

```ts
faker.helpers.uniqueArray(faker.internet.email, 1000); // will generate 1000 unique email addresses
```

2. If there are insufficient values for your needs, consider prefixing or suffixing values with your own sequential values, for example you could prefix `1.`, `2.` to each generated email in turn.

3. Build your own logic to keep track of a set of previously generated values and regenerate values as necessary if a duplicate is generated

4. Use a third party package to enforce uniqueness such as [enforce-unique](https://github.com/MansurAliKoroglu/enforce-unique), [@dpaskhin/unique](https://github.com/dPaskhin/unique).

#### enforce-unique

Note you can supply a maximum time (in milliseconds) or maximum number of retries.

```js
import { EnforceUniqueError, UniqueEnforcer } from 'enforce-unique';

const uniqueEnforcerEmail = new UniqueEnforcer();

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = uniqueEnforcerEmail.enforce(
    () =>
      faker.internet.email({
        firstName,
        lastName,
      }),
    {
      maxTime: 50,
      maxRetries: 50,
    }
  );

  return {
    firstName,
    lastName,
    email,
  };
}
```

#### @dpaskhin/unique

```ts
import { unique, uniqueFactory } from '@dpaskhin/unique';
import { faker } from '@faker-js/faker';

// Simple example for generating a unique email
const uniqueEmail1 = unique(faker.internet.email);

// ----------------------------------------

// Advanced example with a custom store for unique emails
const uniqueEmailsStore = new Set();

const uniqueEmail2 = unique(
  () =>
    faker.internet.email({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }),
  [],
  { store: uniqueEmailsStore, maxTime: 50, maxRetries: 50 }
);

// ----------------------------------------

// Example of generating unique user objects
const createUniqueUser = uniqueFactory(
  () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 100 }),
  }),
  {
    stringifier: value => JSON.stringify(value),
  }
);
// Each returned user is structurally unique
const uniqueUser = createUniqueUser();
```
