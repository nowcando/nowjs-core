import { IIdentity } from './IIdentity';
import { ISecurityClaim } from './ISecurityClaim';
import { AuthorizePermissionOptions } from './ISecurityProvider';

export interface IPrincipal<T> extends IIdentity<T> {
    hasAllRoles(...roles: string[]): Promise<boolean>;
    hasAnyRoles(...roles: string[]): Promise<boolean>;
    exceptRoles(...roles: string[]): Promise<boolean>;

    hasAllResources(...resources: string[]): Promise<boolean>;
    hasAnyResources(...resources: string[]): Promise<boolean>;
    exceptResources(...resources: string[]): Promise<boolean>;

    hasAllPermissions(options: AuthorizePermissionOptions): Promise<boolean>;
    hasAnyPermissions(options: AuthorizePermissionOptions): Promise<boolean>;
    exceptPermissions(options: AuthorizePermissionOptions): Promise<boolean>;

    hasAllClaims(...claims: ISecurityClaim[]): Promise<boolean>;
    hasAnyClaims(...claims: ISecurityClaim[]): Promise<boolean>;
    exceptClaims(...claims: ISecurityClaim[]): Promise<boolean>;
}
