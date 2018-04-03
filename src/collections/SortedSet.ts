import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Comparator } from "../core/index";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import {IParallelQueryable} from "../linq/IParallelQueryable";
import {IQueryable} from "../linq/IQuerable";
import { Collection, ICollection, IList, List } from "./index";
import { ISortedSet } from "./ISortedSet";

export class SortedSet<T> implements ISortedSet<T> {

    private arr: T[] = [];
    constructor(private comparator: Comparator<T, T> , enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.add(x);
            }
        }
    }
   // tslint:disable-next-line:member-ordering
   public [Symbol.toStringTag]: "SortedSet";
   public [Symbol.iterator](): IterableIterator<T> {
        return this.arr[Symbol.iterator]();
    }

   public add(value: T): ISortedSet<T> {
        if (this.size < 1) {
            this.arr.push(value);
        }  else {
            this.arr.push(value);
            this.arr = this.arr.sort(this.comparator);
        }
        return this;
    }
   public clear(): void {
        this.arr.splice(0, this.arr.length);
    }
    public get(index: number): T {
       return this.arr[index];
    }
   public delete(value: T): boolean {
        const index = this.arr.indexOf(value);
        if (index >= 0 ) {
            this.arr.splice(index, 1);
            this.arr = this.arr.sort(this.comparator);
            return true;
        }
        return false;
    }
   public forEach(callbackfn: (value: T, value2: number, set: SortedSet<T>) => void, thisArg?: any): void {
        this.arr.forEach((item, index, col) => { callbackfn(item, index, this); });
    }
   public has(value: T): boolean {
        return this.arr.includes(value);
    }
   public get size(): number {
       return this.arr.length;
   }
   public linq(): IQueryable<T> {
       return new Enumerable<T>(this);
    }
   public plinq(): IParallelQueryable<T> {
         return new ParallelEnumerable<T>(this);
    }

   public indexOf(item: T): number {
        return this.arr.indexOf(item);
    }
   public lastIndexOf(item: T): number {
         return this.arr.lastIndexOf(item);
    }
   public toArray(): T[] {
        const arr: T[] = [];
        for (const item of this) {
            arr.push(item);
        }
        return arr;
    }
   public toCollection(): ICollection<T> {
        return new Collection(this);
    }
   public toList(): IList<T> {
        return new List(this);
    }
    public clone(): ISortedSet<T> {
        return new SortedSet(this.comparator, this);
    }

}
