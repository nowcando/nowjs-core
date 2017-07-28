
import "reflect-metadata";
import { isNumberType } from "./index";

// decorators
const formatMetadataKey = Symbol("string.format");

export function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

export  function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

// utils

export function isStringType(x: any): x is string {
    return typeof x === "string";
}

export function padLeft(value: string, padding: string | number) {
    if (isNumberType(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isStringType(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

export function randomString(length: number,
                             allowDuplicate: boolean = true , chars: string = "0123456789"): string {
    const result: string[] = [];
    while (result.length < length) {
        const randomIx = Math.floor(Math.random() * chars.length);

        if (!allowDuplicate) {
             if (result.indexOf(chars[randomIx]) >= 0) {continue; }
             result.push(chars[randomIx]);
        }   else {
             result.push(chars[randomIx]);
        }

    }
    return result.join("");

}
