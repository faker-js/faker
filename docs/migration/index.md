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

:::tip
Faker now provides TypeScript types out of the box.
So you can remove `@types/faker` completely.
:::

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

---

:::warning
You need to switch from the package `faker` to `@faker-js/faker`.  
We also provided all historical versions under the new organization scope. So if you depend on a specific version you still can use `"@faker-js/faker": "5.5.3"`.
:::
