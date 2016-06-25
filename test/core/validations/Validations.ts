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
 * This File Created by Saeed on 25/06/2016.
 */
import  {nowcando} from '../../../src/index';
import * as nodeunit from 'nodeunit';

export={

    setUp: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {

        let context = new nowcando.core.validations.ValidationContext("Firstname", null, "saeed");
        let req = new nowcando.core.validations.RequiredValidator("The {0} Required.");
        req.isValid(context).then((result)=> {
            test.equal(result, true);
            test.done();
        });

    },
    TC_1_2: function (test:nodeunit.Test) {

        let context = new nowcando.core.validations.ValidationContext("Firstname", null, "");
        let req = new nowcando.core.validations.RequiredValidator("The {0} Required.");
        req.isValid(context).then((result)=> {
            test.equal(result, false);
            test.done();
        });

    },
    TC_1_3: function (test:nodeunit.Test) {

        let pattern = /\d{11}/gi; // 09122045941
        let context = new nowcando.core.validations.ValidationContext("Mobile", null, "09122045941");
        let req = new nowcando.core.validations.RegexValidator("The {0} pattern is 09122045941.", pattern);
        req.isValid(context).then((result)=> {
            test.equal(result, true);
            test.done();
        });

    },
    TC_1_4: function (test:nodeunit.Test) {
        let context = new nowcando.core.validations.ValidationContext("Mobile", null, "Hello how are you ?");
        let req = new nowcando.core.validations.StringLengthValidator("The {0} pattern is 09122045941.", 10);
        req.isValid(context).then((result)=> {
            test.equal(result, false);
            test.done();
        });

    },
    TC_1_5: function (test:nodeunit.Test) {
        let context = new nowcando.core.validations.ValidationContext("Age", null, 43);
        let req = new nowcando.core.validations.RangeValidator("The {0} pattern ", 10,50);
        req.isValid(context).then((result)=> {
            test.equal(result, true);
            test.done();
        });

    },
}
