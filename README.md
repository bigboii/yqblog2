# Yqblog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Prerequisite
1. Install NodeJs
2. Run `npm install` to install dependencies

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running Application Locally
Run `node server` to run dev server locally. Navigate to `http://localhost:3000`. 

## Build
Run:
    - `ng build --configuration=dev` for local build; intended for development and testing.
    - `ng build --configuration=production` for a production build; intended for deployment

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Creating new components
Use below syntax to create a component to a specific module:
    `ng g c ./modules/some/some-random-component --module=./modules/some/some-module.ts`

The above example will create a new component, "some-random-component" under the module "some-module.ts"

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).