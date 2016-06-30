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
import * as nodeunit from 'nodeunit';
import {Enumerable} from "../../../src/core/collections/collections";
/**
 * This File Created by Saeed on 24/04/2016.
 */
let alphanums:nowcando.core.collections.List<string>;
let numbers:nowcando.core.collections.List<number>;
let objects:nowcando.core.collections.List<any>;
export={

    setUp: function (callback:nodeunit.ICallbackFunction) {
        alphanums = new nowcando.core.collections.List<string>();
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
    },
    TC_1_21: function (test:nodeunit.Test) {
        let arr:number[] = [5, 4, 2];
        let xx = arr.linq().sum();
        test.equal(xx, 11);
        test.done();
    },
    TC_1_22: function (test:nodeunit.Test) {
        let res = 0;
        Enumerable.range(2, 6).forEach<number>((x)=> {
            res = x;
        });
        test.equal(res, 8);
        test.done();
    },
    TC_1_23: function (test:nodeunit.Test) {
        let res = "";
        Enumerable.repeat("Hello", 3).forEach<string>((x)=> {
            res += x;
        });
        test.equal(res, "HelloHelloHello");
        test.done();
    },
    TC_1_24: function (test:nodeunit.Test) {
        let arr:number[] = [1, 5, 3, 8, 3, 4, 5, 6, 1];
        let res = arr.linq().distinct().toArray();
        test.deepEqual(res, [1, 5, 3, 8, 4, 6]);
        test.done();
    },
    TC_1_25: function (test:nodeunit.Test) {
        let numbers:number[] = [1, 2, 3, 4, 5, 6];
        let words:string[] = ["one", "two", "three", "four", "five"];
        let res = numbers.linq().zip(words, (first, second)=> {
            return {Num: first, Word: second}
        });
        /* res.forEach((x)=>{
         console.log(x)}
         );*/
        test.equal(res.count(), 5);
        test.done();
    },
    TC_1_26: function (test:nodeunit.Test) {
        let numbers:number[] = [1, 2, 3, 4, 5, 6];

        test.deepEqual(numbers.linq().reverse().toArray(), [6, 5, 4, 3, 2, 1]);
        test.done();
    }
    ,
    TC_1_27: function (test:nodeunit.Test) {
        let numbers:number[] = [8, 2, 7, 50, 23, 16, 18, 19, 6];
        //numbers.linq().shuffles(4).forEach((x)=>{console.log(x)});
        test.equal(numbers.linq().shuffles(4).count(), 4);
        test.done();
    }
    ,
    TC_1_28: function (test:nodeunit.Test) {
        let numbers:number[] = [8];
        test.equal(numbers.linq().shuffle(), 8);
        test.done();
    }
    ,
    TC_1_29: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", family: "tabrizi", age: 34},
            {name: "ali", family: "khaleghi", age: 17},
            {name: "Saeed", family: "akbari", age: 18},
            {name: "mahmoud", family: "tabrizi", age: 15},
            {name: "soolmaz", family: "lenaei", age: 25},
            {name: "lena", family: "katooni", age: 22}
        ];
        let actual = data.linq()
            .groupBy((x:any)=> {
                return x.name
            }).count();
        test.equals(actual, 5);
        /*data.linq()
         .groupBy((x:any)=>{return x.name})
         .forEach((xx=>{
         console.log( JSON.stringify(xx));
         }));*/
        test.done();
    }
    ,
    TC_1_30: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", family: "tabrizi", age: 34},
            {name: "ali", family: "khaleghi", age: 17},
            {name: "Saeed", family: "akbari", age: 18},
            {name: "mahmoud", family: "tabrizi", age: 15},
            {name: "ali", family: "arhabi", age: 19},
            {name: "soolmaz", family: "lenaei", age: 25},
            {name: "lena", family: "matooni", age: 22}
        ];
        let actual = data.linq()
            .orderBy((x:any)=> {
                return x.name
            })
            .thenBy((x:any)=> {
                return x.family
            })
            .count();
        /*.forEach((xx=>{
         console.log( JSON.stringify(xx));
         }));*/
        test.equals(actual, 7);
        test.done();
    }
    ,
    TC_1_31: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", family: "tabrizi", age: 34},
            {name: "ali", family: "khaleghi", age: 17},
            {name: "Saeed", family: "akbari", age: 18},
            {name: "mahmoud", family: "tabrizi", age: 15},
            {name: "soolmaz", family: "lenaei", age: 25},
            {name: "lena", family: "Matooni", age: 22}
        ];
        let actual = data.linq()
            .select<any,{age:number}>((x)=> {
                return {age: x.age}
            })
            .count();
        /*.forEach((xx=>{
         console.log( JSON.stringify(xx));
         }));*/
        test.equals(actual, 6);
        test.done();
    }
    ,
    TC_1_32: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", numbers: [5, 2, 3, 1, 6, 7, 8, 9]},
            {name: "Majid", numbers: [11, 15, 19, 18]},
            {name: "Ali", numbers: [118, 119, 116]},
        ];
        let actual = data.linq()
            .selectMany<any,any>((x)=> {
                return x.numbers
            })
            .count();
        /* .forEach((xx=>{
         console.log( JSON.stringify(xx));
         }));*/
        test.equals(actual, 15);
        test.done();
    }
    ,
    TC_1_33: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", family: "tabrizi", age: 34},
            {name: "ali", family: "khaleghi", age: 17},
            {name: "Saeed", family: "akbari", age: 18},
            {name: "mahmoud", family: "tabrizi", age: 15},
        ];
        let actual = data.linq()
            .indexOf(data[1]);
        test.equals(actual, 1);
        test.done();
    }
    ,
    TC_1_34: function (test:nodeunit.Test) {
        let obj1 = {name: "Saeed", family: "tabrizi", age: 34};
        let data:any[] = [
            {name: "ali", family: "khaleghi", age: 17},
            {name: "mahmoud", family: "tabrizi", age: 15},
        ];
        data.push(obj1);// at bottom
        data.unshift(obj1); // at top
        let actual = data.linq()
            .lastIndexOf(data[0]);
        test.equals(actual, 3);
        test.done();
    }
    ,
    TC_1_35: function (test:nodeunit.Test) {
        let sentence = "the quick brown fox jumps over the lazy dog";
        let words:string[] = sentence.split(' ');
        let actual = words.linq().aggregate<string>((prev, next) => {
            return next + " " + prev
        });
        test.equals(actual.length, sentence.length);
        test.done();
    }
    ,
    TC_1_36: function (test:nodeunit.Test) {
        let saeed = {Name: "Saeed Tabrizi"};
        let vahid = {Name: "Vahid Sani"};
        let ali = {Name: "Ali Javanmardi"};

        let barley = {Name: "Barley", Owner: saeed};
        let boots = {Name: "Boots", Owner: saeed};
        let whiskers = {Name: "Whiskers", Owner: vahid};
        let daisy = {Name: "Daisy", Owner: ali};
        let parrot = {Name: "Parrot", Owner: saeed};

        let people = [saeed, vahid, ali];
        let pets = [barley, boots, whiskers, daisy, parrot];
        let query =
            people.linq().join(pets.linq(),
                person => person,
                pet => pet.Owner,
                (person:any, pet:any) => {
                    return {OwnerName: person.Name, Pet: pet.Name}
                }
            )
        // query.forEach(x=>console.log(x));
        test.equals(query.count(), 5);
        test.done();
    },
    TC_1_37: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", family: "tabrizi", age: 34},
            {name: "ali", family: "khaleghi", age: 17},
            {name: "Saeed", family: "akbari", age: 18},
            {name: "mahmoud", family: "tabrizi", age: 15},
            {name: "soolmaz", family: "lenaei", age: 25},
            {name: "lena", family: "Matooni", age: 22}
        ];
        test.equal(data.linq().count(), 6);
        let xx = data.linq()
            .max<any>(x=>x.age);
        test.equal(xx, 34);
        test.done();
    },
    TC_1_38: function (test:nodeunit.Test) {
        let data:any[] = [
            {name: "Saeed", family: "tabrizi", age: 34},
            {name: "ali", family: "khaleghi", age: 17},
            {name: "Saeed", family: "akbari", age: 18},
            {name: "mahmoud", family: "tabrizi", age: 15},
            {name: "soolmaz", family: "lenaei", age: 25},
            {name: "lena", family: "Matooni", age: 22}
        ];
        test.equal(data.linq().count(), 6);
        let xx = data.linq()
            .min<any>(x=>x.age);
        test.equal(xx, 15);
        test.done();
    }
    ,
    TC_1_39: function (test:nodeunit.Test) {
        let data1 = [1, 5, 6, 8, 9, 4, 3];
        let data2 = [1, 5, 6, 3];
        test.equal(data1.linq().intersect(data2).count(), 4);
        test.done();
    },
    TC_1_40: function (test:nodeunit.Test) {
        let data1 = [1, 5, 6, 8, 9, 4, 3];
        let data2 = [15, 25, 6, 3];
        test.equal(data1.linq().union(data2).count(), 9);
        test.done();
    },
    TC_1_41: function (test:nodeunit.Test) {
        let data1 = [1, 5, 6, 8, 9, 4, 3];
        let data2 = [15, 25, 6, 3,9];
        test.equal(data1.linq().subtract(data2).count(), 6);
        test.done();
    }
}


