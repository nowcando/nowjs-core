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
        createTenant(tenant: TTenant): Promise<TTenant>;
        updateTenantName(tenantID: IDType, tenantName: string): Promise<TTenant>;
        updateTenantOwnerUserID(tenantID: IDType, app: string, owneruserid: IDType): Promise<TTenant>;
        getTenantByID(tenantID: IDType, app: string): Promise<TTenant>;
        getTenantByToken(token: string): Promise<TTenant>;
        getTenantByCode(code: string): Promise<TTenant>;
        getTenantByOwnerUserID(userID: IDType): Promise<TTenant[]>;
        updateTenantToken(tenantID: IDType, app: string, token: string): Promise<TTenant>;
        activateTenant(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        suspendTenant(tenantID: IDType, app: string, causeID: number , notes?: string): Promise<TTenant>;
        expireTenant(tenantID: IDType, app: string, notes?: string): Promise<TTenant>;
        deleteTenant(tenantID: IDType, app: string): Promise<boolean>;
        getTanants(options?: IQueryOptions): Promise<IQueryResult<TTenant>>;
        isTenantValidToken(tokenID: string): boolean;
}
