
import { Predicate } from "../../core/index";
import { IDType } from "../../data/index";
import { Enumerable } from "../../linq/index";
import { IIdentity, IPrincipal } from "../index";
import { ClaimsIdentity } from "./ClaimsIdentity";

export const CLAIM_TYPE_IDENTITIES = "identities";
export const CLAIM_TYPE_IDENTITY = "identity";
export const CLAIM_TYPE_PROVIDER = "provider";
export const CLAIM_TYPE_IS_SOCIAL = "is_social";
export const CLAIM_TYPE_PROTOCOL = "protocol";
export const CLAIM_TYPE_CONNECTION = "connection";
export const CLAIM_TYPE_PERMISSION = "permission";
export const CLAIM_TYPE_LICENSE = "license";
export const CLAIM_TYPE_RESOURCE = "resource";
export const CLAIM_TYPE_RESOURCES = "resources";
export const CLAIM_TYPE_ACTION = "action";
export const CLAIM_TYPE_ACTIONS = "actions";
export const CLAIM_TYPE_ACCESS_TYPE = "access_type";
export const CLAIM_TYPE_REDIRECT_URI = "redirect_uri";
export const CLAIM_TYPE_CLIENT_ID = "client_id";
export const CLAIM_TYPE_RESPONSE_TYPE = "response_type";
export const CLAIM_TYPE_STATE = "state";
export const CLAIM_TYPE_TENANT = "tenant";
export const CLAIM_TYPE_TENANT_ID = "tenant_id";

export const CLAIM_TYPE_ID = "id";

export const CLAIM_TYPE_ROLE = "role";
export const CLAIM_TYPE_ROLES = "roles";
export const CLAIM_TYPE_USER = "user";

export const CLAIM_TYPE_IP = "ip";
export const CLAIM_TYPE_GEOIP = "geoip";
export const CLAIM_TYPE_LATITUDE = "latitude";
export const CLAIM_TYPE_LONGITUDE = "longitude";
export const CLAIM_TYPE_COUNTRY_CODE = "country_code";
export const CLAIM_TYPE_COUNTRY_CODE3 = "country_code3";
export const CLAIM_TYPE_COUNTRY_NAME = "country_name";
export const CLAIM_TYPE_CONTINENT_CODE = "continent_code";
export const CLAIM_TYPE_CITY = "city";
export const CLAIM_TYPE_TIME_ZONE = "time_zone";

export const CLAIM_TYPE_MOBILE = "mobile";
export const CLAIM_TYPE_DISPLAYNAME = "displayname";
export const CLAIM_TYPE_USER_DATA = "user_data";
export const CLAIM_TYPE_USER_ID = "user_id";
export const CLAIM_TYPE_VERSION = "version";
export const CLAIM_TYPE_SERIALNUMBER = "serialnumber";
export const CLAIM_TYPE_LICENSE_NAME = "license_name";
export const CLAIM_TYPE_LICENSE_TYPE = "license_type";
export const CLAIM_TYPE_EXPIRES_AT = "expires_at";
export const CLAIM_TYPE_EXPIRED = "expired";
export const CLAIM_TYPE_HASH = "hash";
export const CLAIM_TYPE_ACTOR = "actor";
export const CLAIM_TYPE_ANONYMOUS = "anonymous";

export const CLAIM_TYPE_ISPERSISTENT = "ispersistent";
export const CLAIM_TYPE_SID = "sid";
export const CLAIM_TYPE_RSA = "rsa";
export const CLAIM_TYPE_THUMBPRINT = "thumbprint";
export const CLAIM_TYPE_AUTHENTICATIONMETHOD = "authenticationmethod";
export const CLAIM_TYPE_COOKIEPATH = "cookiepath";
export const CLAIM_TYPE_URI = "uri";

