
import { ProviderManager } from "../../core/index";
import { IClaimProvider } from "./index";

export const TYPE_CLAIM_PROVIDER = "ClaimProvider";
export class ClaimProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: IClaimProvider<any, any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_CLAIM_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_CLAIM_PROVIDER);
  }
  // tslint:disable-next-line:member-ordering
  public static get<T extends IClaimProvider<any, any>>(name?: string): T {
    return ProviderManager.get<T>(TYPE_CLAIM_PROVIDER, name);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_CLAIM_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_CLAIM_PROVIDER);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_CLAIM_PROVIDER, name);
  }

}
