import { IDType, IQueryOptions, IQueryResult } from "../data/index";

export enum TenatStatus {
       Active = 1, Expired = 2, Suspended = 3 ,
}

export interface ITenant {
        ID: IDType;
        Token: string;
        Name: string;
        OwnerUserID: IDType;
        ExpiresAt?: Date ;
        Status?: TenatStatus;
        Notes?: string;
}

export interface IMultiTenantProvider<TTenant extends ITenant> {
        create(tenant: TTenant): Promise<TTenant>;
        updateName(tenantID: string, tenantName: string): Promise<TTenant>;
        updateOwnerUserID(tenantID: IDType, owneruserid: IDType): Promise<TTenant>;
        getByID(tenantID: IDType): Promise<TTenant>;
        getByToken(tokenID: string): Promise<TTenant>;
        updateToken(tenantID: IDType): Promise<TTenant>;
        activate(tenantID: IDType, notes?: string): Promise<TTenant>;
        suspend(tenantID: IDType, notes?: string): Promise<TTenant>;
        expire(tenantID: IDType, notes?: string): Promise<TTenant>;
        delete(tenantID: IDType): Promise<boolean>;
        getTanants(options?: IQueryOptions): Promise<IQueryResult<TTenant>>;
        isValidToken(tokenID: string): boolean;
}
