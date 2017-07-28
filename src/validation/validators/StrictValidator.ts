
import { StringFormatType } from "../../utils/index";
import { ValidationContext, ValidatorBase, ValidatorException } from "../index";

const strictMetadataKey = Symbol("StrictValidator");

export class StrictValidator extends ValidatorBase {

    constructor(errorMessage: StringFormatType = "The ${DisplayName} is ${Target} not stricted.") {
        super("Strict", errorMessage);
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)
            || (typeof context.Value === "string" && context.Value === "")) {
            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));
        }   else {
            return Promise.resolve(true);
        }
    }

}
