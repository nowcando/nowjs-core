import { Exception } from "./index";

export class IndexOutOfRangeException extends Exception {
    constructor(message: string, innerError?: Error) {
        super(message, innerError);
        this.name = "IndexOutOfRangeException";
    }
 }
