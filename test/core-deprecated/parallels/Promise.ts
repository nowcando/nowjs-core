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
 * Created by saeed on 10/16/16.
 */


import * as nowcando from "../../../src/nowcando";
import * as nodeunit from 'nodeunit';



export ={
    setUp(callback:nodeunit.ICallbackFunction){



        callback();
    },
    tearDown(callback:nodeunit.ICallbackFunction) {
        callback();

    },
    TC_1_1(test:nodeunit.Test) {

         let pr1 = Promise.delay(100);
         pr1.then(()=>{
             test.done();
         })

    },
    TC_1_1_1(test:nodeunit.Test) {
        let pr1 = Promise.wait(150);
        pr1.then(()=>{
            test.done();
        })

    },
    TC_1_2(test:nodeunit.Test) {

        let ar1 = ["Saeed","Seyed","Solmaz","Elnaz","Amir","Sahar","Razieh","Sajad"];
        let counter=0;
        let pr1 = Promise.each(ar1,(item)=>{
            counter++;
        });
        pr1.then(()=>{
            test.equal(counter,ar1.length);
            test.done();
        })

    },
    TC_1_3(test:nodeunit.Test) {

        let ar1 = ["Saeed","Seyed","Solmaz","Elnaz","Amir","Sahar","Razieh","Sajad"];
        let counter=0;
        let pr1 = Promise.every(ar1,(item)=>{
            return typeof item === "string";
        });
        pr1.then((result)=>{
            test.equal(result,true);
            test.done();
        })

    },
    TC_1_4(test:nodeunit.Test) {

        let ar1 = ["Saeed","Seyed","Solmaz","Elnaz","Amir","Sahar","Razieh","Sajad"];
        let counter=0;
        let pr1 = Promise.every(ar1,(item)=>{
            return typeof item === "number";
        });
        pr1.then((result)=>{
            test.equal(result,false);
            test.done();
        })

    },
    TC_1_5(test:nodeunit.Test) {

        //TODO all other tests for promise
        test.done();


    },
}