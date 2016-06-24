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
import  {nowcando} from '../../../src/index';
import * as nodeunit from 'nodeunit';
/**
 * This File Created by Saeed on 24/04/2016.
 */

 let  col :nowcando.core.collections.Collection<string>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        col = new nowcando.core.collections.Collection<string>();
        col.add('AB');
        col.add('BC');
        col.add('AB');
        col.add('CD');
        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        test.equal(col.size(),4 );
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        col.add("DE");
        test.equal(col.size(),5 );
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {

        test.equal(col.indexOf('BC'),1  );
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        col.remove('CD');
        test.equal(  col.size(),3);
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Collection<string>();
        for(let xx of col){
            tmp.add(xx);
        }
        test.equal(  tmp.size(),4);
        test.done();
    }
}


