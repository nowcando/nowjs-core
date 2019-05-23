import { IRepository } from "../../core/index";
import { ILoggingProvider } from "../../logging/index";

export interface IDbRepository<TSource, TDb, TMigrationResult> extends IRepository {
    HasMigrationFeature: boolean;
    getSource(dbName?: string): Promise<TSource>;
    getDb(dbName?: string): Promise<TDb>;
    getLogger(): ILoggingProvider;
    upgrade(dbName?: string, limit?: number): Promise<TMigrationResult>;
    downgrade(dbName?: string, limit?: number): Promise<TMigrationResult>;

    getById<R>(...id: Array<{[key: string]: string|number}>): Promise<R>;
    getAll<R>(options?: {
        query?: any;
        pageSize?: number;
        pageIndex?: number;
        sortBy: string[] | Array<{[key: string]: "asc"|"desc"}>
    }): Promise<R[]>;
    getAny<R>(id: string | number): Promise<R[]>;

}
