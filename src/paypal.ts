import axios from 'axios';
import type { TransactionSchema } from './schemas';
import type { TransactionApiResponse } from './paypalTypes';

const prodApiBase = 'https://api.paypal.com';
const sandboxApiBase = 'https://api-m.sandbox.paypal.com';

class PaypalClient {
    readonly isSandbox: boolean;

    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor(
        paypalClientId: string,
        paypalClientSecret: string,
        sandbox = false
    ) {
        if (!paypalClientId || !paypalClientSecret) {
            throw new Error('ClientID and Client Secret are required');
        }

        this.clientId = paypalClientId;
        this.clientSecret = paypalClientSecret;
        this.isSandbox = sandbox;
    }

    getAuthToken() {
        const data = `${this.clientId}:${this.clientSecret}`;
        const buffer = Buffer.from(data);
        return buffer.toString('base64');
    }

    getApiBase() {
        if (this.isSandbox) {
            return sandboxApiBase;
        }

        return prodApiBase;
    }

    async getTransactions(
        startDate: Date,
        endDate: Date,
        pageNum = 1
    ): Promise<TransactionSchema[]> {
        const url = `${this.getApiBase()}/v1/reporting/transactions?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&fields=all&page_size=500&page=${pageNum}`;
        const result = await axios.get<TransactionApiResponse>(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${this.getAuthToken()}`,
            },
        });
        const items: TransactionSchema[] = [];
        for (const item of result.data.transaction_details ?? []) {
            const gross = Number(
                item.transaction_info.transaction_amount?.value ?? '0'
            );
            const fees = Number(item.transaction_info.fee_amount?.value ?? '0');
            let payerName = '';
            const { given_name, alternate_full_name, surname } =
                item.payer_info.payer_name;
            if (surname && given_name) {
                payerName = `${given_name} ${surname}`;
            } else if (alternate_full_name) {
                payerName = alternate_full_name;
            } else if (surname) {
                payerName = surname;
            } else if (given_name) {
                payerName = given_name;
            }

            items.push({
                id: item.transaction_info.transaction_id,
                amountGross: Number.isNaN(gross) ? 0 : gross,
                amountFees: Number.isNaN(fees) ? 0 : fees,
                amountNet:
                    Number.isNaN(gross) || Number.isNaN(fees)
                        ? 0
                        : gross - fees,
                currencyCode:
                    item.transaction_info.transaction_amount.currency_code,
                date: new Date(
                    item.transaction_info.transaction_initiation_date
                ),
                description: '',
                customerName: payerName,
                customerEmail: null,
            });
        }

        return items;
    }
}

export default PaypalClient;
