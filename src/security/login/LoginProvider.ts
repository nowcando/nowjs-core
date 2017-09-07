
import { ProviderManager } from "../../core/index";
import { ILoginProvider } from "./index";

export const TYPE_LOGIN_PROVIDER = "LoginProvider";
export class LoginProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ILoginProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_LOGIN_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_LOGIN_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends ILoginProvider<any>>(name?: string): T {
    return ProviderManager.get<T>(TYPE_LOGIN_PROVIDER, name);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_LOGIN_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_LOGIN_PROVIDER);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_LOGIN_PROVIDER, name);
  }

}
