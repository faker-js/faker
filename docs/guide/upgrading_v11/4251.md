### Removal of legacy `team` locale definitions

The legacy `team` locale definition category has been removed. There was never a `faker.team` module; these definitions could only be used directly via `definitions.team` in selected locales.

Construct your own pattern instead:

```ts
// v10
faker.helpers.fake('{{team.name}}'); // 'Oklahoma vixens'

// v11
faker.helpers.fake('{{location.state}} {{animal.type}}s'); // 'Arizona birds'
```

Or upvote [issue #2081](https://github.com/faker-js/faker/issues/2081) if you want a modern replacement in future versions.
