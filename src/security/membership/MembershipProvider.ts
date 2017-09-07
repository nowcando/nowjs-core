
import { ProviderManager } from "../../core/index";
import { IMembershipProvider } from "./index";

export const TYPE_MEMBERSHIP_PROVIDER = "MembershipProvider";
export class MembershipProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IMembershipProvider<any, any, any>,
                    isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_MEMBERSHIP_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_MEMBERSHIP_PROVIDER);
  }
  public static count(): number {
    return ProviderManager.countByType(TYPE_MEMBERSHIP_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_MEMBERSHIP_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends IMembershipProvider<any, any, any>>(name?: string): T  {
    return ProviderManager.get<T>(TYPE_MEMBERSHIP_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_MEMBERSHIP_PROVIDER, name);
  }

}
