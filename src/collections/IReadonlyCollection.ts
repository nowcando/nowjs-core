
import { IEnumerable } from "../core/IEnumerable";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { ICollection } from "./ICollection";
import { IList } from "./IList";

// tslint:disable-next-line:no-empty-interface
export interface IReadonlyCollection<T> extends IEnumerable<T> {

    contains(item: T): boolean;
    // tslint:disable-next-line:member-ordering
    size: number;
    get(index: number): T;
    indexOf(item: T): number;
    lastIndexOf(item: T): number;

    join(separator?: string): string;
    toArray(): T[];
    toCollection(): ICollection<T>;
    toList(): IList<T>;
    linq(): IQueryable<T>;
    plinq(): IParallelQueryable<T>;

    isEmpty(): boolean;
}
