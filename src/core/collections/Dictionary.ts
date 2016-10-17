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
 * This File Created by Saeed on 30/04/2016.
 */


import * as collections from './collections';
import {KeyValuePair} from "./collections";

export class Dictionary<K,V> extends collections.ReadOnlyDictionary<K,V> implements collections.IDictionary<K,V> {
    constructor();
    constructor(enumerable:collections.IEnumerable<collections.IKeyValuePair<K,V>>);
    constructor(enumerable:Iterable<collections.IKeyValuePair<K,V>>);
    constructor(enumerable?:collections.IEnumerable<collections.IKeyValuePair<K,V>> | Iterable<collections.IKeyValuePair<K,V>>) {
        super(enumerable);
    }


    add(...items:collections.IKeyValuePair<K,V>[]):boolean;
    add(key:K, value:V):boolean;
    add(item?:any, value?:any):boolean {
        if (item instanceof Array) {
            for (let x of item) {
                this._arr.push(x);
            }
            return true;
        }
        else {
            return this.put(item, <any>value);
        }
    }

    put(key:K, value:V):boolean {
        if (!this.containsKey(key)===true) {
            this._arr.push(new KeyValuePair<K,V>(key, value));
            return true;
        }
        return false;
    }

    remove(key:K):boolean {
        if (this.containsKey(key)===true) {
            let idx = this._arr.findIndex((item)=> {
                return item.getKey() === key;
            });
            return this._arr.splice(idx, 1).length === 1;
        }
        return false;
    }

    clear():boolean {
        this._arr = [];
        return true;
    }

}