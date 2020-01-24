export enum LogLevel {
    silent = Infinity,
    fatal = 60,
    error = 50,
    warn = 40,
    info = 30,
    verbose = 25,
    debug = 20,
    trace = 10,
}

export interface LogOptions {
    level: number | LogLevel;
    message: string;
    args?: any;
}
export interface IGenericLogger<R> {
    log(options?: any): R;
    log(level: number | LogLevel, message: string, ...args: any[]): R;
    info(message: string, ...args: any[]): R;
    warn(message: string, ...args: any[]): R;
    error(message: string, ...args: any[]): R;
    debug(message: string, ...args: any[]): R;
    verbose(message: string, ...args: any[]): R;
    trace(message: string, ...args: any[]): R;
}
export interface ILogger extends IGenericLogger<void> {
    // implement
}

export interface IAsyncLogger<T> extends IGenericLogger<Promise<T>> {
    // implement
}
