import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import {IParallelQueryable} from "../linq/IParallelQueryable";
import {IQueryable} from "../linq/IQuerable";
import { ISortedSet } from "./ISortedSet";

export class SortedSet<T> implements ISortedSet<T> {
    private arr: T[] = [];
    constructor(selector: Func<any, T> , enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.arr.push(x);
            }
        }
    }
   // tslint:disable-next-line:member-ordering
   public [Symbol.toStringTag]: "Set";
   public [Symbol.iterator](): IterableIterator<T> {
        return this.arr[Symbol.iterator]();
    }
   public entries(): IterableIterator<[T, T]> {
        throw new Error("Method not implemented.");
    }
   public keys(): IterableIterator<T> {
        throw new Error("Method not implemented.");
    }
   public values(): IterableIterator<T> {
        throw new Error("Method not implemented.");
    }
   public add(value: T): this {
        throw new Error("Method not implemented.");
    }
   public clear(): void {
        throw new Error("Method not implemented.");
    }
   public delete(value: T): boolean {
        throw new Error("Method not implemented.");
    }
   public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
   public has(value: T): boolean {
        throw new Error("Method not implemented.");
    }
   public get size(): number{
       return this.arr.length;
   }
   public linq(): IQueryable<T> {
       return new Enumerable<T>(this);
    }
   public plinq(): IParallelQueryable<T> {
         return new ParallelEnumerable<T>(this);
    }

}
