// These types were generated from https://transform.tools/json-to-typescript using the paypal documentation

export interface TransactionApiResponse {
    transaction_details: TransactionDetail[];
    account_number: string;
    last_refreshed_datetime: string;
    page: number;
    total_items: number;
    total_pages: number;
    links: Link[];
}

export interface TransactionDetail {
    transaction_info: TransactionInfo;
    payer_info: PayerInfo;
    shipping_info: ShippingInfo;
    cart_info: CartInfo;
    store_info: StoreInfo;
    auction_info: AuctionInfo;
    incentive_info: IncentiveInfo;
}

export interface TransactionInfo {
    paypal_account_id: string;
    transaction_id: string;
    transaction_event_code: string;
    transaction_initiation_date: string;
    transaction_updated_date: string;
    transaction_amount: TransactionAmount;
    fee_amount: FeeAmount;
    insurance_amount: InsuranceAmount;
    shipping_amount: ShippingAmount;
    shipping_discount_amount: ShippingDiscountAmount;
    transaction_status: string;
    transaction_subject: string;
    transaction_note: string;
    invoice_id: string;
    custom_field: string;
    protection_eligibility: string;
}

export interface TransactionAmount {
    currency_code: string;
    value: string;
}

export interface FeeAmount {
    currency_code: string;
    value: string;
}

export interface InsuranceAmount {
    currency_code: string;
    value: string;
}

export interface ShippingAmount {
    currency_code: string;
    value: string;
}

export interface ShippingDiscountAmount {
    currency_code: string;
    value: string;
}

export interface PayerInfo {
    account_id: string;
    email_address: string;
    address_status: string;
    payer_status: string;
    payer_name: PayerName;
    country_code: string;
}

export interface PayerName {
    given_name: string;
    surname: string;
    alternate_full_name: string;
}

export interface ShippingInfo {
    name: string;
    address: Address;
}

export interface Address {
    line1: string;
    line2: string;
    city: string;
    country_code: string;
    postal_code: string;
}

export interface CartInfo {
    item_details: ItemDetail[];
}

export interface ItemDetail {
    item_code?: string;
    item_name: string;
    item_description?: string;
    item_quantity: string;
    item_unit_price: ItemUnitPrice;
    item_amount: ItemAmount;
    tax_amounts?: TaxAmount[];
    total_item_amount: TotalItemAmount;
    invoice_number: string;
}

export interface ItemUnitPrice {
    currency_code: string;
    value: string;
}

export interface ItemAmount {
    currency_code: string;
    value: string;
}

export interface TaxAmount {
    tax_amount: TaxAmount2;
}

export interface TaxAmount2 {
    currency_code: string;
    value: string;
}

export interface TotalItemAmount {
    currency_code: string;
    value: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreInfo {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuctionInfo {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IncentiveInfo {}

export interface Link {
    href: string;
    rel: string;
    method: string;
}
