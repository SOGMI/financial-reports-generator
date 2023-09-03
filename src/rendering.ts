import type { TransactionSchema } from './schemas';
import { format } from 'date-fns';

interface TableRowInput {
    date?: Date;
    name: string;
    email: string;
    description: string;
    id: string;
    currencyCode: string;
    amountGross?: number;
    amountFees?: number;
    amountNet?: number;
    isBold: boolean;
}

export function getTableRowHtml({
    date,
    name,
    email,
    description,
    id,
    currencyCode,
    amountGross,
    amountFees,
    amountNet,
    isBold,
}: TableRowInput) {
    const fontClass = isBold ? 'font-bold' : 'font-normal';
    const row = `
    <tr class="border-b">
        <th class="p-2 ${fontClass} text-sm">
            ${date ? format(date, 'MM/dd/yyyy') : ''}
        </th>
        <th class="p-2 ${fontClass} text-sm">
            <div>${name}</div>
            <div>${email}</div>
        </th>
        <th class="p-2 ${fontClass} text-sm">
            <div>${description}</div>
            <div>${id.length > 0 ? `ID: ${id}` : ''}</div>
        </th>
        <th class="p-2 ${fontClass} text-sm">
            ${currencyCode}
        </th>
        <th class="p-2 ${fontClass} text-sm">
            <div class="whitespace-nowrap">
                ${
                    typeof amountGross === 'number'
                        ? amountGross.toFixed(2)
                        : ''
                }            
            </div>
        </th>
        <th class="p-2 ${fontClass} text-sm">
            <div class="whitespace-nowrap">
                ${typeof amountFees === 'number' ? amountFees.toFixed(2) : ''}
            </div>
        </th>
        <th class="p-2 ${fontClass} text-sm">
            <div class="whitespace-nowrap">
                ${typeof amountNet === 'number' ? amountNet.toFixed(2) : ''}
            </div>
        </th>
    </tr>`;
    return row;
}

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
    let totalFees = 0;
    let totalNet = 0;
    let totalGross = 0;
    const bodyRows = transactions.map((transaction) => {
        totalFees += transaction.amountFees;
        totalGross += transaction.amountGross;
        totalNet += transaction.amountNet;
        let desc = transaction.description;
        if (!desc) {
            if (transaction.amountGross < 0) {
                desc = 'General Withdrawal';
            } else {
                desc = 'Donation';
            }
        }

        return getTableRowHtml({
            id: transaction.id,
            date: transaction.date,
            name: transaction.customerName ?? '',
            email: transaction.customerEmail ?? '',
            description: desc,
            amountFees: transaction.amountFees,
            amountGross: transaction.amountGross,
            amountNet: transaction.amountNet,
            currencyCode: transaction.currencyCode,
            isBold: false,
        });
    });
    bodyRows.push(
        getTableRowHtml({
            id: '',
            name: '',
            description: '',
            amountNet: totalNet,
            amountFees: totalFees,
            amountGross: totalGross,
            email: '',
            currencyCode: '',
            isBold: true,
        })
    );

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
