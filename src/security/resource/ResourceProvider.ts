
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
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): IResourceProvider<any> {
    return ProviderManager.get<IResourceProvider<any>>(TYPE_RESOURCE_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_RESOURCE_PROVIDER, name);
  }

}
