
import { IDType } from "../data/index";

export * from "./decorators/";
export * from "./multitenant";
export * from "./login";
export * from "./license";
export * from "./membership";
export * from "./role";
export * from "./resource";
export * from "./claims";
export * from "./oauth";
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

export enum VerificationStatus {
    // tslint:disable-next-line:no-bitwise
    Verified = 1 , NotVerfied = 2 , Both = Verified | NotVerfied ,
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

export interface IUserPhone {
    UserID?: IDType;
    Phone: string;
    IsVerified: boolean;
    RegisteredAt?: Date;
    DeletedAt?: Date;
    VerifiedAt?: Date;
    TFACode?: string;
    VerifyToken?: string;
    SentAt?: Date;
    TryCount?: number;
    LastTryAt?: Date;
}

export interface IUserDevice {
    ID?: IDType;
    Code?: string;
    UserID?: IDType;
    IsVerified: boolean;
    RegisteredAt?: Date;
    DeletedAt?: Date;
    Token?: Date;
    TokenUpdatedAt?: Date;
    VerifiedAt?: Date;
    Properties?: any;
}

export interface ISession {
    ID?: IDType;
}

export interface IRole {
    ID?: IDType;
    Name: string;
}

export interface ITimelineEntry {
    Timestamp: number;
    ActorType?: IDType;
    ActorID?: IDType; // Actor ID
    PID?: number; // Process ID
    SPID?: number; // Sub Process ID
    ACID?: number; // Activity ID
    Properties?: any;
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
