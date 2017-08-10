import {IEnumerable} from "../core/IEnumerable";
import {IParallelQueryable} from "../linq/IParallelQueryable";
import {IQueryable} from "../linq/IQuerable";
import {ICollection} from "./ICollection";
import { IList} from "./IList";
export interface  ILinkedList<E> extends IEnumerable<E> {
    contains(item: E): boolean;
    // tslint:disable-next-line:member-ordering
    size: number;
    // tslint:disable-next-line:member-ordering
    first: E;
    // tslint:disable-next-line:member-ordering
    last: E;
    clear(): boolean;
    add(...items: E[]): boolean;
    insert(index: number, item: E): boolean;
    addFirst(item: E): boolean;
    addLast(item: E): boolean;
    get(index: number): E;
    set(index: number, item: E): void;
    getFirst(): E;
    getLast(): E;
    shift(): E;
    indexOf(item: E): number;
    lastIndexOf(item: E): number;
    remove(item: E): boolean;
    removeFirst(): boolean;
    removeLast(): boolean;

    clone(): ILinkedList<E>;
    toArray(): E[];
    toCollection(): ICollection<E>;
    toList(): IList<E>;
    linq(): IQueryable<E>;
    plinq(): IParallelQueryable<E>;

}
