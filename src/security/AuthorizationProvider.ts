
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
  public static get(name?: string): IAuthorizationProvider {
    return ProviderManager.get<IAuthorizationProvider>(TYPE_AUTHORIZATION_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_AUTHORIZATION_PROVIDER, name);
  }

}
