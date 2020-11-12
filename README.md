[![Build Status](https://travis-ci.org/Flowkap/typescript-node-template.svg?branch=main)](https://travis-ci.org/Flowkap/typescript-node-template)

# Content
<!-- TOC -->

- [Content](#content)
- [About](#about)
- [Features](#features)
  - [Linting and code quality settings](#linting-and-code-quality-settings)
  - [Tests](#tests)
    - [Coverage](#coverage)
    - [Debugging tests](#debugging-tests)
  - [Build and execution](#build-and-execution)
    - [Running and debugging the app itself](#running-and-debugging-the-app-itself)
    - [Docker](#docker)
  - [Misc](#misc)
- [Disclaimer](#disclaimer)

<!-- /TOC -->

# About

Whilst working with typescript for a while now I found that most examples on the web are still for node.js with plain JavaScript. Especially when it comes to a full template example with **latest** versions of used tools like `eslint` instead of still using deprected `tslint` and so on. So I thought it might be a good idea to make an up-to-date service boilerplate including:

* **NO** dependencies like `grunt` or `gulp` needed. Of course they're usefull for bigger projects but usually it's really bloating dependencies.
* Mocha + chai + nyc for proper code coverage on tests
* tslint + sonarts + proper tsconfig (es2020) based upon nodejs LTS 14.x **without* opinionated formatters like `prettier` whilst still having most features covered that are not opnionated and make clean git histories
* Out of the box VsCode config for debugging app + tests no matter where with proper sourcemaps
* Multi stage docker build
* All type infos needed as well

I will probably extend to show off:

* Fastify with native async await in Typescript
* Sinon for mocking / stubbing

The biggest challenge was trying to make code coverage work without ts-node which unfortunately wasn't really possible. It kindof worked but did not track any files that were not called in any test counteracting the purpose of finding uncovered code. So this template uses ts-node for all test execution and a transpiled build (no ts-node hence for "prod") to run the app.

I probably added way more docs and references than needed but maybe it will help someone new to the topic at some point in the future! :)

# Features

## Linting and code quality settings

Generally:

* Linting uses eslint with no legacy settings
* Also incorporates sonarts for style checks
* No prettier needed (I really don't like its opinionated settings)

Files defining all rules:
* [tsconfig.json](./tsconfig.json)
* [.eslintrc.js](./.eslintrc.js)

Key rules apply:
* Eslint + sonarts recommended as base
* No unused variables also enforced on tsc as proposed since wuite som time by linters
* Only double quotes for regular strings (template strings supported of course). I don't like the PHP heritage of node.js single quotes ;)
* Braces enforced except one liners
* Trailing comma enforced (clean git history)
* No trailing spaces (clean git history)
* Semicolon required (to avoid unintended implicit semi issues)
* Consistent indent (4 spaces for me, I got big monitors)

## Tests
Regular test execution:

```
npm i
npm test
```

* Uses mocha + chai
* Tests can be put anywhere in `src` if you name the files `*.test.ts`
* Theres also a `test` directory which you can use for any kind of integration tests or whatever you desire. All files in hee are incorporated no matter the name.

### Coverage
Defined in [.nycrc.yml](./.nycrc.yml) + additional call arguments for mocha in [package.json](./package.json) specifcally `--require ts-node/register  --require source-map-support/register --recursive`.

* Uses nyc + mocha + ts-node
  * I made it technically work without ts-node but it will never cover uncalled files which counters the purpose)
* From what I can tell coverage was accurate (I followed many many many posts on stackoverflow and on nyc for checking all options). The now applied once are result of many bugs (they updated docs) and I had no issues anymore.

### Debugging tests
Defined in [launch.json](./.vscode/launch.json)

* Test execution use ts-node
* Test debugging preconfigured for VsCode
  * All tests (Mocha all)
  * Current file (works on all files no matter where on the tree as long as thers mocha tests in it)

## Build and execution
Defined [package.json](./package.json)

```
npm i
npm start
```

* The build is out of source and only for actual sources
* Not using ts-node (actually transpile with tsc)
* Sources are put into `build`
* Clean build everytime

### Running and debugging the app itself
Defined in [launch.json](./.vscode/launch.json)

* Always uses the transpiled source in build
* Ready VsCode configuration as well
* Sourcemaps of course configured and working

### Docker
Defined in [Dockerfile](./Dockerfile)

```
npm i
npm run docker
```

* Multi stage docker build
* Does run all linting + tests + build
* Uses the transpiled source

## Misc

Theres some more useful commands you can use:

```
# just linting
npm run lint

# clean generated stuff
npm run clean

# clean all including node_modules etc
npm run purge
```

# Disclaimer

This is a part time hobby project. Feel free to use / expand and create PR's extend docs / examples whatever.
