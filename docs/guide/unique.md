# Unique Values

In general, Faker methods do not return unique values.

```ts
faker.seed(55);
faker.animal.type(); //'cat'
faker.animal.type(); //'bird'
faker.animal.type(); //'horse'
faker.animal.type(); //'horse'
```

Some methods and locales use a much larger data sets than others. For example `faker.animal.type` has only 13 possible animals to choose from. By contrast `faker.person.fullName()` pulls from a list of hundreds of first names, surnames and prefixes/suffixes, so can generate hundreds of thousands of unique names. Even then, the [birthday paradox](https://en.wikipedia.org/wiki/Birthday_Paradox) means that duplicate values will quickly be generated.

Sometimes you want to generate unique values, for example you may wish to have unique values in an database email column. There are a few possible strategies for this:

1. Use `faker.helpers.uniqueArray()` if you want to generate all the values at one time. For example

```ts
faker.helpers.uniqueArray(faker.internet.email, 1000); // will generate 1000 unique email addresses
```

2. If there are insufficient values for your needs, consider prefixing or suffixing values with your own sequential values, for example you could prefix `1.`, `2.` to each generated email in turn.

3. Build your own logic to keep track of a set of previously generated values and regenerate values as necessary if a duplicate is generated

4. Use a third party package to enforce uniqueness such as [enforce-unique](https://github.com/MansurAliKoroglu/enforce-unique)

Note you can supply a maximum time (in milliseconds) or maximum number of retries.

```ts
import { EnforceUniqueError, UniqueEnforcer } from 'enforce-unique';
const uniqueEnforcerEmail = new UniqueEnforcer();

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = uniqueEnforcerEmail.enforce(
    () => {
      return faker.internet.email({
        firstName,
        lastName,
      });
    },
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

## Migrating from faker.helpers.unique

Prior to v9, Faker provided a [`faker.helpers.unique()`](https://v8.fakerjs.dev/api/helpers.html#unique) method which had a global store to keep track of duplicates. This was removed in v9.

In general you should switch to using one of the strategies above. For example, migrating to `enforce-unique`:

Basic example:

```ts
//OLD
const name = faker.helpers.unique(faker.person.firstName);

//NEW
import { UniqueEnforcer } from 'enforce-unique';
//const { UniqueEnforcer } = require("enforce-unique") //CJS
const enforcerName = new UniqueEnforcer();
const name = enforcerName.enforce(faker.person.firstName);
```

With parameters:

```ts
//OLD
const stateCode = faker.helpers.unique(faker.location.state, [
  {
    abbreviated: true,
  },
]);

//NEW
import { UniqueEnforcer } from 'enforce-unique';

const enforcerState = new UniqueEnforcer();
const stateCode = enforcerState.enforce(() => {
  return faker.location.state({
    abbreviated: true,
  });
});
```

With options:

```ts
//OLD
const city = faker.helpers.unique(faker.location.city, [], {
  maxRetries: 100,
  maxTime: 1000,
});

//NEW
import { UniqueEnforcer } from 'enforce-unique';
const enforcer = new UniqueEnforcer();
const city = enforcer.enforce(faker.location.city, {
  maxRetries: 100,
  maxTime: 1000,
});
```

Note `enforce-unique` does not support the `exclude` or `store` options. If you were previously using these, you may wish to build your own uniue logic instead.
