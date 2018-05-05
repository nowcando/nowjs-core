
import { ProviderManager } from "../../core/index";
import { ILicenseProvider } from "./index";

export const TYPE_LICENSE_PROVIDER = "LicenseProvider";
export class LicenseProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ILicenseProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_LICENSE_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_LICENSE_PROVIDER);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_LICENSE_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_LICENSE_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends ILicenseProvider<any>>(name?: string): T {
    return ProviderManager.get<T>(TYPE_LICENSE_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_LICENSE_PROVIDER, name);
  }

}
