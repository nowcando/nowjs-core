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
 * This File Created by Saeed on 01/06/2016.
 */

import * as nodeunit from 'nodeunit';
import * as core from "../../src/core/core";

export={

    setUp: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 60 * 60));
        let ts1 = new core.TimeSpan(dt1, dt2);

        test.equal(ts1.Seconds, 0);
        test.equal(ts1.Minutes, 0);
        test.equal(ts1.Hours, 1);
        test.done();
    },
    TC_1_2: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 60 * 60 * 14));
        let ts1 = new core.TimeSpan(dt1, dt2);

        test.equal(ts1.Seconds, 0);
        test.equal(ts1.Minutes, 0);
        test.equal(ts1.Hours, 14);
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 54 ));
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.Seconds, 54);
        test.equal(ts1.Minutes, 0);
        test.equal(ts1.Hours, 0);
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 68 ));
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.Seconds, 8);
        test.equal(ts1.Minutes, 1);
        test.equal(ts1.Hours, 0);
        test.done();
    },
    TC_1_5: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 122 ));
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.Seconds, 2);
        test.equal(ts1.Minutes, 2);
        test.equal(ts1.Hours, 0);
        test.done();
    },
    TC_1_6: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 60 * 60 * 25 ));
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.Seconds, 0);
        test.equal(ts1.Minutes, 0);
        test.equal(ts1.Hours, 1);
        test.equal(ts1.Days, 1);
        test.done();
    },
    TC_1_7: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() - (1000 * 60 * 60 * 25 ));
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.Seconds, 0);
        test.equal(ts1.Minutes, 0);
        test.equal(ts1.Hours, -1);
        test.equal(ts1.Days, -2);
        test.done();
    },
    TC_1_8: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 122 ) + 8);
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.TotalMiliSeconds, 122008);
        test.equal(ts1.TotalSeconds, 122);
        test.equal(ts1.TotalMinutes, 2);
        test.equal(ts1.TotalHours, 0);
        test.done();
    },
    TC_1_9: function (test:nodeunit.Test) {
        let dt1 = new Date();
        let dt2 = new Date(dt1.getTime() + (1000 * 60 * 60 * 36 ) + 8);
        let ts1 = new core.TimeSpan(dt1, dt2);
        test.equal(ts1.TotalMiliSeconds, 129600008);
        test.equal(ts1.TotalSeconds, 129600);
        test.equal(ts1.TotalMinutes, 2160);
        test.equal(ts1.TotalHours, 36);
        test.done();
    },
}