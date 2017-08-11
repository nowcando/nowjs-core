import { Predicate } from "../../core/index";
import { IDType } from "../../data/index";
import { Enumerable } from "../../linq/index";
import { IIdentity } from "../index";
import { IClaimsIdentity } from "./IClaimsIdentity";
import {
    Claim, CLAIM_STANDARD_TYPE_NAME,
    CLAIM_TYPE_ID,
    CLAIM_TYPE_LICENSE,
    CLAIM_TYPE_PERMISSION,
    CLAIM_TYPE_ROLE,
} from "./index";

export class ClaimsIdentity implements IIdentity {

    private authenticationType: string;
    private isAuthenticated: boolean;
    private nameType: string;
    private roleType: string;
    private licenseType: string;
    private permissionType: string;
    private idType: string;
    private label: string;
    private actor: ClaimsIdentity;
    private claims: Claim[] = [];
    constructor(claims: Claim[], authenticationType: string,
                isAuthenticated: boolean = false,
                idType: string = CLAIM_TYPE_ID,
                nameType: string = CLAIM_STANDARD_TYPE_NAME,
                roleType: string = CLAIM_TYPE_ROLE,
                permissionType: string = CLAIM_TYPE_PERMISSION,
                licenseType: string = CLAIM_TYPE_LICENSE,
    ) {
        // tslint:disable-next-line:curly
        if (claims && Array.isArray(claims)) {
            this.claims.push(...claims);
        }
        this.authenticationType = authenticationType;
        this.isAuthenticated = isAuthenticated;
        this.roleType = roleType;
        this.licenseType = licenseType;
        this.permissionType = permissionType;
        this.nameType = nameType;
        this.idType = idType;
    }

    public get Actor(): IClaimsIdentity {
        return this.actor;
    }
    public get AuthenticationType(): string {
        return this.authenticationType;
    }
    public get IsAuthenticated(): boolean {
        return this.isAuthenticated;
    }
    public get Name(): string {
        const claim = this.getFirst((item) => item.Type === this.nameType);
        return claim ? claim.Value : null;
    }
    public get NameType(): string {
        return this.nameType;
    }
    public get RoleType(): string {
        return this.roleType;
    }
    public get PermissionType(): string {
        return this.roleType;
    }
    public get LicenseType(): string {
        return this.roleType;
    }
    public get IDType(): string {
        return this.idType;
    }
    public get Label(): string {
        return this.label;
    }

    public set Label(value: string) {
        this.label = value;
    }

    public get ID(): IDType {
        const claim = this.getFirst((item) => item.Type === this.nameType);
        return claim ? claim.Value : null;
    }

    public get Claims(): Iterable<Claim> {
        return this.claims.linq().asEnumerable();
    }

    public addClaim(...claim: Claim[]): void {
        if (claim) {
            this.claims.push(...claim);
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

    public hasRole(role: string): boolean {
        return this.hasClaim(this.roleType, role);
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
    public getRoles(): string[] {
        const match = (item: Claim) => {
            return item.Type === this.roleType;
        };
        return Enumerable.from(this.Claims)
            .where(match)
            .select((xx) => xx.Value)
            .toArray();
    }

}
