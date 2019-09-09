import { MemoryParallelQueryableProvider } from "./MemoryParallelQueryableProvider";

// tslint:disable-next-line:no-namespace
import { IList, List } from "../collections";
import { IObjectDictionary } from "../core";
import { Enumerable } from "./Enumerable";
import { IParallelQueryable, IQueryable } from "./index";
import { ParallelEnumerable } from "./ParallelEnumerable";

function getEunmerable(): Enumerable<any> {
    return new Enumerable<any>(this);
}
function getParallelEunmerable(): ParallelEnumerable<any> {
    return new ParallelEnumerable<any>(this, new MemoryParallelQueryableProvider());
}
function contains(item: any): boolean {
    return this.includes(item);
}
function hasDuplicate(): boolean {
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:prefer-const
    let len = this.length,
        out: Array<{ item: any, count: number }> = [],
        counts: Array<{ item: any, count: number }> = [];

    for (let i = 0; i < len; i++) {
        let item1 = this[i];
        let found = counts.find((xx) => xx.item === item1);
        if (!found) {
            found = { item: item1, count: 0 };
            counts.push(found);
        }
        found.count++;
        if (found.count > 1) { return true; }
    }

    return false;
}
function findDuplicates(): any[] {

    let len = this.length,
        out: Array<{ item: any, count: number }> = [],
        counts: Array<{ item: any, count: number }> = [];

    for (let i = 0; i < len; i++) {
        let item1 = this[i];
        let found = counts.find((xx) => xx.item === item1);
        if (!found) {
            found = { item: item1, count: 0 };
            counts.push(found);
        }
        found.count++;
        if (found.count === 2) { out.push(item1); }
    }

    return out;
}
function itemCount(): Array<{ item: any, count: number }> {

    let len = this.length,
        counts: Array<{ item: any, count: number }> = [];

    for (let i = 0; i < len; i++) {
        let item1 = this[i];
        let found = counts.find((xx) => xx.item === item1);
        if (!found) {
            found = { item: item1, count: 0 };
            counts.push(found);
        }
        found.count++;
    }

    return counts;
}
function toUnique(): any[] {
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:prefer-const
    let a = [];
    // tslint:disable:curly
    for (let i = 0, l = this.length; i < l; i++)
        if (a.indexOf(this[i]) === -1)
            a.push(this[i]);
    return a;
}

function mapContainsKey(key: string | symbol): boolean {
    for (const item of this.keys()) {
        if (key === item) return true;
    }
    return false;
}
function mapContainsValue(value: any): boolean {
    for (const item of this.values()) {
        if (value === item) return true;
    }
    return false;
}

function toArray<T>(): T[] {
    const arr: T[] = [];
    for (const item of this[Symbol.iterator]()) {
        arr.push(item);
    }
    return arr;
}

function toList<T>(): IList<T> {
    const arr =  new List<T>();
    for (const item of this[Symbol.iterator]()) {
        arr.add(item);
    }
    return arr;
}

function mapKeyToList<T>(): IList<T> {
    const arr =  new List<T>();
    for (const [key, value] of this[Symbol.iterator]()) {
        arr.add(key);
    }
    return arr;
}

function mapValueToList<T>(): IList<T> {
    const arr =  new List<T>();
    for (const [key, value] of this[Symbol.iterator]()) {
        arr.add(value);
    }
    return arr;
}

function mapIsEmpty(): boolean {
    return this.size === 0;
}

function mapPut<K, V>(key: K, value: V): any {
    this.set(key, value);
    return this;
}

function mapPutAll<K, V>(...entries: Array<[K, V]>): any {
    for (const [key, value] of entries) {
        this.set(key, value);
    }
    return this;
}

// tslint:disable-next-line:max-line-length
function  mapMap<T, U extends object>(callbackfn: (value: [any, any], index: number, map: Map<any, any>) => [T, U], thisArg?: any): Map<T, U> {
    const res = new Map<T, U>();
    let counter = 0;
    for (const [key, value] of this) {
            const fc = callbackfn([key, value], counter, thisArg || this);
            res.set(fc[0], fc[1]);
            counter++;
    }
    return res;
}

