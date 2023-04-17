import dotenv from 'dotenv';
import PaypalClient from './paypal';
import { program } from 'commander';
import { CliArgsSchema, EnvironmentSchema } from './schemas';
import type { AxiosError } from 'axios';
import SquareClient from './square';

dotenv.config();

program
    .name('financial-reports-generator')
    .requiredOption('-s, --start <date>', 'The start date')
    .requiredOption('-e, --end <date>', 'The end date')
    .requiredOption('-o, --output <path>', 'output directory')
    .option('--sandbox', 'Whether to connect to the sandbox endpoint or not');

program.parse();

async function main() {
    const env = EnvironmentSchema.parse(process.env);
    const args = CliArgsSchema.parse(program.opts());
    console.log(args);
    const paypal = new PaypalClient(
        env.PAYPAL_CLIENT_ID ?? '',
        env.PAYPAL_CLIENT_SECRET ?? '',
        args.sandbox
    );
    const square = new SquareClient(
        env.SQUARE_APP_ID ?? '',
        env.SQUARE_ACCESS_TOKEN ?? '',
        args.sandbox
    );
    // try {
    //     const transactions = await paypal.getTransactions(
    //         new Date(args.start),
    //         new Date(args.end)
    //     );
    //     console.log(transactions);
    // } catch (err) {
    //     console.error((err as AxiosError).status);
    //     console.error((err as AxiosError).toJSON());
    // }

    console.log(
        await square.getTransactions(new Date(args.start), new Date(args.end))
    );
}

void main();
