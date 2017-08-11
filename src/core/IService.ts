
import { IProvider } from "./IProvider";

export enum ServiceStatus {
    Stopped = 0, Stopping = 1, Starting = 2, Started = 4,
    Running = 6, Pausing = 8, Paused = 10, Resuming = 12,
}

export interface IServiceOptions {
    progressCallback?: (status: IServiceStatus) => void;
}

export interface IServiceStatus {
    Status: ServiceStatus;
    Timestamp: Date;
}

export interface IService<TOptions extends IServiceOptions, TResult extends IServiceStatus> extends IProvider {
    // tslint:disable-next-line:no-misused-new
    constructor(options?: TOptions): IService<TOptions, TResult>;
    start(): Promise<TResult>;
    stop(): Promise<TResult>;
    restart(): Promise<TResult>;
    status(): Promise<TResult>;
    pause(): Promise<TResult>;
    resume(): Promise<TResult>;
}
