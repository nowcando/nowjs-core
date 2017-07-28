
import { AuthorizationException } from "../index";
import { SecurityManager } from "../SecurityManager";

export const SECURITY_AUTHORIZE_METADATA_KEY = Symbol("security.authorize.key");

export function authorize(options?: any): any;
export function authorize(options?: any): any;
export function authorize(options?: any) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
        const originalFunc = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                const result = await SecurityManager.isAuthorized(options);
                if (result === true) {
                    return originalFunc.apply(originalFunc, args);
                }  else {
                    throw new AuthorizationException(-915, `Access to "${propertyKey}" is not authorized.`);
                }
            } catch (error) {
                throw error;
            }
        };
        return descriptor;
    };

}
