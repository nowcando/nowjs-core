/*
 *
 *  *  Copyright 2016 Now Can DO LTD (info(at)nowcando.com)
 *  *
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  *  you may not use this file except in compliance with the License.
 *  *  You may obtain a copy of the License at
 *  *
 *  *       http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  *  distributed under the License is distributed on an "AS IS" BASIS,
 *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *  See the License for the specific language governing permissions and
 *  *  limitations under the License.
 *  *
 *  * For more information: http://www.nowcando.com
 *
 */

/**
 * This File Created by Saeed on 23/04/2016.
 */

import  * as core  from '../core';
import {IComparator} from "../core";
import {Comparable} from "../core";

export enum OrderDirection{
    Asc, Desc
}

export interface  IEnumerator<T> extends Iterator<T> {
}
export interface  IEnumerable<T> extends Iterable<T> {
    [Symbol.iterator]():IEnumerator<T>;

}


export interface  IReadOnlyCollection<T> extends IEnumerable<T>,core.IEqualityComparable<IReadOnlyCollection<T>> {
    contains(item:T):boolean;
    size():number;
    getItem(index:number):T;
    //  [index:number]:T;
    indexOf(item:T):number;
    lastIndexOf(item:T):number;
    clone():IReadOnlyCollection<T>;
    toArray():T[];
    toCollection():ICollection<T>;
    toList():IList<T>;
    linq():Enumerable;
    plinq():ParallelEnumerable
    // new():IReadOnlyCollection<T>;
    // new(enumerable:IEnumerable<T>):IReadOnlyCollection<T>;
    // new(enumerable:Iterable<T>):IReadOnlyCollection<T>;
}
export interface  ICollection<T> extends IReadOnlyCollection<T> {
    add(item:T):boolean;
    add(...items:T[]):boolean;
    remove(item:T):boolean;
    clear():boolean;

}

export interface  IReadOnlySortedCollection<T> extends IEnumerable<T>,core.IEqualityComparable<IReadOnlyCollection<T>> {
    contains(item:T):boolean;
    size():number;
    getItem(index:number):T;
    // [index:number]:T;
    clone():IReadOnlySortedCollection<T>;
    toArray():T[];
    toCollection():ICollection<T>;
    toList():IList<T>;
    new(comparator:((a:T, b:T)=>core.IComparator<T>)):IReadOnlySortedCollection<T>;
    new(comparator:((a:T, b:T)=>core.IComparator<T>), enumerable:IEnumerable<T>):IReadOnlySortedCollection<T>;
    new(comparator:((a:T, b:T)=>core.IComparator<T>), enumerable:Iterable<T>):IReadOnlySortedCollection<T>;
}
export interface  ISortedCollection<T> extends IReadOnlyCollection<T> {
    add(item:T):boolean;
    add(...items:T[]):boolean;
    remove(item:T):boolean;
    clear():boolean;

}


export interface IKeyValuePair<K,V> extends core.IEqualityComparable<IKeyValuePair<K,V>> {
    getKey():K
    getValue():V

    // new(keyvalue:IKeyValuePair<K,V>):IKeyValuePair<K,V>;
    // new(key:K, value:V):IKeyValuePair<K,V>;
}

export class KeyValuePair<K,V> implements IKeyValuePair<K,V> {
    private key:K;
    private value:V;
    private hashCode = 0;

    getKey():K {
        return this.key;
    }

    getValue():V {
        return this.value;
    }

    constructor(keyvalue:IKeyValuePair<K,V>);
    constructor(key:K, value:V);
    constructor(keyvalue:IKeyValuePair<K,V>, value?:V) {
        if (keyvalue && value) {
            this.key = <any>keyvalue;
            this.value = value;
        }
        else if (keyvalue) {
            this.key = keyvalue.getKey();
            this.value = keyvalue.getValue();
        }
    }

    equalsTo(a:IKeyValuePair<K,V>):boolean {
        return this.getHashCode() === a.getHashCode();
    }

    getHashCode():number {
        return this.hashCode;
    }

    compareTo(a:IKeyValuePair<K,V>, b:IKeyValuePair<K,V>):core.IComparator<IKeyValuePair<K,V>> {
        if (<any>a > b) return 1;
        else if (<any>a === this) return 0;
        else return -1;
    }

}


