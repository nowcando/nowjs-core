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
import * as nodeunit from 'nodeunit';
import * as nowcando from '../../../src/nowcando';
/**
 * This File Created by Saeed on 24/04/2016.
 */
let col:nowcando.core.collections.LinkedList<string>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        col = new nowcando.core.collections.LinkedList<string>();
        col.add('A');
        col.add('B');
        col.add('C');
        col.add('D');
        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        test.equal(col.size(), 4);
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        col.add("E");
        test.equal(col.size(), 5);
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {

        test.equal(col.indexOf('C'), 2);
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        col.remove('C');
        test.equal(col.size(), 3);
        test.done();
    },

    TC_1_4_1: function (test:nodeunit.Test) {
        col.remove('A');
        test.equal(col.getItem(0), 'B');
        test.equal(col.size(), 3);
        test.done();
    },
    TC_1_4_2: function (test:nodeunit.Test) {
        col.remove('D');
        test.equal(col.getItem(2), 'C');
        test.equal(col.size(), 3);
        test.done();
    },
    TC_1_4_3: function (test:nodeunit.Test) {
        col.clear();
        test.equal(col.size(), 0);
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Collection<string>();
        for (let xx of col) {
            tmp.add(xx);
        }
        test.equal(tmp.size(), 4);
        test.equal(tmp.getItem(0), col.getItem(0));
        test.equal(tmp.getItem(1), col.getItem(1));
        test.equal(tmp.getItem(2), col.getItem(2));
        test.equal(tmp.getItem(3), col.getItem(3));
        test.done();
    }
}


