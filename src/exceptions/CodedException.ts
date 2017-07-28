
import {  Exception } from "./index";

export class CodedException extends Exception {
    private code: number;
    constructor(code: number, message: string, innerError?: Error) {
        super(message, innerError);
        this.name = "CodedException";
        this.code = code;
    }

    public get Code(): number {
        return this.code;
    }

    public toJSON(): string {
        const res: any = {};
        res.Message = this.Message;
        res.Code = this.Code;

        return JSON.stringify(res);
    }
    public toString() {
        if (this.InnerError) {
            return `Code = ${this.code
                } , Message = ${this.message} , Stack = ${this.stack
                } , InnerError = ${this.InnerError} .`;
        }
        return `Code = ${this.code} , Message = ${this.message} , Stack = ${this.stack}`;
    }

}
