
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import {  IRole } from "../index";

export interface IRoleProvider<TRole extends IRole> extends IProvider {

        isExistRoles(tenantID: IDType, app: string, ...roles: string[]): Promise<boolean>;
        addRole(tenantID: IDType, app: string , parentRole: string , ...roles: TRole[]): Promise<TRole[]>;
        updateRole(tenantID: IDType, app: string, parentRole: string , ...roles: TRole[]): Promise<TRole[]>;
        removeRole(tenantID: IDType, app: string, ...roles: string[]): Promise<boolean>;
        getRolesByName(tenantID: IDType, app: string , ...roleNames: string[]): Promise<TRole[]>;

        hasUsersAnyRoles(tenantID: IDType, app: string, userids: IDType[], ...roles: string[]): Promise<boolean>;
        hasUsersAllRoles(tenantID: IDType, app: string, userids: IDType[], ...roles: string[]): Promise<boolean>;

        exceptUsersAnyRoles(tenantID: IDType, app: string, userids: IDType[], ...roles: string[]): Promise<boolean>;
        exceptUsersAllRoles(tenantID: IDType, app: string, userids: IDType[], ...roles: string[]): Promise<boolean>;

        getUsersRoles(tenantID: IDType, app: string, ...usersids: IDType[]): Promise<TRole[]>;
        getUsersInRoles(tenantID: IDType, app: string, usersids: IDType[], ...roles: string[]): Promise<TRole[]>;

        getUsersRoleNames(tenantID: IDType, app: string, ...usersids: IDType[]): Promise<string[]>;
        getUsersInRoleNames(tenantID: IDType, app: string, usersids: IDType[], ...roles: string[]): Promise<string[]>;

        addUserRole(tenantID: IDType, app: string , usersid: IDType , ...roles: TRole[]): Promise<TRole[]>;
        updateUserRole(tenantID: IDType, app: string, usersid: IDType , ...roles: TRole[]): Promise<TRole[]>;
        removeUserRole(tenantID: IDType, app: string, usersid: IDType, ...roles: string[]): Promise<boolean>;
}
