
// tslint:disable-next-line:no-empty-interface
import { IParallelQueryable, IQueryable } from "../linq/index";

// tslint:disable-next-line:no-empty-interface
export interface IEnumerable<T> extends Iterable<T> {
    /* linq(): IQueryable<T>;
    plinq(): IParallelQueryable<T>; */
}
