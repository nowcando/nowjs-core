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
    plinq():ParallelEnumerable
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

    all<T>(predicate:core.Predicate<T>):boolean;
    any<T>(predicate:core.Predicate<T>):boolean;
    first<T>(predicate?:core.Predicate<T>, defValue?:T):T;
    last<T>(predicate?:core.Predicate<T>, defValue?:T):T;
    single<T>(predicate:core.Predicate<T>, defValue?:any):T;
    contains<T>(item:T):boolean;
    isEmpty<T>():boolean;
    skip<T>(count:number):IQueryable<T>;
    skipWhile<T>(predicate:core.Predicate<T>):IQueryable<T>;
    take<T>(count:number):IQueryable<T>;
    takeWhile<T>(predicate:core.Predicate<T>):IQueryable<T>;

    asEnumerable<T>():IEnumerable<T>;
    where<T>(predicate:core.Predicate<T>):IQueryable<T>;
    except<T>(predicate:core.Predicate<T>):IQueryable<T>;
    orderBy<T>(itemPath:string, direction:OrderDirection):IOrderedQueryable<T>;


    count<T>():number;
    count<T>(predicate:core.Predicate<T>):number;
    average<T>():number|T;
    average<T>(itemPath:string, predicate?:core.Predicate<T>):number|T;
    max<T>():number|T;
    max<T>(itemPath:string, predicate?:core.Predicate<T>):number|T;
    min<T>():number|T;
    min<T>(itemPath:string, predicate?:core.Predicate<T>):number|T;
    sum<T>():number;
    sum<T>(itemPath:string, predicate?:core.Predicate<T>):number;

    forEach<T>(action:(element:T, index:number) => void):void;
    toArray<T>():T[];
    toList<T>():IList<T>;

}

export interface IOrderedQueryable<T> extends IQueryable<T> {
    // thenBy(keySelector:(element:any) => any):IOrderedQueryable<T>;
    // thenByDesc(keySelector:(element:any) => any):IOrderedQueryable<T>;
}

export class Enumerable implements IEnumerable<any> {
    constructor(private enumerable:IEnumerable<any> | Iterable<any>) {

    }

    [Symbol.iterator]():IEnumerator<any> {
        return this.enumerable[Symbol.iterator]();
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
        for (let x of this.enumerable) {
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

    orderBy<T>(itemPath:string, direction:OrderDirection):IOrderedQueryable<T> {
        return null;
    }


    count<T>():number;
    count<T>(predicate?:core.Predicate<T>):number {
        let i = -1;
        for (let xx of this.enumerable) {
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
    average<T>(itemPath?:string, predicate?:core.Predicate<T>):T {
        let res = 0;
        let count = 0;
        for (let x of this.enumerable) {
            if (predicate) {
                if (predicate(x) === true) {
                   res += x;
                    count++;
                }

            }
            else {
                res += x;
                count++;
            }


        }

        return <any>(res/count);
    }

    max<T>():T;
    max<T>(itemPath?:string, predicate?:core.Predicate<T>):T {
        let res = this.first<T>();

        for (let x of this.enumerable) {
            if (predicate) {
                if (predicate(x) === true) {
                    if (x instanceof Object) {
                        if ((<core.IComparable<T>>x).compareTo(x) === 1)res = x;
                    }
                    else {
                        if (x > res)res = x;
                    }
                }

            }
            else {
                if (x instanceof Object) {
                    if ((<core.IComparable<T>>x).compareTo(x) === 1)res = x;
                }
                else {
                    if (x > res)res = x;
                }
            }


        }

        return res;
    }

    min<T>():T;
    min<T>(itemPath?:string, predicate?:core.Predicate<T>):T {
        let res = this.first<T>();

        for (let x of this.enumerable) {
            if (predicate) {
                if (predicate(x) === true) {
                    if (x instanceof Object) {
                        if ((<core.IComparable<T>>x).compareTo(x) === -1)res = x;
                    }
                    else {
                        if (x < res)res = x;
                    }
                }

            }
            else {
                if (x instanceof Object) {
                    if ((<core.IComparable<T>>x).compareTo(x) === -1)res = x;
                }
                else {
                    if (x < res)res = x;
                }
            }
        }

        return res;
    }

    sum<T>():number;
    sum<T>(itemPath?:string, predicate?:core.Predicate<T>):number {
        let res = 0;

        for (let x of this.enumerable) {
            if (predicate) {
                if (predicate(x) === true) res += x;
            }
            else {
                res += x;
            }

        }
        return res;
    }

    forEach<T>(action:(element:T, index:number) => void):void {
        let i = 0;
        for (let x of this.enumerable) {
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

}


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