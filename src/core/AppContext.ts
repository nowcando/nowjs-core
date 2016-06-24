/*
 *
 *  *  Copyright 2016 Now Can DO LTD (info(at)nowcando.com)
 *  *
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  *  you may not use this file except in compliance with the License.
 *  *  You may obtain a copy of the License at
 *  *
 *  *       http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  *  distributed under the License is distributed on an "AS IS" BASIS,
 *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *  See the License for the specific language governing permissions and
 *  *  limitations under the License.
 *  *
 *  * For more information: http://www.nowcando.com
 *
 */

/**
 * This File Created by Saeed on 01/06/2016.
 */

import * as core  from "./core";
export enum AppStatus{
    Starting, Started, Stopping, Stopped, Pausing, Resuming, Suspended, Running
}
export interface  IAppStatus {
    Status:AppStatus;
    LastStartOn?:core.DateTime;
    LastStopOn?:core.DateTime;
    LastRunningOn?:core.DateTime;
    LastSuspendOn?:core.DateTime;
}
export interface IAppContext {
    App:IApp;
}
export interface  IApp {
    Name:String;
    AppContext:IAppContext;
    ServiceContext:core.services.IServiceContext;
    Culture : core.globalization.Culture;
    start():Promise<boolean>;
    status():Promise<IAppStatus>;
    stop():Promise<boolean>;
    reload():Promise<boolean>;
    resume():Promise<boolean>;
    pause():Promise<boolean>;
}

export class AppContext implements IAppContext {
    private _App:IApp;
    private _culture : core.globalization.Culture;
    constructor(app:IApp) {
        this._App = app;
    };

    get App():IApp {
        return this._App
    }
    get Culture() : core.globalization.Culture{ return this._culture;}
    set Culture(culture: core.globalization.Culture)  {this._culture=culture;}
}

export abstract class App implements IApp {
    private _name:string;
    private _appContext:IAppContext;
    private _serviceContext:core.services.IServiceContext;
    private _culture : core.globalization.Culture;

    constructor(name:string) {
        this._name = name;
        this._appContext = new AppContext(this);
        this._serviceContext = new core.services.ServiceContext(this);
        this._culture = new  core.globalization.Culture("en-US");
    };

    get Name():string {
        return this._name;
    }

    set Name(value:string) {
        this._name = value;
    }

    get AppContext():IAppContext {
        return this._appContext;
    }

    get ServiceContext():core.services.IServiceContext {
        return this._serviceContext;
    }

    get Culture() : core.globalization.Culture{ return this._culture;}
    set Culture(culture: core.globalization.Culture)  {this._culture=culture;}

    abstract start():Promise<boolean> ;

    abstract status():Promise<IAppStatus> ;

    abstract stop():Promise<boolean> ;

    abstract reload():Promise<boolean> ;

    abstract resume():Promise<boolean>;

    abstract pause():Promise<boolean> ;
}