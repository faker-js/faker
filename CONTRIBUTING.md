A lot of effort has been put into `Faker` to create a useful and handy library.
There are still a lot of things to be done, so all contributions are welcome!
If you want to make `Faker` a better, please read the following contribution guide.

# Important

- Please make sure that you run `pnpm install`, `pnpm run build` and `pnpm run test` before making a PR to ensure that everything is working from the start.

## Good to know

- The project is being built by [esbuild](https://esbuild.github.io) (see [bundle.ts](scripts/bundle.ts))
- The documentation is running via VitePress.
  Make sure you **build** the project before running the docs, cause some files depend on `dist`.
  Use `pnpm run docs:dev` to edit them in live mode.
- The tests are executing `vitest` against `test/**/*.spec.ts`
- If you update the locales, make sure to run `pnpm run generate:locales` to generate/update the related files.

## Architecture

The sources are located in the [src](src) directory.
All fake data generators are divided into namespaces (each namespace being a separate module).
Most of the generators use the _definitions_, which are just plain JavaScript objects/arrays/strings that are separate for each [locale](src/locales).

## Building Faker

The project is being built by [esbuild](https://esbuild.github.io) (see [bundle.ts](scripts/bundle.ts))

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

## Adding new locale or updating existing one

After adding new or updating existing locale data, you need to run `pnpm run generate:locales` to generate/update the related files.

## Deprecation workflow

If you ever find yourself deprecating something in the source code, you can follow these steps to save yourself (and the reviewers) some trouble.

If the code you want to deprecate is a property, convert it to a [getter](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters) first. Now that you have a function, the first thing you want to do is call the internal [`deprecated` function](src/internal/deprecated.ts). Afterwards, add a `@deprecated` parameter to the end of the JSDoc with a human readable description message with a suitable replacement for the deprecated function. Lastly, add a `@see` parameter to the JSDoc with a link to the replacement in the faker library (if it exists). The syntax for the link is `faker.[module].[function]`.

Example:

```ts
/**
 * @see faker.cat.random
 *
 * @deprecated Use faker.cat.random() instead.
 */
get cat() {
  deprecated({
    deprecated: 'faker.animal.cat',
  });
  return 'cat';
}
```

## JSDocs

JSDoc are comments above any code structure (variable, function, class, etc.) that begin with `/**` and end with `*/`. Multiline comments start (if not being the start or end line) with a `*`.
For more info checkout [jsdoc.app](https://jsdoc.app/about-getting-started.html).

JSDoc will be read and automatically processed by `generate:api-docs` and therefore need to follow some project conventions. Other standards are in place because we think they increase the code quality.

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
