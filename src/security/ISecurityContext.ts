
import { IPrincipal, ISecurityBaseProvider } from "./index";

export interface ISecurityContext<TSecurityProvider extends ISecurityBaseProvider, TPrincipal extends IPrincipal> {

        User: TPrincipal;
        Provider: TSecurityProvider;
}
