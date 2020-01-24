import { CodedException } from '../../exceptions/index';

export class DatabaseException extends CodedException {
    constructor(code: number, message: string, innerError?: Error) {
        super(code, message, innerError);
        this.name = 'DatabaseException';
    }
}
