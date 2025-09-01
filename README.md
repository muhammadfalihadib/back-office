# BackOffice

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Setup Environment

1. Install NVM (Node Version Manager) [here](https://github.com/coreybutler/nvm-windows/releases)
  Ctrl+F 'nvm-setup.exe', download the .exe file

2. Install Node version 18.20.4 || ^18.19.1 || ^20.11.1 || ^22.0.0
  ```bash
  nvm install 18.20.4
  ```
3. Use Node version 18.20.4 || ^18.19.1 || ^20.11.1 || ^22.0.0
  ```bash
  nvm use 18.20.4
  ```
4. Install Angular version 19.2.1
  ```bash
  npm i -g angular/cli@19.2.1
  ```
## Installation 

1. Clone repository 
  ```bash
  git clone https://github.com/muhammadfalihadib/back-office.git
  ```
2. Navigate to project directory
  ```bash
  cd back-office
  ```
3. Install dependencies
  ```bash
  npm install
```

## Mock API Setup (JSON Server)

Start JSON Server (run this **before** starting the Angular development server)

```bash
json-server --watch employee.json --port 3000
```
This will start a mock REST API at http://localhost:3000 with the following endpoints:

- ```GET``` http://localhost:3000/employees - Get all employees
- ```GET``` http://localhost:3000/employees/1 - Get employee by ID
- ```POST``` http://localhost:3000/employees - Create new employee
- ```PUT``` http://localhost:3000/employees/1 - Update employee by ID
- ```DELETE``` http://localhost:3000/employees/1 - Delete employee by ID
- ```GET``` http://localhost:3000/employees?username=John - Search employees


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
