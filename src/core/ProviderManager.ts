
import { IProvider } from "./index";

export type ProviderFactory = IProvider | ((...args: any[]) => IProvider);
// tslint:disable:member-ordering
// tslint:disable:interface-name
export interface ProviderManagerItem {
    provider: ProviderFactory;
    isDefault: boolean;
    arguments?: any[];
}

export class ProviderManager {
    private static providers: Map<string, Map<string, ProviderManagerItem>> = new Map();
    // tslint:disable-next-line:member-ordering
    public static add(type: string, name: string, provider: ProviderFactory,
                      isDefault: boolean, args?: any[]): ProviderManager {
        if (!ProviderManager.providers.has(type)) {
            ProviderManager.providers.set(type, new Map());
        }
        const typeMap = ProviderManager.providers.get(type);
        if (isDefault === true) {
            for (const [key, value] of typeMap) {
                value.isDefault = false;
            }
        }
        typeMap.set(name, { isDefault: typeMap.size === 0 ? true : isDefault, provider, arguments: args });
        return ProviderManager;
    }

    // tslint:disable-next-line:member-ordering
    public static clear(type: string): void {
        const typeMap = ProviderManager.providers.get(type);
        // tslint:disable-next-line:curly
        if (!typeMap) return;
        typeMap.clear();
    }

    public static hasAnyProvider(type: string): boolean {
        return ProviderManager.countByType(type) > 0;
    }

    public static count(): number {
        let ic = 0;
        for (const [key, value] of ProviderManager.providers) {
            ic += value.size;
        }
        return ic;
    }

    public static countByType(type: string): number {
        const typeMap = ProviderManager.providers.get(type);
        // tslint:disable-next-line:curly
        if (!typeMap) return 0;
        return typeMap.size;
    }

    public static getNames(): string[] {
        const names: string[] = [];
        for (const [segName, seg] of ProviderManager.providers) {
            for (const name of seg.keys()) {
                names.push(name);
            }
        }
        // tslint:disable-next-line:curly
        return names;
    }

    public static getNamesByType(type: string): string[] {
        const names: string[] = [];
        const typeMap = ProviderManager.providers.get(type);
        // tslint:disable-next-line:curly
        if (!typeMap) return names;
        for (const name of typeMap.keys()) {
            names.push(name);
        }
        // tslint:disable-next-line:curly
        return names;
    }

    // tslint:disable-next-line:member-ordering
    public static remove(type: string, name: string): boolean {
        const typeMap = ProviderManager.providers.get(type);
        // tslint:disable-next-line:curly
        if (!typeMap) return false;
        let defaultName = "";
        if (typeMap && typeMap.has(name)) {
            for (const [key, value] of typeMap) {
                if (value.isDefault === true) { defaultName = key; break; }
            }
        } else {
            return false;
        }

        // tslint:disable-next-line:curly
        if (defaultName === name) return false;
        return typeMap.delete(name);
    }
    // tslint:disable-next-line:member-ordering
    public static get<TResult extends IProvider>(type: string, name?: string): TResult {
        if (type) {
            const typeMap = ProviderManager.providers.get(type);
            // tslint:disable-next-line:curly
            if (!typeMap) return null;
            if (!name) {
                for (const [key, value] of typeMap) {
                    if (value.isDefault === true) { name = key; break; }
                }
            }
            // tslint:disable-next-line:curly
            if (!name) return null;
            const itemMap = typeMap.get(name);
            if (itemMap && itemMap.provider) {
                // tslint:disable-next-line:curly
                if (typeof itemMap.provider === "function") return itemMap.provider.apply(null, itemMap.arguments);
                // tslint:disable-next-line:curly
                else return itemMap.provider as any;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
