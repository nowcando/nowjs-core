import { IEnumerable } from '../core/IEnumerable';
import { IParallelQueryable } from '../linq/IParallelQueryable';
import { IQueryable } from '../linq/IQuerable';
import { ICollection } from './ICollection';
import { IList } from './IList';
export interface IStack<T> extends IEnumerable<T> {
    contains(item: T): boolean;
    // tslint:disable-next-line:member-ordering
    size: number;
    clear(): boolean;
    push(item: T): boolean;
    push(...items: T[]): boolean;
    pop(): T;
    peek(): T;
    toArray(): T[];
    toCollection(): ICollection<T>;
    toList(): IList<T>;

    toSet(): Set<T>;
    linq(): IQueryable<T>;
    plinq(): IParallelQueryable<T>;
    isEmpty(): boolean;
}