export interface  IReadOnlyDictionary<K,V> extends IEnumerable<IKeyValuePair<K,V>>, core.IEqualityComparable<IReadOnlyDictionary<K,V>> {
    containsKey(key:K):boolean;
    size():number;
    getItem(key:K):V;
    getKeys():IEnumerable<K>;
    getValues():IEnumerable<V>;
    clone():IReadOnlyDictionary<K,V>;
    toArray():IKeyValuePair<K,V>[];
    toCollection():ICollection<IKeyValuePair<K,V>>;
    toList():IList<IKeyValuePair<K,V>>;
    linq():Enumerable;
    plinq():ParallelEnumerable ;
    // new():IReadOnlyDictionary<K,V>;
    //new(enumerable:IEnumerable<IKeyValuePair<K,V>>):IReadOnlyDictionary<K,V>;
    // new(enumerable:Iterable<IKeyValuePair<K,V>>):IReadOnlyDictionary<K,V>;
}

export interface  IReadOnlySortedDictionary<K,V> extends IEnumerable<IKeyValuePair<K,V>>, core.IEqualityComparable<IReadOnlyDictionary<K,V>> {
    containsKey(ite:K):boolean;
    size():number;
    getItem(key:K):V;
    getKeys():IEnumerable<K>;
    getValues():IEnumerable<K>;
    clone():IReadOnlyDictionary<K,V>;
    toArray():IKeyValuePair<K,V>[];
    toCollection():ICollection<IKeyValuePair<K,V>>;
    toList():IList<IKeyValuePair<K,V>>;
    new(comparator:((a:IKeyValuePair<K,V>, b:IKeyValuePair<K,V>)=>core.IComparator<IKeyValuePair<K,V>>)):IReadOnlySortedDictionary<K,V>;
    new(enumerable:IEnumerable<IKeyValuePair<K,V>>):IReadOnlySortedDictionary<K,V>;
    new(enumerable:Iterable<IKeyValuePair<K,V>>):IReadOnlySortedDictionary<K,V>;
}

export interface  IDictionary<K,V> extends IReadOnlyDictionary<K,V>,IEnumerable<IKeyValuePair<K,V>> {
    add(key:K, value:V):boolean;
    add(...items:IKeyValuePair<K,V>[]):boolean;
    put(key:K, value:V):boolean;
    remove(key:K):boolean;
    clear():boolean;
}

export interface  ISortedDictionary<K,V> extends IReadOnlySortedDictionary<K,V>,IEnumerable<IKeyValuePair<K,V>> {
    add(key:K, value:V):boolean;
    add(...items:IKeyValuePair<K,V>[]):boolean;
    put(key:K, value:V):boolean;
    remove(key:K):boolean;
    clear():boolean;
}

export interface  IReadOnlySet<T> extends IReadOnlyCollection<T> {
    isSubSetOf(superSet:ISet<T>):boolean;
    isSuperSetOf(subSet:ISet<T>):boolean;
    union(otherSet:ISet<T>):IReadOnlySet<T>;
    intersect(otherSet:ISet<T>):IReadOnlySet<T>;
    subtract(otherSet:ISet<T>):IReadOnlySet<T>;
}
export interface  ISet<T> extends ICollection<T>, IReadOnlySet<T> {

}
export interface  IReadOnlyList<T> extends IReadOnlyCollection<T> {

}
export interface  IList<T> extends ICollection<T>,IReadOnlyList<T> {

}

export interface  IReadOnlySortedSet<T> extends IReadOnlySortedCollection<T> {

}
export interface  ISortedSet<T> extends IReadOnlySortedSet<T> {
    add(item:T):boolean;
    add(...items:T[]):boolean;
    remove(item:T):boolean;
    clear():boolean;
}

export interface  IReadOnlySortedList<T> extends IReadOnlySortedCollection<T> {

}
export interface  ISortedList<T> extends IReadOnlySortedList<T> {
    add(item:T):boolean;
    add(...items:T[]):boolean;
    remove(item:T):boolean;
    clear():boolean;
}

