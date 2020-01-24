import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { CompareToValidatorBase } from './index';

export const VALIDATOR_EQUALTO_METADATA_KEY = Symbol('validation:validator:isEqualTo');

export function isEqualTo(anotherTarget: any, anotherPropertyName = '', errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_EQUALTO_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(
            VALIDATOR_METADATA_KEY,
            new EqualToValidator(anotherTarget, anotherPropertyName, errorMessage),
            target,
            propertyKey,
        );
    };
}

export class EqualToValidator extends CompareToValidatorBase {
    constructor(
        anotherTarget: any,
        anotherPropertyName = '',
        errorMessage: StringFormatType = 'The value of ${DisplayName} must ${style}  .',
    ) {
        super('EqualTo', 'equal', anotherTarget, anotherPropertyName, errorMessage);
    }
}
