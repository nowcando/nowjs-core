
import { IDType } from "../data/index";

export * from "./decorators/";
export * from "./multitenant";
export * from "./license";
export * from "./membership";
export * from "./role";
export * from "./resource";
export * from "./claims";
export * from "./AuthorizationException";
export * from "./IAuthenticationProvider";
export * from "./AuthorizationProvider";
export * from "./IAuthorizationProvider";
export interface IIdentity {
    AuthenticationType: string;
    IsAuthenticated: boolean;
    ID: IDType;
}

// tslint:disable-next-line:no-empty-interface
export interface IPermissionResult {

}

// tslint:disable-next-line:no-empty-interface
export interface IPermission {
    Resource: string;
    Action?: string | string[];
}

export interface IPrincipal {
    Identity: IIdentity;

}

export interface IRolePrincipal extends IPrincipal {

    hasAnyRoles(...roles: string[]): Promise<boolean>;
    hasAllRoles(...roles: string[]): Promise<boolean>;
    exceptAnyRoles(...roles: string[]): Promise<boolean>;
    exceptAllRoles(...roles: string[]): Promise<boolean>;

    getRoles(): string[];
}

export interface IPermissionPrincipal extends IPrincipal {
    hasAnyPermissions<TResult extends IPermissionResult>(resources: string[], ...actions: string[]): TResult;
    hasAllPermissions<TResult extends IPermissionResult>(resources: string[], ...actions: string[]): TResult;
    getResources<TResource extends IResource>(...actions: string[]): TResource;
}

export interface IToken {
    Token?: string;
    Issuer?: string;
    IssuedAt?: Date;
}

// tslint:disable-next-line:no-empty-interface
export interface IUserProfile {

}

export interface IUser {
    ID?: IDType;
}

export interface ISession {
    ID?: IDType;
}

export interface IRole {
    ID?: IDType;
    Name: string;
}

export interface IResource {
    ID?: IDType;
    Name: string;
    Actions?: string[];
}

export interface IUserLogin {
    ID?: IDType;
    LoginProvider: string;
    ProviderKey: string;
    IssuedAt: Date;
    UserID: IDType;
}

export interface IUserLoginProvider {
    ID?: IDType;
    ProviderName: string;
    ProviderUrl: string;
    ProviderCallbackUrl: string;
    IsActive: boolean;
}
