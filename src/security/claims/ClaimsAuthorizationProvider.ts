
import { Predicate } from "../../core/index";
import { IAuthorizationProvider } from "../IAuthorizationProvider";
import { AuthorizationOptions, ILicense, IPrincipal } from "../index";
import { IClaimsPrincipal } from "./IClaimsPrincipal";
import { ClaimsPrincipal } from "./index";

// tslint:disable-next-line:max-classes-per-file
export class ClaimsAuthorizationProvider implements IAuthorizationProvider {

    private policies: Map<string, Array<Predicate<ClaimsPrincipal>>> = new Map();

    // tslint:disable-next-line:no-empty
    constructor() {

    }

    public get name(): string {
        return "ClaimsAuthorizationProvider";
    }

    public setPolicy(policyName: string,
        // tslint:disable-next-line:no-empty
                     ...predicates: Array<Predicate<ClaimsPrincipal>>): void {
        this.policies.set(policyName, predicates);
    }
    public removePolicy(policyName: string): boolean {
        return this.policies.delete(policyName);
    }
    public getPolicies(): string[] {
        return this.policies
                .linq()
                .select(([key, value]) => key)
                .toArray();
    }
    public hasPolicy(policyName: string): boolean {
        return this.policies.has(policyName);
    }
    // tslint:disable-next-line:member-ordering
    public  checkPolicy(principal: ClaimsPrincipal, ...policyNames: string[]): boolean {
        let result = true;
        principal = principal;
        for (const pName of policyNames) {
            const policy: any = this.policies.get(pName);
            if (policy && (typeof policy === "function")) {
               result = result && policy(principal);
               // tslint:disable-next-line:curly
               if (result === false) break;
            }
        }
        return result;
    }
    // tslint:disable-next-line:member-ordering
    public  checkIsAnonymous(principal?: ClaimsPrincipal): boolean {
        principal = principal ;
        return !principal.Identity.IsAuthenticated;
    }
    // tslint:disable-next-line:member-ordering
    public  checkAccess(principal: ClaimsPrincipal, options?: AuthorizationOptions): boolean {
        principal = principal ;
        let result = principal.Identity.IsAuthenticated;
        if (options) {
            if (options.Role) {
                const roles = typeof options.Role === "string" ? options.Role.split(",") : options.Role;
                result = result && principal.hasAnyRoles(...roles);
                // tslint:disable-next-line:curly
                if (result === false) return false;
            }
            if (options.Permission) {
                const permissions = typeof options.Permission === "string" ?
                    options.Permission.split(",") : options.Permission;
                result = result && principal.hasAnyPermissions(...permissions);
                // tslint:disable-next-line:curly
                if (result === false) return false;
            }
            if (options.License) {
                const licences = Array.isArray(options.License) ? options.License : [options.License];
                result = result && principal.hasAnyLicenses(...licences);
                // tslint:disable-next-line:curly
                if (result === false) return false;
            }
            if (options.Policy) {
                const policies = typeof options.Policy === "string" ?
                    options.Policy.split(",") : options.Policy;
                result = result && this.checkPolicy(principal, ...policies);
                // tslint:disable-next-line:curly
                if (result === false) return false;
            }
        }

        return result;
    }

    public async checkIsAnonymousAsync(principal: ClaimsPrincipal): Promise<boolean> {
        principal = principal ;
        return Promise.resolve(this.checkIsAnonymous(principal));
    }
    public async  checkAccessAsync(principal: ClaimsPrincipal, options?: AuthorizationOptions): Promise<boolean> {
        principal = principal;
        return Promise.resolve(this.checkAccessAsync(principal, options));
    }
}
