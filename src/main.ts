import { z } from 'zod';
import dotenv from 'dotenv';
import PaypalClient from './paypal';

dotenv.config();

const EnvironmentSchema = z.object({
    PAYPAL_CLIENT_ID: z.string().optional(),
    PAYPAL_CLIENT_SECRET: z.string().optional(),
});

type EnvironmentSchema = z.infer<typeof EnvironmentSchema>;

function getEnv(): EnvironmentSchema {
    return EnvironmentSchema.parse(process.env);
}

async function main() {
    const env = getEnv();
    const paypal = new PaypalClient(
        env.PAYPAL_CLIENT_ID ?? '',
        env.PAYPAL_CLIENT_SECRET ?? ''
    );
    console.info(
        await paypal.getTransactions(
            new Date('2023-01-01'),
            new Date('2023-01-02')
        )
    );
    // TODO
}

void main();
