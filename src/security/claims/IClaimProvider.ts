
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import { Claim, Scope } from "./index";

export interface IClaimProvider<TClaim extends Claim, TScope extends Scope> extends IProvider {
        getUserClaims(tenantID: IDType, app: string , usersid: IDType,
                      ...types: string[] ): Promise<TClaim[]>;
        addUserClaim(tenantID: IDType, app: string , usersid: IDType,
                     ...claims: TClaim[]): Promise<TClaim[]>;
        updateUserClaim(tenantID: IDType, app: string , usersid: IDType ,
                        ...claims: TClaim[]): Promise<TClaim[]>;
        removeUserClaim(tenantID: IDType, app: string , usersid: IDType ,
                        ...claims: string[]): Promise<boolean>;
        addScope(tenantID: IDType, app: string , ...scopes: TScope[]): Promise<TScope[]>;
        updateScope(tenantID: IDType, app: string , ...scopes: TScope[]): Promise<TScope[]>;
        removeScope(tenantID: IDType, app: string , ...scopes: string[]): Promise<boolean[]>;
        getScopes(tenantID: IDType, app: string , ...scopes: string[]): Promise<TScope[]>;

}
