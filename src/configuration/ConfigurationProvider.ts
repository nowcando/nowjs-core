
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
  public static get<T extends IConfigurationProvider>(name?: string): T  {
    return ProviderManager.get<T>(TYPE_CONFIGURATION_PROVIDER, name);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_CONFIGURATION_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_CONFIGURATION_PROVIDER);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_CONFIGURATION_PROVIDER, name);
  }

}
