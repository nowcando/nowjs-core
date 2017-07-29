
import { IProvider } from "../../core/index";
import { ISmsMessageStatus, SmsMessageID } from "../index";
import { ISmsMessage } from "./ISmsMessage";

export interface ISmsClientAccountInfo {
    CreditAmount?: number;
    CurrencyType?: string;
    ExpiresAt?: Date;
    Type?: string;
}

export interface ISmsClientAccountOptions {
    Address?: string;
    Token?: string;
    Username?: string;
    Password?: string;
}

export interface ISmsClientOptions {
    ProviderName?: string;
    Account?: ISmsClientAccountOptions;
}

export interface ISmsClientBaseProvider<TMessage extends ISmsMessage, TMessageStatus extends ISmsMessageStatus>
 extends IProvider {
    send(message: TMessage, options?: ISmsClientOptions): Promise<TMessageStatus[]>;
    inquery(messageid: SmsMessageID, options?: ISmsClientOptions): Promise<TMessageStatus[]>;
    inqueryByInternalID(internalid: SmsMessageID, options?: ISmsClientOptions): Promise<TMessageStatus[]>;
    accountInfo(options?: ISmsClientOptions): Promise<ISmsClientAccountInfo>;
}
