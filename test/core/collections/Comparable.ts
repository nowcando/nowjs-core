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

import * as nowcando from '../../../src/nowcando';
import {Comparable} from "../../../src/core/core";

export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        
        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        let c1= new Comparable<string>('AB');
        let c2= new Comparable<string>('AB');
        test.equal(c1.compareTo(c2.Value),0 );
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        let c1= new Comparable<number>(2);
        let c2= new Comparable<number>(2);
        test.equal(c1.compareTo(c2.Value),0 );
        test.done();
    }
}