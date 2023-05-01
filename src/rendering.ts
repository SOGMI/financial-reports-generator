import type { TransactionSchema } from './schemas';
import { format } from 'date-fns';

export function getTableHtml(transactions: TransactionSchema[], title: string) {
    const headerHtml = `
    <thead>
        <tr class="border-b">
            <th class="p-2">Date</th>
            <th class="p-2">Name</th>
            <th class="p-2">Description</th>
            <th class="p-2">Currency</th>
            <th class="p-2">Gross</th>
            <th class="p-2">Fees</th>
            <th class="p-2">Net</th>
        </tr>
    </thead>
    `;
    const bodyRows = transactions.map((transaction) => {
        let desc = transaction.description;
        if (!desc) {
            if (transaction.amountGross < 0) {
                desc = 'General Withdrawal';
            } else {
                desc = 'Donation';
            }
        }

        const row = `
         <tr class="border-b">
            <th class="p-2 font-normal text-sm">${format(
                transaction.date,
                'MM/dd/yyyy'
            )}</th>
            <th class="p-2 font-normal text-sm">
                <div>${transaction.customerName ?? ''}</div>
                <div>${transaction.customerEmail ?? ''}</div>
            </th>
            <th class="p-2 font-normal text-sm">
                <div>${desc}</div>
                <div>ID: ${transaction.id}</div>
            </th>
            <th class="p-2 font-normal text-sm">${transaction.currencyCode}</th>
            <th class="p-2 font-normal text-sm">${transaction.amountGross.toFixed(
                2
            )}</th>
            <th class="p-2 font-normal text-sm">${transaction.amountFees.toFixed(
                2
            )}</th>
            <th class="p-2 font-normal text-sm">${transaction.amountNet.toFixed(
                2
            )}</th>
        </tr>`;

        return row;
    });

    const html = `
    <div class="my-10">
        <h2 class="text-lg font-bold mb-4">${title}</h2>
        <table class="text-left table-auto w-full border">
            ${headerHtml}
            <tbody>
                ${bodyRows.join('\n')}
            </tbody>
        </table>
    </div>
    `;

    return html;
}
