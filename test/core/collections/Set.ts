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
import * as nowcando from '../../../src/nowcando';
/**
 * This File Created by Saeed on 24/04/2016.
 */
let _data:nowcando.core.collections.Set<string>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        _data = new nowcando.core.collections.Set<string>();
        _data.add('A');
        _data.add('B');
        _data.add('C');
        _data.add('D');
        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        test.equal(_data.size(), 4);
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        _data.add("F");
        test.equal(_data.size(), 5);
        test.done();
    },
    TC_1_2_1: function (test:nodeunit.Test) {
        _data.add("F");
        _data.add("F");
        test.equal(_data.size(), 5);
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {

        test.equal(_data.indexOf('B'), 1);
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        _data.remove('C');
        test.equal(_data.size(), 3);
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Set<string>();
        for (let xx of _data) {
            tmp.add(xx);
        }
        test.equal(tmp.size(), 4);
        test.done();
    },
    TC_1_6: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Set<string>();
        tmp.add('C');
        tmp.add('D');
        let u = tmp.union(_data);
        test.equal(tmp.size(), 2);
        test.equal(u.size(), 4);
        test.done();
    },
    TC_1_7: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Set<string>();
        tmp.add('C');
        tmp.add('D');
        let actual = tmp.intersect(_data);
        test.equal(tmp.size(), 2);
        test.equal(actual.size(), 2);
        test.done();
    }
    ,
    TC_1_8: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Set<string>();
        tmp.add('C');
        tmp.add('D');
        let actual = tmp.subtract(_data);
        test.equal(tmp.size(), 2);
        test.equal(actual.size(), 2);
        test.done();
    },

    TC_1_9: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Set<string>();
        tmp.add('C');
        tmp.add('D');
        let actual = tmp.isSubSetOf(_data);
        test.equal(tmp.size(), 2);
        test.equal(actual, true);
        test.done();
    }
    ,

    TC_1_10: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Set<string>();
        tmp.add('C');
        tmp.add('D');
        let actual = tmp.isSuperSetOf(_data);
        test.equal(tmp.size(), 2);
        test.equal(actual, false);
        test.done();
    }
}


