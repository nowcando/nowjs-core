import "reflect-metadata";

export type ValidateIfFunc = (...args: any[]) => boolean;

export const VALIDATION_VALIDATEIF_METADATA_KEY = Symbol("validation:validateIf");

export function validateIf(fn: ValidateIfFunc) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATION_VALIDATEIF_METADATA_KEY, fn, target, propertyKey);
    };
}

/*const maxMetadataKey = Symbol("validate-Max");
const minMetadataKey = Symbol("validate-Min");
const requiredMetadataKey = Symbol("validate-Required");
const rangeMetadataKey = Symbol("validate-Range");
const compareMetadataKey = Symbol("validate-Compare");
const isNumericMetadataKey = Symbol("validate-IsNumeric");
const isDigitMetadataKey = Symbol("validate-IsDigit");//
const isCurrencyMetadataKey = Symbol("validate-IsCurrency");
const isPositiveMetadataKey = Symbol("validate-IsPositive");
const isNegativeMetadataKey = Symbol("validate-IsNegative");
const isRegexpMetadataKey = Symbol("validate-IsRegexp");
const isDivisibleByMetadataKey = Symbol("validate-IsDivisibleBy");

const isAlphaMetadataKey = Symbol("validate-IsAlpha");
const isAlphaNumericMetadataKey = Symbol("validate-IsAlphaNumeric");
const isDefined = Symbol("validate-IsDefined");

const isEqualMetadataKey = Symbol("validate-IsEqual");
const isNotEqualMetadataKey = Symbol("validate-IsNotEqual");
const isEqualGreaterMetadataKey = Symbol("validate-IsEqualGreater");
const isEqualLowerMetadataKey = Symbol("validate-IsEqualLower");

const isInMetadataKey = Symbol("validate-IsIn");
const isNotInMetadataKey = Symbol("validate-IsNotIn");
const isEmptyGreaterMetadataKey = Symbol("validate-IsEmpty");
const isNotEmptyMetadataKey = Symbol("validate-IsNotEmpty");

const containsByMetadataKey = Symbol("validate-Contains");
const notContainsByMetadataKey = Symbol("validate-NotContains");

const isEmailMetadataKey = Symbol("validate-IsEmail");
const isURLMetadataKey = Symbol("validate-IsUrl");
const isURNMetadataKey = Symbol("validate-IsUrn");
const isFQDNMetadataKey = Symbol("validate-IsFQDN");
const isUUIDMetadataKey = Symbol("validate-IsUUID");
const isISO8601MetadataKey = Symbol("validate-IsISO8601");
const isISBNMetadataKey = Symbol("validate-IsISBN");
const isISINMetadataKey = Symbol("validate-IsISIN");
const isCreditCardMetadataKey = Symbol("validate-IsCreditCard");

const isJSONMetadataKey = Symbol("validate-IsJSON");
const isLowerCaseMetadataKey = Symbol("validate-IsLowercase");
const isUpperCaseMetadataKey = Symbol("validate-IsUppercase");

const isHexColorMetadataKey = Symbol("validate-IsHexColor");

const isIPMetadataKey = Symbol("validate-IsIp");
const isIPv4MetadataKey = Symbol("validate-IsIpv4");
const isIPv6MetadataKey = Symbol("validate-IsIpv6");
const isStringMetadataKey = Symbol("validate-IsString");
const isBooleanMetadataKey = Symbol("validate-IsBoolean");
const isDateMetadataKey = Symbol("validate-IsDate");
const isTimeMetadataKey = Symbol("validate-IsTime");
const isHourMetadataKey = Symbol("validate-IsHour");
const isMinuteMetadataKey = Symbol("validate-IsMinute");
const isSecondMetadataKey = Symbol("validate-IsSecond");
const isGregorianDateMetadataKey = Symbol("validate-IsGregorianDate");
const isJalaliDateMetadataKey = Symbol("validate-IsJalaliDate");

const isArrayMetadataKey = Symbol("validate-IsArray");
const isMapMetadataKey = Symbol("validate-IsMap");
const isSetMetadataKey = Symbol("validate-IsSet");
const isTypeMetadataKey = Symbol("validate-IsType");

const isGeoCoordinateMetadataKey = Symbol("validate-IsGeoCoordinate");
const isObjectMetadataKey = Symbol("validate-IsObject");
const isFunctionMetadataKey = Symbol("validate-IsFunction");
const isNullMetadataKey = Symbol("validate-IsNull");

const isIranPostalCodeMetadataKey = Symbol("validate-IsIranPostalCode");
const isIranMobileNumberMetadataKey = Symbol("validate-IsIranMobileNumber");
const isIsPersianTextMetadataKey = Symbol("validate-IsPersianText");
const isIsEnglishTextMetadataKey = Symbol("validate-IsEnglishText");
const isIsBinaryTextMetadataKey = Symbol("validate-IsBinaryText");
const isIsHexTextMetadataKey = Symbol("validate-IsHexText");
const isIsBase64TextMetadataKey = Symbol("validate-IsBase64Text");
const isIsBase64MetadataKey = Symbol("validate-IsBase64");

const arrayContainsMetadataKey = Symbol("validate-ArrayContains");
const arrayNotContainsMetadataKey = Symbol("validate-ArrayNotContains");
const arrayNotEmptyMetadataKey = Symbol("validate-ArrayNotEmpty");
const arrayMinSizeMetadataKey = Symbol("validate-ArrayMinSize");
const arrayMaxSizeMetadataKey = Symbol("validate-ArrayMaxSize");
const arrayUniqueMetadataKey = Symbol("validate-ArrayUnique");*/

/*export function required() {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        let existingRequiredParameters: number[] =
         Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
    }
}*/

/*export function validate<T>(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {

    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new ValidationError(propertyName, "Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }

}*/
