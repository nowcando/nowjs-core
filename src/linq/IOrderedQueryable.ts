import { Comparator } from "../core/Comparator";
import { IQueryable } from "./IQuerable";
// tslint:disable:no-shadowed-variable
export interface IOrderedQueryable<T> extends IQueryable<T> {

    thenBy<TSelected>(selector: ((item: T) => TSelected),
                      comparator?: Comparator<T, T>): IOrderedQueryable<T>;
    thenByDesc<TSelected>(selector: ((item: T) => TSelected),
                          comparator?: Comparator<T, T>): IOrderedQueryable<T>;
}
