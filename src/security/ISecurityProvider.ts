
import { IProvider } from "../core/IProvider";
import { IIdentity, IPrincipal, IRole, IToken, IUser } from "./index";

import { ISecurityContext } from "./index";

export interface ISecurityBaseProvider extends IProvider {

    createIdentity(userData: IUser, isAuth: boolean, authType: string): IIdentity;
    createPrincipal(identity: IIdentity, roles: string[]): IPrincipal;
    createContext(...args: any[]): ISecurityContext<ISecurityBaseProvider, IPrincipal>;

    isAuthorized<T>(options?: T): Promise<boolean>;
    isAnonymous(): Promise<boolean>;
}

// tslint:disable-next-line:no-empty-interface
export interface ISecurityProviderOptions {

}

export interface ISecurityProvider extends IProvider {
    register(name: string | symbol, provider: ISecurityBaseProvider, options: ISecurityProviderOptions): void;
    get<TResult extends ISecurityBaseProvider>(name: string | symbol): TResult;
    // tslint:disable-next-line:member-ordering
    Default: ISecurityBaseProvider;
}
