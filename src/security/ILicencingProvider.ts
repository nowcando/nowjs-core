
import { IProvider } from "../core/IProvider";
import { IQueryOptions, IQueryResult } from "../data/index";

export interface ILicence {
    ID?: number | string;
    Key: string;

    Type: string;

    IssuedAt?: Date;
    ActivatedAt?: Date;
    IsActivated?: boolean;
    ExpiresAt?: Date;
    IsExpired?: boolean;

    IssuedBy?: string;
    IssuedTo?: string;

    ExpiredBy?: string;

    EncodedData?: string;
    Tags?: string[];
    Features: any;
    Meta?: any;
}

export interface ILicencingBaseProvider<TLicence extends ILicence> extends IProvider {

    encryptLicence(licence: TLicence): Promise<string>;
    decryptLicence(encryptedLicence: string): Promise<TLicence>;

    createLicence(licence: TLicence): Promise<TLicence>;

    deleteLicence(licencekey: string): Promise<TLicence>;
    expireLicence(licenceid: string, refTranID?: string, cause?: string): Promise<TLicence>;

    getLicenceByID(licenceid: string): Promise<TLicence>;
    getLicenceByKey(licencekey: string): Promise<TLicence>;

    getUserLicenceByID(userid: string, licencekey: string): Promise<TLicence>;
    getUserLicences(userid: string): Promise<TLicence>;

    getLicences(options?: IQueryOptions): Promise<IQueryResult<TLicence>>;

    getLicenceTypes(appname: string): Promise<string[]>;

}

export interface ILicencingProviderOptions {
    ProviderName?: string;
}

export interface ILicencingProvider extends IProvider {

    register(name: string | symbol,
             provider: ILicencingBaseProvider<ILicence>,
             options: ILicencingProviderOptions): void;
    get<TResult extends ILicencingBaseProvider<ILicence>>(name: string | symbol): TResult;
    // tslint:disable-next-line:member-ordering
    Default: ILicencingBaseProvider<ILicence>;
}
