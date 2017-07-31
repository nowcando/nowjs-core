
import { ILoggingProvider } from "./index";

export class LoggingProvider {
  private static loggingProviders: Map<string, ILoggingProvider> =  new Map();
  // tslint:disable-next-line:member-ordering
  public static register(name: string, logger: ILoggingProvider): void {
        LoggingProvider.loggingProviders.set(name, logger);
  }
  // tslint:disable-next-line:member-ordering
  public static get(name?: string): ILoggingProvider {
     if (name) {
        return LoggingProvider.loggingProviders.get(name);
      } else {
        return null;
      }
  }
}
