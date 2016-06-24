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

export class Queue<T>  implements collections.IQueue<T> {
    protected _arr:T[] = [];
    private _hashCode:number;
    constructor();
    constructor(enumerable:collections.IEnumerable<T>);
    constructor(enumerable:Iterable<T>);
    constructor(enumerable?:collections.IEnumerable<T> | Iterable<T>) {
        this._hashCode = 0;
        if(enumerable){
            for (let x of enumerable) {
                this.enqueue(x);
            }
        }
    }

    equalsTo(a:collections.IQueue<T>):boolean {
        return this.compareTo(this,a) === 0;
    }

    getHashCode():number {
        return this._hashCode;
    }

    compareTo(a:collections.IQueue<T>, b:collections.IQueue<T>):core.IComparator<collections.IQueue<T>> {
        if (<any>a > b) return 1;
        else if (<any>a === this) return 0;
        else return -1;
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

    contains(item:T):boolean{
        return this._arr.findIndex((xx)=>{return xx===item }) >=0;
    }
    size():number{return this._arr.length;}
    clear():boolean{ this._arr = [] ;return true;}
    enqueue(item:T):boolean;
    enqueue(...items:T[]):boolean;
    enqueue(items:any):boolean{
        if(items instanceof  Array){
            for(let xx of items){
                this._arr.push(items);
            }
            return true;
        }
        else{
          this._arr.push(items);
            return true;
        }

    }
    dequeue():T{
       return this._arr.shift();
    }
    peek():T{
        if(this._arr.length>0)
             return this._arr[0];
        else return null;
    }
    toArray():T[]{
        let _array:T[] = [];
        for (let xx of this._arr) {
            _array.push(xx);
        }
        return _array;
    }
    toCollection():collections.ICollection<T>{
        return new collections.Collection(this._arr);
    }
    toList():collections.IList<T>{
        return new collections.List(this._arr);
    }
    // new():collections.IQueue<T>;
    // new(enumerable:collections.IEnumerable<T>):collections.IQueue<T>;
    // new(enumerable:Iterable<T>):collections.IQueue<T>;
}