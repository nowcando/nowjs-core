import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { PatternValidator, PatternValidatorBase } from './index';

export const VALIDATOR_PHONE_METADATA_KEY = Symbol('validation:validator:isPhone');

export function isPhone(style = 'universal', errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_PHONE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new PhoneValidator(style, errorMessage), target, propertyKey);
    };
}

export const PATTERN_PHONE_UNIVERSAL = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_PHONE_US = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/gi;
export const PATTERN_PHONE_IR = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_PHONE_EN = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_PHONE_UE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_PHONE_SA = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;

export const PATTERN_PHONE_IQ = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_PHONE_AF = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;

export class PhoneValidator extends PatternValidatorBase {
    constructor(
        private style = 'universal',
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have phone pattern : ${Pattern} .',
    ) {
        super('Phone', /^/, errorMessage);

        switch (style.toLocaleLowerCase()) {
            case 'universal':
                this.setPattern(PATTERN_PHONE_UNIVERSAL);
                break;
            case 'ir':
                this.setPattern(PATTERN_PHONE_IR);
                break;
            case 'iq':
                this.setPattern(PATTERN_PHONE_IQ);
                break;
            case 'sa':
                this.setPattern(PATTERN_PHONE_EN);
                break;
            case 'af':
                this.setPattern(PATTERN_PHONE_AF);
                break;
            case 'ue':
                this.setPattern(PATTERN_PHONE_UE);
                break;
            case 'en':
                this.setPattern(PATTERN_PHONE_EN);
                break;
            default:
                this.setPattern(PATTERN_PHONE_UNIVERSAL);
                break;
        }
    }

    public get Style(): string {
        return this.style;
    }
}