// START STANDARD CLAIMS
export const CLAIM_STANDARD_TYPE_GIVEN_NAME = "given_name";
export const CLAIM_STANDARD_TYPE_FAMILY_NAME = "family_name";
export const CLAIM_STANDARD_TYPE_MIDDLE_NAME = "middle_name";
export const CLAIM_STANDARD_TYPE_NICK_NAME = "nickname";
export const CLAIM_STANDARD_TYPE_SUBJECT_ID = "sub";
export const CLAIM_STANDARD_TYPE_PREFERED_USERNAME = "preferred_username";
export const CLAIM_STANDARD_TYPE_PICTURE = "picture";
export const CLAIM_STANDARD_TYPE_PROFILE = "profile";
export const CLAIM_STANDARD_TYPE_NAME = "name";
export const CLAIM_STANDARD_TYPE_GENDER = "gender";
export const CLAIM_STANDARD_TYPE_BIRTHDATE = "birthdate";
export const CLAIM_STANDARD_TYPE_ZONEINFO = "zoneinfo";
export const CLAIM_STANDARD_TYPE_LOCALE = "locale";
export const CLAIM_STANDARD_TYPE_UPDATED_AT = "updated_at";
export const CLAIM_STANDARD_TYPE_ADDRESS = "address";
export const CLAIM_STANDARD_TYPE_STREET_ADDRESS = "street_address";
export const CLAIM_STANDARD_TYPE_LOCALITY = "locality";
export const CLAIM_STANDARD_TYPE_COUNTRY = "country";
export const CLAIM_STANDARD_TYPE_POSTAL_CODE = "postal_code";
export const CLAIM_STANDARD_TYPE_WEBSITE = "website";
export const CLAIM_STANDARD_TYPE_EMAIL = "email";
export const CLAIM_STANDARD_TYPE_EMAIL_VERIFIED = "email_verified";
export const CLAIM_STANDARD_TYPE_PHONE_NUMBER = "phone_number";
export const CLAIM_STANDARD_TYPE_PHONE_NUMBER_VERIFIED = "phone_number_verified";

export const CLAIM_STANDARD_TYPE_ISS = "iss";
export const CLAIM_STANDARD_TYPE_SUB = "sub";
export const CLAIM_STANDARD_TYPE_AUD = "aud";
export const CLAIM_STANDARD_TYPE_EXP = "exp";
export const CLAIM_STANDARD_TYPE_IAT = "iat";
export const CLAIM_STANDARD_TYPE_AUTH_TIME = "auth_time";
export const CLAIM_STANDARD_TYPE_NONCE = "nonce";
export const CLAIM_STANDARD_TYPE_AZP = "azp";
export const CLAIM_STANDARD_TYPE_C_HASH = "c_hash";
export const CLAIM_STANDARD_TYPE_AT_HASH = "at_hash";
export const CLAIM_STANDARD_TYPE_ACR = "acr";
export const CLAIM_STANDARD_TYPE_AMR = "amr";
export const CLAIM_STANDARD_TYPE_SUB_JWK = "sub_jwk";

// END STANDARD CLAIMS

export const CLAIM_VALUE_TYPE_STRING = "String";
export const CLAIM_VALUE_TYPE_NUMBER = "Number";
export const CLAIM_VALUE_TYPE_BOOLEAN = "Boolean";
export const CLAIM_VALUE_TYPE_OBJECT = "Object";
export const CLAIM_VALUE_TYPE_ARRAY = "Array";
// tslint:disable:member-access
// tslint:disable:no-namespace
// tslint:disable-next-line:interface-name
export class Claim {
    constructor(private type: string, private value: any,
                private issuer?: string, private originalIssuer?: string,
                private subject?: ClaimsIdentity, private properties?: any) {

                }
    public get Issuer(): string {
        return this.issuer;
    }
    public get OriginalIssuer(): string {
        return this.originalIssuer;
    }
    public get Properties(): any {
        return this.properties;
    }
    public get Subject(): ClaimsIdentity {
        return this.subject;
    }
    public get Type(): string {
        return this.type;
    }
    public get Value(): any {
        return this.value;
    }
    public get ValueType(): string {
        return (typeof this.value);
    }

    public toJSON(): object {
        const obj: any = {};
        obj.Value = this.value;
        obj.Type = this.type;
        obj.ValueType = this.ValueType;
        if (this.issuer) {
            obj.Issuer = this.issuer;
        }
        if (this.properties) {
            obj.Properties = this.properties;
        }
        if (this.originalIssuer) {
            obj.OriginalIssuer = this.originalIssuer;
        }
        if (this.subject) {
            obj.Subject = this.subject;
        }
        return obj;
    }
}
