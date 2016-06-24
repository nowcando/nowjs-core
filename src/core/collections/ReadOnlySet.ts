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

import * as collections from './collections';
export class ReadOnlySet<T> extends collections.ReadOnlyCollection<T> implements collections.IReadOnlySet<T> {
    constructor();
    constructor(enumerable:collections.IEnumerable<T>);
    constructor(enumerable:Iterable<T>);
    constructor(enumerable?:collections.IEnumerable<T> | Iterable<T>) {
        super(enumerable);
    }

    isSubSetOf(superSet:collections.ISet<T>):boolean {
        for (let x of this) {
            if (!superSet.contains(x)) return false;
        }
        return true;
    }

    isSuperSetOf(subSet:collections.ISet<T>):boolean {
        for (let x of subSet) {
            if (!this.contains(x)) return false;
        }
        return true;
    }

    union(otherSet:collections.ISet<T>):collections.IReadOnlySet<T> {
        let u = new ReadOnlySet<T>(this);

        for (let x of otherSet) {
            if (!u.contains(x)) u._arr.push(x);
        }
        return u;
    }

    intersect(otherSet:collections.ISet<T>):collections.IReadOnlySet<T> {
        let u = new ReadOnlySet<T>();
        for (let x of otherSet) {
            if (this.contains(x)) u._arr.push(x);
        }
        return u;
    }

    subtract(otherSet:collections.ISet<T>):collections.IReadOnlySet<T> {
        let u = new ReadOnlySet<T>();
        let i = this.intersect(otherSet);
        for (let x of otherSet) {
            if (!i.contains(x)) u._arr.push(x);
        }
        for (let x of this) {
            if (!i.contains(x)) u._arr.push(x);
        }
        return u;
    }
}
