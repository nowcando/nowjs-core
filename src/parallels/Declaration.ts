/**
 * Created by saeed on 10/15/16.
 */

export function timeout<T>(ms: number, err?: string | Error): Promise<T> {
    const pr = this;
    let err1 = new Error(`Timeout out in ${ms} miliseconds.`);
    if (err) {
        err1 = err instanceof Error ? err : new Error(err as string);
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

export function delay<T>(ms: number, defaulValue?: T): Promise<T> {
    const pr = this;
    if (pr && pr.then) {
        const prs = new Promise<T>(resolve => {
            pr.then((result: any) => {
                const id = setTimeout(() => {
                    clearTimeout(id);
                    resolve(result !== undefined ? result : defaulValue);
                }, ms);
            });
        });
        return prs;
    } else {
        const prs = new Promise<T>(resolve => {
            const id = setTimeout(() => {
                clearTimeout(id);
                resolve(defaulValue);
            }, ms);
        });
        return prs;
    }
}

export function wait<T>(ms: number): Promise<T> {
    const pr = this;
    if (pr && pr.then) {
        const prs = new Promise<T>(resolve => {
            pr.then((result: any) => {
                const id = setTimeout(() => {
                    clearTimeout(id);
                    resolve(result);
                }, ms);
            });
        });
        return prs;
    } else {
        const prs = new Promise<T>(resolve => {
            const id = setTimeout(() => {
                clearTimeout(id);
                resolve();
            }, ms);
        });
        return prs;
    }
}

export function spread<T>(fn: (...args: T[]) => void): Promise<T> {
    const pr = this;
    return new Promise<any>(resolve => {
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

export function extendedPromise<T>(promise: Promise<T>, options?: ExtendedPromiseOptions): ExtendedPromise<T> {
    const pr = this;
    let isCanceled = false;
    const prs = new Promise<any>((resolve, reject) => {
        promise.then((result: any) => {
            if (!isCanceled) {
                resolve(result);
            }
        });
        promise.catch((err: any) => {
            if (!isCanceled) {
                reject(err);
            }
        });
    }) as ExtendedPromise<T>;
    prs.cancel = () => {
        isCanceled = true;
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

// Promise.constructor.prototype.timeout = timeout;
