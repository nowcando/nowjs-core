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
import  * as collections  from './collections';




export class ReadOnlyCollection<T> implements collections.IReadOnlyCollection<T> {
    protected _arr:T[] = [];
    private _hashCode:number;

    constructor();
    constructor(enumerable:collections.IEnumerable<T>);
    constructor(enumerable:Iterable<T>);
    constructor(enumerable?:collections.IEnumerable<T> | Iterable<T>) {
        this._hashCode = 0;
        if(enumerable){
            for (let x of enumerable) {
                this._arr.push(x);
            }
        }

    }

    [Symbol.iterator]():collections.IEnumerator<T> {
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
    equalsTo(a:collections.IReadOnlyCollection<T>):boolean {
        return this.getHashCode()===a.getHashCode();
    }

    getHashCode():number {
        return this._hashCode;
    }



    contains(item:T):boolean {
        return this._arr.some((elem)=> {
            return item === elem;
        });
    }

    size():number {
        return this._arr.length;
    }

    getItem(index:number):T {
        return this._arr[index];
    }

    indexOf(item:T):number {
        return this._arr.indexOf(item)
    }

    lastIndexOf(item:T):number {
        return this._arr.lastIndexOf(item)
    }

    clone():collections.IReadOnlyCollection<T> {
        return (new ReadOnlyCollection(this));
    }

    toArray():T[] {
        let m:T[] = [];
        for (let x of this._arr) {
            m.push(x);
        }
        return m;
    }

    toCollection():collections.ICollection<T> {
        return new collections.Collection(this);
    }

    toList():collections.IList<T> {
        return new collections.List(this);
    }


}
    
