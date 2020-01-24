import { StringFormatType } from '../utils/index';
import { ValidationContext } from './ValidationContext';

// export type ErrorFormatType = ((name:string, ...args:any[])=>string) | string;
const regx = /(\$\{([a-zA-Z0-9_\-\@\$\#\!\~\&\^\%\*]+)\})/gim;

export abstract class ValidatorBase {
    constructor(private name: string, private errorMessage: StringFormatType) {}

    public get Name(): string {
        return this.name;
    }
    public get ErrorFormat(): string {
        if (typeof this.errorMessage === 'string') {
            return this.errorMessage;
        } else if (typeof this.errorMessage === 'function') {
            return this.errorMessage(this.name);
        } else {
            return '';
        }
    }
    /**
     * Validate any value with context
     *
     * @abstract
     * @template T
     * @template TValue
     * @param {ValidationContext<T, TValue>} context
     * @returns {Promise<boolean>}
     * @memberof ValidatorBase
     */
    public abstract async validate<T, TValue>(context: ValidationContext<T, TValue>): Promise<boolean>;

    /**
     * Format error message
     *
     * @protected
     * @template T
     * @template TValue
     * @param {ValidationContext<T, TValue>} context
     * @returns {string}
     * @memberof ValidatorBase
     */
    protected formatErrorMessage<T, TValue>(context: ValidationContext<T, TValue>): string {
        let message = this.ErrorFormat;
        const that: any = this;

        let matches = [];
        // tslint:disable-next-line:no-conditional-assignment
        while ((matches = regx.exec(message))) {
            const value = that[matches[2]] ? that[matches[2]] : (context as any)[matches[2]];
            message = message.replace(matches[1], value ? value : '');
            regx.lastIndex = 0;
        }

        return message;
    }
}
