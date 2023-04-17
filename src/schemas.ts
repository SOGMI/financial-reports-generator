import { z } from 'zod';

export const EnvironmentSchema = z.object({
    PAYPAL_CLIENT_ID: z.string().optional(),
    PAYPAL_CLIENT_SECRET: z.string().optional(),
    SQUARE_APP_ID: z.string().optional(),
    SQUARE_ACCESS_TOKEN: z.string().optional(),
});

export type EnvironmentSchema = z.infer<typeof EnvironmentSchema>;

export function getEnv(): EnvironmentSchema {
    return EnvironmentSchema.parse(process.env);
}

export const CliArgsSchema = z.object({
    start: z.string(),
    end: z.string(),
    output: z.string(),
    sandbox: z.boolean().default(false),
});

export type CliArgsSchema = z.infer<typeof CliArgsSchema>;

export const TransactionSchema = z.object({
    id: z.string(),
    amountGross: z.number(),
    amountFees: z.number(),
    amountNet: z.number(),
    currencyCode: z.string(),
    date: z.date(),
    description: z.string(),
    customerName: z.string().nullable(),
    customerEmail: z.string().nullable(),
});

export type TransactionSchema = z.infer<typeof TransactionSchema>;
