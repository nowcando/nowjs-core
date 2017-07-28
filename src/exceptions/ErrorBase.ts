
export class ErrorBase extends Error {

    constructor(message: string, private innerError?: Error) {
        super(message);
        this.name = "Error";
    }

    public get Message(): string {
        return this.message;
    }

    public get Stack(): string {
        return this.stack;
    }

    public get InnerError(): Error {
        return this.innerError;
    }

    public toJSON(): string {
        const res: any = {};
        res.Message = this.Message;

        return JSON.stringify(res);
    }

    public toString() {
        if (this.innerError) {
            return `Message = ${this.message} , Stack = ${this.stack} , InnerError = ${this.innerError} .`;
        }
        return `Message = ${this.message} , Stack = ${this.stack}`;
    }

}
