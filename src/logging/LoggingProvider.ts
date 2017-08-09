
import { ProviderManager } from "../core/index";
import { ILoggingProvider } from "./index";

export const TYPE_LOGGING_PROVIDER = "LoggingProvider";
export class LoggingProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ILoggingProvider, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_LOGGING_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_LOGGING_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): ILoggingProvider {
    return ProviderManager.get<ILoggingProvider>(TYPE_LOGGING_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_LOGGING_PROVIDER, name);
  }

}
