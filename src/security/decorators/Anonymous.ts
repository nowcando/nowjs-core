
import { AuthorizationException } from "../AuthorizationException";
import { AuthorizationProvider } from "../index";

export const SECURITY_ANONYMOUS_METADATA_KEY = Symbol("security.anonymous.key");

export function isAnonymous() {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
        const that: any = this;
        const originalFunc = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                const principal = that.User;
                const result = await AuthorizationProvider.get().checkIsAnonymousAsync(principal);
                if (result === true) {
                    return originalFunc.apply(originalFunc, args);
                } else {
                    throw new AuthorizationException(-914,
                         `Only anonymous identity has permited to "${String(propertyKey)}" .`);
                }
            } catch (error) {
               return Promise.reject(error);
            }

        };
        return descriptor;
    };
}
