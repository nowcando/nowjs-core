import { IProvider } from "../../core/index";
import { IDType, IQueryOptions } from "../../data/index";
import { ITimelineEntry } from "../index";

export enum TimelineActorType {
    None = 0, System = 1, Tenant = 2, User = 4,
}

// tslint:disable-next-line:no-empty-interface
export interface ITimelineProvider<TEntry extends ITimelineEntry> extends IProvider {
    addTimelineEntry(tenantID: IDType, app: string, entry: TEntry): Promise<ITimelineEntry>;
    getEntriesByTimestamp(tenantID: IDType, app: string, actorType: TimelineActorType,
                          actorID: IDType, fromTimestamp: number,
                          limit?: number, skip?: boolean): Promise<ITimelineEntry[]>;
    getEntries(tenantID: IDType, app: string, actorType: TimelineActorType,
               actorID: IDType, options?: IQueryOptions): Promise<ITimelineEntry[]>;
    removeEntries(tenantID: IDType, app: string,
                  actorType: TimelineActorType, timestamp: number,
                  limit?: number, currentToAfter?: boolean): Promise<boolean>;

}
