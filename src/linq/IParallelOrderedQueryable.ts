import { Comparator } from "../core/Comparator";
import {IParallelQueryable} from "./IParallelQueryable";

// tslint:disable:no-shadowed-variable
export interface IParallelOrderedQueryable<T> extends IParallelQueryable<T> {

    thenBy<TSelected>(selector: ((item: T) => TSelected),
                      comparator?: Comparator<T, T>): IParallelOrderedQueryable<T>;
    thenByDesc<TSelected>(selector: ((item: T) => TSelected),
                          comparator?: Comparator<T, T>): IParallelOrderedQueryable<T>;
}
