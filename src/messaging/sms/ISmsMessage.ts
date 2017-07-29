
export enum SmsClientSendMethod {
    OneToOne = 1, OneToMany = 2, ManyToMany = 3,
    SendTextLookup = 4, SendVoiceLookup = 5,
}

export enum SmsInqueryStatus {
    Queued = 1, Schechuled= 2,
    SendToGateway= 4, Failed= 6,
    Delivered= 10, Undelivered= 11,
    UserCanceled= 13, ReceptorBlocked= 14,
    MessageIDNotValid= 100, InqueryFailed= 110,
}

export type SmsMessageID = string;

export interface ISmsMessage {
    BatchID?: number;
    InternalID?: SmsMessageID | SmsMessageID[];
    Method: SmsClientSendMethod;
    Sender?: string|string[];
    Receptor: string|string[];
    Text?: string|string[];
    SendAt?: Date ;
    TemplateName?: string;
    Params?: any;
}

export interface ISmsMessageStatus {
     MessageID: SmsMessageID;
     InternalID?: SmsMessageID;
     Text?: string;
     Status: SmsInqueryStatus;
     StatusMessage?: string;
     Sender?: string;
     Receptor?: string;
     SentOn?: Date;
     CostAmount?: number;
     CurrencyType?: string;
}
