import { IPrincipal } from "../security";

export interface IAppContext<P> {
    user?: IPrincipal<P>;
}
