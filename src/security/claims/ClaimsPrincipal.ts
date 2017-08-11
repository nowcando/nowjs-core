
// tslint:disable-next-line:max-classes-per-file
import { Predicate } from "../../core/index";
import { Enumerable } from "../../linq/index";
import {
    CLAIM_TYPE_ROLE, ILicense, IPermission,
    IPrincipal, IResource, IRole,
} from "../index";
import { ClaimsIdentity } from "./ClaimsIdentity";
import { IClaimsIdentity } from "./IClaimsIdentity";
import {
    IClaimsPrincipal, ILicenseClaimsPrincipal,
    IPermissionClaimsPrincipal, IRoleClaimsPrincipal,
} from "./IClaimsPrincipal";
import { Claim, CLAIM_VALUE_TYPE_STRING } from "./index";

export class ClaimsPrincipal implements IClaimsPrincipal,
    IRoleClaimsPrincipal,
    ILicenseClaimsPrincipal,
    IPermissionClaimsPrincipal {

    private identity: IClaimsIdentity;
    private identities: IClaimsIdentity[];

    // tslint:disable-next-line:unified-signatures
    constructor(claimIdentities: ClaimsIdentity[]);
    // tslint:disable-next-line:no-empty
    constructor(args: any) {
        if (Array.isArray(args)) {
            this.addIdentities(args);
        }

    }

    public addIdentities(identities: IClaimsIdentity[]) {
        if (identities) {
            this.identities.push(...identities);
        }
        if (!this.identity) {
            this.identity = this.identities[0];
        }
    }

    public addIdentity(identity: IClaimsIdentity) {
        if (identity) {
            this.identity = identity;
            this.identities.push(identity);
        }

    }

    public getAll(match: Predicate<Claim>): Iterable<Claim> {
        return Enumerable.from(this.Claims).where(match).asEnumerable();
    }

    public getFirst(match: Predicate<Claim>): Claim {
        return Enumerable.from(this.Claims).where(match).first();
    }

    public hasClaim(match: Predicate<Claim>): boolean;
    public hasClaim(type: string, value: string): boolean;
    public hasClaim(arg1: any, arg2?: any): boolean {
        const match = arg1 && arg2 ? (item: Claim) => {
            return item.Type === arg1 && item.Value === arg2;
        } : arg1;
        return Enumerable.from(this.Claims).any(match);
    }

    public hasAnyRoles(...roles: string[]): boolean {
        const match = (item: Claim) => {
            return roles.some((xx) => xx === item.Value);
        };
        return Enumerable.from(this.Claims).any(match);
    }
    public hasAllRoles(...roles: string[]): boolean {
        const match = (item: Claim) => {
            return roles.every((xx) => xx === item.Value);
        };
        return Enumerable.from(this.Claims).all(match);
    }
    public exceptAnyRoles(...roles: string[]): boolean {
        const match = (item: Claim) => {
            return roles.some((xx) => xx !== item.Value);
        };
        return Enumerable.from(this.Claims).any(match);
    }
    public exceptAllRoles(...roles: string[]): boolean {
        const match = (item: Claim) => {
            return roles.every((xx) => xx !== item.Value);
        };
        return Enumerable.from(this.Claims).all(match);
    }
    public getRoles(): IRole[] {
        const match = (item: Claim) => {
            return item.Type === this.identity.RoleType;
        };
        return Enumerable.from(this.Claims)
            .where(match)
            .select((xx) => (typeof xx.Value === "string" ? {Name: xx.Value} : xx.Value))
            .toArray();
    }

    public get Claims(): Iterable<Claim> {
        return this.identities.linq().selectMany((xx) => xx.Claims);
    }

    public get Identities(): IClaimsIdentity[] {
        return this.identities.linq().toArray();
    }

    public get Identity(): IClaimsIdentity {
        return this.identity;
    }

    public hasAnyPermissions(...permissions: string[]): boolean {
        const match = (item: Claim) => {
            return permissions.some((xx) => xx === item.Value);
        };
        return Enumerable.from(this.Claims).any(match);
    }
    public hasAllPermissions(...permissions: string[]): boolean {
        const match = (item: Claim) => {
            return permissions.every((xx) => xx === item.Value);
        };
        return Enumerable.from(this.Claims).all(match);
    }
    public exceptAnyPermissions(...permissions: string[]): boolean {
        const match = (item: Claim) => {
            return permissions.some((xx) => xx !== item.Value);
        };
        return Enumerable.from(this.Claims).any(match);
    }
    public exceptAllPermissions(...permissions: string[]): boolean {
        const match = (item: Claim) => {
            return permissions.every((xx) => xx !== item.Value);
        };
        return Enumerable.from(this.Claims).all(match);
    }
    public getPermissions(): IPermission[] {
        const match = (item: Claim) => {
            return item.Type === this.identity.PermissionType;
        };
        return Enumerable.from(this.Claims)
                         .where(match)
                         .select((xx) => {
                            const prm = xx.Value.split("::");
                            return {Resource: prm[0], Action: prm[1] ? prm[1].split(",") : "*" }; })
                         .toArray();
    }
    public getResources(): IResource[] {
        return this.getPermissions()
        .linq()
        .select((xx) => xx.Resource)
        .distinct()
        .select((xx) => ({Name: xx}) )
        .toArray();
    }
    public hasAnyLicenses(...licenses: Array<Predicate<ILicense>>): boolean {
        const match = (item: Claim) => {
            return licenses.some((xx) => xx(item.Value));
        };
        return Enumerable.from(this.Claims).any(match);
    }
    public hasAllLicenses(...licenses: Array<Predicate<ILicense>>): boolean {
        const match = (item: Claim) => {
            return licenses.every((xx) => xx(item.Value));
        };
        return Enumerable.from(this.Claims).all(match);
    }
    public getLicenses(): ILicense[] {
        const match = (item: Claim) => {
            return item.Type === this.identity.LicenseType;
        };
        return Enumerable.from(this.Claims)
            .where(match)
            .select((xx) => (typeof xx.Value === "string" ? {Name: xx.Value} : xx.Value))
            .toArray();
    }

}
