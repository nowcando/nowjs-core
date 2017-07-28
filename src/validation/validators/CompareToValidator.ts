
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

export const VALIDATOR_COMPARETO_METADATA_KEY = Symbol("validation:validator:compareTo");

export type CompareToValidatorStyle = "equal" | "greater" | "lesser" | "greatOrEqual" | "lessOrEqual" | "notEqual" ;

export function compareTo(style: CompareToValidatorStyle ,
                          anotherTarget: any, anotherPropertyName: string= "" , errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_COMPARETO_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new CompareToValidator(style, anotherTarget, anotherPropertyName, errorMessage), target, propertyKey);
    };
}

export class CompareToValidatorBase extends ValidatorBase {

    constructor(name: string, private style: CompareToValidatorStyle,
                private anotherTarget: any, private anotherPropertyName: string= "" ,
                errorMessage: StringFormatType =
          "The value of ${DisplayName} must ${style}  .") {
        super(name, errorMessage);
    }

    public get Style(): CompareToValidatorStyle {
        return this.style;
    }

    private isMatched(context: ValidationContext<any, any>, another: ValidationContext<any, any>) {
        switch (this.style) {
            case "equal": return context.Value === another.Value;
            case "greater": return context.Value > another.Value;
            case "lesser": return context.Value < another.Value;
            case "greatOrEqual": return context.Value >= another.Value;
            case "lessOrEqual": return context.Value <= another.Value;
            case "notEqual": return context.Value !== another.Value;
            default : return true;
        }
    }

    // tslint:disable-next-line:member-ordering
    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }

        const anotherContext = new ValidationContext(this.anotherTarget, this.anotherPropertyName);

        if (!this.isMatched(context, anotherContext)) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));

        }
        return Promise.resolve(true);
    }

}

// tslint:disable-next-line:max-classes-per-file
export class CompareToValidator extends CompareToValidatorBase {

    // tslint:disable-next-line:max-line-length
    constructor( style: CompareToValidatorStyle,  anotherTarget: any,  anotherPropertyName: string= "" , errorMessage: StringFormatType = "The value of ${DisplayName} must ${style}  .") {
        super("CompareTo", style, anotherTarget, anotherPropertyName, errorMessage);
    }

}
