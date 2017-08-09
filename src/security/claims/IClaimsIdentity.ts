import { Predicate } from "../../core/index";
import { IDType } from "../../data/index";
import { IIdentity } from "../index";
import { Claim } from "./index";

export interface IClaimsIdentity extends IIdentity {
    Actor: IClaimsIdentity;
    AuthenticationType: string;
    IsAuthenticated: boolean;
    Name: string;
    NameType: string;
    RoleType: string;
    PermissionType: string;
    LicenseType: string;
    IDType: string;
    Label: string;
    ID: IDType;
    Claims: Iterable<Claim>;
    addClaim(...claim: Claim[]): void;
    getAll(match: Predicate<Claim>): Iterable<Claim>;
    getFirst(match: Predicate<Claim>): Claim;
    hasClaim(match: Predicate<Claim>): boolean;
    hasClaim(type: string, value: string): boolean;
    hasRole(role: string): boolean;
    hasAnyRoles(...roles: string[]): boolean;
    hasAllRoles(...roles: string[]): boolean;
    getRoles(): string[];
}
