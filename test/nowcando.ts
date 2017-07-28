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
 * This File Created by Saeed on 22/04/2016.
 */
import * as nodeunit from 'nodeunit';
// tslint:disable-next-line:import-spacing
import  {List} from "../src/index";

export = {
    setUp(callback:nodeunit.ICallbackFunction){
        console.log("Start 'nowcando' Test.");
        

        callback();
    },
    tearDown(callback:nodeunit.ICallbackFunction) {
    callback();
    console.log("End 'nowcando' Test.\n");
    },
    TC_1_1(test:nodeunit.Test) {
    test.equal(5,5);
    test.done();
    },
}