export interface  IQueue<T> extends IEnumerable<T>,core.IEqualityComparable<IQueue<T>> {
    contains(item:T):boolean;
    size():number;
    clear():boolean;
    enqueue(item:T):boolean;
    enqueue(...items:T[]):boolean;
    dequeue():T;
    peek():T;
    toArray():T[];
    toCollection():ICollection<T>;
    toList():IList<T>;
    linq():Enumerable;
    plinq():ParallelEnumerable;
    // new():IQueue<T>;
    // new(enumerable:IEnumerable<T>):IQueue<T>;
    // new(enumerable:Iterable<T>):IQueue<T>;
}

export interface  IPriorityQueue<T> extends IQueue<T>,core.IEqualityComparable<IPriorityQueue<T>> {

    // new(comparator:((a:T, b:T)=>core.IComparator<T>)):IPriorityQueue<T>;
    // new(comparator:((a:T, b:T)=>core.IComparator<T>), enumerable:IEnumerable<T>):IPriorityQueue<T>;
    // new(comparator:((a:T, b:T)=>core.IComparator<T>), enumerable:Iterable<T>):IPriorityQueue<T>;
}

export interface  IStack<T> extends IEnumerable<T>,core.IEqualityComparable<IStack<T>> {
    contains(item:T):boolean;
    size():number;
    clear():boolean;
    push(item:T):boolean;
    push(...items:T[]):boolean;
    pop():T;
    peek():T;
    toArray():T[];
    toCollection():ICollection<T>;
    toList():IList<T>;
    // new():IStack<T>;
    // new(enumerable:IEnumerable<T>):IStack<T>;
    // new(enumerable:Iterable<T>):IStack<T>;
}

export interface  ILinkedList<E> extends IEnumerable<E>,core.IEqualityComparable<ILinkedList<E>> {
    contains(item:E):boolean;
    size():number;
    clear():boolean;
    add(item:E):boolean;
    add(...items:E[]):boolean;
    add(index:number, item:E):boolean;
    addFirst(item:E):boolean;
    addLast(item:E):boolean;
    [index:number]:E;
    getItem(index:number):E;
    setItem(index:number, item:E):void;
    getFirst():E;
    getLast():E;
    indexOf(item:E):number;
    lastIndexOf(item:E):number;
    remove(item:E):boolean;
    remove(index:number):boolean;
    removeFirst():boolean;
    removeLast():boolean;

    clone():ILinkedList<E>;
    toArray():E[];
    toCollection():ICollection<E>;
    toList():IList<E>;
    linq():Enumerable;
    plinq():ParallelEnumerable

    /* new():ILinkedList<E>;
     new(enumerable:IEnumerable<E>):ILinkedList<E>;
     new(enumerable:Iterable<E>):ILinkedList<E>;*/
}

export interface ILookup<TKey,TValue> {
    Key:TKey;
    Values:IQueryable<TValue>;
}

export interface IGroup<TKey,TValue> extends ILookup<TKey,TValue> {

}
export class ParallelEnumerable {
    constructor(private enumerable:IEnumerable<any> | Iterable<any>) {

    }

    all<T>(predicate:core.Predicate<T>):boolean {

        for (let xx of this.enumerable) {
            if (predicate(xx) === true)return true;
        }
        return false;
    }

    any<T>(predicate:core.Predicate<T>):boolean {
        for (let xx of this.enumerable) {
            if (predicate(xx) === true)return true;
        }
        return false;
    }
}

export interface IQueryable<T> extends IEnumerable<T> {

    aggregate<T>(func:((seed:T, item:T, index?:number, source?:IEnumerable<T>)=>T), seed?:T):T
    all<T>(predicate?:core.Predicate<T>):boolean;
    any<T>(predicate?:core.Predicate<T>):boolean;
    first<T>(predicate?:core.Predicate<T>, defValue?:T):T;
    last<T>(predicate?:core.Predicate<T>, defValue?:T):T;
    single<T>(predicate:core.Predicate<T>, defValue?:any):T;
    contains<T>(item:T):boolean;
    isEmpty<T>():boolean;
    skip<T>(count:number):IQueryable<T>;
    skipWhile<T>(predicate:core.Predicate<T>):IQueryable<T>;
    take<T>(count:number):IQueryable<T>;
    takeWhile<T>(predicate:core.Predicate<T>):IQueryable<T>;
    distinct<T>():IQueryable<T>;
    reverse<T>():IQueryable<T>;
    shuffle<T>():T;
    shuffles<T>(count:number):IQueryable<T>;

