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
