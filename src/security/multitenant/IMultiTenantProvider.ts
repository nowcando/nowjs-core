import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";

export enum TenatStatus {
       Active = 1, Expired = 2, Suspended = 3 ,
}

export interface ITenant {
        ID?: IDType;
        Token: string;
        Name: string;
        OwnerUserID: IDType;
        ExpiresAt?: Date ;
        Status?: TenatStatus;
        Notes?: string;
}

export interface IMultiTenantProvider<TTenant extends ITenant> extends IProvider {
        create(tenant: TTenant): Promise<TTenant>;
        updateName(tenantID: string, tenantName: string): Promise<TTenant>;
        updateOwnerUserID(tenantID: IDType, app: string, owneruserid: IDType): Promise<TTenant>;
        getByID(tenantID: IDType, app: string): Promise<TTenant>;
        getByToken(token: string): Promise<TTenant>;
        getByOwnerUserID(userID: IDType): Promise<TTenant>;
        updateToken(tenantID: IDType, app: string): Promise<TTenant>;
        activate(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        suspend(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        expire(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        delete(tenantID: IDType, app: string): Promise<boolean>;
        getTanants(options?: IQueryOptions): Promise<IQueryResult<TTenant>>;
        isValidToken(tokenID: string): boolean;
}
