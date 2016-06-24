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



import * as core from "./core";

export enum ServiceStatus{
    Starting, Started,Stopping , Stopped, Pausing,Resuming,Suspended,Running
}

export interface  IServiceStatus{
    Status:ServiceStatus;
    LastStartOn?:core.DateTime;
    LastStopOn?:core.DateTime;
    LastRunningOn?:core.DateTime;
    LastSuspendOn?:core.DateTime;
}

export interface  IService{
    Name:String;
    ServiceContext:IServiceContext;
    start():Promise<boolean>;
    status():Promise<IServiceStatus>;
    stop():Promise<boolean>;
    reload():Promise<boolean>;
    resume():Promise<boolean>;
    pause():Promise<boolean>;
}


export interface IServiceContext{
    App:core.apps.IApp;
    Services:core.collections.IEnumerable<IService>;
    register(service:IService):ServiceContext;
    resolve<T extends IService>(name:string):IService;
    startAll():ServiceContext;
    stopAll():ServiceContext;
    pauseAll():ServiceContext;
    resumeAll():ServiceContext;

}

export class ServiceContext implements IServiceContext{
    private _App:core.apps.IApp;
    private _svcList: core.collections.Set<IService> ;
    constructor(app:core.apps.IApp){
        this._App= app;
        this._svcList = new core.collections.Set<IService>();
    }
    register(service:IService):ServiceContext{
        if(this._svcList && !this._svcList.contains(service)){
            this._svcList.add(service);
        }
        return this;
    }
    resolve<T extends IService>(name:string):IService{
        return this._svcList.linq().first<T>(x=>{return x.Name===name;});
    }
    startAll():ServiceContext{
    for(let svc of this.Services){
        svc.start()
    }

        return this;
    }
    stopAll():ServiceContext{
        for(let svc of this.Services){
            svc.stop()
        }
        return this;
    }
    pauseAll():ServiceContext{
        for(let svc of this.Services){
            svc.pause();
        }
        return this;
    }
    resumeAll():ServiceContext{
        for(let svc of this.Services){
            svc.resume();
        }
        return this;
    }
    get App():core.apps.IApp{
        return this._App;
    }
    get Services():core.collections.IEnumerable<IService>{
        return this._svcList.linq().asEnumerable<IService>();
    }
}
