import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { ValueTypeValidatorBase } from './index';

export const VALIDATOR_NUMBER_METADATA_KEY = Symbol('validation:validator:isNumber');

export function isNumber(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NUMBER_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new NumberValidator(errorMessage), target, propertyKey);
    };
}

export class NumberValidator extends ValueTypeValidatorBase {
    constructor(errorMessage: StringFormatType = 'The value of ${DisplayName} must have valu type: ${ValueType} .') {
        super('Number', 'number', errorMessage);
    }
}
