
import { ScopeClaim } from "./ScopeClaim";
export const CLAIM_SCOPE_TYPE_IDENTITY = "identity";
export const CLAIM_SCOPE_TYPE_RESOURCE = "resource";

export class Scope {
    constructor(private name: string,
                private type: string = CLAIM_SCOPE_TYPE_RESOURCE,
                private enabled: boolean = true,
                private claims: ScopeClaim[] = [] ,
                private required: boolean = false) {

    }
    public get Type(): string{
        return this.name;
    }
    public get Name(): string{
        return this.type;
    }
    public get Enabled(): boolean{
        return this.enabled;
    }
    public get Required(): boolean{
        return this.required;
    }
    public get Claims(): ScopeClaim[]{
        return this.claims;
    }
}
