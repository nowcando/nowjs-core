// tslint:disable-next-line:no-empty-interface
import { IEnumerable } from '../core/index';
import { IParallelQueryable, IQueryable } from '../linq/index';
import { ICollection, IList } from './index';

export interface ISortedSet<T> extends IEnumerable<T> {
    add(value: T): ISortedSet<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, value2: number, set: ISortedSet<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    get(index: number): T;
    indexOf(item: T): number;
    lastIndexOf(item: T): number;
    toArray(): T[];
    toCollection(): ICollection<T>;
    toList(): IList<T>;

    toSet(): Set<T>;
    // tslint:disable-next-line:member-ordering
    size: number;
    linq(): IQueryable<T>;
    plinq(): IParallelQueryable<T>;
    isEmpty(): boolean;
}
