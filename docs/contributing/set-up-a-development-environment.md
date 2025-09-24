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

## Step 3: Submit a Pull Request

Your development environment has successfully been set up.
You are now ready to [Submit a Pull Request](./submit-a-pull-request.md).
