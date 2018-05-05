
import { ProviderManager } from "../../core/index";
import { IResourceProvider } from "./index";

export const TYPE_RESOURCE_PROVIDER = "ResourceProvider";
export class ResourceProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IResourceProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_RESOURCE_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_RESOURCE_PROVIDER);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_RESOURCE_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_RESOURCE_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends IResourceProvider<any>>(name?: string): T {
    return ProviderManager.get<T>(TYPE_RESOURCE_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_RESOURCE_PROVIDER, name);
  }

}
