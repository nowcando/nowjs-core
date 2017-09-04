
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import {  IRole } from "../index";

export interface IRoleProvider<TRole extends IRole> extends IProvider {

        isExistsRole(tenantID: IDType, app: string, ...roles: string[]): Promise<boolean>;
        addRole(tenantID: IDType, app: string , parentRole: string , ...roles: TRole[]): Promise<TRole[]>;
        updateRole(tenantID: IDType, app: string, parentRole: string , ...roles: TRole[]): Promise<TRole[]>;
        removeRole(tenantID: IDType, app: string, ...roles: string[]): Promise<boolean>;
        getRolesByName(tenantID: IDType, app: string , ...roleNames: string[]): Promise<TRole[]>;

        hasUserAnyRoles(tenantID: IDType, app: string, userid: IDType, ...roles: string[]): Promise<boolean>;
        hasUserAllRoles(tenantID: IDType, app: string, userid: IDType, ...roles: string[]): Promise<boolean>;

        exceptUserAnyRoles(tenantID: IDType, app: string, userid: IDType, ...roles: string[]): Promise<boolean>;
        exceptUserAllRoles(tenantID: IDType, app: string, userid: IDType, ...roles: string[]): Promise<boolean>;

        getUserRoles(tenantID: IDType, app: string, ...usersids: IDType[]): Promise<TRole[]>;
        getUsersInRoles(tenantID: IDType, app: string, usersids: IDType[], ...roles: string[]): Promise<TRole[]>;

        getUsersRoleNames(tenantID: IDType, app: string, ...usersids: IDType[]): Promise<string[]>;
        getUsersInRoleName(tenantID: IDType, app: string, usersids: IDType[], ...roles: string[]): Promise<string[]>;

        addUserRole(tenantID: IDType, app: string , usersid: IDType , ...roles: string[]): Promise<boolean>;
        updateUserRole(tenantID: IDType, app: string, usersid: IDType , ...roles: string[]): Promise<boolean>;
        removeUserRole(tenantID: IDType, app: string, usersid: IDType, ...roles: string[]): Promise<boolean>;
}
