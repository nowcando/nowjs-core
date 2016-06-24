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
 let  _data :nowcando.core.collections.Queue<string>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        _data = new nowcando.core.collections.Queue<string>();
        _data.enqueue('A');
        _data.enqueue('B');
        _data.enqueue('C');
        _data.enqueue('D');
        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        test.equal(_data.size(),4 );
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        _data.enqueue("E");
        test.equal(_data.size(),5 );
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {
        let actual =  _data.peek();
        test.equal(  _data.size(),4);
        test.equal(  actual,'A');
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        let actual =  _data.dequeue();
        test.equal(  _data.size(),3);
        test.equal(  actual,'A');
        test.done();
    },
    TC_1_4_1: function (test:nodeunit.Test) {
        let actual =  _data.dequeue();
        actual =  _data.dequeue();
        test.equal(  _data.size(),2);
        test.equal(  actual,'B');
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Collection<string>();
        for(let xx of _data){
            tmp.add(xx);
        }
        test.equal(  tmp.size(),4);
        test.done();
    }
}


