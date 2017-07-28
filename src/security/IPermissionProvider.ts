
import { IProvider } from "../core";

// tslint:disable-next-line:ordered-imports
import { IQueryOptions, IQueryResult, IDType } from "../data/index";
import {  IIdentity, IPermissionResult, IResource } from "./index";

export interface IPermissionBaseProvider<TResource extends IResource,
 TResult extends IPermissionResult> extends IProvider {

    isExistResource(resource: string): Promise<boolean>;
    addResource(parentresource: string, ...resource: TResource[]): Promise<TResource | TResource[]>;
    updateResource(...resource: TResource[]): Promise<TResource | TResource[]>;
    removeResource(...resource: string[]): Promise<boolean>;

    grantResourceToUsers(userID: IDType[], resource: string[], ...actions: string[]): Promise<boolean>;
    denyResourceToUsers(userID: IDType[], resource: string[], ...actions: string[]): Promise<boolean>;

    grantResourceToRoles(roles: string[], resource: string[], ...actions: string[]): Promise<boolean>;
    denyResourceToRoles(roles: string[], resource: string[], ...actions: string[]): Promise<boolean>;

    hasUsersAnyPermissions(userID: IDType[], roles: string[],
                           resources: string[], ...actions: string[]): Promise<TResult>;
    hasUsersAllPermissions(userID: IDType[], roles: string[],
                           resources: string[], ...actions: string[]): Promise<TResult>;

    hasRolesAnyPermissions(roles: string[], resources: string[], ...actions: string[]): Promise<TResult>;
    hasRolesAllPermissions(roles: string[], resources: string[], ...actions: string[]): Promise<TResult>;

    exceptUsersAnyPermissions(userID: IDType[], roles: string[],
                              resources: string[], ...actions: string[]): Promise<TResult>;
    exceptUsersAllPermissions(userID: IDType[], roles: string[],
                              resources: string[], ...actions: string[]): Promise<TResult>;
    exceptRolesAnyPermissions(roles: string[], resources: string[], ...actions: string[]): Promise<TResult>;
    exceptRolesAllPermissions(roles: string[], resources: string[], ...actions: string[]): Promise<TResult>;

    getResourcesByUserID(userID: IDType, ...actions: string[]): Promise<TResource[]>;
    getExceptResourcesByUserID(userID: IDType, ...actions: string[]): Promise<TResource[]>;
    getResourcePermissionsByUserID(userID: IDType, resources: string[], ...actions: string[]): Promise<TResult[]>;

    getResources(options?: IQueryOptions): Promise<Array<IQueryResult<TResource>>>;
    getUsersResources(userids: IDType[], ...actions: string[]): Promise<TResource[]>;
    getUsersInRolesResources(userids: IDType[], roles: string[], ...actions: string[]): Promise<TResource[]>;
    getRolesResources(roles: string[], ...actions: string[]): Promise<TResource[]>;

}

export interface IPermissionProviderOptions {
    ProviderName?: string;
}

export interface IPermissionProvider extends IProvider {

    register(name: string | symbol,
             provider: IPermissionBaseProvider<IResource, IPermissionResult>,
             options: IPermissionProviderOptions): void;
    get<TResult extends IPermissionBaseProvider<IResource, IPermissionResult>>(name: string | symbol): TResult;
    // tslint:disable-next-line:member-ordering
    Default: IPermissionBaseProvider<IResource, IPermissionResult>;
}
