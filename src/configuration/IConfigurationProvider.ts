
import { IProvider } from "../core/IProvider";
import { IDType } from "../data/index";

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

// tslint:disable-next-line:no-empty-interface
export interface IConfigurationProvider extends IProvider {

}
export interface ILocalConfigurationProvider extends IConfigurationProvider {
    load(): Promise<void>;
    save(): Promise<void>;
    get<T>(path: string, defaultValue?: T): T;
    getSection<T>(path: string, defaultValue?: T): ConfigSection<T>;
    set<T>(path: string, value: T): boolean;
    setSection<T>(section: ConfigSection<T>): boolean;
}
export interface ITenantConfigurationProvider extends IConfigurationProvider {
    get<T>(tenantID: IDType, app: string, path: string, defaultValue?: T): Promise<T>;
    getSection<T>(tenantID: IDType, app: string, path: string, defaultValue?: T): Promise<ConfigSection<T>>;
    set<T>(tenantID: IDType, app: string, path: string, value: T): Promise<boolean>;
    setSection<T>(tenantID: IDType, app: string, section: ConfigSection<T>): Promise<boolean>;
}
