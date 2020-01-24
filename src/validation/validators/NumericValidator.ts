import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { PatternValidator, PatternValidatorBase } from './index';

export const VALIDATOR_NUMERIC_METADATA_KEY = Symbol('validation:validator:isNumeric');

export type NumericValidatorStyle = 'integer' | 'decimal';

export function isNumeric(style: NumericValidatorStyle = 'integer', errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NUMERIC_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new NumericValidator(style, errorMessage), target, propertyKey);
    };
}

export const PATTERN_NUMERIC = /^[\-\+]?\d+\.?\d*$/gi;

export class NumericValidator extends PatternValidatorBase {
    constructor(
        private style: NumericValidatorStyle = 'integer',
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have numeric pattern : ${Pattern} .',
    ) {
        super('Numeric', PATTERN_NUMERIC, errorMessage);
    }

    public get Style(): string {
        return this.style;
    }
}
