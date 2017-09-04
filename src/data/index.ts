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
    Order?: number; Dir?: "asc" | "desc" | "";
    Default?: any; Validators?: string[];
    Formatters?: string[];
}

export interface IQueryOptions {
    AllowFields?: boolean;
    AllowPaging?: boolean;
    AllowGroupig?: boolean;
    AllowFiltering?: boolean;
    AllowOrdering?: boolean;
    AllowExtras?: boolean;
    Fields?: IDataField[];
    Paging?: { Index?: number, Size?: number };
    Grouping?: Array<{ Field: string }>;
    Filtering?: Array<{
        Op: "and" | "or" | "", Conditions: Array<{
            Field: string, Op: "equals"|
            "notequals"|"great"|"greatorequal"|"less"|"lessorequal"|
            "startswith"|"endswith"|"containsany"|"containsall"|"fuzzycontains"|
            "notcontainsany"|"notcontainsall"|"haspattern"|"hasnotpattern"
            Value: any, Default?: any,
        }>,
    }>;
    Ordering?: Array<{ Field: string, Dir: "asc" | "desc" }>;
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
    Duration?: number;
    StartedAt?: Date;
    FinishedAt?: Date;
    Data: T | T[];
}
