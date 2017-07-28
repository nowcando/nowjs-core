
import { IllegalOperationException } from "../exceptions/index";
import { ISecurityBaseProvider } from "./index";

export class SecurityManager {
    private static security: ISecurityBaseProvider;
    // tslint:disable-next-line:member-ordering
    public static register(security: ISecurityBaseProvider) {
        if (security && security.isAnonymous && security.isAuthorized) {
            SecurityManager.security = security;
        }
    }

    // tslint:disable-next-line:member-ordering
    public static async isAuthorized(options?: any): Promise<boolean> {
        if (!SecurityManager.security) {
           throw new IllegalOperationException(-5200, "The security provider not registered.");
        }  else {
          return  SecurityManager.security.isAuthorized(options);
        }
    }

   // tslint:disable-next-line:member-ordering
   public static async isAnonymous(): Promise<boolean> {
        if (!SecurityManager.security) {
           throw new IllegalOperationException(-5200, "The security provider not registered.");
        } else {
          return  SecurityManager.security.isAnonymous();
        }
    }
}