    asEnumerable<T>():IEnumerable<T>;
    select<T,TResult>(selector:((item:T)=>TResult)):IQueryable<TResult>;
    selectMany<T,TResult>(selector:((item:T)=>IEnumerable<TResult>)):IQueryable<TResult>;

    indexOf(item:any):number;
    lastIndexOf(item:any):number;

    join<TOuter,TInner,TKey,TResult>(inner:IEnumerable<TInner>,
                                     outerSelector:((item:TOuter)=>TKey),
                                     innerSelector:((item:TInner)=>TKey),
                                     resultSelector:((innerItem:TInner,outerItem:TOuter)=>TResult)
    ):IQueryable<TResult>;

    where<T>(predicate:core.Predicate<T>):IQueryable<T>;
    except<T>(predicate:core.Predicate<T>):IQueryable<T>;
    orderBy<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T>;
    orderByDesc<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T>;

    groupBy<T,TKey>(keySelector:(source:T)=>TKey):IQueryable<IGroup<TKey,T>>;

    count<T>():number;
    count<T>(predicate:core.Predicate<T>):number;
    average<T>():number|T;
    average<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):number|T;
    max<T>():number|T;
    max<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):number|T;
    min<T>():number|T;
    min<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):number|T;
    sum<T>():number;
    sum<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):number;

    forEach<T>(action:(element:T, index:number) => void):void;
    toArray<T>():T[];
    toList<T>():IList<T>;

    intersect<T>(source:IEnumerable<T>,equalityComparator?:((a:any, b:any)=>boolean)):IQueryable<T>;
    subtract<T>(source:IEnumerable<T>,equalityComparator?:((a:any, b:any)=>boolean)):IQueryable<T>;
    union<T>(source:IEnumerable<T>,equalityComparator?:((a:any, b:any)=>boolean)):IQueryable<T>;

    zip<TFirst,TSecond,TResult>(second:TSecond, selector:((tfirst:TFirst, tsecond:TSecond)=>TResult)):IQueryable<TResult>;
}

export interface IOrderedQueryable<T> extends IQueryable<T> {
    thenBy<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T>;
    thenByDesc<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T>;
}


export class Enumerable implements IQueryable<any> {

    protected options:any;
    protected _array:any[];

    constructor(private enumerable:IEnumerable<any> | Iterable<any>,
                options?:{}) {
        if (Array.isArray(enumerable)) {
            this._array = enumerable;
        }
        this.options = options || {};
    }

    [Symbol.iterator]():IEnumerator<any> {
        return this.enumerable[Symbol.iterator]();
    }

    protected  static equalityComparator(a:any,b:any):boolean{
        return core.Comparable.equalityCompare(a,b);
    }

    protected static comparator<T>(a:any, b:any):number {
        return core.Comparable.compare(a, b);
    }

    protected static selector<T>(t:T):any {
        return t;
    }

    static from(enumerable:IEnumerable<any> | Iterable<any>):Enumerable {
        return new Enumerable(enumerable);
    }

