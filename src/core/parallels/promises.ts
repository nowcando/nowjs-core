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
 * Created by saeed on 10/15/16.
 */




/*
* delay and run action like the setTimeout
* @param {ms:number}
* */
export function delay<T>(ms:number):Promise<T>{
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

export function wait<T>(ms:number):Promise<T>{
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

export function each<T>(items:Iterable<T>,itemAction:(item:T,index?:number)=>void):Promise<T>{
          return Promise.all(items.linq().toArray().map(itemAction));
}

export function eachOf<T>(items:Iterable<T>,itemAction:(item:T,index?:number)=>void):Promise<T>{
          return Promise.all(items.linq().toArray().map(itemAction));
}

export function every<T>(items:Iterable<T>,itemAction:(item:T)=>boolean):Promise<boolean>{
    let pr = Promise.all(items.linq().toArray().map(itemAction))
        .catch((error)=>{return Promise.reject(error)})
        .then((results:boolean[])=>{
            if(results){
               return Promise.resolve( results.every((value)=>{return value}));
            }
            else{
                return Promise.resolve(false);
            }
        });
    return pr;
}

export function filter<T>(items:Iterable<T>,itemAction:(item:T)=>boolean):Promise<T[]>{
    // TODO : must implement
    return null;
}

export function concat<T>(items:Iterable<T>,itemAction:(item:T)=>T):Promise<T[]>{
    let pr = Promise.all(items.linq().toArray().map(itemAction))
        .catch((error)=>{return Promise.reject(error)})
        .then((results:T[])=>{
            let mresult:T[] = [];
            for(let xx of results){
                if(xx instanceof Array){
                    for (let yy of xx){
                        mresult.push(yy);
                    }
                }
                else{
                    mresult.push(xx)
                }

            }
            return Promise.resolve(results);
        });
    return pr;
}

export function reduce<T>(items:Iterable<T>,initItem:T,itemAction:(previousItem:T,currentItem:T)=>T):Promise<T>{
    // TODO : must implement
    return null;
}

export function reduceRight<T>(items:Iterable<T>,initItem:T,itemAction:(previousItem:T,currentItem:T)=>T):Promise<T>{
    // TODO : must implement
    return null;
}

export function some<T>(items:Iterable<T>,itemAction:(item:T)=>boolean):Promise<boolean>{
    let pr = Promise.all(items.linq().toArray().map(itemAction))
        .catch((error)=>{return Promise.reject(error)})
        .then((results:boolean[])=>{
            if(results){
                return Promise.resolve( results.some((value)=>{return value}));
            }
            else{
                return Promise.resolve(false);
            }
        });
    return pr;
}

declare global {
    export interface PromiseConstructor{
        delay<T>(ms:number):Promise<T>;
        each<T>(items:Iterable<T>,itemAction:(item:T,index?:number)=>void):Promise<T>
        eachOf<T>(items:Iterable<T>,itemAction:(item:T,index?:number)=>void):Promise<T>;
        every<T>(items:Iterable<T>,itemAction:(item:T)=>boolean):Promise<boolean>;
        filter<T>(items:Iterable<T>,itemAction:(item:T)=>boolean):Promise<T[]>;
        concat<T>(items:Iterable<T>,itemAction:(item:T)=>T):Promise<T[]>;
        reduce<T>(items:Iterable<T>,initItem:T,itemAction:(previousItem:T,currentItem:T)=>T):Promise<T>;
        reduceRight<T>(items:Iterable<T>,initItem:T,itemAction:(previousItem:T,currentItem:T)=>T):Promise<T>;
        some<T>(items:Iterable<T>,itemAction:(item:T)=>boolean):Promise<boolean>;
        wait<T>(ms:number):Promise<T>;
    }
}

Promise.constructor.prototype.delay=delay;
Promise.constructor.prototype.each=each;
Promise.constructor.prototype.eachOf=eachOf;
Promise.constructor.prototype.every=every;
Promise.constructor.prototype.concat=concat;
Promise.constructor.prototype.filter=filter;
Promise.constructor.prototype.reduce=reduce;
Promise.constructor.prototype.reduceRight=reduceRight;
Promise.constructor.prototype.some=some;
Promise.constructor.prototype.wait=wait;