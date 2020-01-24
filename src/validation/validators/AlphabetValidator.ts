// tslint:disable:max-line-length
// tslint:disable:ban-types
import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';
import { PatternValidator, PatternValidatorBase } from './index';

export const VALIDATOR_ALPHABET_METADATA_KEY = Symbol('validation:validator:isAlphabet');

export function isAlphabet(styles: string[] = ['universal'], errorMessage?: StringFormatType) {
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_ALPHABET_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(
            VALIDATOR_METADATA_KEY,
            new AlphabetValidator(styles, errorMessage),
            target,
            propertyKey,
        );
    };
}

export const PATTERN_ALPHABET_UNIVERSAL = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHABET_US = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/gi;
export const PATTERN_ALPHABET_IR = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHABET_EN = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHABET_UE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHABET_SA = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;

export const PATTERN_ALPHABET_IQ = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;
export const PATTERN_ALPHABET_AF = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi;

export class AlphabetValidator extends PatternValidatorBase {
    constructor(
        private styles = ['universal'],
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have alphabet pattern : ${Pattern} .',
    ) {
        super('Alphabet', /^/, errorMessage);

        this.setPattern(this.buildPattern());
    }

    private buildPattern(): RegExp {
        /*switch (styles.toLocaleLowerCase()) {
            case "universal": this.setPattern(PATTERN_ALPHABET_UNIVERSAL); break;
            case "ir": this.setPattern(PATTERN_ALPHABET_IR); break;
            case "iq": this.setPattern(PATTERN_ALPHABET_IQ); break;
            case "sa": this.setPattern(PATTERN_ALPHABET_EN); break;
            case "af": this.setPattern(PATTERN_ALPHABET_AF); break;
            case "ue": this.setPattern(PATTERN_ALPHABET_UE); break;
            case "en": this.setPattern(PATTERN_ALPHABET_EN); break;
            default: this.setPattern(PATTERN_ALPHABET_UNIVERSAL); break;
        }*/
        return PATTERN_ALPHABET_UNIVERSAL;
    }

    public get Styles(): string[] {
        return this.styles;
    }
}
