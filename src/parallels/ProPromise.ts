
export function proPromise<T>(promise: Promise<T>) {
    // tslint:disable-next-line:variable-name
    let hasCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((result) =>
            hasCanceled ? reject({ isCanceled: true }) : resolve(result),
        );
        promise.catch((error) =>
            hasCanceled ? reject({ isCanceled: true }) : reject(error),
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled = true;
        },
    };
}
