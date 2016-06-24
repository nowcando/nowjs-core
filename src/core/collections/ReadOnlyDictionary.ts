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
 * This File Created by Saeed on 24/04/2016.
 */
import  * as core  from '../core';
import * as collections from './collections';

export class ReadOnlyDictionary<K,V>  implements collections.IReadOnlyDictionary<K,V> {

    protected _arr:collections.IKeyValuePair<K,V>[] = new Array<collections.IKeyValuePair<K,V>>();
    private _hashCode:number;

    constructor();
    constructor(enumerable:collections.IEnumerable<collections.IKeyValuePair<K,V>>);
    constructor(enumerable:Iterable<collections.IKeyValuePair<K,V>>);
    constructor(enumerable?:collections.IEnumerable<collections.IKeyValuePair<K,V>> | Iterable<collections.IKeyValuePair<K,V>>) {
        this._hashCode = 0;
        if (enumerable) {
            for (let x of enumerable) {
                if (!this.containsKey(x.getKey()))
                    this._arr.push(x);
            }
        }
    }


    [Symbol.iterator]():collections.IEnumerator<collections.IKeyValuePair<K,V>> {
        return this._arr[Symbol.iterator]();
    }

    linq<T>():collections.Enumerable{
        let itr = this[Symbol.iterator]();
        return new collections.Enumerable(<any>itr);
    }
    plinq<T>():collections.ParallelEnumerable{
        let itr = this[Symbol.iterator]();
        return new collections.ParallelEnumerable(<any>itr);
    }

    equalsTo(a:collections.IReadOnlyDictionary<K,V>):boolean {
        return this.compareTo(a) === 0;
    }

    getHashCode():number {
        return this._hashCode;
    }

    compareTo(a:collections.IReadOnlyDictionary<K,V>):core.IComparator<collections.IReadOnlyDictionary<K,V>> {
        if (<any>a > this) return 1;
        else if (<any>a === this) return 0;
        else return -1;
    }

    containsKey(key:K):boolean {
        let res =  this._arr.find((xx)=> {
                return xx.getKey() === key;
            }) ;
        return res !==  undefined;
    }

    size():number {
        return this._arr.length;
    }

    getItem(key:K):V {
        let xx = this._arr.find((item)=> {
            return item.getKey() === key;
        });
        if (xx) return xx.getValue();
        else {
            return null;
        }
    }

    getKeys():collections.IEnumerable<K> {
        return this._arr.map((item)=> {
            return item.getKey();
        });
    }

    getValues():collections.IEnumerable<V> {
        return this._arr.map((item)=> {
            return item.getValue();
        });
    }

    clone():collections.IReadOnlyDictionary<K,V> {
        return new collections.ReadOnlyDictionary<K,V>(this);
    }

    toArray():collections.IKeyValuePair<K,V>[] {
        let _array:collections.IKeyValuePair<K,V>[] = [];
        for (let xx of this._arr) {
            _array.push(xx);
        }
        return _array;
    }

    toCollection():collections.ICollection<collections.IKeyValuePair<K,V>> {
        return new collections.Collection(this._arr);
    }

    toList():collections.IList<collections.IKeyValuePair<K,V>> {
        return new collections.List(this._arr);
    }
}
