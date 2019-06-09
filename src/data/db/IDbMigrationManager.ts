
export interface IDbMigrationManager {

   upgrade<TOptions, TMigrationResult>(options?: TOptions): Promise<TMigrationResult>;
   downgrade<TOptions, TMigrationResult>(options?: TOptions): Promise<TMigrationResult>;
}
