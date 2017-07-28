
import { AuthorizationException } from "../AuthorizationException";
import { SecurityManager } from "../index";

export const SECURITY_ANONYMOUS_METADATA_KEY = Symbol("security.anonymous.key");

export function anonymous() {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
        const originalFunc = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                const result = await SecurityManager.isAnonymous();
                if (result === true) {
                    return originalFunc.apply(originalFunc, args);
                } else {
                    throw new AuthorizationException(-914,
                         `Only anonymous identity has permited to "${propertyKey}" .`);
                }
            } catch (error) {
               return Promise.reject(error);
            }

        };
        return descriptor;
    };
}
