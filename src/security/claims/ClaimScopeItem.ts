
export class ClaimScopeItem {
    constructor(private name: string, private alwaysInclude: boolean = false) {

    }
    public get Name(): string {
        return this.name;
    }
    public get AlwaysInclude(): boolean {
        return this.alwaysInclude;
    }

    public toJSON(): object {
        return {Name: this.Name, AlwaysInclude: this.alwaysInclude};
    }
}
