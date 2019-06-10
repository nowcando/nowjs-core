import { IAppContext } from "../core/IAppContext";
import { StringFormatType } from "../utils";
import { IPrincipal } from "./IPrincipal";
import { ISecurityClaim } from "./ISecurityClaim";
import { AuthorizePermissionOptions, ISecurityProvider } from "./ISecurityProvider";
import { SecurityException } from "./SecurityException";
export interface AuthorizeOptions {

    users?: string[];
    roles?: string[];
    resources?: string[];
    claims?: ISecurityClaim[];

    type?: "hasAll" | "hasAny" | "except";
    providerName?: string;
    errorMessage?: StringFormatType;

}
export class SecurityManager {

    private static securityProviders: Map<string, ISecurityProvider> = new Map();
    private static defaultName: string;
    public static get DefaultProvider(): ISecurityProvider {
        return SecurityManager.securityProviders.get(SecurityManager.defaultName);
    }

    public static get DefaultProviderName(): string {
        return SecurityManager.defaultName || "";
    }
    public static getSecurityProvider(name: string): ISecurityProvider {
        return SecurityManager.securityProviders.get(name || SecurityManager.defaultName);
    }
    public static registerSecurityProviders(defaultName?: string, ...securityProviders: ISecurityProvider[]) {
        SecurityManager.defaultName = defaultName;
        securityProviders.map((xx) => SecurityManager.securityProviders.set(xx.name, xx));
    }
}

export async function authorized<P>(options?: AuthorizeOptions): Promise<boolean> {
    const that = this;
    const context = this.context as IAppContext<P>;
    const user = context && context.user;
    const settings = options || {};
    settings.type = settings.type || "hasAny";
    if (!context) { return Promise.reject(new SecurityException(-4005, "Application context not defined")); }
    if (!user) { return Promise.reject(new SecurityException(-4006, "Application context user not defined")); }
    if (!user.isAuthenticated) { return Promise.reject(new SecurityException(-4007, "User not authenticated")); }
    const claims = {
        roles: settings.roles,
        resources: settings.resources,
        users: settings.users,
    };
    const sp = SecurityManager.getSecurityProvider(settings.providerName || SecurityManager.DefaultProviderName);
    if (sp) {
        switch (settings.type) {
            case "hasAny":
                return sp.hasAnyClaims.apply(that, claims);
            case "hasAll":
                return sp.hasAllClaims.apply(that, claims);
            case "except":
                return sp.exceptClaims.apply(that, claims);
            default:
                return Promise.resolve(false);
        }
    } else {
        return Promise.resolve(false);
    }

}
