
import { IProvider } from "../core/IProvider";

export class ConfigSection<T> {

    private name: string = "";
    constructor(private path: string, private data: T) {
        if (path) {
            const parts = path.split(".");
            this.name = parts[parts.length - 1] || "";
        }
    }
    public get Path(): string {
        return this.path;
    }

    public get Name(): string {

        return this.name;
    }

    public get Data(): T {
        return this.data;
    }

}

export interface IConfigurationProvider extends IProvider {
    load(): Promise<void>;
    save(): Promise<void>;
    get<T>(path: string, defaultValue?: T): T;
    getSection<T>(path: string, defaultValue?: T): ConfigSection<T>;
    set<T>(path: string, value: T): boolean;
    setSection<T>(section: ConfigSection<T>): boolean;
}
