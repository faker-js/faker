---
outline: [2, 3]
---

# Set Up a Development Environment

Setting up a local development environment for Faker allows you to contribute effectively to the project.
Whether you prefer working directly on your machine or using a containerized setup, the following steps will guide you through the process.

## Step 1: Fork and Clone the Repository

Before you begin, you need to fork the Faker repository and clone it to your local machine.

::: tip Note
If you are unfamiliar with Forks, check out [GitHub Forking Guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
:::

1. Go to the [Faker GitHub repository](https://github.com/faker-js/faker) and click the **Fork** button.
1. Open a terminal and clone your fork:
   ```sh
   git clone https://github.com/<Your_GitHub_Username>/faker
   ```
1. Navigate into the cloned directory:
   ```sh
   cd faker
   ```
1. Add the upstream source to keep your fork updated:
   ```sh
   git remote add upstream https://github.com/faker-js/faker.git
   ```

## Step 2: Choose Your Development Setup

Faker can be developed using two different methods:

- [On your machine](#option-1-native-nodejs-environment)
- [In a development container](#option-2-vscode-devcontainer-integration)

### Option 1: Native Node.js Environment

If you prefer working directly on your machine, follow these steps:

1. Ensure you have [the current LTS version of Node.js](https://nodejs.org/en/download) installed.
1. Ensure you have the package manager [`pnpm`](https://pnpm.io/installation) installed.
1. Run the preflight command to verify your setup:
   ```sh
   pnpm run preflight
   ```

### Option 2: VSCode Devcontainer Integration

For a streamlined development experience, Faker supports VSCode Devcontainers.

1. Open the Faker repository in VSCode.
1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) if you haven't already.
1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and select "**Dev Containers: Reopen in Container**".
1. Wait for the container to build and start.

## Step 3: Keeping Your Fork Updated

To stay in sync with the latest changes from Faker you need to update your fork every now and then:

```sh
git fetch upstream
git merge upstream/next origin/next
```

## Step 4: Before Submitting a Pull Request

Before submitting contributions, ensure that your changes adhere to Faker's coding standards.
To do that run the `preflight` command.

```sh
pnpm run preflight
```

The `preflight` command is a useful all-in-one command provided by the Faker team, to make development as easy as possible.
It is a shorthand for running the following scripts in order:

- `pnpm install` - installs npm packages defined in package.json
- `pnpm run generate:locales` - generates locale files
- `pnpm run generate:api-docs` - generates API documentation
- `pnpm run format` - runs [prettier](https://github.com/prettier/prettier) to format code
- `pnpm run lint` - runs [ESLint](https://github.com/eslint/eslint) to enforce project code standards
- `pnpm run build:clean` - removes artifacts from previous builds
- `pnpm run build:code` - builds the code, both CommonJS and ESM versions
- `pnpm run test:update-snapshots` - runs all tests with [vitest](https://github.com/vitest-dev/vitest), and updates any snapshots if needed
- `pnpm run ts-check` - checks that there are no TypeScript errors in any files
