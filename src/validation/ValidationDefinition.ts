
import { StringFormatType } from "../utils/index";
import {
    AlphabetValidator, AlphaNumericValidator, CompareToValidator,
    CompareToValidatorStyle, ContainsValidator, DateValidator,
    EmailValidator, EqualToValidator, FunctionValidator,
    GreaterToValidator, GreatOrEqualToValidator, InLengthValidator,
    InRangeValidator, InValidator, IPValidator,
    IPValidatorOptions, JsonSchemaValidator,
    JsonValidator, LesserToValidator,
    LessOrEqualToValidator, MaxValidator,
    MinValidator, MobileValidator, NegativeValidator,
    NotContainsValidator, NotEqualToValidator, NotInValidator,
    NSIDValidator, NumberValidator, NumericValidator,
    NumericValidatorStyle, ObjectValidator, PatternValidator,
    PhoneValidator, PositiveValidator, PostalCodeValidator,
    RequiredValidator, StrictValidator,
    StringValidator, UrlValidator, UrlValidatorOptions,
    Validation, VALIDATION_DEFINIIONITEM_KEY,
    ValidatorBase, ValueTypeValidator,
} from "./index";
// tslint:disable:one-variable-per-declaration
// tslint:disable:no-empty
export class ValidationDefinition {

    private definitions = new Map<string, ValidatorBase[]>();
    private currentName = "";
    constructor() { }

    public get Definitions(): Map<string, ValidatorBase[]> {
        return this.definitions;
    }

    public on(propertyName: string) {
        // tslint:disable:curly
        if (!propertyName) return this;
        this.currentName = propertyName;
        this.definitions.set(propertyName, []);
        return this;
    }

    public add(...validator: ValidatorBase[]) {
        this.definitions.get(this.currentName).push(...validator);
        return this;
    }

    public get() {
        return this.definitions.get(this.currentName);
    }

    public clear() {
        const list = this.definitions.get(this.currentName);
        list.splice(0, list.length);
        return this;
    }

    public isStrict(errorMessage?: StringFormatType): ValidationDefinition {
        this.definitions.get(this.currentName).push(new StrictValidator(errorMessage));
        return this;
    }

