import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

export const VALIDATOR_VALUETYPE_METADATA_KEY = Symbol('validation:validator:isValueType');

export function isValueType(valueType: string, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_VALUETYPE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(
            VALIDATOR_METADATA_KEY,
            new ValueTypeValidator(valueType, errorMessage),
            target,
            propertyKey,
        );
    };
}

export class ValueTypeValidatorBase extends ValidatorBase {
    constructor(
        name: string,
        private valueType: string,
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have valu type: ${ValueType} .',
    ) {
        super(name, errorMessage);
    }

    public get ValueType(): string {
        return this.valueType;
    }

    private isMatchedType(value: any) {
        // tslint:disable:curly
        if (typeof value === this.valueType) return true;
        else if (typeof value === 'object' && value.constructor.name === this.valueType) return true;
        else return false;
    }

    // tslint:disable-next-line:member-ordering
    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if (context.Value === undefined || context.Value === null) {
            return Promise.resolve(true);
        }

        if (!this.isMatchedType(context.Value)) {
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

// tslint:disable-next-line:max-classes-per-file
export class ValueTypeValidator extends ValueTypeValidatorBase {
    constructor(
        valueType: string,
        errorMessage: StringFormatType = 'The value of ${DisplayName} must have value type: ${ValueType} .',
    ) {
        super('ValueType', valueType, errorMessage);
    }
}
