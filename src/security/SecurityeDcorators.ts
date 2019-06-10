import "reflect-metadata";
import { StringFormatType } from "../utils";
import { ISecurityClaim } from "./ISecurityClaim";
import { SecurityException } from "./SecurityException";
import { authorized, AuthorizeOptions, SecurityManager } from "./SecurityManager";

export const SECURITY_AUTHORIZE_METADATA_KEY = Symbol("security:authorize");
export const SECURITY_SECURITY_MANAGER_METADATA_KEY = Symbol("security:security-manager");


export function authorize(options?: AuthorizeOptions) {
    const context = this.context;
    const that = this;
    that.context = context;
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const method = descriptor.value;
        const settings = options || {};
        settings.type = settings.type || "hasAny";
        // tslint:disable-next-line:only-arrow-functions
        descriptor.value = function() {
            const args = arguments;
            settings.providerName = settings.providerName || SecurityManager.DefaultProviderName;
            const sp = SecurityManager.getSecurityProvider(settings.providerName) || SecurityManager.DefaultProvider;
            if (!sp) {
                throw new SecurityException(-4004, "Security provider is not exists.");
            }

            const pr = authorized.call(target, options);
            if (pr && pr instanceof Promise) {
                return pr.then((result) => {
                    if (result === true) {
                        return method.apply(target, args);
                    } else {
                        throw new SecurityException(-4009, "Authorization failed.");
                    }
                }).catch((error) => {
                    throw error;
                });
            }

        };
    };
}
