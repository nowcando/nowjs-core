import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

import { StringFormatType } from '../../utils/index';
import { PatternValidator, PatternValidatorBase } from './index';

export const VALIDATOR_URL_METADATA_KEY = Symbol('validation:validator:isUrl');

// tslint:disable-next-line:interface-name
export interface UrlValidatorOptions {
    MaxSize?: number;
    Protocols?: string[];
    Ports?: string[];
    ForceProtocol?: boolean;
    ForcePort?: boolean;
    AllowQuery?: boolean;
}

export function isUrl(options?: UrlValidatorOptions, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_URL_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new UrlValidator(options, errorMessage), target, propertyKey);
    };
}

export const PATTERN_URL_UNIVERSAL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi;

export class UrlValidator extends PatternValidatorBase {
    constructor(
        options?: UrlValidatorOptions,
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have url pattern : ${Pattern} .',
    ) {
        super('Url', PATTERN_URL_UNIVERSAL, errorMessage);
        options = options || {
            Ports: [],
            Protocols: ['http', 'https'],
            // tslint:disable-next-line:object-literal-sort-keys
            ForcePort: false,
            AllowQuery: false,
            MaxSize: 1024,
            ForceProtocol: true,
        };
    }
}
