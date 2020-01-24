import { Exception } from './index';

export class ArgumentException extends Exception {
    constructor(message: string, innerError?: Error) {
        super(message, innerError);
        this.name = 'ArgumentException';
    }
}
