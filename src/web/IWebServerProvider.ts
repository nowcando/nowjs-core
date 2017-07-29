import * as net from "net";
import { IServiceOptions, IServiceStatus } from "../core/index";
import { IService } from "../core/IService";

// tslint:disable-next-line:no-empty-interface
export interface IWebServerOptions extends IServiceOptions {

}

export interface IWebServerStatus<TServerApp> extends IServiceStatus {
        App: TServerApp;
}

export interface IWebServerProvider<TServerApp, TWebServerOptions extends
        IWebServerOptions, TWebServerStatus extends IWebServerStatus<TServerApp>> extends IService<any, any> {
        // tslint:disable:no-shadowed-variable
        start<TWebServerOptions, TWebServerStatus>(options?: TWebServerOptions): Promise<TWebServerStatus>;
        stop<TWebServerOptions, TWebServerStatus>(options?: TWebServerOptions): Promise<TWebServerStatus>;
        restart<TWebServerOptions, TWebServerStatus>(options?: TWebServerOptions): Promise<TWebServerStatus>;
        status<TWebServerOptions, TWebServerStatus>(options?: TWebServerOptions): Promise<TWebServerStatus>;
        pause<TWebServerOptions, TWebServerStatus>(options?: TWebServerOptions): Promise<TWebServerStatus>;
        resume<TWebServerOptions, TWebServerStatus>(options?: TWebServerOptions): Promise<TWebServerStatus>;
}
