import { IRepository, Predicate, Selector } from "../../core/index";
import { IQueryExpression } from "../IQueryExression";
import { IDbCommandExecutePlan } from "./IDbCommandExecutePlan";
import { IDbQueryPagedResult } from "./IDbQueryPagedResult";

export interface DbQueryOptions<T> {

    query: string | Predicate<T> | IQueryExpression<T>;
    pageSize?: number;
    pageIndex?: number;
    selectBy?: string[] | Array<Selector<T>>;
    groupBy?: string[] | Array<Selector<T>>;
    sortBy: { [fieldname: string]: "asc" | "desc" };

}
export interface IDbRepository<T, TSource, TDb> extends IRepository<T> {
    getSource(dbName?: string): Promise<TSource>;
    getDb(dbName?: string): Promise<TDb>;

    query(options: DbQueryOptions<T>): Promise<IDbQueryPagedResult<T, IDbCommandExecutePlan>>;

}
