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

import { proPromise } from "./ProPromise";

function timeout<T>(ms: number, err?: string | Error): Promise<T> {
    const pr = this;
    let err1 = new Error(`Timeout out in ${ms} miliseconds.`);
    if (err) {
            err1 = (err instanceof Error ? err : new Error(err as string));
        }
    if (pr && pr.then) {
     return new Promise((resolve, reject) => {
        pr.then(resolve);
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(err1);
        }, ms);
    });
    } else {
        return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(err1);
        }, ms);
    });
    }
}

function delay<T>(ms: number, defaulValue?: T): Promise<T> {
    const pr = this;
    if (pr && pr.then) {
          const prs = new Promise<T>((resolve) => {
              pr.then((result: any) => {
                const id = setTimeout(() => {
                     clearTimeout(id);
                     resolve(result !== undefined ? result : defaulValue) ;
                  }, ms);
            }); });
          return  prs;
    } else {
        const prs = new Promise<T>((resolve) => {
         const id = setTimeout(() => {
            clearTimeout(id);
            resolve(defaulValue);
        }, ms);
       });
        return  prs;
    }
}

function wait<T>(ms: number): Promise<T> {
    const pr = this;
    if (pr && pr.then) {
          const prs = new Promise<T>((resolve) => {
              pr.then((result: any) => {
                const id = setTimeout(() => {
                     clearTimeout(id);
                     resolve(result) ;
                  }, ms);
            }); });
          return  prs;
    } else {
        const prs = new Promise<T>((resolve) => {
         const id = setTimeout(() => {
            clearTimeout(id);
            resolve();
        }, ms);
       });
        return  prs;
    }

}

function spread<T>(fn: (...args: T[]) => void ): Promise<T> {
    const pr = this;
    return new Promise<any>((resolve) => {
        pr.then((result: any) => {
           if (Array.isArray(result)) {
            resolve(fn(...result));
           } else {
            resolve(fn(result));
           }
        });
    });
}

// tslint:disable-next-line:interface-name
export interface ExtendedPromiseOptions {
     onCancel?: () => void;
     onProgress?: (data: any) => void;
    }

export function extendedPromise<T>(promise: Promise<T> ,
                                   options?: ExtendedPromiseOptions ): ExtendedPromise<T> {
    const pr = this;
    let isCanceled = false;
    const prs = new Promise<any>((resolve, reject) => {
        promise.then((result: any) => {
           if (!isCanceled) {
             resolve(result);
        }});
        promise.catch((err: any) => {
            if (!isCanceled) {
                reject(err);
        }});
    }) as ExtendedPromise<T>;
    prs.cancel = () => {
        isCanceled = true ;
        if (options && options.onCancel) {
            options.onCancel();
        }
    };
    prs.progress = (data: any) => {
        if (options && options.onProgress) {
            options.onProgress(data);
        }
    };
    return prs;
}

// tslint:disable-next-line:no-namespace
declare global {
    // tslint:disable-next-line:interface-name
    export interface PromiseConstructor {
        delay<T>(ms: number, defaulValue?: T): Promise<T>;
        wait<T>(ms: number): Promise<T>;
        extendedPromise<T>(promise: Promise<T> ,
                           options?: ExtendedPromiseOptions): ExtendedPromise<T>;
    }
    // tslint:disable-next-line:interface-name
    export interface Promise<T> {
        delay(ms: number, defaulValue?: T): Promise<T>;
        timeout(ms: number, err?: string | Error): Promise<T>;
        wait(ms: number): Promise<T>;
        spread(fn: (...args: T[]) => void): Promise<T>;
    }

    // tslint:disable-next-line:interface-name
    export interface ExtendedPromise<T> extends Promise<T> {
         cancel(): void;
         progress(data: any): void;
     }
}

// Promise.constructor.prototype.timeout = timeout;
Promise.constructor.prototype.delay = delay;
Promise.constructor.prototype.wait = wait;
Promise.constructor.prototype.extendedPromise = extendedPromise;

Promise.prototype.timeout = timeout;
Promise.prototype.delay = delay;
Promise.prototype.wait = wait;
Promise.prototype.spread = spread;
