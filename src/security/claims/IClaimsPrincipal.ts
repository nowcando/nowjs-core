
import { Predicate } from "../../core/index";
import { IIdentity, ILicense, IPermission, IPrincipal, IResource, IRole } from "../index";
import { IClaimsIdentity } from "./IClaimsIdentity";
import { Claim } from "./index";

export interface IClaimsPrincipal extends IPrincipal {
   hasClaim(match: Predicate<Claim> ): boolean;
   hasClaim(type: string, value: string): boolean;
   getAll(match: Predicate<Claim>): Iterable<Claim>;
   getFirst(match: Predicate<Claim>): Claim ;
   // tslint:disable-next-line:member-ordering
   Claims: Iterable<Claim>;
   // tslint:disable-next-line:member-ordering
   Identities: IClaimsIdentity[];
   // tslint:disable-next-line:member-ordering
   Identity: IClaimsIdentity;
}

export interface IRoleClaimsPrincipal extends IClaimsPrincipal {
     hasAnyRoles( ...roles: string[]): boolean;
     hasAllRoles( ...roles: string[]): boolean;
     exceptAnyRoles( ...roles: string[]): boolean;
     exceptAllRoles( ...roles: string[]): boolean;
     getRoles(): IRole[] ;
}
export interface ILicenseClaimsPrincipal extends IClaimsPrincipal {
     hasAnyLicenses(...licenses: Array<Predicate<ILicense>>): boolean;
     hasAllLicenses(...licenses: Array<Predicate<ILicense>>): boolean;
     getLicenses(): ILicense[];
}
export interface IPermissionClaimsPrincipal extends IClaimsPrincipal {
     hasAnyPermissions(...permissions: string[]): boolean;
     hasAllPermissions(...permissions: string[]): boolean;
     exceptAnyPermissions(...permissions: string[]): boolean;
     exceptAllPermissions(...permissions: string[]): boolean;
     getPermissions(): IPermission[] ;
     getResources(): IResource[] ;
}