// tslint:disable-next-line:max-line-length
function  mapWeakMap<T extends object, U extends object>(callbackfn: (value: [any, any], index: number, map: Map<any, any>) => [T, U], thisArg?: any): WeakMap<T, U> {
    const res = new WeakMap<T, U>();
    let counter = 0;
    for (const [key, value] of this) {
            const fc = callbackfn([key, value], counter, thisArg || this);
            res.set(fc[0], fc[1]);
            counter++;
    }
    return res;
}

function mapEntriesToObjectDictionary<T>(): IObjectDictionary<T> {
    const arr: any =  {};
    for (const [key, value] of this[Symbol.iterator]()) {
        arr[key] = value;
    }
    return arr;
}

function  setFilter<T>(callbackfn: (value: T, index: number, set: any) => boolean, thisArg?: any): Set<T> {
    const res = new Set<T>();
    let counter = 0;
    for (const item of this) {
        if (callbackfn(item, counter, thisArg || this)) {
            res.add(item);
        }
        counter++;
    }
    return res;
}
function  setWeakFilter<T extends object>(callbackfn: (value: T, index: number, set: any) => boolean,
                                          thisArg?: any): WeakSet<T> {
    const res = new WeakSet<T>();
    let counter = 0;
    for (const item of this) {
        if (callbackfn(item, counter, thisArg || this)) {
            res.add(item);
        }
        counter++;
    }
    return res;
}
function  setFind<T>(callbackfn: (value: T, index: number, set: any) => boolean, thisArg?: any): T {
    let counter = 0;
    for (const item of this) {
        if (callbackfn(item, counter, thisArg || this)) {
            return item;
        }
        counter++;
    }
    return null;
}

function  setEvery<T>(callbackfn: (value: T, index: number, set: any) => boolean, thisArg?: any): boolean {
    let res = true;
    let counter = 0;
    for (const item of this) {
        if (!callbackfn(item, counter, thisArg || this)) {
            return false;
        }
        counter++;
    }
    return res;
}

function  setSome<T>(callbackfn: (value: T, index: number, set: any) => boolean, thisArg?: any): boolean {
    let res = false;
    let counter = 0;
    for (const item of this) {
        if (callbackfn(item, counter, thisArg || this)) {
            return true;
        }
        counter++;
    }
    return res;
}

function  setMap<T, U extends object>(callbackfn: (value: T, index: number, set: any) => U, thisArg?: any): Set<U> {
    const res = new Set<U>();
    let counter = 0;
    for (const item of this) {

            res.add(callbackfn(item, counter, thisArg || this));

            counter++;
    }
    return res;
}

function  setWeakMap<T, U extends object>(callbackfn: (value: T, index: number,
                                                       set: any) => U,
                                          thisArg?: any): WeakSet<U> {
            const res = new WeakSet<U>();
            let counter = 0;
            for (const item of this) {

                res.add(callbackfn(item, counter,  thisArg || this));

                counter++;
                }
            return res;
}

function setUnion<T, P>(other: Set<P>): Set<T|P> {
    let result = new Set<T|P>(this);
    for (const item of other) {
        if (!result.has(item)) {
            result.add(item);
        }
    }
    return result;
}
function setIntersect<T, P>(other: Set<P>): Set<T|P> {
    let result = new Set<T|P>();
    for (const item of other) {
        if (this.has(item)) {
            result.add(item);
        }
    }
    return result;
}

function setExcept<T, P>(other: Set<P>): Set<T|P> {
    let result = new Set<T|P>(this);
    for (const item of other) {
        if (result.has(item)) {
            result.delete(item);
        }
    }
    return result;
}

function setXor<T, P>(other: Set<P>): Set<T|P> {
    const unioned = this.union(other);
    const intersected = this.intersect(other);
    return unioned.except(intersected);
}

function setIsSuperSetOf<T, P>(other: Set<P>): boolean {
    let result = true;
    for (const item of other) {
        if (!this.has(item)) {
            return false;
        }
    }
    return result;
}
function setIsSubSetOf<T, P>(other: Set<P>): boolean {
    let result = true;
    for (const item of this) {
        if (!other.has(item)) {
            return false;
        }
    }
    return result;
}

