<div style="padding:10px; border: 1px solid gray; border-radius: 10px; text-align: center">

**THIS REPO IS STILL A WORK IN PROGRESS**

</div>

# Financial Reports Generator

CLI script to autogenerate financial reports of donations from Square and Paypal with a single command.

## Prerequisites

-   NodeJS (Latest LTS)
-   NPM

## Setup

Setup the following environment variables. You can use a `.env` or just update the environment directly

```txt
PAYPAL_CLIENT_ID = <client-id>
PAYPAL_CLIENT_SECRET = <secret-token>
SQUARE_APP_ID = <app-id>
SQUARE_ACCESS_TOKEN = <access-token>
```

## Usage

```bash
# build the project
npm run build

# run the script
# this will generate reports from square and paypal of all transactions between 2022/01/01 - 2022/02/01
node dist/main --start 2022-01-01 --end 2022-02-01 --output <output-directory-path>
```

### Args

| flag      | alias | type    | description                                                                                                                                                                                                                                                      |
| --------- | ----- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --start   | -s    | string  | The beginning date to grab transactions from                                                                                                                                                                                                                     |
| --end     | -e    | string  | The ending date to grab transactions from                                                                                                                                                                                                                        |
| --output  | -o    | string  | The directory to output the reports to                                                                                                                                                                                                                           |
| --sandbox |       | boolean | Whether to run in sandbox mode or not. When in sandbox mode the CLI will connect to the sandbox endpoints for Square and Paypal instead of the production endpoints. When using this flag make sure to use sandbox credentials instead of production credentials |
