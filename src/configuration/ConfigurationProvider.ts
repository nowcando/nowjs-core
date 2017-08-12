
import { ProviderManager } from "../core/index";
import { IConfigurationProvider } from "./index";

export const TYPE_CONFIGURATION_PROVIDER = "ConfigurationProvider";
export class ConfigurationProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IConfigurationProvider, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_CONFIGURATION_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_CONFIGURATION_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): IConfigurationProvider {
    return ProviderManager.get<IConfigurationProvider>(TYPE_CONFIGURATION_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_CONFIGURATION_PROVIDER, name);
  }

}
