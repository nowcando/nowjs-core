
import { Claim } from "./index";

export class ScopeClaim<TClaim extends Claim> {
    constructor(private name: string, private claims: TClaim[] = []) { }
    public get Name(): string {
        return this.name;
    }
    public get Claims(): TClaim[] {
        return this.claims;
    }
    public setClaim(claim: TClaim): this {
        const ix = this.findClaimIndex(claim);
        if (ix >= 0) {
            this.claims[ix] = claim;
        } else {
            this.claims.push(claim);
        }
        return this;
    }
    public romveClaim(claim: TClaim): boolean {
        const ix = this.findClaimIndex(claim);
        if (ix >= 0) {
            this.claims.splice(ix, 1);
            return true;
        }
        return false;
    }

    public findClaimIndex(claim: TClaim): number {
        return this.claims.findIndex((item) => { return item.Type === claim.Type &&
            item.Value === claim.Value &&
            item.Issuer === claim.Issuer &&
            item.OriginalIssuer === claim.OriginalIssuer &&
            item.Properties === claim.Properties &&
            item.ValueType === claim.ValueType &&
            item.Subject === claim.Subject ; });
    }
}
