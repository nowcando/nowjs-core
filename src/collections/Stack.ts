import { IEnumerable } from "../core/IEnumerable";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import {IParallelQueryable} from "../linq/IParallelQueryable";
import {IQueryable} from "../linq/IQuerable";
import { Collection } from "./Collection";
import {ICollection} from "./ICollection";
import {IList} from "./IList";
import {IStack} from "./IStack";
import { List } from "./List";
export class Stack<T> implements IStack<T> {
    private arr: T[] = [];
    constructor(enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.push(x);
            }
        }
    }
   public contains(item: T): boolean {
        return this.arr.findIndex((xx) => {
            return xx === item; }) >= 0;
    }
   public get size(): number{
       return this.arr.length;
   }
   public clear(): boolean {
       this.arr = [] ;
       return true;
    }
   public push(item: T): boolean;
   public push(...items: T[]): boolean;
   public push( ...rest: any[]): any {
        if (rest instanceof  Array) {
            for (const xx of rest){
                this.arr.push(xx);
            }
            return true;
        } else {
          this.arr.push(rest);
          return true;
        }
    }
   public pop(): T {
        return this.arr.pop();
    }
   public peek(): T {
        // tslint:disable-next-line:curly
        if (this.arr.length > 0)
             return this.arr[0];
        // tslint:disable-next-line:curly
        else return null;
    }
   public toArray(): T[] {
        const array: T[] = [];
        for (const xx of this) {
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

}
