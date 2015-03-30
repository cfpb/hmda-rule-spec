# HMDA Rule Spec

## This project is a work in progress
Nothing presented in the issues or in this repo is a final product unless it is marked as such.

**Description**: The HMDA Rule Spec is a collection of [HMDA Edits](http://www.ffiec.gov/hmda/edits.htm) written in the [brij-spec](http://github.com/linuxbozo/brij-spec) standard. The [HMDA Rule Engine](htps://github.com/cfpb/hmda-rule-engine) interprets these rules to validate a [HMDA data file](http://www.ffiec.gov/hmda/fileformats.htm).

[![Build Status](https://travis-ci.org/cfpb/hmda-rule-spec.svg)](https://travis-ci.org/cfpb/hmda-rule-spec)
[![Coverage Status](https://coveralls.io/repos/cfpb/hmda-rule-spec/badge.svg)](https://coveralls.io/r/cfpb/hmda-rule-spec)

## How to get this running or how to use it

The project requires [NodeJS](http://nodejs.org) and [brij-spec](https://github.com/linuxbozo/brij-spec) to validate the rules are written correctly.

### Installation Steps For Development

- Make sure you have [NodeJS](https://nodejs.org) installed (version 0.10.x), and you can use the `npm` command:
```shell
$ npm version
```
- Install [Grunt](http://gruntjs.com) globally:
```shell
$ npm install -g grunt-cli
```
- Checkout this repository:
```shell
$ git clone https://github.com/cfpb/hmda-rule-engine.git
```
- Go into the created directory:
```shell
$ cd hmda-rule-engine
```
- Then install dependencies from the project root directory:
```shell
$ npm install
```

## Testing

### Spec validation

To validate if a JSON file is BRIJ compliant:
```shell
./node_modules/brij-spec/bin/brij-validate -f <path to JSON file>
```

### Unit Tests

To run the unit tests, use the grunt task:
```shell
$ grunt test
```

When complete, you will see the results of the tests (pass/fail) as well as a text summary of the code coverage if there are no failures:
```
  7 passing (9ms)

...

=============================== Coverage summary ===============================
Statements   : 95.77% ( 883/922 )
Branches     : 89.6% ( 379/423 )
Functions    : 96.02% ( 217/226 )
Lines        : 95.77% ( 883/922 )
================================================================================
```

You can view the full details of this coverage in a drill-down enabled report by opening `coverage/lcov-report/index.html` in your browser.

If you are on a Mac, you can use a grunt task to run the tests and automatically open the coverage report in your browser:
```shell
$ grunt coverage
```
## Interface Documentation

Documentation of this project is maintained inline with the source code using [JSDoc](http://usejsdoc.org/) style code comments.

To generate the documentation, run the grunt task:
```shell
$ grunt generate-docs
```

You can now open `./docs/index.html` in your browser to view the documentation.

If you are on a Mac, you can use a grunt task to generate the documentation and automatically open them in your browser:
```shell
$ grunt view-docs
```

## Getting involved

For details on how to get involved, please first read our [CONTRIBUTING](CONTRIBUTING.md) guidelines.
This project follows an adapted pull request [workflow](https://github.com/cfpb/hmda-pilot/wiki/GitHub-workflow) on top of GitHub, please consult the details before adding features to the project.

----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
