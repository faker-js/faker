# Submit a Pull Request

A lot of effort has been put into `Faker` to create a useful and handy library.
There are still a lot of things to be done!
If you want to make `Faker` a better place, please follow the steps below when submitting a pull request.

## Step 1: Ensure Your Branch is Up-to-Date

Before making changes, ensure your fork is synchronized with Faker’s latest updates:

```sh
git fetch upstream
git merge upstream/next origin/next
```

## Step 2: Create a New Branch

Create a new branch for your changes:

```sh
git switch -c my-branch-name
```

Using descriptive branch names makes reviewing easier, but also helps you identify the reason for a branch if you contribute multiple PR to Faker.

## Step 3: Make Your Changes

Now, modify the necessary files, ensuring they align with Faker’s coding standards.
If your PR introduces new functionality, update documentation accordingly.

## Step 4: Run Preflight Checks

Before committing, verify your changes meet Faker’s quality standards:

```sh
pnpm run preflight
```

The command is a useful all-in-one command provided by the Faker team, to make development as easy as possible.
It is a shorthand for running the following scripts in order:

- `pnpm install` - installs npm packages defined in package.json
- `pnpm run generate:locales` - generates locale files
- `pnpm run generate:api-docs` - generates API documentation
- `pnpm run format` - runs [prettier](https://github.com/prettier/prettier) to format code
- `pnpm run lint` - runs [ESLint](https://github.com/eslint/eslint) to enforce project code standards
- `pnpm run build:clean` - removes artifacts from previous builds
- `pnpm run build:code` - builds the code
- `pnpm run test:update-snapshots` - runs all tests with [vitest](https://github.com/vitest-dev/vitest), and updates any snapshots if needed
- `pnpm run ts-check` - checks that there are no TypeScript errors in any files

::: tip Note
The `preflight` command is very helpful when switching between different branches,
to get your local environment synced up with the branch's state.
:::

## Step 5: Commit and Push Your Changes

Once everything looks good, commit your changes:

```sh
git commit -m "feat: Add support for XYZ functionality"
git push origin my-branch-name
```

Faker does not enforce a specific commit convention.
Instead, all commits are squashed into a single commit when you PR is merged.
Writing meaningful commit messages might still be advantageous.
This way you get to reflect on the changes you have done and reviewers can get an easier, higher level understanding from your submission.

## Step 6: Open a Pull Request

Navigate to your forked repository on GitHub and open a pull request against Faker’s next branch.

PR Guidelines:

- Clearly explain your changes and why they are needed.
- Reference related issues when applicable.
- Keep your PR focused—avoid bundling multiple unrelated changes.
- If applicable, add tests to cover new functionality.

### The Pull Request Title

A Pull Request title needs to follow the semantic of a [conventional commit](https://www.conventionalcommits.org), since it is used as commit message when merging your PR.
These commit messages are then used to automatically update the [CHANGELOG](https://github.com/faker-js/faker/blob/next/CHANGELOG.md) file for each release version.

PR titles are written in following convention: `type(scope): subject`

**type** is required and indicates the intent of the PR.

::: tip Note
The types `feat` and `fix` will be shown in the CHANGELOG as `### Features` or `### Bug Fixes`.
The type `refactor` will also show up as `### Changed Locales` if it has the `locale` scope.
All other types wont show up except for breaking changes marked with the `!` in front of `:`
:::

Allowed types are:

| type     | description                                                               | Shows Up In CHANGELOG                        |
| -------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| feat     | A new feature is introduced                                               | :white_check_mark:                           |
| fix      | A bug was fixed                                                           | :white_check_mark:                           |
| chore    | No user affected code changes were made                                   | :x:                                          |
| refactor | A refactoring that affected also user (e.g. log a deprecation warning)    | :white_check_mark: (with the `locale` scope) |
| docs     | Docs were added or changed                                                | :x:                                          |
| test     | Test were added or changed                                                | :x:                                          |
| ci       | CI were added or changed                                                  | :x:                                          |
| build    | Build scripts were added or changed                                       | :x:                                          |
| infra    | Infrastructure related things were made (e.g. issue-template was updated) | :x:                                          |
| revert   | A revert was triggered via git                                            | :x:                                          |

**scope** is optional and indicates the scope of the PR.

::: tip Note
The scope will be shown in the changelog in front of the _subject_ in bold text.
Commits are sorted alphabetically.
This way, the scope will group commits indirectly into categories.
:::

Allowed scopes are:

| scope           | description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| \<module-name\> | The specific module name that was affected by the PR                         |
| locale          | When only locale(s) are added/updated/removed                                |
| module          | When some modules where updates or something related to modules were changed |
| revert          | When a revert was made via git                                               |
| deps            | Will mostly be used by Renovate                                              |
| release         | Will be set by release process                                               |

::: tip Note
The scope is not checkable via `Semantic Pull Request` action as this would limit the scopes to only existing modules,
but if we add a new module like `color`, then the PR author couldn't use the new module name as scope.
As such, we (the Faker team) must be mindful of valid scopes and we reserve the right to edit titles as we see fit.
:::

**subject** is required and describes what the PR does.

Please note that the PR title should not include a suffix of e.g. `(#123)`.
This will be done automatically by GitHub while merging.

Some examples of valid pull request titles:

```shell
feat: add casing option
feat(locale): extend Hebrew (he)
fix: lower target to support Webpack 4
chore: add naming convention rule
refactor(location): deprecate streetPrefix and streetSuffix
docs: remove unused playground
test: validate @see contents
ci: allow breaking change commits
build: add node v18 support
infra: rework bug-report template
revert: add more arabic names dataset (#362)

# Breaking changes
refactor!: remove faker default export
build!: remove node v12 support

# A release PR will look like this
chore(release): 7.4.0

# Renovate automatically generates these
chore(deps): update devdependencies
chore(deps): update typescript-eslint to ~5.33.0
```

Previous pull request titles that could have been written in a better way:

```diff
- feat: `datatype.hexadecimal` signature change
+ feat(datatype): hexadecimal signature change
  datatype was one of our modules and can be used as scope

- feat(image): add image via.placeholder provider
+ feat(image): add via.placeholder provider
  image was redundant in the subject

- feat(system.networkInterface): add networkInterface faker
+ feat(system): add networkInterface method
  networkInterface was redundant in the scope and made the whole commit message long
  also method in the subject explains a bit better what it is

- chore(bug-report-template): new design
+ infra: rework bug-report template
  the type infra tells that no actual code-changes were made
  the subject contains what the PR does

- chore: rename Gender to Sex
+ refactor(name): rename Gender to Sex
  this was not a chore as it touched runtime code that affected the end-user
  scope name can be used here to tell that the change affects only the name module
```

## Step 7: Address Feedback and Iterate

Faker maintainers may request modifications.
Be open to suggestions and update your PR as needed.

::: info Note
The [Faker Team](/about/team) is made up of volunteers contributing in their free time.
Please understand if you Pull Request is not getting an immediate review.
:::

## Step 8: Celebrate Your Contribution! 🎉

Your changes will generally be merged after:

1. One member of the Faker team has approved your submission and no additional requests have been issued by another team member for 7 days.
1. Two members of the Faker team have approved your submission and no additional requests have been issued by another team member for 24 hours.
1. At least three members of the Faker team have approved your submission.

Afterwards, your changes will be merged into Faker's codebase, helping thousands of developers!
Thank you for contributing. 🚀
