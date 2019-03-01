
import { AuthorizationException, AuthorizationOptions, AuthorizationProvider } from "../index";

export const SECURITY_AUTHORIZE_METADATA_KEY = Symbol("security.authorize.key");

export function authorize(options?: AuthorizationOptions): any;
export function authorize(options?: any) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
        const originalFunc = descriptor.value;
        const that: any = this;
        descriptor.value = async (...args: any[]) => {
            try {
                const principal = that.User;
                const result = await AuthorizationProvider.get().checkAccessAsync(options);
                if (result === true) {
                    return originalFunc.apply(originalFunc, args);
                }  else {
                    throw new AuthorizationException(-915, `Access to "${String(propertyKey)}" is not authorized.`);
                }
            } catch (error) {
                throw error;
            }
        };
        return descriptor;
    };

}
