A lot of effort has been put into `Faker` to create a useful and handy library.
There are still a lot of things to be done, so all contributions are welcome!
If you want to make `Faker` a better place, please read the following contribution guide.

## Before you start

It's generally helpful to [create an issue](https://github.com/faker-js/faker/issues/new/choose) first:

- If you are proposing a new feature, this allows other users to "upvote" the issue and discuss solutions to possible problems.
  Once an issue has enough upvotes (usually 10+) it will be reviewed for development.
- If you notice a bug, this allows you to provide steps to reproduce, and allows other users to confirm this is actually a bug.
- It's not required to create an issue in all cases.
  For example for fixing a typo in documentation, or adding some new data for a locale, you could immediately create a pull request without an issue.

## Important

Please make sure that you run `pnpm run preflight` before making a PR to ensure that everything is working from the start.  
This is a shorthand for running the following scripts in order:

- `pnpm install` - installs npm packages defined in package.json
- `pnpm run generate:locales` - generates locale files
- `pnpm run generate:api-docs` - generates API documentation
- `pnpm run format` - runs [prettify](https://github.com/prettier/prettier) to format code
- `pnpm run lint` - runs [ESLint](https://github.com/eslint/eslint) to enforce project code standards
- `pnpm run build:clean` - removes artifacts from previous builds
- `pnpm run build:code` - builds the code, both CommonJS and ESM versions
- `pnpm run test:update-snapshots` - runs all tests, and updates any snapshots if needed
- `pnpm run ts-check` - checks that there are no TypeScript errors in any files

## Good to know

- The project is being built by [tsup](https://tsup.egoist.dev) (see [tsup.config.ts](tsup.config.ts))
- The documentation is running via VitePress.
  Make sure you **build** the project before running the docs, cause some files depend on `dist`.
  Use `pnpm run docs:dev` to edit them in live mode.
- The tests are executing `vitest` against `test/**/*.spec.ts`
- If you update the locales, make sure to run `pnpm run generate:locales` to generate/update the related files.

## Architecture

The sources are located in the [src](src) directory.
All fake data generators are divided into namespaces (each namespace being a separate module).
Most of the generators use the _definitions_, which are just plain JavaScript objects/arrays/strings that are separate for each [locale](src/locales).

## Sourcing data for definitions

If adding new data definitions to Faker, you'll often need to find source data. Note that:

- Faker must not contain copyrighted materials.
- Facts cannot be copyrighted, so if you are adding or translating a finite, known, list of things such as the names of chemical elements into another language, that's OK.
- But if you are compiling a list of, for example, popular personal names or cities, don't copy directly from a single source (Wikipedia, 'most popular' articles, government data sites etc). A compilation of facts [can be copyrighted](https://en.wikipedia.org/wiki/Copyright_in_compilation).
- It's best to refer to multiple sources and use your own judgement/knowledge to make a sample list of data.

## Adding new locale or updating existing one

After adding new or updating existing locale data, you need to run `pnpm run generate:locales` to generate/update the related files.
Please only change files related to one module (e.g. person, location) whenever possible. This can simplify/speed up the review process. Additionally, it allows the maintainers to track PRs in a meaningful way by adding related labels.

## Building Faker

The project is being built by [tsup](https://tsup.egoist.dev) (see [tsup.config.ts](tsup.config.ts))

```shell
pnpm install
pnpm run build
```

## Testing

Before you can run the tests, you need to install all dependencies and build the project, because some tests depend on the bundled content.

```shell
pnpm install
pnpm run build

pnpm run test
# or
pnpm run coverage
```

You can view a generated code coverage report at `coverage/index.html`.

### Adding tests for new methods/parameters

All methods should have tests for all their parameters.

Usually, there will be a test case for each of the following scenarios:

- No arguments/Only required parameters
- One parameter/option at a time
- All parameters at once
- Special cases

We won't test for arguments that don't match the expected types.

Our tests are separated into two parts:

- Fixed Seeded Tests
- Random Seeded Tests

#### Fixed Seeded Tests

The fixed seeded tests are used to check that the returned results are matching the users expectations and are deterministic.
Each iteration will return in the same results as the previous.
Here, the automatically generated [test snapshots](https://vitest.dev/guide/snapshot.html) should be reviewed in depth.
This is especially important if you refactor a method to ensure no unexpected behavior occurs.

There are two ways to write these tests.

Methods without arguments can be tested like this:

```ts
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

seededTests(faker, 'someModule', (t) => {
  t.it('someMethod');
  // Or if multiple similar methods exist:
  t.itEach('someMethod1', 'someMethod2', 'someMethod3');
});
```

Methods with arguments can be tested like this:

```ts
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

seededTests(faker, 'someModule', (t) => {
  t.describe('someMethod', (t) => {
    t.it('noArgs')
      .it('with param1', true)
      .it('with param1 and param2', false, 1337);
  });
  // Or if multiple similar methods exist:
  t.describeEach(
    'someMethod1',
    'someMethod2',
    'someMethod3'
  )((t) => {
    t.it('noArgs')
      .it('with param1', true)
      .it('with param1 and param2', false, 1337);
  });
});
```

You can update the snapshot files by running `pnpm run test -u`.

#### Random Seeded Tests

The random seeded tests return a random result in each iteration.
They are intended to check for edge cases and function as general result checks.
The tests will usually use regex or preferably [validator.js](https://github.com/validatorjs/validator.js) to ensure the method returns valid results.
We repeat these tests a few times to reduce the likelihood of flaky tests caused by the various corner cases that the implementation or the relevant locale data might have. The loop can also be used to steeply increase the test count to trigger rare issues.

```ts
import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('someModule', () => {
  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('someMethod', () => {
        it('Should return a valid result', () => {
          const actual = faker.someModule.someMethod();

          expect(actual).toBeTypeOf('string');
          expect(actual).toSatisfy(validatorjs.isAlphanumeric);
          // ...
        });

        // ...
      });
    }
  });
});
```

## Deprecation workflow

If you ever find yourself deprecating something in the source code, you can follow these steps to save yourself (and the reviewers) some trouble.

If the code you want to deprecate is a property, convert it to a [getter](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters) first. Now that you have a function, the first thing you want to do is call the internal [`deprecated` function](src/internal/deprecated.ts). Afterwards, add a `@deprecated` parameter to the end of the JSDoc with a human readable description message with a suitable replacement for the deprecated function. Lastly, add a `@see` parameter to the JSDoc with a link to the replacement in the faker library (if it exists). The syntax for the link is `faker.[module].[function]`.

Example:

```ts
/**
 * @see faker.cat.random()
 *
 * @deprecated Use `faker.cat.random()` instead.
 */
get cat() {
  deprecated({
    deprecated: 'faker.animal.cat',
  });
  return 'cat';
}
```

## Documenting changes for new major versions

Each major version has an upgrading guide, e.g. [next.fakerjs.dev/guide/upgrading](https://next.fakerjs.dev/guide/upgrading.html).

While developing new features and fixing bugs for a new release, changes are added to the migration guide to aid developers when the version is released.

The general principle is to document anything which requires a normal user of the library to change their code which uses Faker when upgrading to the new major version.

There are two sections:

- Breaking changes (user MUST change their code)
- Deprecations and other changes (user SHOULD change their code but it will still work for this major version even if they don't)

Not every change needs to be in the migration guide. If it is too long, it becomes hard for users to spot the important changes.

### Should be in the guide

- Breaking changes, e.g. removal of methods
- Behavior changes, e.g. a different default for a parameter, or a parameter becoming required
- Whole modules renaming (e.g. faker.name to faker.person)
- Locale renames
- Changes to minimum versions e.g. requiring a new version of Node
- Changes to how Faker is imported

### Doesn't need to be in the guide

- New locales
- Changes to locale data in existing locales
- Bugfixes where it's unlikely anyone was relying on the old behavior (e.g. broken values in locale files)
- New methods and parameters
- Straightforward method aliases, e.g. where a method or parameter is renamed but the old name still works identically. (Runtime warnings will already guide the user in this case)
- Changes to locale definition files which only affect usage via `faker.helpers.fake`, e.g. if a definition file is renamed, but the public API for the method stays the same

## JSDocs

JSDoc are comments above any code structure (variable, function, class, etc.) that begin with `/**` and end with `*/`. Multiline comments start (if not being the start or end line) with a `*`.
For more info checkout [jsdoc.app](https://jsdoc.app/about-getting-started.html).

JSDoc will be read and automatically processed by `generate:api-docs` and therefore need to follow some project conventions. Other standards are in place because we think they increase the code quality.

> We have a small set of JSDoc tags that all methods should have.

- Description
- `@param` - If the method has parameters
- `@see` - If there are other important methods
- `@example` - Example calls without and with parameters, including a sample result of each call
- `@since` - The version this method was added (or is likely to be added)
- `@deprecated` - If the method is deprecated, with additional information about replacements

<table>
<tr>
<th>Do</th>
<th>Dont</th>
</tr>
<tr>
<td>

```ts
/**
 * This is a good JSDoc description for a method that generates foos.
 *
 * @param options The optional options to use.
 * @param options.test The parameter to configure test. Defaults to `'bar'`.
 *
 * @see faker.helper.fake
 *
 * @example
 * faker.bar.foo() // 'foo'
 * faker.bar.foo({ test: 'oof' }) // 'of'
 *
 * @since 7.5.0
 *
 * @deprecated Use `faker.cat.random()` instead.
 */
function foo(options: { test: string } = {}): string {
  // implementation
}
```

</td>
<td>

```ts
/**
 * This is a bad JSDoc description.
 *
 * @return foo
 */
function foo(options: { test: string }) {
  // implementation
}
```

</td>
</tr>
</table>

> Other JSDoc tags are in use for specific cases.

- `@internal` - If the method is not intended to be used by the end user, e.g. a helper function.
- `@remark` - If the method depends on external data not being controlled by Faker, e.g. a third-party image provider.

> We use eslint-plugin-jsdoc to test for basic styling and sorting of doc-tags.

This is in place so all JSDoc tags will get sorted automatically, so you don't have to bother with it. This also means that most rules in this section can get auto fixed by the eslint formatter.

> JSDocs should always be multiline

While single line JSDoc are technically valid, we decided to follow this rule since it makes changes in the git diff much more clear and easier to understand.

<table>
<tr>
<th>Do</th>
<th>Dont</th>
</tr>
<tr>
<td>

```ts
/**
 * This is a good JSDoc description.
 */
function foo() {
  // implementation
}
```

</td>
<td>

```ts
/** This is a bad JSDoc description. */
function foo() {
  // implementation
}
```

</td>
</tr>
</table>

> Everything that can be accessed directly by a user should have JSDoc.

This rule is aimed to target anything that is exported from the faker library. This includes types, interfaces, functions, classes and variables. So if you introduce anything new that is not internal, write JSDoc for it.

> If a `@param` has a default value, it needs to be mentioned at the end of the sentence.

```ts
/**
 * This is a good JSDoc description.
 *
 * @param bar this is a parameter description. Defaults to `0`.
 */
function foo(bar: number = 0) {
  // implementation
}
```

> If a function can throw an error (FakerError) you have to include the `@throws` tag with an explanation when an error could be thrown

```ts
/**
 * This is a good JSDoc description.
 *
 * @param bar this is a parameter description. Defaults to `0`.
 *
 * @throws If bar is negative.
 */
function foo(bar: number = 0) {
  // implementation
}
```

> Sentences should always end with a period.

This rule ensures minimal grammatical correctness in the comments and ensures that all comments look the same.

> Different tags have to be separated by an empty line.

This rule improves the comments readability by grouping equivalent tags and making them more distinguishable from others.

<table>
<tr>
<th>Do</th>
<th>Dont</th>
</tr>
<tr>
<td>

```ts
/**
 * This is a good JSDoc block, because it follows the Faker preferences.
 *
 * @param bar The first argument.
 * @param baz The second argument.
 *
 * @example foo(1, 1) // [1, 1]
 * @example foo(13, 56) // [13, 56]
 */
function foo(bar: number, baz: number): [number, number] {
  // implementation
}
```

</td>
<td>

```ts
/**
 * This is a bad JSDoc block, because it has no linebreaks between sections.
 * @param bar The first argument.
 * @param baz The second argument.
 * @example foo(1, 1) // [1, 1]
 * @example foo(13, 56) // [13, 56]
 */
function foo(bar: number, baz: number): [number, number] {
  // implementation
}
```

</td>
</tr>
</table>

## Developing the docs

Before running the docs, build the Faker dist, it's used inside of certain routes.

```shell
pnpm run build

pnpm run docs:dev
```

## Building and serving the docs statically

If you changed something heavily in the docs, like auto-generating content, you should check the docs statically, because it could differ from the dev version.
Before running the docs, build the Faker dist, it's used inside of certain routes.

```shell
pnpm run build

pnpm run docs:build # Output docs to /dist
pnpm run docs:serve # Serve docs from /dist
```

## Deploying documentation

See the [netlify.toml](netlify.toml) for configuration.

## Committing

Read a detailed documentation at [fakerjs.dev](https://fakerjs.dev/contributing/submit-a-pull-request#the-pull-request-title)
