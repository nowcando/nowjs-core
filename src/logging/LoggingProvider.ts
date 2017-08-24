
import { ProviderManager } from "../core/index";
import { ConsoleLoggingProvider } from "./ConsoleLoggingProvider";
import { ILoggingProvider } from "./index";

export const TYPE_LOGGING_PROVIDER = "LoggingProvider";
export class LoggingProvider {

  private static defaultLogger = new ConsoleLoggingProvider();
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ILoggingProvider, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_LOGGING_PROVIDER, name, provider, isDefault, args);
  }
  // tslint:disable-next-line:member-ordering
  public static clear(): void {
    ProviderManager.clear(TYPE_LOGGING_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): ILoggingProvider {
    const logger = ProviderManager.get<ILoggingProvider>(TYPE_LOGGING_PROVIDER, name);
    if (!logger && !name) { return LoggingProvider.defaultLogger;  }
    return logger;
  }

  // tslint:disable-next-line:member-ordering
  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_LOGGING_PROVIDER, name);
  }

}
