import { Exception } from './index';

export class ValidationException extends Exception {
    private field: string;
    constructor(field: string, message: string, innerError?: Error) {
        super(message, innerError);
        this.name = 'ValidationException';
        this.field = field;
    }

    public get Field(): string {
        return this.field;
    }

    public toJSON(): string {
        const res: any = {};
        res.Message = this.Message;
        res.Field = this.Field;

        return JSON.stringify(res);
    }

    public toString() {
        if (this.InnerError) {
            return `Field = ${this.field} , Message = ${this.message} , Stack = ${this.stack} , InnerError = ${this.InnerError} .`;
        }
        return `Field = ${this.field} , Message = ${this.message} , Stack = ${this.stack}`;
    }
}
