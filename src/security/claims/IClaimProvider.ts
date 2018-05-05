
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import { Claim, ClaimScope, ScopeClaim } from "./index";

export type ClaimScopePair<TClaim extends Claim> = [string, TClaim[]];
export interface IClaimProvider<TClaim extends Claim, TScope extends ClaimScope> extends IProvider {

        addScope(tenantID: IDType, app: string, scope: TScope): Promise<TScope>;
        updateScope(tenantID: IDType, app: string, scope: TScope): Promise<TScope>;
        removeScope(tenantID: IDType, app: string, scope: string): Promise<boolean>;
        getScopes(tenantID: IDType, app: string, ...scopes: string[]): Promise<TScope[]>;
}

export interface IUserClaimProvider<TClaim extends Claim,
        TScope extends ClaimScope> extends IClaimProvider<TClaim, TScope> {
        getUserScopeClaims(tenantID: IDType, app: string, userid: IDType,
                           ...scopes: string[]): Promise<Array<ScopeClaim<TClaim>>>;
        getUserClaims(tenantID: IDType, app: string, userid: IDType,
                      ...types: string[]): Promise<TClaim[]>;
        addUserClaim(tenantID: IDType, app: string, usersid: IDType,
                     ...claims: TClaim[]): Promise<TClaim[]>;
        updateUserClaim(tenantID: IDType, app: string, usersid: IDType,
                        ...claims: TClaim[]): Promise<TClaim[]>;
        removeUserClaim(tenantID: IDType, app: string, usersid: IDType,
                        ...claims: TClaim[]): Promise<boolean>;
}
export interface IRoleClaimProvider<TClaim extends Claim,
        TScope extends ClaimScope> extends IClaimProvider<TClaim, TScope> {
        getRoleScopeClaims(tenantID: IDType, app: string, roleid: IDType,
                           ...scopes: string[]): Promise<Array<ScopeClaim<TClaim>>>;
        getRoleClaims(tenantID: IDType, app: string, roleid: IDType,
                      ...types: string[]): Promise<TClaim[]>;
        addRoleClaim(tenantID: IDType, app: string, roleid: IDType,
                     ...claims: TClaim[]): Promise<TClaim[]>;
        updateRoleClaim(tenantID: IDType, app: string, roleid: IDType,
                        ...claims: TClaim[]): Promise<TClaim[]>;
        removeRoleClaim(tenantID: IDType, app: string, roleid: IDType,
                        ...claims: TClaim[]): Promise<boolean>;
}

export interface ITenantClaimProvider<TClaim extends Claim,
        TScope extends ClaimScope> extends IClaimProvider<TClaim, TScope> {
        getTenantScopeClaims(tenantID: IDType, app: string,
                             ...scopes: string[]): Promise<Array<ScopeClaim<TClaim>>>;
        getTenantClaims(tenantID: IDType, app: string,
                        ...types: string[]): Promise<TClaim[]>;
        addTenantClaim(tenantID: IDType, app: string,
                       ...claims: TClaim[]): Promise<TClaim[]>;
        updateTenantClaim(tenantID: IDType, app: string,
                          ...claims: TClaim[]): Promise<TClaim[]>;
        removeTenantClaim(tenantID: IDType, app: string,
                          ...claims: TClaim[]): Promise<boolean>;
}
