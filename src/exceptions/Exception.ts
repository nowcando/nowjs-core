
import { ErrorBase } from "./ErrorBase";

export class Exception extends ErrorBase {
     constructor(message: string, innerError?: Error) {
        super(message, innerError);
        this.name = "Exception";
    }
}
