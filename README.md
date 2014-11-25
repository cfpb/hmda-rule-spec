# HMDA Rule Spec

## This project is a work in progress
Nothing presented in the issues or in this repo is a final product unless it is marked as such.

**Description**: The HMDA Rule Spec is a collection of [HMDA Edits](http://www.ffiec.gov/hmda/edits.htm) written in the [brij-spec](http://github.com/linuxbozo/brij-spec) standard. The [HMDA Rule Engine](htps://github.com/cfpb/hmda-rule-engine) interprets these rules to validate a [HMDA data file](http://www.ffiec.gov/hmda/fileformats.htm).

## How to get this running or how to use it

The project requires [NodeJS](http://nodejs.org) and [brij-spec](https://github.com/linuxbozo/brij-spec) to validate the rules are written correctly.

Once you have NodeJS installed, use it to install brij-spec.

Install dependencies from the project root directory:
```shell
npm install
```

To validate if a JSON file is BRIJ compliant:
```shell
./node_modules/brij-spec/bin/brij-validate -f <path to JSON file>
```

## Getting involved

For details on how to get involved, please first read our [CONTRIBUTING](CONTRIBUTING.md) guidelines.
This project follows an adapted pull request [workflow](https://github.com/cfpb/hmda-pilot/wiki/GitHub-workflow) on top of GitHub, please consult the details before adding features to the project.

----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
