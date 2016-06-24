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
let alphanums:nowcando.core.collections.List<string>;
let numbers:nowcando.core.collections.List<number>;
let objects:nowcando.core.collections.List<any>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        alphanums= new nowcando.core.collections.List<string>();
        alphanums.add('A');
        alphanums.add('B');
        alphanums.add('C');
        alphanums.add('D');

        numbers = new nowcando.core.collections.List<number>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        numbers.add(4);


        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().any((x)=> {
            return x == 'C';
        }), true);
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().any((x)=> {
            return x == 'F';
        }), false);
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().all((x)=> {
            return x.length === 1;
        }), true);
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().all((x)=> {
            return x.length === 2;
        }), false);
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().first(), 'A');
        test.done();
    },
    TC_1_6: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().first((x)=> {
            return x === 'C';
        }), 'C');
        test.done();
    }
    ,
    TC_1_7: function (test:nodeunit.Test) {
        alphanums.add('F');
        test.equal(alphanums.size(), 5);
        test.equal(alphanums.linq().last(), 'F');
        test.done();
    },
    TC_1_8: function (test:nodeunit.Test) {
        alphanums.add('F');
        alphanums.add('C');
        test.equal(alphanums.size(), 6);
        test.equal(alphanums.linq().last((x)=> {
            return x === 'C';
        }), 'C');
        test.done();
    },
    TC_1_9: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        test.equal(alphanums.linq().isEmpty(), false);
        test.done();
    },
    TC_1_10: function (test:nodeunit.Test) {
        alphanums.clear();
        test.equal(alphanums.size(), 0);
        test.equal(alphanums.linq().isEmpty(), true);
        test.done();
    }
    ,
    TC_1_11: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        let xx = alphanums.linq().skip(2).first();
        test.equal(xx, 'C');
        test.done();
    },
    TC_1_12: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        let xx = alphanums.linq().skipWhile((x)=> {
            return x === 'B';
        }).first();
        test.equal(xx, 'C');
        test.done();
    }
    ,
    TC_1_13: function (test:nodeunit.Test) {
        alphanums.add('E');
        alphanums.add('F');
        test.equal(alphanums.size(), 6);
        let xx = alphanums.linq().take(3).last();
        test.equal(xx, 'C');
        test.done();
    },
    TC_1_14: function (test:nodeunit.Test) {
        alphanums.add('E');
        alphanums.add('F');
        test.equal(alphanums.size(), 6);
        let xx = alphanums.linq().skip(2).take(3).last();
        test.equal(xx, 'E');
        test.done();
    }
    ,
    TC_1_15: function (test:nodeunit.Test) {
        alphanums.add('E');
        alphanums.add('F');
        test.equal(alphanums.size(), 6);
        let xx = alphanums.linq().skip(1).takeWhile((x)=> {
            return x === 'D';
        }).last();
        test.equal(xx, 'C');
        test.done();
    }
    ,
    TC_1_16: function (test:nodeunit.Test) {
        alphanums.add('E');
        alphanums.add('C');
        alphanums.add('E');
        alphanums.add('C');
        test.equal(alphanums.size(), 8);
        let xx = alphanums.linq().where((x)=> {
            return x === 'C';
        }).count();
        test.equal(xx, 3);
        test.done();
    }
    ,
    TC_1_17: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        let xx = alphanums.linq().max();
        test.equal(xx, 'D');
        test.done();
    },
    TC_1_18: function (test:nodeunit.Test) {
        test.equal(alphanums.size(), 4);
        let xx = alphanums.linq().min();
        test.equal(xx, 'A');
        test.done();
    }
    ,
    TC_1_19: function (test:nodeunit.Test) {
        
        test.equal(numbers.size(), 4);
        let xx = numbers.linq().average();
        test.equal(xx, 2.5);
        test.done();
    },
    TC_1_20: function (test:nodeunit.Test) {
        test.equal(numbers.size(), 4);
        let xx = numbers.linq().sum();
        test.equal(xx, 10);
        test.done();
    }
}


