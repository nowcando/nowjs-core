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
 * This File Created by Saeed on 09/06/2016.
 */
import * as core  from "../core";


export interface IIdentity{
    isAuthenticated():Promise<boolean>;
    UserID:String;
    AuthentcationType:string;
    expire(timeout?:number):Promise<boolean>;
}
export interface IPrincipal<T> extends IIdentity{
    Data:T;
    getAllRoles():Promise<core.collections.IEnumerable<string>>;
    getRoles():Promise<core.collections.IEnumerable<string>>;
    isInAllOfRoles(...roles:string[]):Promise<boolean>;
    isInAnyOfRoles(...roles:string[]):Promise<boolean>;
    isInExceptOfRoles(...roles:string[]):Promise<boolean>;
}
export interface IAuthorizablePrincipal<T> extends IPrincipal<T>{

    getAllResources():Promise<core.collections.IEnumerable<{name:string,actions:string[]}>>;
    getResourceByName(name:string):Promise<core.collections.IEnumerable<{name:string,actions:string[]}>>;
   
    hasAllOfPermissions(resource:string[],...actions:string[]):Promise<boolean>;
    hasAnyOfPermissions(resource:string[],...actions:string[]):Promise<boolean>;
    hasNotPermissions(resource:string[],...actions:string[]):Promise<boolean>;
}

export interface ISecurityProvider{
    isAuthenticated(appName:string,username:string):Promise<boolean>;
    getAllApps():Promise<core.collections.IEnumerable<{name:string,meta:any}>>;
    getAppByName(appName:string):Promise<{name:string,meta:any}>;
    getAllResources(appName:string):Promise<core.collections.IEnumerable<{name:string,actions:string[]}>>;
    getResourceByName(appName:string,name:string):Promise<{name:string,actions:string[]}>;
    hasAllOfPermissions(appName:string,username:string,resource:string[],...actions:string[]):Promise<boolean>;
    hasAnyOfPermissions(appName:string,username:string,resource:string[],...actions:string[]):Promise<boolean>;
    hasNotPermissions(appName:string,username:string,resource:string[],...actions:string[]):Promise<boolean>;
    getAllRoles(appName:string):Promise<core.collections.IEnumerable<string>>;
    getRoles(appName:string,username:string):Promise<core.collections.IEnumerable<string>>;
    isInAllOfRoles(appName:string,username:string,...roles:string[]):Promise<boolean>;
    isInAnyOfRoles(appName:string,username:string,...roles:string[]):Promise<boolean>;
    isInExceptOfRoles(appName:string,username:string,...roles:string[]):Promise<boolean>;
}


export class Principal<T> implements IPrincipal<T>{
    constructor(private authType:string,private isAuth:boolean,
                private userID:string,private roles:string[],
                private allRoles:string[],private data:T){

    }
    isAuthenticated():Promise<boolean>{ return Promise.resolve(this.isAuth);}
    expire(timeout:number=0):Promise<boolean>{

        this.isAuth=false;
        return Promise.resolve(true);
    }
    get UserID():string{ return this.userID;}
    get AuthentcationType():string{return this.authType;}
    get Data():T{return this.data;}
    set Data(value:T){this.data=value;}
    getAllRoles():Promise<core.collections.IEnumerable<string>>{
        return Promise.resolve( this.allRoles) ;}
    getRoles():Promise<core.collections.IEnumerable<string>>{
        return Promise.resolve( this.roles) ;}
    isInAllOfRoles(...roles:string[]):Promise<boolean>{
        let thisme = this;
        let myroles = new core.collections.Enumerable(roles);
        return  this.getAllRoles()
            .then((allRoles)=>{
                let _allRoles = new core.collections.Enumerable(allRoles);
                return myroles.all((xx)=>{return _allRoles.contains(xx);});

            });
    }
    isInAnyOfRoles(...roles:string[]):Promise<boolean>{
        let thisme = this;
        let myroles = new core.collections.Enumerable(roles);
        return  this.getAllRoles()
            .then((allRoles)=>{
                let _allRoles = new core.collections.Enumerable(allRoles);
                return myroles.any((xx)=>{return _allRoles.contains(xx);});

            });
    }
    isInExceptOfRoles(...roles:string[]):Promise<boolean>{
        let thisme = this;
        let myroles = new core.collections.Enumerable(roles);
        return  this.getAllRoles()
            .then((allRoles)=>{
                let _allRoles = new core.collections.Enumerable(allRoles);
                return myroles.except((xx)=>{return _allRoles.contains(xx);})
                        .count()===0;

            });
    }
}