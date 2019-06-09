import { data } from "..";

export enum LogLevel {
    error = 0, warn = 1, info = 2, verbose = 3 , debug = 4, trace = 5,
}

export interface LogOptions {
    level: number | LogLevel;
    message: string;
    args?: any;
}
export interface IGenericLogger<R> {
    log(options?: any): R;
    log(level: number | LogLevel , message: string, ...args: any[]): R;
    info( message: string, ...args: any[]): R;
    warn( message: string, ...args: any[]): R;
    error( message: string, ...args: any[]): R;
    debug( message: string, ...args: any[]): R;
    trace( message: string, ...args: any[]): R;
}
export interface ILogger extends IGenericLogger<void> {

}

export interface IAsyncLogger<T> extends IGenericLogger<Promise<T>> {

}
