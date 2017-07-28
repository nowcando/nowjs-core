
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

export interface IService<T extends IServiceOptions, TResult extends IServiceStatus> extends IProvider {
    start(options?: T): Promise<TResult>;
    stop(options?: T): Promise<TResult>;
    restart(options?: T): Promise<TResult>;
    status(options?: T): Promise<TResult>;
    pause(options?: T): Promise<TResult>;
    resume(options?: T): Promise<TResult>;
}