    public isRequired(json: any): ValidationDefinition;
    public isRequired(errorMessage?: StringFormatType): ValidationDefinition;
    public isRequired(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new RequiredValidator(message));
        return this;
    }

    public isJsonSchema(json: any): ValidationDefinition;
    public isJsonSchema(schema: object|string, errorMessage?: StringFormatType): ValidationDefinition;
    public isJsonSchema(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let schema, message;

        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            schema = arg0.schema;
        } else {
            message = errorMessage;
            schema = arg0;
        }
        this.definitions.get(this.currentName).push(new JsonSchemaValidator(schema, message));
        return this;
    }

    public isMax(json: any): ValidationDefinition;
    public isMax(max: number, errorMessage?: StringFormatType): ValidationDefinition;
    public isMax(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let max, message;

        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            max = arg0.max;
        } else {
            message = errorMessage;
            max = arg0;
        }
        this.definitions.get(this.currentName).push(new MaxValidator(max, message));
        return this;
    }
    public isMin(json: any): ValidationDefinition;
    public isMin(min: number, errorMessage?: StringFormatType): ValidationDefinition;
    public isMin(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let min, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            min = arg0.min;
        } else {
            message = errorMessage;
            min = arg0;
        }
        this.definitions.get(this.currentName).push(new MinValidator(min, message));
        return this;
    }

    public isInRange(json: any): ValidationDefinition;
    public isInRange(min: number | Date, max: number | Date, errorMessage?: StringFormatType): ValidationDefinition;
    public isInRange(arg0: any, arg1?: number | Date, errorMessage?: StringFormatType): ValidationDefinition {
        let min, max, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            min = arg0.min;
            max = arg0.max;
        } else {
            message = errorMessage;
            min = arg0;
            max = arg1;
        }
        this.definitions.get(this.currentName).push(new InRangeValidator(min, max, message));
        return this;
    }

    public isInLength(json: any): ValidationDefinition;
    public isInLength(min: number | Date, max: number | Date, errorMessage?: StringFormatType): ValidationDefinition;
    public isInLength(arg0: any, arg1?: number | Date, errorMessage?: StringFormatType): ValidationDefinition {
        let min, max, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            min = arg0.min;
            max = arg0.max;
        } else {
            message = errorMessage;
            min = arg0;
            max = arg1;
        }
        this.definitions.get(this.currentName).push(new InLengthValidator(min, max, errorMessage));
        return this;
    }

    public isPattern(json: any): ValidationDefinition;
    public isPattern(pattern: RegExp, errorMessage?: StringFormatType): ValidationDefinition;
    public isPattern(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let pattern, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            pattern = arg0.pattern;
        } else {
            message = errorMessage;
            pattern = arg0;
        }
        this.definitions.get(this.currentName).push(new PatternValidator(pattern, errorMessage));
        return this;
    }

    public isIP(json: any): ValidationDefinition;
    public isIP(options?: IPValidatorOptions, errorMessage?: StringFormatType): ValidationDefinition;
    public isIP(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let options, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            options = arg0.options;
        } else {
            message = errorMessage;
            options = arg0;
        }
        this.definitions.get(this.currentName).push(new IPValidator(options, message));
        return this;
    }

    public isEmail(json: any): ValidationDefinition;
    public isEmail(errorMessage?: StringFormatType): ValidationDefinition;
    public isEmail(arg0?: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new EmailValidator(message));
        return this;
    }
    public isMobile(json: any): ValidationDefinition;
    public isMobile(style: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isMobile(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {

        let style, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            style = arg0.style;
        } else {
            message = errorMessage;
            style = arg0;
        }
        this.definitions.get(this.currentName).push(new MobileValidator(style, message));
        return this;
    }

    public isPhone(json: any): ValidationDefinition;
    public isPhone(style: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isPhone(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {

        let style, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            style = arg0.style;
        } else {
            message = errorMessage;
            style = arg0;
        }
        this.definitions.get(this.currentName).push(new PhoneValidator(style, message));
        return this;
    }

    public isNumeric(json: any): ValidationDefinition;
    public isNumeric(style: NumericValidatorStyle, errorMessage?: StringFormatType): ValidationDefinition;
    public isNumeric(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let style, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            style = arg0.style;
        } else {
            message = errorMessage;
            style = arg0;
        }
        this.definitions.get(this.currentName).push(new NumericValidator(style, message));
        return this;
    }

    public isUrl(json: any): ValidationDefinition;
    public isUrl(options?: UrlValidatorOptions, errorMessage?: StringFormatType): ValidationDefinition;
    public isUrl(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let options, message;

        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            options = arg0.options;
        } else {
            message = errorMessage;
            options = arg0;
        }
        this.definitions.get(this.currentName).push(new UrlValidator(options, message));
        return this;
    }

    public isNegative(json: any): ValidationDefinition;
    public isNegative(errorMessage?: StringFormatType): ValidationDefinition;
    public isNegative(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new NegativeValidator(message));
        return this;
    }

    public isPositive(json: any): ValidationDefinition;
    public isPositive(errorMessage?: StringFormatType): ValidationDefinition;
    public isPositive(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new PositiveValidator(message));
        return this;
    }

    public isAlphabet(json: any): ValidationDefinition;
    public isAlphabet(styles: string[], errorMessage?: StringFormatType): ValidationDefinition;
    public isAlphabet(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {

        let styles, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            styles = arg0.style;
        } else {
            message = errorMessage;
            styles = arg0;
        }
        this.definitions.get(this.currentName).push(new AlphabetValidator(styles, message));
        return this;
    }

    public isAlphaNumeric(json: any): ValidationDefinition;
    public isAlphaNumeric(styles: string[], errorMessage?: StringFormatType): ValidationDefinition;
    public isAlphaNumeric(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let styles, message;

        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            styles = arg0.style;
        } else {
            message = errorMessage;
            styles = arg0;
        }
        this.definitions.get(this.currentName).push(new AlphaNumericValidator(styles, message));
        return this;
    }

    public isValueType(json: any): ValidationDefinition;
    public isValueType(valueType: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isValueType(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {

        let valueType, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            valueType = arg0.valueType;
        } else {
            message = errorMessage;
            valueType = arg0;
        }
        this.definitions.get(this.currentName).push(new ValueTypeValidator(valueType, message));
        return this;
    }

    public compareTo(json: any): ValidationDefinition;
    public compareTo(style: CompareToValidatorStyle, anotherTarget: any,
                     anotherPropertyName: string, errorMessage?: StringFormatType): ValidationDefinition;
    public compareTo(arg0: any, arg1?: any, arg2?: string, errorMessage?: StringFormatType): ValidationDefinition {

        let style, anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            style = arg0.style;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            style = arg0;
            anotherTarget = arg1;
            anotherPropertyName = arg2;
        }
        this.definitions.get(this.currentName)
            .push(new CompareToValidator(style, anotherTarget, anotherPropertyName, message));
        return this;
    }

    public isEqualTo(json: any): ValidationDefinition;
    public isEqualTo(anotherTarget: any, anotherPropertyName: string,
                     // tslint:disable-next-line:unified-signatures
                     errorMessage?: StringFormatType): ValidationDefinition;
    public isEqualTo(arg0: any, arg1?: any, errorMessage?: StringFormatType): ValidationDefinition {
        let anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            anotherTarget = arg0;
            anotherPropertyName = arg1;
        }
        this.definitions.get(this.currentName)
            .push(new EqualToValidator(anotherTarget, anotherPropertyName, message));
        return this;
    }
    public isNotEqualTo(json: any): ValidationDefinition;
    public isNotEqualTo(anotherTarget: any,
                        // tslint:disable-next-line:unified-signatures
                        anotherPropertyName: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isNotEqualTo(arg0: any, arg1?: any, errorMessage?: StringFormatType): ValidationDefinition {
        let anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            anotherTarget = arg0;
            anotherPropertyName = arg1;
        }
        this.definitions.get(this.currentName)
        .push(new NotEqualToValidator(anotherTarget, anotherPropertyName, message));
        return this;
    }

    public isGreaterTo(json: any): ValidationDefinition;
    // tslint:disable-next-line:unified-signatures
    public isGreaterTo(anotherTarget: any, anotherPropertyName: string,
                       // tslint:disable-next-line:unified-signatures
                       errorMessage?: StringFormatType): ValidationDefinition;
    public isGreaterTo(arg0: any, arg1?: any, errorMessage?: StringFormatType): ValidationDefinition {
        let anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            anotherTarget = arg0;
            anotherPropertyName = arg1;
        }
        this.definitions.get(this.currentName)
        .push(new GreaterToValidator(anotherTarget, anotherPropertyName, message));
        return this;
    }

    public isGreatOrEqualTo(json: any): ValidationDefinition;
    // tslint:disable-next-line:unified-signatures
    public isGreatOrEqualTo(anotherTarget: any, anotherPropertyName: string,
                            // tslint:disable-next-line:unified-signatures
                            errorMessage?: StringFormatType): ValidationDefinition;
    public isGreatOrEqualTo(arg0: any, arg1?: any, errorMessage?: StringFormatType): ValidationDefinition {

        let anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            anotherTarget = arg0;
            anotherPropertyName = arg1;
        }
        this.definitions.get(this.currentName)
        .push(new GreatOrEqualToValidator(anotherTarget, anotherPropertyName, message));
        return this;
    }

    public isLesserTo(json: any): ValidationDefinition;
    public isLesserTo(anotherTarget: any, anotherPropertyName: string,
                      // tslint:disable-next-line:unified-signatures
                      errorMessage?: StringFormatType): ValidationDefinition;
    public isLesserTo(arg0: any, arg1?: any, errorMessage?: StringFormatType): ValidationDefinition {
        let anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            anotherTarget = arg0;
            anotherPropertyName = arg1;
        }
        // tslint:disable-next-line:max-line-length
        this.definitions.get(this.currentName).push(new LesserToValidator(anotherTarget, anotherPropertyName, message));
        return this;
    }

    public isLessOrEqualTo(json: any): ValidationDefinition;
    public isLessOrEqualTo(anotherTarget: any, anotherPropertyName: string,
                           // tslint:disable-next-line:unified-signatures
                           errorMessage?: StringFormatType): ValidationDefinition;
    public isLessOrEqualTo(arg0: any, arg1?: any, errorMessage?: StringFormatType): ValidationDefinition {
        let anotherTarget, anotherPropertyName, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            anotherTarget = arg0.target;
            anotherPropertyName = arg0.propertyName;
        } else {
            message = errorMessage;
            anotherTarget = arg0;
            anotherPropertyName = arg1;
        }
        this.definitions.get(this.currentName)
        .push(new LessOrEqualToValidator(anotherTarget, anotherPropertyName, message));
        return this;
    }

    public isIn(json: any): ValidationDefinition;
    public isIn(values: any[], errorMessage?: StringFormatType): ValidationDefinition;
    public isIn(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let values, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            values = arg0.values;
        } else {
            message = errorMessage;
            values = arg0;
        }
        this.definitions.get(this.currentName).push(new InValidator(values, message));
        return this;
    }

    public isNotIn(json: any): ValidationDefinition;
    public isNotIn(values: any[], errorMessage?: StringFormatType): ValidationDefinition;
    public isNotIn(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let values, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            values = arg0.values;
        } else {
            message = errorMessage;
            values = arg0;
        }
        this.definitions.get(this.currentName).push(new NotInValidator(values, message));
        return this;
    }

    public isContains(json: any): ValidationDefinition;
    public isContains(value: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isContains(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let value: string, message: StringFormatType;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            value = arg0.values;
        } else {
            message = errorMessage;
            value = arg0;
        }
        this.definitions.get(this.currentName).push(new ContainsValidator(value, message));
        return this;
    }

    public isNotContains(json: any): ValidationDefinition;
    public isNotContains(value: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isNotContains(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let value, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            value = arg0.values;
        } else {
            message = errorMessage;
            value = arg0;
        }
        this.definitions.get(this.currentName).push(new NotContainsValidator(value, message));
        return this;
    }

    public isObject(json: any): ValidationDefinition;
    public isObject(errorMessage?: StringFormatType): ValidationDefinition;
    public isObject(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new ObjectValidator(message));
        return this;
    }

    public isString(json: any): ValidationDefinition;
    public isString(errorMessage?: StringFormatType): ValidationDefinition;
    public isString(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new StringValidator(message));
        return this;
    }

    public isFunction(json: any): ValidationDefinition;
    public isFunction(errorMessage?: StringFormatType): ValidationDefinition;
    public isFunction(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new FunctionValidator(message));
        return this;
    }

    public isDate(json: any): ValidationDefinition;
    public isDate(errorMessage?: StringFormatType): ValidationDefinition;
    public isDate(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new DateValidator(message));
        return this;
    }

    public isNumber(json: any): ValidationDefinition;
    public isNumber(errorMessage?: StringFormatType): ValidationDefinition;
    public isNumber(arg0: any): ValidationDefinition {
        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }
        this.definitions.get(this.currentName).push(new NumberValidator(message));
        return this;
    }

    public isPostalCode(json: any): ValidationDefinition;
    public isPostalCode(style: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isPostalCode(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let style, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            style = arg0.style;
        } else {
            message = errorMessage;
            style = arg0;
        }
        this.definitions.get(this.currentName).push(new PostalCodeValidator(style, message));
        return this;
    }

    public isNSID(json: any): ValidationDefinition;
    public isNSID(style: string, errorMessage?: StringFormatType): ValidationDefinition;
    public isNSID(arg0: any, errorMessage?: StringFormatType): ValidationDefinition {
        let style, message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
            style = arg0.style;
        } else {
            message = errorMessage;
            style = arg0;
        }
        this.definitions.get(this.currentName).push(new NSIDValidator(style, message));
        return this;
    }
    public isJson(json: any): ValidationDefinition;
    public isJson(errorMessage?: StringFormatType): ValidationDefinition;
    public isJson(arg0: any): ValidationDefinition {

        let message;
        if (arg0 && arg0[VALIDATION_DEFINIIONITEM_KEY] === VALIDATION_DEFINIIONITEM_KEY) {
            message = arg0.message;
        } else {
            message = arg0;
        }

        this.definitions.get(this.currentName).push(new JsonValidator(message));
        return this;
    }

}
