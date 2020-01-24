import 'reflect-metadata';

import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

export const VALIDATOR_REQUIRED_METADATA_KEY = Symbol('validation:validator:isRequired');

export function isRequired(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_REQUIRED_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new RequiredValidator(errorMessage), target, propertyKey);
    };
}

export class RequiredValidator extends ValidatorBase {
    constructor(errorMessage: StringFormatType = 'The ${DisplayName} is required.') {
        super('Required', errorMessage);
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if (
            context.Value === undefined ||
            context.Value === null ||
            (typeof context.Value === 'string' && context.Value === '')
        ) {
            return Promise.reject(
                new ValidatorException(
                    this.Name,
                    context.Target,
                    context.PropertyName,
                    this.formatErrorMessage(context),
                ),
            );
        } else {
            return Promise.resolve(true);
        }
    }
}
