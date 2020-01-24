import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

import { StringFormatType } from '../../utils/index';
import { PatternValidator, PatternValidatorBase } from './index';

export const VALIDATOR_EMAIL_METADATA_KEY = Symbol('validation:validator:isEmail');

export function isEmail(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_EMAIL_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new EmailValidator(errorMessage), target, propertyKey);
    };
}

// tslint:disable-next-line:max-line-length
export const PATTERN_EMAIL_UNIVERSAL = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/gi;

export class EmailValidator extends PatternValidatorBase {
    constructor(errorMessage: StringFormatType = 'The value of ${DisplayName} must have email pattern : ${Pattern} .') {
        super('Email', PATTERN_EMAIL_UNIVERSAL, errorMessage);
    }
}
