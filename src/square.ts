import { Client, Environment } from 'square';
import type { TransactionSchema } from './schemas';

class SquareClient {
    square: Client;

    constructor(appId: string, accessToken: string, sandbox = false) {
        this.square = new Client({
            accessToken,
            environment: sandbox ? Environment.Sandbox : Environment.Production,
        });
    }

    async getTransactions(startDate: Date, endDate: Date) {
        const result = await this.square.paymentsApi.listPayments(
            startDate.toISOString(),
            endDate.toISOString(),
            'ASC'
        );
        const transactionMap: Record<string, TransactionSchema> = {};
        const tasks: Array<Promise<any>> = [];
        for (const item of result.result.payments ?? []) {
            // eslint-disable-next-line complexity
            const getTransaction = async () => {
                const gross = Number(item.amountMoney?.amount ?? 0) / 100;
                let fees = 0;
                for (const blah of item.processingFee ?? []) {
                    fees += Number(blah.amountMoney?.amount ?? 0);
                }

                fees /= 100;

                const transaction: TransactionSchema = {
                    id: item.id ?? '',
                    amountGross: gross,
                    amountFees: fees,
                    amountNet: gross - fees,
                    currencyCode:
                        item.amountMoney?.currency ??
                        item.totalMoney?.currency ??
                        'USD',
                    date: new Date(item.createdAt ?? ''),
                    description: '',
                    customerName:
                        item.cardDetails?.card?.cardholderName ?? null,
                    customerEmail: null,
                };
                if (item.orderId) {
                    const order = await this.square.ordersApi
                        .retrieveOrder(item.orderId)
                        .catch((_) => null);
                    if (order) {
                        let note = '';
                        for (const lineItem of order.result.order?.lineItems ??
                            []) {
                            if (!note && lineItem.note) {
                                note += lineItem.note;
                            } else if (lineItem.note) {
                                note += ` ${lineItem.note}`;
                            }
                        }

                        if (note) {
                            transaction.description = note.trim();
                        }
                    }
                }

                if (item.customerId) {
                    const customerResponse = await this.square.customersApi
                        .retrieveCustomer(item.customerId)
                        .catch((_) => null);

                    if (customerResponse?.result.customer?.id) {
                        const { customer } = customerResponse.result;
                        const {
                            familyName,
                            givenName,
                            emailAddress,
                            companyName,
                        } = customer;
                        let name = '';

                        if (givenName && familyName) {
                            name = `${givenName} ${familyName}`;
                        } else if (familyName) {
                            name = familyName;
                        } else if (givenName) {
                            name = givenName;
                        }

                        if (companyName) {
                            name += ` (${companyName})`;
                        }

                        if (name) {
                            transaction.customerName = name;
                        }

                        transaction.customerEmail = emailAddress ?? null;
                    }
                }

                return transaction;
            };

            tasks.push(
                getTransaction().then((t) => {
                    transactionMap[t.id] = t;
                })
            );
        }

        await Promise.all(tasks);

        const items =
            result.result.payments?.map((payment) => {
                const t = transactionMap[payment.id ?? ''];
                return t;
            }) ?? [];

        return items;
    }
}

export default SquareClient;
