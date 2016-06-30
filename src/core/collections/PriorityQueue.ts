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
import {IComparable} from "../core";

export class PriorityQueue<T>  implements collections.IPriorityQueue<T> {
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

    equalsTo(a:collections.IPriorityQueue<T>):boolean {
        return this.getHashCode() === a.getHashCode();
    }

    getHashCode():number {
        return this._hashCode;
    }

 /*    compareTo(a:T):core.IComparator<T> {
             if (<any>a > this) return 1;
             else if (<any>a === this) return 0;
             else return -1;
     }*/

    [Symbol.iterator]():collections.IEnumerator<T> {
        return this._arr[Symbol.iterator]();
    }

    linq<T>():collections.IQueryable<T>{
        let itr = this[Symbol.iterator]();
        return new collections.Enumerable(<any>itr);
    }
    plinq<T>():collections.IParallelQueryable<T>{
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
                this.add(items);
            }
            return true;
        }
        else{
          this.add(items);
            return true;
        }

    }
    private getComparator(a:any,b:any):core.IComparator<T>{
        if(typeof a === "string"){
            return (<any>a).localeCompare(<any>b);
        }
        else if(typeof a === "number") {

            if (a > b) return 1;
            else if (a === b) return 0;
            else return -1;
        }
        else if(a && a["compareTo"]){
            return a.compareTo(b);
        }
        else if(b && b["compareTo"]){
            return b.compareTo(a) * -1;
        }
        else if(!b && !a){
            return 0;
        }
        else{
            if (a > b) return 1;
            else if (a === b) return 0;
            else return -1;
        }
    }
    
    private add(item:T):boolean{
        this._arr.push(item);
        let ci = this._arr.length - 1;
        while (ci > 0)
        {
            let pi = (ci - 1) / 2;
            if (this.getComparator(this._arr[ci],this._arr[pi]) >= 0) break;
            let tmp = this._arr[ci];
            this._arr[ci] = this._arr[pi];
            this._arr[pi] = tmp;
            ci = pi;
        }
        return true;
    }
    dequeue():T{

        let li = this._arr.length - 1;
        let frontItem = this._arr[0];
        this._arr[0] = this._arr[li];
        this._arr.shift();

        --li; // last index (after removal)
        let pi = 0; // parent index. start at front of pq
        while (true)
        {
            let ci = pi * 2 + 1; // left child index of parent
            if (ci > li) break;  // no children so done
            let rc = ci + 1;     // right child
            if (rc <= li && this.getComparator(this._arr[rc],this._arr[ci]) < 0) // if there is a rc (ci + 1), and it is smaller than left child, use the rc instead
                ci = rc;
            if ( this.getComparator(this._arr[pi],this._arr[ci])  <= 0) break; // parent is smaller than (or equal to) smallest child so done
            let tmp = this._arr[pi];
            this._arr[pi] = this._arr[ci];
            this._arr[ci] = tmp; // swap parent and child
            pi = ci;
        }
        return frontItem;
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