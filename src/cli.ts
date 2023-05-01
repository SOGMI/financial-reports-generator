import { program } from 'commander';
import { CliArgsSchema } from './schemas';
import generateReport from './main';

program
    .name('financial-reports-generator')
    .requiredOption('-s, --start <date>', 'The start date')
    .requiredOption('-e, --end <date>', 'The end date')
    .requiredOption('-o, --output <path>', 'output directory')
    .option('--sandbox', 'Whether to connect to the sandbox endpoint or not')
    .option('--paypal-client-id <client-id>')
    .option('--paypal-client-secret <client-secret>')
    .option('--square-app-id <app-id>')
    .option('--square-access-token <access-token>');

program.parse();

const args = CliArgsSchema.parse(program.opts());

void generateReport({
    start: new Date(args.start),
    end: new Date(args.end),
    output: args.output,
    sandbox: args.sandbox,
    paypalClientId: args.paypalClientId,
    paypalClientSecret: args.paypalClientSecret,
    squareAccessToken: args.squareAccessToken,
    squareAppId: args.squareAppId,
});
