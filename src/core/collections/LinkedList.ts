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
 * This File Created by Saeed on 01/05/2016.
 */
import * as collections from './collections';


export class LinkedNode<T> {
    private _Value:T;
    private _Next:LinkedNode<T>;
    private _Prev:LinkedNode<T>;

    constructor(value:T, next:LinkedNode<T>, prev:LinkedNode<T>) {
        this._Next = next;
        this._Prev = prev;
        this._Value = value;
    }

    get Value():T {
        return this._Value;
    }

    get Next():LinkedNode<T> {
        return this._Next;
    }

    get Prev():LinkedNode<T> {
        return this._Prev;
    }

    set Value(value:T) {
        this._Value = value;
    }

    set Next(value:LinkedNode<T>) {
        this._Next = value;
    }

    set Prev(value:LinkedNode<T>) {
        this._Prev = value;
    }
}
export class LinkedList<E>  implements collections.ILinkedList<E> {

    protected _arr:E[] = [];
    protected _first:LinkedNode<E>;
    protected _last:LinkedNode<E>;
    private _hashCode:number;


    constructor();
    constructor(enumerable:collections.IEnumerable<E>);
    constructor(enumerable:Iterable<E>);
    constructor(enumerable?:collections.IEnumerable<E> | Iterable<E>) {
        this._hashCode = 0;
        if (enumerable) {
            for (let x of enumerable) {
                this.add(x);
            }
        }
    }

    equalsTo(a:collections.ILinkedList<E>):boolean {
        return this.getHashCode() === a.getHashCode();
    }

    getHashCode():number {
        return this._hashCode;
    }

    linq<T>():collections.IQueryable<T>{
        let itr = this[Symbol.iterator]();
        return new collections.Enumerable<T>(<any>itr);
    }
    plinq<T>():collections.IParallelQueryable<T>{
        let itr = this[Symbol.iterator]();
        return new collections.ParallelEnumerable(<any>itr);
    }

    [index:number]:E;
    [Symbol.iterator]():collections.IEnumerator<E> {
        var nextNode = this._first;
        return <any>{
            next: function() {
                if (nextNode) {
                    let res ={ value: nextNode.Value, done: false };
                    nextNode = nextNode.Next;
                    return res;
                } else {
                    return { done: true };
                }

            }

        };
    }



    contains(item:E):boolean {
        return this._arr.findIndex((xx)=> {
                return xx === item
            }) >= 0;
    }


    size():number {
        if(!this._first)return 0;
        let node = this._first;
        let counter = 1;
        while (node.Next) {
            counter++;
            node = node.Next;
        }
        return counter;
    }

    clear():boolean {
        this._first = null;
        return true;
    }

    add(item:E):boolean;
    add(...items:E[]):boolean;
    add(index:number, item:E):boolean;
    add(arg:number|E, item?:E):boolean {
        if (!this._first) {
            this._first = new LinkedNode(<E>arg, null, null);
            this._last = this._first;
        }
        else if (this._first) {
            if (arg && item) {
                let node = this.getNodeByIndex(<number>arg);
                node.Next = new LinkedNode(<E>arg, node.Next, node);
            }
            else {
                let node = this.getLastNode();
                node.Next = new LinkedNode(<E>arg, null, node);
                this._last = node.Next;
            }

        }
        return true;
    }

    addFirst(item:E):boolean {
        return this.add(0, item);
    }

    addLast(item:E):boolean {
        if (this.size() === 0) return this.add(0, item);
        return this.add(this.size() - 1, item);
    }

    //[index:number]:E;
    getItem(index:number):E {
        let node = this.getNodeByIndex(index);
        if (node) return node.Value;
        else return null;
    }

    setItem(index:number, item:E):void {
        let node = this.getNodeByIndex(index);
        if (node)  node.Value = item;
    }

    private getNodeByIndex(index:number):LinkedNode<E> {
        let node = this._first;
        let counter = 0;
        while (node.Next && counter !== index) {
            counter++;
            node = node.Next;
        }
        return node;
    }

    private getNodeByValue(item:E):LinkedNode<E> {
        let node = this._first;
        while (node.Next && node.Value !== item) {
            node = node.Next;
        }
        return node;
    }

    private getFirstNode():LinkedNode<E> {
        return this._first;
    }

    private getLastNode():LinkedNode<E> {
        return this._last;
    }


    getFirst():E {
        let node = this.getFirstNode();
        if (node) return node.Value;
        else return null;
    }

    getLast():E {
        let node = this.getLastNode();
        if (node) return node.Value;
        else return null;
    }

    indexOf(item:E):number {
        let node = this._first;
        let counter = 0;
        while (node.Next  && node.Value !== item) {
            node = node.Next;
            counter++;
        }
        return counter;
    }

    lastIndexOf(item:E):number {
        let node = this._first;
        let counter = -1;
        let lf = -1;
        while (node.Next ) {
            node = node.Next;
            counter++;
            if (node.Value !== item)lf = counter;
        }
        return counter;
    }

    remove(item:E):boolean ;
    remove(index:number):boolean ;
    remove(item:E | number):boolean {
        let node = this._first;
       if(typeof item==="number"){
            node = this.getNodeByIndex(item);
       }
        else{
           node = this.getNodeByValue(item);
       }
        if(node){
            let pnode = node.Prev;
            let nnode = node.Next;

            if(node===this._first){
                nnode.Prev = pnode;
                this._first = nnode;
            }
            else if(node===this._last){
                pnode.Next = nnode;
                this._last = pnode;
            }
            else{
                pnode.Next = nnode;
                nnode.Prev = pnode;
            }

            node=null;
            //delete node;
            return true;
        }

    }

    removeFirst():boolean {
        return this.remove(0);
    }

    removeLast():boolean {
        return this.remove(this.size()-1);
    }

    clone():collections.ILinkedList<E> {
        return new LinkedList<E>(this);
    }

    toArray():E[] {
        let m:E[] = [];
        for (let x of this._arr) {
            m.push(x);
        }
        return m;
    }

    toCollection():collections.ICollection<E> {
        return new collections.Collection(this);
    }

    toList():collections.IList<E> {
        return new collections.List(this);
    }
}
