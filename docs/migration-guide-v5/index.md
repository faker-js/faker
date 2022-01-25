# Migrating from Faker v5 to v6

[[toc]]

### ESM Support

**New Format**: We're now ESM compatible! We've dropped the Browser bundle in favor of ESM.

So if you'd like to use `Faker` in the **browser**, simply include it using a [JavaScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html).

```html
<script type="module">
  import { faker } from 'https://unpkg.com/@faker-js/faker';

  console.log(`${faker.name.firstName()} ${faker.name.lastName()}`);
</script>
```

### Remove all references to `faker` from your project. The new package is located at `@faker-js/faker`
:::warning
You **MUST** swap all references from the `faker` package to the new `@faker-js/faker` package.

In addition to releasing all _future_ versions under the `@faker-js/faker` package namespace, we have also provided all _historical_ versions of Faker.

If you depend on a specific version of Faker you still can reference the version directly.

`npm i @faker-js/faker@5.5.3 -D` will work just fine 😄.
:::


### TypeScript

:::tip TypeScript Improvements
Faker now ships with its own types! Remove `@types/faker` from your `package.json` to avoid conflicts.
:::

### Tree-shaking

Faker now supports tree-shaking! We highly recommend that you take advantage of your bundler's tree-shaking capabilities and change how you import Faker. This is especially true if you're importing Faker in the browser.

Faker is a giant package made up of many megabytes of strings. Only import what you need.

:::tip
Migrating to the new tree-shakeable syntax should be quick and painless. Doing this will likely shave many megabytes off of your initial page load.
:::

For JS:

```js
const { faker } = require('@faker-js/faker');

// Or specific locale
const fakerDe = require('@faker-js/faker/locale/de');
```

For TS:

```ts
import { faker } from '@faker-js/faker';

// Or specific locale
import fakerDe from '@faker-js/faker/locale/de';
```

Please [open an issue on GitHub](https://github.com/faker-js/faker/issues/new?assignees=&labels=pending+triage&template=freestyle.md) if we've missed any steps.

Happy Faking!
- Shini, Jess, and the Faker Team
