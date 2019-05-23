
import { IService, IServiceOptions, IServiceStatus, ServiceStatus } from "./IService";

export interface IApplicationServiceOptions extends IServiceOptions {
    progressCallback?: (status: IApplicationServiceStatus) => void;
}

export interface IApplicationServiceStatus extends IServiceStatus  {
    status: ServiceStatus;
    timestamp: Date;
}

// tslint:disable-next-line:no-empty-interface
export interface IApplicationService  extends IService<IApplicationServiceOptions, IApplicationServiceStatus> {

}
