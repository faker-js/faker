A lot of effort has been put into `Faker` to create a useful and handy library.
There are still a lot of things to be done, so all contributions are welcome!
If you want to make `Faker` a better, please read the following contribution guide.

# Important

- Please make sure that you run `pnpm install`, `pnpm run build` and `pnpm run test` before making a PR to ensure that everything is working from the start.

## Good to know

- The project is being built by [esbuild](https://esbuild.github.io) (see [bundle.ts](scripts/bundle.ts))
- The documentation is running via VitePress. Use `pnpm run docs:dev` to edit them in live mode.
- The tests are executing `vitest` against `test/**/*.spec.ts`

## Architecture

The sources are located in the [src](src) directory.
All fake data generators are divided into namespaces (each namespace being a separate module).
Most of the generators use the _definitions_, which are just plain JavaScript objects/arrays/strings that are separate for each [locale](src/locales).
