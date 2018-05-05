
import { ProviderManager } from "../../core/index";
import { ITimelineProvider } from "./index";

export const TYPE_TIMELINE_PROVIDER = "TimelineProvider";
export class RoleProvider {
  // tslint:disable-next-line:member-ordering
  public static add(name: string, provider: ITimelineProvider<any>, isDefault: boolean, args?: any[]): void {
    ProviderManager.add(TYPE_TIMELINE_PROVIDER, name, provider, isDefault, args);
  }
  public static clear(): void {
    ProviderManager.clear(TYPE_TIMELINE_PROVIDER);
  }

  public static count(): number {
    return ProviderManager.countByType(TYPE_TIMELINE_PROVIDER);
  }

  public static getNames(): string[] {
    return ProviderManager.getNamesByType(TYPE_TIMELINE_PROVIDER);
  }

  // tslint:disable-next-line:member-ordering
  public static get<T extends ITimelineProvider<any>>(name?: string): T {
    return ProviderManager.get<T>(TYPE_TIMELINE_PROVIDER, name);
  }

  public static remove(name: string): boolean {
    return ProviderManager.remove(TYPE_TIMELINE_PROVIDER, name);
  }

}
