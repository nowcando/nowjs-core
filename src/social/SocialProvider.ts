
import { ProviderManager } from "../core/index";
import { ISocialProvider } from "./index";

export const TYPE_SOCIAL_PROVIDER = "SocialProvider";
export class SocialProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ISocialProvider, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_SOCIAL_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_SOCIAL_PROVIDER);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_SOCIAL_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_SOCIAL_PROVIDER);
  }

  // tslint:disable-next-line:member-ordering
  public static get<T extends ISocialProvider>(name?: string): T {
    return ProviderManager.get<T>(TYPE_SOCIAL_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_SOCIAL_PROVIDER, name);
  }

}