    static repeat(result:any, count:number):Enumerable {
        let counter = 0;
        let itr = <Iterable<any>>{
            [Symbol.iterator]: ()=> {
                return {
                    next: () => {
                        if (counter < count) {
                            counter++;
                            return {value: typeof result === "function" ? result() : result, done: false};
                        }
                        else {
                            return {done: true};
                        }

                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    static range(start:number, count:number, step:number = 1):Enumerable {
        let curr = start;
        let counter = 0;
        let itr = <Iterable<any>>{
            [Symbol.iterator]: ()=> {

                return {
                    next: () => {
                        if (counter < count) {
                            counter++;
                            curr += step;
                            return {value: curr, done: false};
                        }
                        else {
                            return {done: true};
                        }

                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    private checkArray() {
        if (!this._array) {
            this._array = [];
            for (let item of this) {
                this._array.push(item);
            }
        }
    }

    aggregate<T>(func:((seed:T, item:T, index?:number, source?:IEnumerable<T>)=>T), seed?:T):T {

        this.checkArray();
        let arr = this._array.slice(0);
        if (seed == null) seed = arr.shift();

        for (let i = 0; i < arr.length; i++)
            seed = func(seed, arr[i], i, this);

        return seed;
    }

    distinct<T>():IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let traversed = new Set<T>();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                return {
                    next: () => {
                        while (true) {
                            let item = enb.next();
                            if (!traversed.has(item.value)) {
                                traversed.add(item.value);
                                return item;
                            }
                        }

                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    reverse<T>():IQueryable<T> {
        this.checkArray();
        let revIt = this._array.reverse();
        return new Enumerable(revIt);
    }

    shuffle<T>():T {
        return this.shuffles<T>(1).first<T>();
    }

    shuffles<T>(count:number):IQueryable<T> {
        let thisme = this;
        let arr = this.toArray<T>();
        let res:T[] = [];
        let mrands = Enumerable.repeat(()=> {
            return Math.floor((Math.random() * arr.length))
        }, count);
        for (let item of mrands) {
            res.push(arr[item]);
        }
        return new Enumerable(res);
    }

    all<T>(predicate:core.Predicate<T>):boolean {
        for (let xx of this.enumerable) {
            if (predicate(xx) === false)return false;
        }
        return true;
    }

    any<T>(predicate:core.Predicate<T>):boolean {
        for (let xx of this.enumerable) {
            if (predicate(xx) === true)return true;
        }
        return false;
    }

    first<T>(predicate?:core.Predicate<T>, defValue?:T):T {
        defValue = defValue ? defValue : null;
        for (let xx of this.enumerable) {
            if (predicate) {
                if (predicate(xx) === true) return xx;
            }
            else {
                return xx;
            }

        }
        return defValue;
    }

    last<T>(predicate?:core.Predicate<T>, defValue?:T):T {
        defValue = defValue ? defValue : null;
        for (let xx of this.enumerable) {
            if (predicate) {
                if (predicate(xx) === true) defValue = xx;
            }
            else {
                defValue = xx;
            }

        }
        return defValue;
    }

    single<T>(predicate:core.Predicate<T>, defValue?:any):T {
        defValue = defValue ? defValue : null;
        for (let xx of this.enumerable) {
            if (predicate) {
                if (predicate(xx) === true) return xx;
            }
            else {
                return xx;
            }

        }
        return defValue;
    }

    isEmpty<T>():boolean {
        return (<any>this.enumerable).next().done
    }

    contains<T>(item:T):boolean {
        for (let x of this) {
            if (x === item)return true;
        }
        return false;
    }

    skip<T>(count:number):IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                for (let i = 0; i < count; i++) {
                    enb.next();

                }
                return {
                    next: () => {
                        return enb.next();
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    skipWhile<T>(predicate:core.Predicate<T>):IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                let xx:any;
                do {
                    xx = enb.next();
                    if (xx && predicate(xx.value) === true) break;
                } while (xx.done === false)
                return {
                    next: () => {
                        return enb.next();
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    take<T>(count:number):IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let i = 0;
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {

                return {
                    next: () => {
                        let x = enb.next();
                        if (i === count) {
                            x.done = true;
                        }
                        i++;
                        return x;
                    }
                }
            }
        };
        return new Enumerable(itr);

    }

    takeWhile<T>(predicate:core.Predicate<T>):IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                let xx:any;
                return {
                    next: () => {
                        xx = enb.next();
                        if (xx && predicate(xx.value) === true) {
                            xx.done = true;
                        }
                        ;
                        return xx;
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    asEnumerable<T>():IEnumerable<T> {
        return new Enumerable(this.enumerable);
    }

    select<T,TResult>(selector:((item:T)=>TResult)):IQueryable<TResult> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                return {
                    next: () => {
                        let nx = enb.next();
                        if (nx.done === false) {
                            nx.value = selector(nx.value);
                        }
                        return nx;
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    selectMany<T,TResult>(selector:((item:T)=>IEnumerable<TResult>)):IQueryable<TResult> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                let itr:any;
                return {
                    next: () => {
                        if (itr) {
                            let nv = itr.next();
                            if (nv.done === false) {
                                return nv;
                            }
                            else {
                                itr = null;
                            }
                        }
                        let nx = enb.next();
                        if (nx.done === false) {
                            nx.value = selector(nx.value);
                            if (<any>nx.value[Symbol.iterator]()) {
                                itr = <any>nx.value[Symbol.iterator]();
                                if (itr) {
                                    let nv = itr.next();
                                    if (nv.done === false) {
                                        return nv;
                                    }
                                    else {
                                        itr = null;
                                    }
                                }
                            }

                        }
                        return nx;
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    indexOf(item:any):number {
        let indx = -1;
        for (let xx of this) {
            indx++;
            if (Enumerable.comparator(xx, item) === 0) return indx;
        }
        return -1;
    }

    lastIndexOf(item:any):number {
        let indx = -1;
        let findex = -1;
        for (let xx of this) {
            indx++;
            if (Enumerable.comparator(xx, item) === 0) findex = indx;
        }
        return findex;

    }

    join<TOuter,TInner,TKey,TResult>(inner:IEnumerable<TInner>,
                                     outerSelector:((item:TOuter)=>TKey),
                                     innerSelector:((item:TInner)=>TKey),
                                     resultSelector:((innerItem:TInner,outerItem:TOuter)=>TResult)
    ):IQueryable<TResult>{
        let itr = <Iterable<TResult>>{
            [Symbol.iterator]: ()=> {
                let enbOuter = <any>this[Symbol.iterator]();
                let enbg:any;
                let getGroup = (groups:IEnumerable<IGroup<TKey,TInner>>,key:TKey)=>{
                    if(!enbg){
                        enbg = <any>groups[Symbol.iterator]();
                    }
                    while(true){
                        let ixg = enbg.next();
                        if(ixg.done===false && ixg.value &&
                            Enumerable.equalityComparator(ixg.value.Key,key)){
                            return ixg.value;
                        }

                        if(ixg.done===true) return null;
                    }


                }
                let ig = (<IQueryable<TInner>>inner).groupBy<TInner,TKey>(innerSelector);
                let oit:any ;
                let xOuter:any;
                return {
                    next: () => {
                        if(oit){
                            let g = oit.next();
                            if(g.done===false){
                                let xx = {done:false,
                                    value:resultSelector(g.value,xOuter.value)};
                                return xx;
                            }
                            else{
                                oit = null;
                            }
                        }
                        xOuter = enbOuter.next();
                        if((xOuter && xOuter.done==false)){
                            let og = getGroup(ig,outerSelector(xOuter.value));
                            if(og){
                                oit = og.Values[Symbol.iterator]();
                                if(oit){
                                    let g = oit.next();
                                    if(g.done===false){
                                        let xx = {done:false,
                                            value:resultSelector(g.value,xOuter.value)};
                                        return xx;
                                    }
                                    else{
                                        oit = null;
                                    }
                                }
                            }

                        }
                        //oit = null;
                        return {done:true};
                    }
                }
            }
        }
        return new Enumerable(itr);
    }

    where<T>(predicate:core.Predicate<T>):IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let yy:any;
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {

                return {
                    next: () => {
                        let xx:any;
                        do {
                            xx = enb.next();
                            if (xx && predicate(xx.value) === true) {
                                yy = xx;
                                break;
                            }

                        } while (xx.done === false);
                        if (xx.done === true) {
                            yy.done = true;
                        }
                        return yy;
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    except<T>(predicate:core.Predicate<T>):IQueryable<T> {
        let thisme = this;
        let enb = <any>thisme.enumerable[Symbol.iterator]();
        let itr = <Iterable<T>>{
            [Symbol.iterator]: ()=> {
                let xx:any;
                return {
                    next: () => {
                        xx = enb.next();
                        if (xx && predicate(xx.value) === true) {
                            do {
                                xx = enb.next();
                                if (xx && predicate(xx.value) === false) break;
                            }
                            while (xx.done === false);
                        }
                        ;
                        return xx;
                    }
                }

            }
        };
        return new Enumerable(itr);
    }

    orderBy<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T> {
        this.checkArray();

        comparator = comparator || Enumerable.comparator;
        let cmp = (a:T, b:T)=> {
            return comparator(selector(a), selector(b));
        }
        this._array = this._array.sort(cmp);
        return new OrderedEnumerable(this._array);
    }

    orderByDesc<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T> {
        comparator = comparator || Enumerable.comparator;
        return this.orderBy<T>(selector, function (a, b) {
            return -comparator(a, b);
        });
    }

    groupBy<T,TKey>(keySelector:(item:IEnumerable<T>)=>TKey):IQueryable<IGroup<TKey,T>> {
        let groups = new Map<TKey,T[]>();
        for (let item of this.enumerable) {
            let key = keySelector(item);
            let vv = groups.get(key);
            if (vv) {
                vv.push(item)
            }
            else {
                let lst:any[] = [];
                lst.push(item);
                groups.set(key, lst);
            }
        }
        let list:any[] = [];
        groups.forEach((v, k)=> {
            list.push(<any>{Key: k, Values: v})
        });

        return new Enumerable(list);
    }

    count<T>():number;
    count<T>(predicate:core.Predicate<T>):number;
    count<T>(predicate?:core.Predicate<T>):number {
        let i = -1;
        for (let xx of this) {
            if (predicate) {
                if (predicate(xx)) i++;
            }
            else {
                i++;
            }

        }
        return i + 1;
    }

    average<T>():T;
    average<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):T;
    average<T>(selector?:((item:T)=>any), predicate?:core.Predicate<T>):T {
        let res = 0;
        let count = 0;
        for (let x of this.enumerable) {
            let xx = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) {
                    res += xx;
                    count++;
                }

            }
            else {
                res += xx;
                count++;
            }


        }

        return <any>(res / count);
    }

    max<T>():T;
    max<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):T;
    max<T>(selector?:((item:T)=>any), predicate?:core.Predicate<T>):T {
        let res = selector ? selector(this.first<T>()) : this.first<T>();

        for (let x of this) {
            let xx = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) {

                    if(Enumerable.comparator(xx,res)===1)res=xx;
                }

            }
            else {
                if(Enumerable.comparator(xx,res)===1)res=xx;
            }


        }

        return res;
    }

    min<T>():T;
    min<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):T;
    min<T>(selector?:((item:T)=>any), predicate?:core.Predicate<T>):T {
        let res = selector ? selector(this.first<T>()) : this.first<T>();

        for (let x of this) {
            let xx = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) {

                    if(Enumerable.comparator(xx,res)===-1)res=xx;
                }

            }
            else {
                if(Enumerable.comparator(xx,res)===-1)res=xx;
            }


        }

        return res;
    }

    sum<T>():number;
    sum<T>(selector:((item:T)=>any), predicate?:core.Predicate<T>):number;
    sum<T>(selector?:((item:T)=>any), predicate?:core.Predicate<T>):number {
        let res = 0;

        for (let x of this) {
            let xx = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) res += xx;
            }
            else {
                res += xx;
            }

        }
        return res;
    }

    intersect<T>(source:IEnumerable<T>,equalityComparator?:((a:any, b:any)=>boolean)):IQueryable<T>{
        equalityComparator = equalityComparator || Enumerable.equalityComparator;
        let wset = new core.collections.Set<T>();
        for(let xx of source){if(this.contains(xx)) wset.add(xx);}
        return new Enumerable(wset);

    }

    subtract<T>(source:IEnumerable<T>,equalityComparator?:((a:any, b:any)=>boolean)):IQueryable<T>{
        equalityComparator = equalityComparator || Enumerable.equalityComparator;
        let wset = new core.collections.Set<T>();
        let inter = this.intersect(source);
        for(let xx of source){if(!inter.contains(xx)) wset.add(xx);}
        for(let xx of this){if(!inter.contains(xx)) wset.add(xx);}
        return new Enumerable(wset);
    }

    union<T>(source:IEnumerable<T>,equalityComparator?:((a:any, b:any)=>boolean)):IQueryable<T>{
        equalityComparator = equalityComparator || Enumerable.equalityComparator;
        let wset = new core.collections.Set<T>();
        for(let xx of this){wset.add(xx);}
        for(let xx of source){if(!wset.contains(xx)) wset.add(xx);}
        return new Enumerable(wset);
    }

    forEach<T>(action:(element:T, index:number) => void):void {
        let i = 0;
        for (let x of this) {
            action(x, i++);
        }
    }

    toArray<T>():T[] {
        let aa:any[] = [];
        for (let x of this.enumerable) {
            aa.push(x);
        }
        return aa;
    }

    toList<T>():IList<T> {
        let xx = new core.collections.List<T>();
        for (let x  of this.enumerable) {
            xx.add(x);
        }
        return xx;
    }

    zip<TFirst,TSecond,TResult>(second:IEnumerable<TSecond>, selector:((tfirst:TFirst, tsecond:TSecond)=>TResult)):IQueryable<TResult> {
        let thisme = this;
        let enb1 = <any>thisme.enumerable[Symbol.iterator]();
        let enb2 = new Enumerable(second)[Symbol.iterator]();
        let itr = <Iterable<TResult>>{
            [Symbol.iterator]: ()=> {
                return {
                    next: () => {
                        let item1 = enb1.next();
                        let item2 = enb2.next();
                        if (item1.done === false && item2.done === false) {
                            return {value: selector(item1.value, item2.value), done: false};
                        }
                        else {
                            return {done: true};
                        }

                    }
                }

            }
        };
        return new Enumerable(itr);
    }

}

export class OrderedEnumerable extends Enumerable implements IOrderedQueryable<any> {

    // private _array:any[];
    constructor(enumerable:IEnumerable<any> | Iterable<any>,
                options?:{}) {
        super(enumerable, options)
        if (Array.isArray(enumerable)) {
            this._array = enumerable;
        }

    }

    thenBy<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T> {
        comparator = comparator || Enumerable.comparator;
        let cmp = (a:T, b:T)=> {
            return comparator(selector(a), selector(b));
        }
        return this.orderBy<T>(Enumerable.selector, function (a, b) {
            var res = cmp(a, b);
            return res === 0 ? comparator(selector(a), selector(b)) : res;
        });

    }

    thenByDesc<T>(selector:((item:T)=>any), comparator?:((a:any, b:any)=>number)):IOrderedQueryable<T> {
        comparator = comparator || Enumerable.comparator;
        let cmp = (a:T, b:T)=> {
            return comparator(selector(a), selector(b));
        }
        return this.orderBy<T>(Enumerable.selector, function (a, b) {
            var res = cmp(a, b);
            return res === 0 ? -comparator(selector(a), selector(b)) : res;
        });
    }
}

declare global {
    export interface Array<T> {
        contains(obj:T):boolean;
        linq():Enumerable;
        plinq():Enumerable;
    }
    interface Set<T> {
        linq():Enumerable;
        plinq():Enumerable;
    }
    interface Map<K,V> {
        linq():Enumerable;
        plinq():Enumerable;
    }
    interface WeakSet<T> {
        linq():Enumerable;
        plinq():Enumerable;
    }
    interface WeakMap<K,V> {
        linq():Enumerable;
        plinq():Enumerable;
    }
}

export function getEunmerable():Enumerable {
    return new Enumerable(this);
}

Array.prototype.contains = function (obj:any) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;

}
Array.prototype.linq = getEunmerable;
Array.prototype.plinq = getEunmerable;
Map.prototype.linq = getEunmerable;
Map.prototype.plinq = getEunmerable;
WeakMap.prototype.linq = getEunmerable;
WeakMap.prototype.plinq = getEunmerable;
Set.prototype.linq = getEunmerable;
Set.prototype.plinq = getEunmerable;
WeakSet.prototype.linq = getEunmerable;
WeakSet.prototype.plinq = getEunmerable;


export *   from './ReadOnlyCollection';
export *   from './Collection';
export *   from './ReadOnlyDictionary';
export *   from './ReadOnlyList';
export *   from './ReadOnlySet';
export *   from './Dictionary';
export *   from './List';
export *   from './Set';
export *   from './LinkedList';
export *   from './Queue';
export *   from './Stack';
export *   from './PriorityQueue';
//export {ReadOnlyCollection}