
import { IConfigurationProvider } from "./index";

export class ConfigurationProvider {
  private static confProviders: Map<string, IConfigurationProvider> =  new Map();
  // tslint:disable-next-line:member-ordering
  public static register(name: string, configer: IConfigurationProvider): void {
        ConfigurationProvider.confProviders.set(name, configer);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): IConfigurationProvider {
      if (name) {
        return ConfigurationProvider.confProviders.get(name);
      } else {
        return null;
      }
  }
}
