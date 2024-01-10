#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'node:path';
import PaypalClient from './paypal';
import { readFile, createWriteStream } from 'fs-extra';
import { EnvironmentSchema } from './schemas';
import SquareClient from './square';
import { getTableHtml } from './rendering';
import htmlToPdf from 'wkhtmltopdf';
import { add, format } from 'date-fns';

dotenv.config();

interface FinancialGeneratorArgs {
    start: Date;
    end: Date;
    output: string;
    sandbox: boolean;
    paypalClientId?: string;
    paypalClientSecret?: string;
    squareAppId?: string;
    squareAccessToken?: string;
}

async function generateReport({
    start,
    end,
    output,
    sandbox,
    paypalClientId,
    paypalClientSecret,
    squareAccessToken,
    squareAppId,
}: FinancialGeneratorArgs) {
    const env = EnvironmentSchema.parse(process.env);
    const paypal = new PaypalClient(
        paypalClientId ?? env.PAYPAL_CLIENT_ID ?? '',
        paypalClientSecret ?? env.PAYPAL_CLIENT_SECRET ?? '',
        sandbox
    );
    const square = new SquareClient(
        squareAppId ?? env.SQUARE_APP_ID ?? '',
        squareAccessToken ?? env.SQUARE_ACCESS_TOKEN ?? '',
        sandbox
    );
    const finalEnd = add(end, { hours: 23, minutes: 59, seconds: 59 });
    const paypalTransactions = await paypal.getTransactions(start, finalEnd);
    const squareTransaction = await square.getTransactions(start, finalEnd);

    const title = `SOGMI Donations Report ${format(
        start,
        'MM/dd/yyyy'
    )}-${format(end, 'MM/dd/yyyy')}`;
    const contentHtml = `
        <h1 class="text-2xl font-bold">
            ${title}
        </h1>
        ${getTableHtml(paypalTransactions, 'Paypal Transactions')}
        ${getTableHtml(squareTransaction, 'Square Transactions')}
    `;
    const htmlTemplate = await readFile(
        path.resolve(__dirname, './assets/template.html'),
        'utf-8'
    );
    const cssContent = await readFile(
        path.resolve(__dirname, './assets/tailwind.generated.css'),
        'utf-8'
    );
    const html = htmlTemplate
        .replace('{{content}}', contentHtml)
        .replace('{{css}}', cssContent)
        .replace('{{title}}', title);

    await new Promise((resolve, reject) => {
        const writeStream = createWriteStream(output);
        htmlToPdf(html, {
            pageSize: 'Letter',
            footerFontSize: 8,
            footerRight: `page [page] of [topage]`,
        }).pipe(writeStream);
        writeStream.on('finish', () => {
            resolve(true);
        });
        writeStream.on('error', (err) => {
            reject(err);
        });
    });
}

export default generateReport;
