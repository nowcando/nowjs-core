import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

export const VALIDATOR_CONTAINS_METADATA_KEY = Symbol('validation:validator:isContains');

export function isContains(value: string, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_CONTAINS_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new ContainsValidator(value, errorMessage), target, propertyKey);
    };
}

export class ContainsValidator extends ValidatorBase {
    constructor(
        private value: string,
        errorMessage: StringFormatType = 'The value of ${DisplayName} must greater than min: ${Min} .',
    ) {
        super('Contains', errorMessage);
    }

    public get Value(): string {
        return this.value;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if (context.Value === undefined || context.Value === null) {
            return Promise.resolve(true);
        }

        if (!(context.Value.search(this.value) > 0)) {
            return Promise.reject(
                new ValidatorException(
                    this.Name,
                    context.Target,
                    context.PropertyName,
                    this.formatErrorMessage(context),
                ),
            );
        }
        return Promise.resolve(true);
    }
}
