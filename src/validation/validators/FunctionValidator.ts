import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

import { StringFormatType } from '../../utils/index';
import { ValueTypeValidatorBase } from './index';

export const VALIDATOR_FUNCTION_METADATA_KEY = Symbol('validation:validator:isFunction');

export function isFunction(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_FUNCTION_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new FunctionValidator(errorMessage), target, propertyKey);
    };
}

export class FunctionValidator extends ValueTypeValidatorBase {
    constructor(errorMessage: StringFormatType = 'The value of ${DisplayName} must have valu type: ${ValueType} .') {
        super('Function', 'function', errorMessage);
    }
}
