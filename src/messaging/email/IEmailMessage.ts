
import { ReadStream } from "fs";

export interface IEmailAttachmentType {
    FileName?: string; Raw?: string; ContentID?: string;
    FilePath?: string; Content?: string|Buffer|NodeJS.ReadableStream;
    ContentType?: string; Encoding?: string;
}

export interface IEmailMessage {
    Subject: string;
    From: string;
    Sender?: string;
    To: string|string[];
    Cc?: string|string[];
    Bcc?: string|string[];
    Text?: string;
    Html?: string|Buffer|NodeJS.ReadableStream|IEmailAttachmentType;
    Attachments?: IEmailAttachmentType[];
    Refrences?: string[];
    Headers?: any;
    ReplyTo?: string;
    InReplyTo?: string;
    MessageID?: string;
    Date?: Date;

}

export interface IEmailMessageStatus {
    MessageID: number | string;
    Response: string;
    Accepted: string[];
    Rejected: string[];
    Pending: string[];
}
