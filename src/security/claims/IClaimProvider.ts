
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import { Claim, Scope } from "./index";

export interface IClaimProvider<TClaim extends Claim, TScope extends Scope> extends IProvider {
        getUserClaims(tenantID: IDType, app: string, usersid: IDType[], scopes: string[],
                      ...types: string[]): Promise<TClaim[]>;
        addUserClaim(tenantID: IDType, app: string, usersid: IDType, scope: string,
                     ...claims: TClaim[]): Promise<TClaim[]>;
        updateUserClaim(tenantID: IDType, app: string, usersid: IDType, scope: string,
                        ...claims: TClaim[]): Promise<TClaim[]>;
        removeUserClaim(tenantID: IDType, app: string, usersid: IDType, scope: string,
                        ...claims: TClaim[]): Promise<boolean>;

        getRoleClaims(tenantID: IDType, app: string, role: string[], scopes: string[],
                      ...types: string[]): Promise<TClaim[]>;
        addRoleClaim(tenantID: IDType, app: string, role: string, scope: string,
                     ...claims: TClaim[]): Promise<TClaim[]>;
        updateRoleClaim(tenantID: IDType, app: string, role: string, scope: string,
                        ...claims: TClaim[]): Promise<TClaim[]>;
        removeRoleClaim(tenantID: IDType, app: string, role: string, scope: string,
                        ...claims: TClaim[]): Promise<boolean>;

        addScope(tenantID: IDType, app: string, scope: TScope): Promise<TScope>;
        updateScope(tenantID: IDType, app: string, scope: TScope): Promise<TScope>;
        removeScope(tenantID: IDType, app: string, ...scopes: string[]): Promise<boolean>;
        getScopes(tenantID: IDType, app: string, ...scopes: string[]): Promise<TScope[]>;

}
