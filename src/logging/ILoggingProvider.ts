
import { IProvider } from "../core/IProvider";
export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";
export interface ILoggingProvider extends IProvider {
    clear(): Promise<void>;
    // tslint:disable-next-line:adjacent-overload-signatures
    log(level: LogLevel, message: string, ...meta: any[]): void;
    // tslint:disable-next-line:adjacent-overload-signatures
    fatal( message: string, ...meta: any[]): void;
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
