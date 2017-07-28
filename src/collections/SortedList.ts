import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { Collection } from "./Collection";
import { ICollection } from "./ICollection";
import { IList } from "./IList";
import { ISortedList } from "./ISortedList";
import { List } from "./List";

export class SortedList<T> implements ISortedList<T> {
    private arr: T[] = [];
    constructor(selector: Func<any, T> , enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.arr.push(x);
            }
        }
    }
    public contains(item: T): boolean {
        return this.arr.findIndex((xx) => {
            return xx === item; }) >= 0;
    }
    public get size(): number {
       return this.arr.length;
    }
    public get(index: number): T {
        return this.arr[index];
    }
    public indexOf(item: T): number {
         return this.arr.indexOf(item);
    }
    public lastIndexOf(item: T): number {
        return this.arr.lastIndexOf(item);
    }
    public toArray(): T[] {
         const array: T[] = [];
         for (const xx of this.arr) {
            array.push(xx);
        }
         return array;
    }
    public toCollection(): ICollection<T> {
        return new Collection(this);
    }
    public toList(): IList<T> {
        return new List(this);
    }
    public linq(): IQueryable<T> {
       return new Enumerable<T>(this);
    }
    public plinq(): IParallelQueryable<T> {
         return new ParallelEnumerable<T>(this);
    }
    public [Symbol.iterator](): Iterator<T> {
        return this.arr[Symbol.iterator]();
    }
    public add(item: T): void;
    public add(...items: T[]): void;
    public add(...rest: any[]) {
        throw new Error("Method not implemented.");
    }
    public remove(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    public clear(): boolean {
        this.arr = [] ;
        return true;
    }

}
