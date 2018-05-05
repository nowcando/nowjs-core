import {IEnumerable} from "../core/IEnumerable";
import {IParallelQueryable} from "../linq/IParallelQueryable";
import {IQueryable} from "../linq/IQuerable";
import {ICollection} from "./ICollection";
import {IList} from "./IList";
export interface  IQueue<T> extends IEnumerable<T> {
    contains(item: T): boolean;
    // tslint:disable-next-line:member-ordering
    size: number;
    clear(): boolean;
    enqueue(item: T): boolean;
    enqueue(...items: T[]): boolean;
    dequeue(): T;
    peek(): T;
    toArray(): T[];
    toCollection(): ICollection<T>;
    toList(): IList<T>;

    toSet(): Set<T>;
    linq(): IQueryable<T>;
    plinq(): IParallelQueryable<T>;
    isEmpty(): boolean;
}
