
import { Claim, ScopeClaim } from "./index";

export class ClaimToken<TClaim extends Claim> {
    constructor(private scopes: Array<ScopeClaim<TClaim>> = []) {}
    public get Scopes(): Array<ScopeClaim<TClaim>>{
        return this.scopes;
    }
    public toJSON(): any {
        const obj: any = {};
        for (const scope of this.scopes) {
            obj[scope.Name] = scope.Claims;
        }
        return JSON.stringify(obj);
    }
}