function setIsEmpty(): boolean {
    return this.size === 0;
}

function setJoin(seperator?: string): string {
    let res = "";
    let that: Set<any> = this;
    seperator = seperator !== undefined ? seperator : " , ";
    if (that.size === 0 ) {
           return "";
        } else if (that.size === 1) {
            return (that.values().next().value as any).toString();
        } else {
         const itr = that.values();
         res = (itr.next().value as any).toString();
         for (let item of itr) {
             res = res + seperator + (item as any).toString();
         }
       }
    return res;
}


Array.prototype.toUnique = toUnique;
Array.prototype.itemCount = itemCount;
Array.prototype.findDuplicates = findDuplicates;
Array.prototype.hasDuplicate = hasDuplicate;
Array.prototype.contains = contains;
Array.prototype.linq = getEunmerable;
Array.prototype.plinq = getParallelEunmerable;
Array.prototype.toArray = toArray;
Array.prototype.toList = toList;

Map.prototype.toArray = toArray;
Map.prototype.toList = toList;
Map.prototype.toKeyList = mapKeyToList;
Map.prototype.toValueList = mapValueToList;
Map.prototype.toObject = mapEntriesToObjectDictionary;
Map.prototype.containsKey = mapContainsKey;
Map.prototype.containsValue = mapContainsValue;
Map.prototype.linq = getEunmerable;
Map.prototype.plinq = getParallelEunmerable;
Map.prototype.isEmpty = mapIsEmpty;
Map.prototype.putAll = mapPutAll;
Map.prototype.put = mapPut;
Map.prototype.map = mapMap;

WeakMap.prototype.map = mapWeakMap;
WeakMap.prototype.putAll = mapPutAll;
WeakMap.prototype.put = mapPut;
WeakMap.prototype.isEmpty = mapIsEmpty;
WeakMap.prototype.toArray = toArray;
WeakMap.prototype.toList = toList;
WeakMap.prototype.toKeyList = mapKeyToList;
WeakMap.prototype.toValueList = mapValueToList;
WeakMap.prototype.toObject = mapEntriesToObjectDictionary;
WeakMap.prototype.containsKey = mapContainsKey;
WeakMap.prototype.containsValue = mapContainsValue;
WeakMap.prototype.linq = getEunmerable;
WeakMap.prototype.plinq = getParallelEunmerable;

Set.prototype.linq = getEunmerable;
Set.prototype.plinq = getParallelEunmerable;
Set.prototype.toArray = toArray;
Set.prototype.toList = toList;
Set.prototype.intersect = setIntersect;
Set.prototype.union = setUnion;
Set.prototype.except = setExcept;
Set.prototype.xor = setXor;
Set.prototype.isEmpty = setIsEmpty;
Set.prototype.isSubSetOf = setIsSubSetOf;
Set.prototype.isSuperSetOf = setIsSuperSetOf;
Set.prototype.join = setJoin;
Set.prototype.filter = setFilter;
Set.prototype.find = setFind;
Set.prototype.every = setEvery;
Set.prototype.some = setSome;
Set.prototype.map = setMap;

WeakSet.prototype.linq = getEunmerable;
WeakSet.prototype.plinq = getParallelEunmerable;
WeakSet.prototype.toArray = toArray;
WeakSet.prototype.toList = toList;
WeakSet.prototype.intersect = setIntersect;
WeakSet.prototype.union = setUnion;
WeakSet.prototype.except = setExcept;
WeakSet.prototype.xor = setXor;
WeakSet.prototype.isEmpty = setIsEmpty;
WeakSet.prototype.isSubSetOf = setIsSubSetOf;
WeakSet.prototype.isSuperSetOf = setIsSuperSetOf;
WeakSet.prototype.join = setJoin;
WeakSet.prototype.filter = setWeakFilter;
WeakSet.prototype.find = setFind;
WeakSet.prototype.every = setEvery;
WeakSet.prototype.some = setSome;
WeakSet.prototype.map = setWeakMap;
