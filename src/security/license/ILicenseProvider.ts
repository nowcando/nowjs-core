
import { IProvider } from "../../core/IProvider";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";

export interface ILicense {
    ID?: IDType;
    Key: string; // ksAdkllfds8473B7
    Name: string ; // Gold
    Type: string; // private

    IssuedAt?: Date;
    ActivatedAt?: Date;
    IsActivated?: boolean;
    ExpiresAt?: Date;
    IsExpired?: boolean;

    IssuedBy?: string;
    IssuedTo?: string;

    ExpiredBy?: string;

    Tags?: string[];
    Features: any;
    Meta?: any;
}

export interface ILicenseProvider<TLicense extends ILicense> extends IProvider {

    encryptLicense(tenantID: IDType, app: string, licence: TLicense): Promise<string>;
    decryptLicense(tenantID: IDType, app: string, encryptedLicense: string): Promise<TLicense>;

    createLicense(tenantID: IDType, app: string, licence: TLicense): Promise<TLicense>;
    deleteLicenseByID(tenantID: IDType, app: string, licenceID: IDType): Promise<TLicense>;
    deleteLicenseByKey(tenantID: IDType, app: string, licencekey: string): Promise<TLicense>;
    expireLicenseByID(licenceID: IDType, refTranID?: string, cause?: string): Promise<TLicense>;
    expireLicenseByKey(licenceKey: string, refTranID?: string, cause?: string): Promise<TLicense>;

    getLicenseByID(licenceid: string): Promise<TLicense>;
    getLicenseByKey(licencekey: string): Promise<TLicense>;

    getUserLicenseByID(userid: IDType, licencekey: string): Promise<TLicense>;
    getUserLicenses(userid: IDType): Promise<TLicense>;

    getLicenses(options?: IQueryOptions): Promise<IQueryResult<TLicense>>;

    getLicenseTypes(appname: string): Promise<string[]>;

}
