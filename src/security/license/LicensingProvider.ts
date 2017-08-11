
import { ProviderManager } from "../../core/index";
import { ILicensingProvider } from "./index";

export const TYPE_LICENCING_PROVIDER = "LicencingProvider";
export class LicencingProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ILicensingProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_LICENCING_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_LICENCING_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): ILicensingProvider<any> {
    return ProviderManager.get<ILicensingProvider<any>>(TYPE_LICENCING_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_LICENCING_PROVIDER, name);
  }

}
