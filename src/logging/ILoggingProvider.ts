
import { IProvider } from "../core/IProvider";

export interface ILoggingProvider extends IProvider {
    error(store: string, log: string, ...meta: any[]): void;
    warn(store: string, log: string, ...meta: any[]): void;
    info(store: string, log: string, ...meta: any[]): void;
    debug(store: string, log: string, ...meta: any[]): void;
    trace(store: string, log: string, ...meta: any[]): void;

    // tslint:disable-next-line:adjacent-overload-signatures
    error( log: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    warn( log: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    info( log: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    debug( log: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    trace( log: string, ...meta: any[]): void;

}
