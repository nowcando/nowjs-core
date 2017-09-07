
import { ProviderManager } from "../core/index";
import { ConsoleLoggingProvider } from "./ConsoleLoggingProvider";
import { ILoggingProvider } from "./index";

export const TYPE_LOGGING_PROVIDER = "LoggingProvider";
export class LoggingProvider {

  private static defaultLogger = new ConsoleLoggingProvider();
  // tslint:disable:member-ordering
  public static add(name: string, provider: ILoggingProvider, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_LOGGING_PROVIDER, name, provider, isDefault, args);
  }
  public static count(): number {
    return ProviderManager.countByType(TYPE_LOGGING_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_LOGGING_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static clear(): void {
    ProviderManager.clear(TYPE_LOGGING_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends ILoggingProvider>(name?: string): T {
    const logger = ProviderManager.get<T>(TYPE_LOGGING_PROVIDER, name);
    if (!logger && !name) { return LoggingProvider.defaultLogger as T;  }
    return logger;
  }

  // tslint:disable-next-line:member-ordering
  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_LOGGING_PROVIDER, name);
  }

}
