import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { PatternValidator, PatternValidatorBase } from './index';

export const VALIDATOR_ALPHANUMERIC_METADATA_KEY = Symbol('validation:validator:isAlphaNumeric');

export function isAlphaNumeric(styles: string[] = ['universal'], errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_ALPHANUMERIC_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(
            VALIDATOR_METADATA_KEY,
            new AlphaNumericValidator(styles, errorMessage),
            target,
            propertyKey,
        );
    };
}

export const PATTERN_ALPHANUMERIC_UNIVERSAL = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHANUMERIC_US = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/gi;
export const PATTERN_ALPHANUMERIC_IR = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHANUMERIC_EN = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHANUMERIC_UE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHANUMERIC_SA = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;

export const PATTERN_ALPHANUMERIC_IQ = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHANUMERIC_AF = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;

export class AlphaNumericValidator extends PatternValidatorBase {
    constructor(
        private styles = ['universal'],
        // tslint:disable-next-line:max-line-length
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have alphabet pattern : ${Pattern} .',
    ) {
        super('AlphaNumeric', /^/, errorMessage);

        this.setPattern(this.buildPattern());
    }

    private buildPattern(): RegExp {
        /*switch (styles.toLocaleLowerCase()) {
            case "universal": this.setPattern(PATTERN_ALPHANUMERIC_UNIVERSAL); break;
            case "ir": this.setPattern(PATTERN_ALPHANUMERIC_IR); break;
            case "iq": this.setPattern(PATTERN_ALPHANUMERIC_IQ); break;
            case "sa": this.setPattern(PATTERN_ALPHANUMERIC_EN); break;
            case "af": this.setPattern(PATTERN_ALPHANUMERIC_AF); break;
            case "ue": this.setPattern(PATTERN_ALPHANUMERIC_UE); break;
            case "en": this.setPattern(PATTERN_ALPHANUMERIC_EN); break;
            default: this.setPattern(PATTERN_ALPHANUMERIC_UNIVERSAL); break;
        }*/
        return PATTERN_ALPHANUMERIC_UNIVERSAL;
    }

    public get Styles(): string[] {
        return this.styles;
    }
}
