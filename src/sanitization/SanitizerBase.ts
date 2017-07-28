
export abstract class SanitizerBase<TOptions>{

    constructor(private name: string) {

    }

    public get Name(): string {
        return this.name;
    }

    public abstract async sanitize(value: string, options?: TOptions): Promise<string>;

}
