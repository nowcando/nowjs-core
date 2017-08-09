
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import { IUserLogin, IUserLoginProvider } from "../index";

export interface ILoginProvider<TUserLogin extends IUserLogin> extends IProvider {

        isExistUserLoginKey(tenantID: IDType, app: string, provider: string, key: string): Promise<boolean>;
        addUserLogin(tenantID: IDType , app: string , userLogin: TUserLogin): Promise<TUserLogin>;
        updateUserLogin(tenantID: IDType , app: string, userLogin: TUserLogin): Promise<TUserLogin>;
        removeUserLogin(tenantID: IDType, app: string, userLogin: TUserLogin): Promise<boolean>;
        getUserLoginByUserID(tenantID: IDType  , app: string, ...userids: IDType[]): Promise<TUserLogin[]>;
        getUserLoginByProvider(tenantID: IDType , app: string, ...provider: string[]): Promise<TUserLogin[]>;
        getUserLoginByKey(tenantID: IDType , app: string, provider: string, key: string): Promise<TUserLogin>;

        getUsersLogins(tenantID: IDType, app: string, ...ids: IDType[]): Promise<TUserLogin[]>;

        login(tenantID: IDType, app: string, loginToken: string): Promise<TUserLogin>;
        logout(tenantID: IDType, app: string, loginToken: string): Promise<TUserLogin>;

        addProvider(tenantID: IDType, app: string, provider: IUserLoginProvider): Promise<IUserLoginProvider>;
        updateProvider(tenantID: IDType , app: string, provider: IUserLoginProvider): Promise<IUserLoginProvider>;
        removeProvider(tenantID: IDType, app: string, id: IDType): Promise<boolean>;
        getProviders(tenantID: IDType, app: string): Promise<IUserLoginProvider[]>;
}
