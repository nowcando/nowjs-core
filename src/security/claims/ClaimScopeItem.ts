
export class ClaimScopeItem {
    constructor(private name: string, private alwaysInclude: boolean) {

    }
    public get Name(): string{
        return this.name;
    }
    public get AlwaysInclude(): boolean{
        return this.alwaysInclude;
    }
}
