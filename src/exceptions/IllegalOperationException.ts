import {CodedException} from "./index";

export class IllegalOperationException extends CodedException {
    constructor(code: number, message: string, innerError?: Error) {
        super(code, message, innerError);
        this.name = "IllegalOperationException";
    }
}
