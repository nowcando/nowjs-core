import * as net from "net";
import { IServiceOptions, IServiceStatus } from "../core/index";
import { IService } from "../core/IService";

// tslint:disable-next-line:no-empty-interface
export interface IWebServerOptions extends IServiceOptions {

}

export interface IWebServerStatus<TServerApp> extends IServiceStatus {
        App: TServerApp;
}

// tslint:disable-next-line:no-empty-interface
export interface IWebServerProvider<TServerApp, TWebServerOptions extends
        // tslint:disable-next-line:max-line-length
        IWebServerOptions, TWebServerStatus extends IWebServerStatus<TServerApp>> extends IService<TWebServerOptions, TWebServerStatus> {

}
