import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { ValueTypeValidatorBase } from './index';

export const VALIDATOR_BOOLEAN_METADATA_KEY = Symbol('validation:validator:isBoolean');

export function isBoolean(valueType: string, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_BOOLEAN_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(
            VALIDATOR_METADATA_KEY,
            new BooleanValidator(valueType, errorMessage),
            target,
            propertyKey,
        );
    };
}

export class BooleanValidator extends ValueTypeValidatorBase {
    constructor(
        valueType: string,
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have valu type: ${ValueType} .',
    ) {
        super('boolean', valueType, errorMessage);
    }
}
