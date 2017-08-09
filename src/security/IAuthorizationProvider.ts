// tslint:disable-next-line:no-empty-interface
import { IProvider, Predicate } from "../core/index";
import { ILicense, IPrincipal } from "./index";

// tslint:disable-next-line:interface-name
export interface AuthorizationBaseOptions {
    [indexer: string]: any;
}

// tslint:disable-next-line:interface-name
export interface AuthorizationOptions extends AuthorizationBaseOptions {
    Role?: string | string[];
    Permission?: string | string[];
    License?: Predicate<ILicense> | Array<Predicate<ILicense>>;
    Policy?: string | string[];
}

export interface IAuthorizationProvider extends IProvider {
    // tslint:disable-next-line:member-ordering
    User: IPrincipal;
    setPolicy(policyName: string, ...predicates: Array<Predicate<IPrincipal>>): void;
    removePolicy(policyName: string): boolean;
    getPolicies(): string[];
    hasPolicy(policyName: string): boolean;
    checkIsAnonymous(principal?: IPrincipal): boolean;
    checkAccess(principal?: IPrincipal, options?: AuthorizationOptions): boolean;
    checkIsAnonymousAsync(principal?: IPrincipal): Promise<boolean>;
    checkAccessAsync(principal?: IPrincipal, options?: AuthorizationOptions): Promise<boolean>;
}
