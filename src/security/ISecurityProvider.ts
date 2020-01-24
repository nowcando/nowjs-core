import { IProvider } from '../core';
import { StringFormatType } from '../utils';
import { ISecurityClaim } from './ISecurityClaim';
export interface AuthorizePermissionOptions {
    users?: string[];
    roles?: string[];
    resources?: string[];
    errorMessage?: StringFormatType;
}
export interface ISecurityProvider extends IProvider {
    hasAllPermissions(options: AuthorizePermissionOptions): Promise<boolean>;
    hasAnyPermissions(options: AuthorizePermissionOptions): Promise<boolean>;
    exceptPermissions(options: AuthorizePermissionOptions): Promise<boolean>;

    hasAllClaims(...claims: ISecurityClaim[]): Promise<boolean>;
    hasAnyClaims(...claims: ISecurityClaim[]): Promise<boolean>;
    exceptClaims(...claims: ISecurityClaim[]): Promise<boolean>;
}
