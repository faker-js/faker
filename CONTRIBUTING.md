A lot of effort has been put into `Faker` to create a useful and handy
library. There are still a lot of things to be done, so all contributions are welcome! If you can make `Faker` better, please read the following contribution guide.

# Important

- Please make sure that you run both `gulp` and tests before making a PR.

## Support

`Faker` relies on [commonJS](http://www.commonjs.org/) standard and supports both node.js and the browsers. Keep this in mind, when modifying and/or extending the sources.

## Automation

- The project is being built by [gulp](http://gulpjs.com/) (see [gulpfile](build/gulpfile.js)), destination directory is [build/build](build/build)
- The documentation is auto-generated, based on [build/src](build/src) markdown sources. If you modify the main [Readme.md](Readme.md) file, the Pull Request will be rejected, since it will be overwritten by the upcoming `gulp` execution
- The tests are executing `mocha` against all js contents of [test](test) directory

## Architecture

The sources are located in the [lib](lib) directory. All fake data generators are
divided into namespaces (each namespace being a separate module). Most of the
generators use the _definitions_, which are just plain JavaScript
objects/arrays/strings that are separate for each [locale](lib/locales).

## Remote Development

### Why?

Remote Development allow the contributors to leverage docker and have a standard development environment. With it, the maintainers of this repo can setup a default configuration and create a complete environment to build/run/test/debug for anyone who wants to step right into the developing part.

### Remote Development in VS Code

#### Prerequisites

Install [Docker](https://www.docker.com/get-started)  
Make sure to have VS Code and [Microsoft's Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) installed. Or simply install the recommended extensions in the project's `.vscode/extensions.json` file.

#### Starting up the container

With the dependecies installed, run the **Remote-Containers: Open Folder in Container...** command from the Command Palette (F1 o Ctrl+Shift+P) and open this project's root directory. VS code should detect the `.devcontainer/devcontainer.json` file automatically and start a new docker container ready to run this project.

![image](https://user-images.githubusercontent.com/25828351/149049596-42c2ee8e-74f4-4887-a483-f1ea72dbe649.png)

The container is configured with the latest node-16 alpine image and will install all node dependencies on the first run. After that quick setup you'll will be able to contribute/run/test/build/debug this project directly from the container without ever installing node in your machine.

If you want to know more about VS Code Remote Development make sure to visit their [documentation](https://code.visualstudio.com/docs/remote/remote-overview)
