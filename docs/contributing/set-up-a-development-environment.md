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
   git clone https://github.com/<Your_GitHub_Username>/faker.git
   ```
1. Navigate into the cloned directory:
   ```sh
   cd faker
   ```
1. Add the upstream source to keep your fork updated:
   ```sh
   git remote add upstream https://github.com/faker-js/faker.git
   git fetch upstream
   ```

## Step 2: Choose Your Development Setup

Faker can be developed using two different methods:

- [On your machine](#option-1-native-nodejs-environment)
- [In a development container](#option-2-vscode-devcontainer-integration)

### Option 1: Native Node.js Environment

If you prefer working directly on your machine, follow these steps:

1. Ensure you have [the current LTS version of Node.js](https://nodejs.org/en/download) installed.
1. Ensure you have the package manager [`pnpm`](https://pnpm.io/installation) installed. Check the `packageManager` field in `package.json` for the required version of pnpm.
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

## Step 3: Verify Your Changes Locally

You can check a single Faker method without running the full test suite or building the package first.

Create a temporary TypeScript file at `.local/try-faker.ts`:

```ts
import { faker } from '../src/index.ts';

faker.seed(123);
console.log(faker.person.fullName());
```

Run it directly against the source:

```sh
pnpm tsx .local/try-faker.ts
```

The `.local/` directory is gitignored and preserved by `pnpm run clean`, so you can keep experiments there without adding them to your pull request.

To run just the tests for the module you're changing, use Vitest with the relevant test file:

```sh
pnpm vitest run test/modules/person.spec.ts
```

For browser-based checks, `pnpm run docs:dev` builds and starts the documentation site, where you can try Faker in the browser console.

Before submitting your changes, run `pnpm run preflight` to run the full verification workflow.

## Step 4: Submit a Pull Request

Your development environment has successfully been set up.
You are now ready to [Submit a Pull Request](./submit-a-pull-request.md).
