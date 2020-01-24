export abstract class IDbMigration<T, TResult> {
    // tslint:disable:member-access
    public abstract up(db: T): Promise<TResult>;
    public abstract down(db: T): Promise<TResult>;
    public abstract seed(db: T): Promise<TResult>;
    public abstract log(opname: string, opdata: any): void;
}
