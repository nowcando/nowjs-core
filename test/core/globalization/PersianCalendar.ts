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
 * This File Created by Saeed on 10/06/2016.
 */


import * as core from "../../../src/core/core";

export={

    setUp: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    tearDown: function (callback:nodeunit.ICallbackFunction) {

        callback();
    },

    TC_1_1: function (test:nodeunit.Test) {
        let dt1 = new Date(2016, 6, 12); // 1395-3-22

        let gcal = new core.globalization.PersianCalendar();

        test.equal(gcal.getYear(dt1), 1395);
        //test.equal(gcal.getMonth(dt1), 3);
       // test.equal(gcal.getDayOfMonth(dt1), 22);
        test.done();
    },
   /* TC_1_2: function (test:nodeunit.Test) {
        let dt1 = new Date(2000, 11, 14); // month 0-11 , days 0-31

        let gcal = new core.globalization.PersianCalendar();
        let dt2 = gcal.addMonths(dt1, 2);
        test.equal(gcal.getYear(dt2), 2001);
        test.equal(gcal.getMonth(dt2), 3);
        test.equal(gcal.getDayOfMonth(dt2), 16);
        test.done();
    },
    TC_1_3: function (test:nodeunit.Test) {
        let dt1 = new Date(2000, 11, 14); // month 0-11 , days 0-31

        let gcal = new core.globalization.PersianCalendar();
        let dt2 = gcal.addDays(dt1, 19);
        test.equal(gcal.getYear(dt2), 2001);
        test.equal(gcal.getMonth(dt2), 1);
        test.equal(gcal.getDayOfMonth(dt2), 1);
        test.done();
    },
    TC_1_4: function (test:nodeunit.Test) {
        let dt1 = new Date(2000, 11, 14); // month 0-11 , days 0-31

        let gcal = new core.globalization.PersianCalendar();
        let dt2 = gcal.addWeeks(dt1, 20);
        test.equal(gcal.getYear(dt2), 2001);
        test.equal(gcal.getMonth(dt2), 5);
        test.equal(gcal.getDayOfMonth(dt2), 2);
        test.done();
    },

    TC_1_5: function (test:nodeunit.Test) {
        let dt1 = new Date(2000, 11, 14); // month 0-11 , days 0-31

        let gcal = new core.globalization.PersianCalendar();
        let dt2 = gcal.addYears(dt1, 20);
        test.equal(gcal.getYear(dt2), 2021);
        test.equal(gcal.getMonth(dt2), 11);
        test.equal(gcal.getDayOfMonth(dt2), 13);
        test.done();
    },

    TC_1_6: function (test:nodeunit.Test) {
        let dt1 = new Date(2000, 11, 14); // month 0-11 , days 0-31

        let gcal = new core.globalization.PersianCalendar();

        test.equal(gcal.getYear(dt1), 2000);
        test.equal(gcal.getMonth(dt1), 12);
        test.equal(gcal.getDayOfMonth(dt1), 13);
        test.equal(gcal.getWeekOfYear(dt1, core.globalization.DayOfWeek.Monday), 51);
        test.equal(gcal.isLeapYear(gcal.getYear(dt1)),true);
        test.done();
    },*/

}