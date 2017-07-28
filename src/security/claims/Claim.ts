
import { IIdentity, IPrincipal } from "../index";
  // tslint:disable:member-access
// tslint:disable:no-namespace
export namespace Claims {

    export class Claim {
        Issuer: string;
        OriginalIssuer: string;
        Properties: any;
        Subject: ClaimsIdentity;
        Type: string;
        Value: string;
        ValueType: string;
    }

    // tslint:disable-next-line:max-classes-per-file
    export class ClaimsIdentity implements IIdentity {

        private authenticationType: string;
        private isAuthenticated: boolean;
        private name: string;
        private id: string;
        private label: string;
        private actor: ClaimsIdentity;

        constructor();
        constructor(claims: Claim[], authenticationType: string, nameType?: string, roleType?: string);
        // tslint:disable-next-line:max-line-length
        constructor(identity: IIdentity, claims: Claim[], authenticationType: string, nameType?: string, roleType?: string);
        // tslint:disable-next-line:no-empty
        constructor(...args: any[]) {

        }

        public get Actor(): ClaimsIdentity {
            return this.actor;
        }
        public get AuthenticationType(): string {
            return this.authenticationType;
        }
        public get IsAuthenticated(): boolean {
            return this.isAuthenticated;
        }
        public get Name(): string {
            return this.name;
        }
        public get Label(): string {
            return this.label;
        }

        public get ID(): string | number {
            return this.id;
        }
    }

    // tslint:disable-next-line:max-classes-per-file
    export class ClaimsPrincipal implements IPrincipal {

        private iidentity: IIdentity;
        private iidentities: IIdentity[];
        private claims: Claim[];

        public get Identity(): IIdentity { return this.iidentity; }
        constructor(identity: IIdentity);
        // tslint:disable-next-line:unified-signatures
        constructor(principal: IPrincipal);
        // tslint:disable-next-line:unified-signatures
        constructor(claimIdentities: ClaimsIdentity[]);
        // tslint:disable-next-line:unified-signatures
        constructor(claimIdentities: ClaimsIdentity[]);
        // tslint:disable-next-line:no-empty
        constructor(...args: any[]) {

        }

        addIdentities(identities: ClaimsIdentity[]) {
            if (identities) {
                this.iidentities.push(...identities);
            }

        }

        addIdentity(identity: ClaimsIdentity) {
            if (identity) {
                this.iidentities.push(identity);
            }

        }

        hasClaim(type: string, value: string): boolean {
            throw new Error("Method not implemented.");
        }

        hasRole(role: string): boolean {
            throw new Error("Method not implemented.");
        }

        hasAnyRoles(...roles: string[]): boolean {
            throw new Error("Method not implemented.");
        }
        hasAllRoles(...roles: string[]): boolean {
            throw new Error("Method not implemented.");
        }
        getRoles(): string[] {
            throw new Error("Method not implemented.");
        }

    }
}
