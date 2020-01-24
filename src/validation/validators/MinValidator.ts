import { StringFormatType } from '../../utils/index';
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from '../index';

export const VALIDATOR_MIN_METADATA_KEY = Symbol('validation:validator:isMin');

export function isMin(min: number | Date, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Record<string, any>, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_MIN_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new MinValidator(min, errorMessage), target, propertyKey);
    };
}

export class MinValidator extends ValidatorBase {
    constructor(
        private min: number | Date,
        errorMessage: StringFormatType = 'The value of ${DisplayName} must greater than min: ${Min} .',
    ) {
        super('Min', errorMessage);
    }

    public get Min(): number | Date {
        return this.min;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if (context.Value === undefined || context.Value === null) {
            return Promise.resolve(true);
        }

        if (context.Value < this.min) {
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
