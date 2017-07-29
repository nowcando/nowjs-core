
import { IProvider } from "../../core/index";
import {
    ISmsClientBaseProvider, ISmsClientOptions,
    ISmsMessage, ISmsMessageStatus,
} from "./index";

export interface ISmsClientProvider extends IProvider {

    register(name: string | symbol,
             provider: ISmsClientBaseProvider<ISmsMessage, ISmsMessageStatus>,
             options: ISmsClientOptions): void;
     get<TResult extends ISmsClientBaseProvider<ISmsMessage, ISmsMessageStatus>>(name: string | symbol): TResult;
     // tslint:disable-next-line:member-ordering
     Default: ISmsClientBaseProvider<ISmsMessage, ISmsMessageStatus>;
}
