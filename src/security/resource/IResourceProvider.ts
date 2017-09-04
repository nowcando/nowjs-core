
import { IProvider } from "../../core";
// tslint:disable-next-line:ordered-imports
import { IQueryOptions, IQueryResult, IDType } from "../../data/index";

export interface IResourceProvider<TResource> extends IProvider {
        isExistResources(tenantID: IDType, app: string, ...resources: string[]): Promise<boolean>;
        createResource(tenantID: IDType, app: string ,
                       parentResourceID: IDType , resources: TResource): Promise<TResource>;
        updateResource(tenantID: IDType, app: string,
                       parentResourceID: IDType , resources: TResource): Promise<TResource>;
        deleteResource(tenantID: IDType, app: string, resourceid: IDType[]): Promise<boolean>;
        getResourcesByName(tenantID: IDType, app: string , ...resourceName: string[]): Promise<TResource[]>;
        getResourcesByID(tenantID: IDType, app: string , ...resourceID: IDType[]): Promise<TResource[]>;

        hasGrantedAnyResources(tenantID: IDType, app: string, roleids: IDType[] ,
                               userids: IDType[], ...resources: string[]): Promise<boolean>;
        hasGrantedAllResources(tenantID: IDType, app: string, roleids: IDType[] ,
                               userids: IDType[], ...resources: string[]): Promise<boolean>;

        exceptGrantedAnyResources(tenantID: IDType, app: string, roleids: IDType[] ,
                                  userids: IDType[], ...resources: string[]): Promise<boolean>;
        exceptGrantedAllResources(tenantID: IDType, app: string, roleids: IDType[] ,
                                  userids: IDType[], ...resources: string[]): Promise<boolean>;

        getUsersResources(tenantID: IDType, app: string, ...usersids: IDType[]): Promise<TResource[]>;
        getUsersInResources(tenantID: IDType, app: string,
                            usersids: IDType[], ...resources: string[]): Promise<TResource[]>;
        getRolesResources(tenantID: IDType, app: string, ...roleids: IDType[]): Promise<TResource[]>;
        getRolesInResources(tenantID: IDType, app: string, roleids: IDType[],
                            ...resources: string[]): Promise<TResource[]>;

        grantResource(tenantID: IDType, app: string , resourceName: string ,
                      userids: IDType[] , roleids: IDType[] ,
                      ...actions: string[]): Promise<TResource>;
        revokeResource(tenantID: IDType, app: string , resourceName: string ,
                       userids: IDType[] , roleids: IDType[] ,
                       ...actions: string[]): Promise<TResource>;

}
