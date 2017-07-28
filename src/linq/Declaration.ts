import {MemoryParallelQueryableProvider} from "./MemoryParallelQueryableProvider";

// tslint:disable-next-line:no-namespace
import { Enumerable } from "./Enumerable";
import { IParallelQueryable, IQueryable } from "./index";
import { ParallelEnumerable } from "./ParallelEnumerable";

// tslint:disable-next-line:no-namespace
declare global {
    // tslint:disable:interface-name
    /* export interface Iterable<T>{
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    } */
    export interface Array<T> {
        contains(obj: T): boolean;
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface Set<T> {
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface Map<K, V> {
        linq(): IQueryable<[K, V]>;
        plinq(): IParallelQueryable<[K, V]>;
    }
    interface WeakSet<T> {
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface WeakMap<K extends object, V> {
        linq(): IQueryable<[K, V]>;
        plinq(): IParallelQueryable<[K, V]>;
    }
}

function getEunmerable(): Enumerable<any> {
    return new Enumerable<any>(this);
}
function getParallelEunmerable(): ParallelEnumerable<any> {
    return new ParallelEnumerable<any>(this, new MemoryParallelQueryableProvider());
}

Array.prototype.linq = getEunmerable;
Array.prototype.plinq = getParallelEunmerable;
Map.prototype.linq = getEunmerable;
Map.prototype.plinq = getParallelEunmerable;
WeakMap.prototype.linq = getEunmerable;
WeakMap.prototype.plinq = getParallelEunmerable;
Set.prototype.linq = getEunmerable;
Set.prototype.plinq = getParallelEunmerable;
WeakSet.prototype.linq = getEunmerable;
WeakSet.prototype.plinq = getParallelEunmerable;
