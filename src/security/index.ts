
import { IDType } from "../data/index";

export * from "./decorators/";
export * from "./IMultiTenantProvider";
export * from "./ISecurityProvider";
export * from "./ILicencingProvider";
export * from "./IMembershipProvider";
export * from "./IRoleProvider";
export * from "./IPermissionProvider";
export * from "./ISecurityContext";
export * from "./SecurityManager";
export * from "./AuthorizationException";
export * from "./claims/";
export interface IIdentity {
    AuthenticationType: string;
    IsAuthenticated: boolean;
    ID: string | number;
}

// tslint:disable-next-line:no-empty-interface
export interface IPermissionResult {

}

// tslint:disable-next-line:no-empty-interface
export interface IPermission {

}

export interface IResource {
    Name: string;
}

export interface IPrincipal {
    Identity: IIdentity;

}

export interface IRolePrincipal extends IPrincipal {
    hasRole(role: string): boolean;

    hasAnyRoles(...roles: string[]): boolean;
    hasAllRoles(...roles: string[]): boolean;

    getRoles(): string[];
}

export interface IRoleAsyncPrincipal extends IPrincipal {
    hasRoleAsync(role: string): Promise<boolean>;
    hasAnyRolesAsync(...roles: string[]): Promise<boolean>;
    hasAllRolesAsync(...roles: string[]): Promise<boolean>;
    exceptAnyRolesAsync( ...roles: string[]): Promise<boolean>;
    exceptAllRolesAsync( ...roles: string[]): Promise<boolean>;
    getRolesAsync(): Promise<string[]>;
}

export interface IPermissionPrincipal extends IPrincipal {
    hasAnyPermissions<TResult extends IPermissionResult>(resources: string[], ...actions: string[]): TResult;
    hasAllPermissions<TResult extends IPermissionResult>(actions: string[], ...resources: string[]): TResult;
    getResources<TResource extends IResource>(...actions: string[]): TResource;
}

export interface IPermissionAsyncPrincipal<TResource extends IResource,
TResult extends IPermissionResult> extends IPrincipal {
    hasAnyPermissionsAsync(resources: string[], ...actions: string[]): Promise<TResult>;
    hasAllPermissionsAsync(actions: string[], ...resources: string[]): Promise<TResult>;
    getResourcesAsync(actions: string[]): Promise<TResource[]>;
}

export interface IRbacPermissionAsyncPrincipal<TResource extends IResource,
TResult extends IPermissionResult> extends IPermissionAsyncPrincipal<TResource, TResult> {

    hasAnyPermissionsAsync(resources: string[], ...actions: string[]): Promise<TResult>;
    hasAllPermissionsAsync(actions: string[], ...resources: string[]): Promise<TResult>;
    // tslint:disable-next-line:adjacent-overload-signatures
    hasAnyPermissionsAsync(roles: string[], resources: string[], ...actions: string[]): Promise<TResult>;
    // tslint:disable-next-line:adjacent-overload-signatures
    hasAllPermissionsAsync(roles: string[], actions: string[], ...resources: string[]): Promise<TResult>;

    exceptAnyPermissionsAsync(resources: string[], ...actions: string[]): Promise<TResult>;
    exceptAllPermissionsAsync(actions: string[], ...resources: string[]): Promise<TResult>;
    // tslint:disable-next-line:adjacent-overload-signatures
    exceptAnyPermissionsAsync(roles: string[], resources: string[], ...actions: string[]): Promise<TResult>;
    // tslint:disable-next-line:adjacent-overload-signatures
    exceptAllPermissionsAsync(roles: string[], actions: string[], ...resources: string[]): Promise<TResult>;
    getResourcesAsync(actions: string[]): Promise<TResource[]>;
    // tslint:disable-next-line:unified-signatures
    getResourcesAsync(roles: string[], ...actions: string[]): Promise<TResource[]>;

}

export interface ILicencePrincipal extends IPrincipal {
    hasLicence(...licences: string[]): boolean;
    hasAnyLicences(licences: string[], ...features: any[]): boolean;
    hasAllLicences(features: any[], ...licences: string[]): boolean;
}

export interface ILicenceAsyncPrincipal extends IPrincipal {
    hasLicenceAsync(...licences: string[]): Promise<boolean>;
    hasAnyLicencesAsync(licences: string[], ...features: any[]): Promise<boolean>;
    hasAllLicencesAsync(features: any[], ...licences: string[]): Promise<boolean>;
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
    ID?: string;
}

export interface IRole {
    Name: string;
}

export interface IResource {
    Name: string;
}
