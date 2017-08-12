
import { ProviderManager } from "../../core/index";
import { IMultiTenantProvider } from "./index";

export const TYPE_MULTITENANT_PROVIDER = "MultiTenantProvider";
export class MultiTenantProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IMultiTenantProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_MULTITENANT_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_MULTITENANT_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): IMultiTenantProvider<any> {
    return ProviderManager.get<IMultiTenantProvider<any>>(TYPE_MULTITENANT_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_MULTITENANT_PROVIDER, name);
  }

}
