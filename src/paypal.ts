import axios from 'axios';
import { format } from 'date-fns';

const prodApiBase = '';
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

    getApiBase(sandbox = false) {
        if (sandbox) {
            return sandboxApiBase;
        }

        return prodApiBase;
    }

    async getTransactions(startDate: Date, endDate: Date, pageNum = 1) {
        const url = `${this.getApiBase()}/v1/reporting/transactions?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&fields=all&page_size=500&page=${pageNum}`;
        const result = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${this.getAuthToken()}`,
                // 'X-PAYPAL-SECURITY-CONTEXT': JSON.stringify({
                //     version: '1.2',
                //     actor: {
                //         client_id: this.clientId,
                //         id: '35740404',
                //         auth_claims: [this.clientSecret],
                //         auth_state: 'LOGGEDIN',
                //         account_number: '1480460762532829633',
                //         encrypted_account_number: 'JVH3C98SC4E84',
                //         party_id: '1480460762532829633',
                //         user_type: 'API_CALLER',
                //     },
                //     auth_token_type: 'ACCESS_TOKEN',
                //     scopes: [
                //         'https://uri.paypal.com/services/reporting/search/read',
                //     ],
                //     client_id: this.clientId,
                //     // app_id: 'APP-80W284485P519543T',
                //     // claims: {
                //     //     actor_payer_id: 'JVH3C98SC4E84',
                //     //     internal_application: 'false',
                //     // },
                //     subjects: [
                //         {
                //             subject: {
                //                 id: '35762049',
                //                 auth_claims: ['PAYER_ID'],
                //                 auth_state: 'IDENTIFIED',
                //                 account_number: '1256692217768566521',
                //                 encrypted_account_number: 'XZXSPECPDZHZU',
                //                 party_id: '2277051500535724448',
                //                 user_type: 'MERCHANT',
                //             },
                //             features: [],
                //         },
                //     ],
                // }),
            },
        });
        return result;
    }
}

export default PaypalClient;
