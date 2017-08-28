export * from "./db";

export enum RowStatus {
    Normal = 1, Temp = 2, Locked = 4, Deleted = 8, Purge = 16,
}

export type IDType = number | string;

// tslint:disable-next-line:interface-name
export interface NameVariationType {[name: string]: string; }

export interface IRowMeta {
    CreatedAt?: Date;
    UpdatedAt?: Date;
    CreatedBy?: any;
    UpdatedBy?: any;
    RowStatus?: RowStatus;
}

export interface IGeoCoordinate {
    Latitude: number;
    Longitude: number;
    Altitude?: number;
}

export interface IDataField {
    Field: string; Title: string; Alias?: string;
    Order?: number; Dir?: "ASC" | "DESC";
    Default?: any; Validators?: string[];
    Formatters?: string[];
}

export interface IQueryOptions {
    AllowPaging?: boolean;
    AllowGroupig?: boolean;
    AllowFiltering?: boolean;
    AllowOrdering?: boolean;
    AllowExtras?: boolean;

    Paging?: { Index?: number, Size?: number };
    Grouping?: Array<{ Field: string }>;
    Filtering?: Array<{
        Op: "AND" | "OR" | "", Conds: Array<{
            Field: string, Op: string,
            Value: any, Default?: any,
        }>,
    }>;
    Ordering?: Array<{ Field: string, Dir: "ASC" | "DESC" }>;
    Extras?: {
        Parallel?: boolean,
        Timeout?: number,
        Fetchplan?: string,
    };
}

export interface IQueryResult<T> {
    Fields?: IDataField[];
    QueryOptions?: IQueryOptions;
    TotalCount?: number;
    Duraion?: number;
    StartedAt?: Date;
    FinishedAt?: Date;
    Data: T | T[];
}
