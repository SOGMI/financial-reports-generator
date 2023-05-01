# Financial Reports Generator

Tool to autogenerate financial reports of donations from Square and Paypal.

## Prerequisites

-   [NodeJS (Latest LTS)](https://nodejs.org/en)
-   NPM
-   [wkhtmltopdf](https://wkhtmltopdf.org/)

## Setup

By default this tool will look for the following environment variables. You can use a `.env` or just update the environment directly.

```txt
PAYPAL_CLIENT_ID = <client-id>
PAYPAL_CLIENT_SECRET = <secret-token>
SQUARE_APP_ID = <app-id>
SQUARE_ACCESS_TOKEN = <access-token>
```

You can alternatively specify these values ares function or command line arguments as detailed below

## Usage

### CLI Usage

```bash
# install
npm i -g @sogmi/financial-reports-generator

# run the command
sogmi-financial-reports-generator --start 06-01-2020 --end 06-30-2020 --output my-report.pdf
```

### Javascript Usage

```ts
import generateReport from '@sogmi/financial-reports-generator';

generateReport({
    start: new Date('06-01-2020'),
    end: new Date('06-30-2020'),
    output: 'my-report.pdf',
});
```

### Args

| flag                   | alias | type    | description                                                                                                                                                                                                                                                      |
| ---------------------- | ----- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --start                | -s    | string  | The beginning date to grab transactions from                                                                                                                                                                                                                     |
| --end                  | -e    | string  | The ending date to grab transactions from                                                                                                                                                                                                                        |
| --output               | -o    | string  | The directory to output the reports to                                                                                                                                                                                                                           |
| --sandbox              |       | boolean | Whether to run in sandbox mode or not. When in sandbox mode the CLI will connect to the sandbox endpoints for Square and Paypal instead of the production endpoints. When using this flag make sure to use sandbox credentials instead of production credentials |
| --paypal-client-id     |       | string  | (optional) Looks for PAYPAL_CLIENT_ID environment variable by default                                                                                                                                                                                            |
| --paypal-client-secret |       | string  | (optional) Looks for PAYPAL_CLIENT_SECRET environment variable by default                                                                                                                                                                                        |
| --square-app-id        |       | string  | (optional) Looks for SQUARE_APP_ID environment variable by default                                                                                                                                                                                               |
| --square-access-token  |       | string  | (optional) Looks for SQUARE_ACCESS_TOKEN environment variable by default                                                                                                                                                                                         |
