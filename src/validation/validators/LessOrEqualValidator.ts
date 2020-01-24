import { StringFormatType } from '../../utils/index';
import {
    CompareToValidator,
    ValidationContext,
    VALIDATOR_METADATA_KEY,
    ValidatorBase,
    ValidatorException,
} from '../index';
import { CompareToValidatorBase } from './index';
export const VALIDATOR_LESSOREQUAL_METADATA_KEY = Symbol('validation:validator:isLessOrEqualTo');

export function isLessOrEqualTo(anotherTarget: any, anotherPropertyName = '', errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_LESSOREQUAL_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(
            VALIDATOR_METADATA_KEY,
            new LessOrEqualToValidator(anotherTarget, anotherPropertyName, errorMessage),
            target,
            propertyKey,
        );
    };
}

export class LessOrEqualToValidator extends CompareToValidatorBase {
    constructor(
        anotherTarget: any,
        anotherPropertyName = '',
        errorMessage: StringFormatType = 'The value of ${DisplayName} must ${style}  .',
    ) {
        super('LessOrEqualTo', 'lessOrEqual', anotherTarget, anotherPropertyName, errorMessage);
    }
}
