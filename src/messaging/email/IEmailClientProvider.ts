
import { IProvider } from "../../core/index";

import { IEmailClientBaseProvider, IEmailClientOptions,
     IEmailMessage, IEmailMessageStatus } from "./index";

export interface IEmailClientProvider extends IProvider {
     register(name: string|symbol,
              provider: IEmailClientBaseProvider<IEmailMessage, IEmailMessageStatus>,
              options: IEmailClientOptions): void;
     get<TResult extends IEmailClientBaseProvider<IEmailMessage, IEmailMessageStatus>>(name: string | symbol): TResult;
     // tslint:disable-next-line:member-ordering
     Default: IEmailClientBaseProvider<IEmailMessage, IEmailMessageStatus>;
}
