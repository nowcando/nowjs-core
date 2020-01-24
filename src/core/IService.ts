import { IProvider } from './IProvider';

export enum ServiceStatus {
    stopped = 0,
    stopping = 1,
    starting = 2,
    started = 4,
    running = 6,
    pausing = 8,
    paused = 10,
    resuming = 12,
}

export interface IServiceOptions {
    progressCallback?: (status: IServiceStatus) => void;
}

export interface IServiceStatus {
    status: ServiceStatus;
    timestamp: Date;
}

export interface IService<TOptions extends IServiceOptions, TResult extends IServiceStatus> extends IProvider {
    // tslint:disable-next-line:no-misused-new
    // constructor(options?: TOptions): IService<TOptions, TResult>;
    start(): Promise<TResult>;
    stop(): Promise<TResult>;
    restart(): Promise<TResult>;
    status(): Promise<TResult>;
    pause(): Promise<TResult>;
    resume(): Promise<TResult>;
}
