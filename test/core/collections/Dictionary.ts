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
import {Dictionary} from "../../../src/core/collections/Dictionary";
import {IKeyValuePair} from "../../../src/core/collections/collections";
/**
 * This File Created by Saeed on 24/04/2016.
 */
 let  dic :nowcando.core.collections.IDictionary<string,string>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        dic = new nowcando.core.collections.Dictionary<string,string>();
        dic.add('1','A');
        dic.add('2','B');
        dic.add('3','C');
        dic.add('4','D');
        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        test.equal(dic.size(),4 );
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        dic.add('5','E');
        test.equal(dic.size(),5 );
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {

        test.equal(dic.getItem('3') , 'C'  );
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        dic.remove('2');
        test.equal(  dic.size(),3);
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        let tmp = new nowcando.core.collections.Collection<IKeyValuePair<string,string>>();
        for(let xx of dic){
            tmp.add(xx);
        }
        test.equal(  tmp.size(),4);
        test.done();
    }
    ,TC_1_6: function (test:nodeunit.Test) {
        
        test.equal(  dic.size(),4);
        test.done();
    },
}


