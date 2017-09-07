
import { ProviderManager } from "../core/index";
import { IAuthorizationProvider } from "./IAuthorizationProvider";

export const TYPE_AUTHORIZATION_PROVIDER = "AuthorizationProvider";
export class AuthorizationProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IAuthorizationProvider, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_AUTHORIZATION_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_AUTHORIZATION_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends IAuthorizationProvider>(name?: string): T {
    return ProviderManager.get<T>(TYPE_AUTHORIZATION_PROVIDER, name);
  }
  public static count(): number {
    return ProviderManager.countByType(TYPE_AUTHORIZATION_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_AUTHORIZATION_PROVIDER);
  }
  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_AUTHORIZATION_PROVIDER, name);
  }

}
