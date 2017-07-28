
import { IProvider } from "../core/IProvider";
import { ILoggingBaseProvider, ILoggingOptions } from "./index";

export interface ILoggingProvider extends IProvider {
     register(name: string|symbol,
              provider: ILoggingBaseProvider,
              options: ILoggingOptions): void;
     get<TResult extends ILoggingBaseProvider>(name: string | symbol): TResult;
     // tslint:disable-next-line:member-ordering
     Default: ILoggingBaseProvider;
}
