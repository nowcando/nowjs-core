
import { IProvider } from "../core/IProvider";

export interface ILoggingProvider extends IProvider {

    // tslint:disable-next-line:adjacent-overload-signatures
    error( message: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    warn( message: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    info( message: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    debug( message: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    trace( message: string, ...meta: any[]): void;

}
