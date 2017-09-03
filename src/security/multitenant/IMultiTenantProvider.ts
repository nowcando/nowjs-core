import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult, IRowMeta } from "../../data/index";

export enum TenatStatus {
       Active = 1, Expired = 2, Suspended = 3 ,
}

export interface ITenant {
        ID?: IDType;
        Token: string;
        Name: string;
        Code?: string;
        OwnerUserID: IDType;
        ExpiresAt?: Date ;
        ExpiredAt?: Date ;
        ActivatedAt?: Date ;
        SuspendedAt?: Date ;
        Status?: TenatStatus;
        Notes?: string;
}

export interface IMultiTenantProvider<TTenant extends ITenant & IRowMeta> extends IProvider {
        create(tenant: TTenant): Promise<TTenant>;
        updateName(tenantID: IDType, tenantName: string): Promise<TTenant>;
        updateOwnerUserID(tenantID: IDType, app: string, owneruserid: IDType): Promise<TTenant>;
        getByID(tenantID: IDType, app: string): Promise<TTenant>;
        getByToken(token: string): Promise<TTenant>;
        getByCode(code: string): Promise<TTenant>;
        getByOwnerUserID(userID: IDType): Promise<TTenant[]>;
        updateToken(tenantID: IDType, app: string, token: string): Promise<TTenant>;
        activate(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        suspend(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        expire(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        delete(tenantID: IDType, app: string): Promise<boolean>;
        getTanants(options?: IQueryOptions): Promise<IQueryResult<TTenant>>;
        isValidToken(tokenID: string): boolean;
}
