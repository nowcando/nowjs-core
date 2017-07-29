
import { IProvider } from "../../core/index";

export interface INotificationMessage {
    Message: any;
}

// tslint:disable-next-line:no-empty-interface
export interface INotificationOptions {

}

// tslint:disable-next-line:no-empty-interface
export interface INotificationMessageStatus {

}

export interface INotificationBaseProvider<TMessage extends INotificationMessage,
 TMessageStatus extends INotificationMessageStatus> extends IProvider {

    send(message: TMessage, options?: INotificationOptions): Promise<TMessageStatus>;

}

export interface INotificationProvider extends IProvider {

    register(name: string | symbol, provider: INotificationBaseProvider<INotificationMessage,
         // tslint:disable-next-line:align
         INotificationMessageStatus>, options: INotificationOptions): void;
    get<TResult extends INotificationBaseProvider<INotificationMessage,
     INotificationMessageStatus>>(name: string | symbol): TResult;
    // tslint:disable-next-line:member-ordering
    Default: INotificationBaseProvider<INotificationMessage, INotificationMessageStatus>;
}
