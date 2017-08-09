
import { IProvider } from "./index";

export type ProviderFactory = IProvider | ((...args: any[]) => IProvider);

// tslint:disable-next-line:interface-name
export interface ProviderManagerItem {
    Provider: ProviderFactory;
    IsDefault: boolean;
    Arguments?: any[];
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
                value.IsDefault = false;
            }
        }
        typeMap.set(name, { IsDefault: typeMap.size === 0 ? true : isDefault, Provider: provider, Arguments: args });
        return ProviderManager;
    }

    // tslint:disable-next-line:member-ordering
    public static clear(type: string): void {
        const typeMap = ProviderManager.providers.get(type);
        // tslint:disable-next-line:curly
        if (!typeMap) return ;
        typeMap.clear();
    }

    // tslint:disable-next-line:member-ordering
    public static remove(type: string, name: string): boolean {
        const typeMap = ProviderManager.providers.get(type);
        // tslint:disable-next-line:curly
        if (!typeMap) return false;
        let defaultName = "";
        if (typeMap && typeMap.has(name)) {
               for (const [key, value] of typeMap) {
                    if (value.IsDefault === true) { defaultName = key; break; }
                }
        }   else {
            return false;
        }

        // tslint:disable-next-line:curly
        if (defaultName === name) return  false;
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
                    if (value.IsDefault === true) { name = key; break; }
                }
            }
            // tslint:disable-next-line:curly
            if (!name) return null;
            const itemMap = typeMap.get(name);
            if (itemMap && itemMap.Provider) {
                // tslint:disable-next-line:curly
                if (typeof itemMap.Provider === "function") return itemMap.Provider.apply(null, itemMap.Arguments);
                // tslint:disable-next-line:curly
                else return itemMap.Provider as any;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
