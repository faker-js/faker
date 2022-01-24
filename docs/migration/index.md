# Migration from faker.js v5

There are now two bundles: `cjs` and `esm`

The browser bundle was dropped in favor of `esm`

So if you like to use `Faker` in the **browser**, just use:

```html
<script type="module">
  import { faker } from 'https://unpkg.com/@faker-js/faker';

  console.log(`${faker.name.firstName()} ${faker.name.lastName()}`);
</script>
```

A stackblitz playground can be found here: https://stackblitz.com/edit/typescript-damv7h

---

You no longer need to import `faker` as a standard import, but as a tree shakeable instance.

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

:::tip
If you have many files using these imports, we suggest to use e.g. VSCode's search and replace functionality.
:::
