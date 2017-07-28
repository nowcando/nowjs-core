
// tslint:disable-next-line:no-empty-interface
export interface IRepository {

}

export interface IDbRepository<TSource, TDb, TMigrationResult> extends IRepository {
    HasMigrationFeature: boolean;
    getSource(): Promise<TSource>;
    getDb(): Promise<TDb>;

    upgrade(limit?: number): Promise<TMigrationResult>;
    downgrade(limit?: number): Promise<TMigrationResult>;

}
