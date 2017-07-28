
import { IProvider } from "../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../data/index";
import {  IRole, IRoleBaseProvider } from "./index";

export interface IRoleBaseProvider<TRole extends IRole> extends IProvider {

        isExistRoles(...roles: string[]): Promise<boolean>;
        addRole(...roles: TRole[]): Promise<TRole | TRole[]>;
        updateRole(...roles: TRole[]): Promise<TRole | TRole[]>;
        removeRole(...roles: string[]): Promise<boolean>;

        hasUsersAnyRoles(userids: IDType[], ...roles: string[]): Promise<boolean>;
        hasUsersAllRoles(userids: IDType[], ...roles: string[]): Promise<boolean>;

        exceptUsersAnyRoles(userids: IDType[], ...roles: string[]): Promise<boolean>;
        exceptUsersAllRoles(userids: IDType[], ...roles: string[]): Promise<boolean>;

        getUsersRoles(...usersids: IDType[]): Promise<TRole[]>;
        getUsersInRoles(usersids: IDType[], ...roles: string[]): Promise<TRole[]>;
}

// tslint:disable-next-line:no-empty-interface
export interface IRoleBasicProvider<TRole extends IRole> extends IRoleBaseProvider<TRole> {

}

export interface IRoleProviderOptions {
        ProviderName?: string;
}

export interface IRoleProvider extends IProvider {
    register(name: string|symbol, provider: IRoleBaseProvider<IRole>, options: IRoleProviderOptions): void;
    get<TResult extends IRoleBaseProvider<IRole>>(name: string|symbol): TResult;
    // tslint:disable-next-line:member-ordering
    Default: IRoleBaseProvider<IRole>;
}
