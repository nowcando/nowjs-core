
import { ProviderManager } from "../../core/index";
import { IRoleProvider } from "./index";

export const TYPE_ROLE_PROVIDER = "RoleProvider";
export class RoleProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IRoleProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_ROLE_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_ROLE_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): IRoleProvider<any> {
    return ProviderManager.get<IRoleProvider<any>>(TYPE_ROLE_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_ROLE_PROVIDER, name);
  }

}
