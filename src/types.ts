import {LedgerDevice} from "@xmr-core/xmr-crypto-utils";

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;


export interface ExtendedLedgerDevice {
    dev: LedgerDevice<any>;
    address: string;
    privateViewKey: string;
    spend_public_key: string;
    spendKey: string;
}