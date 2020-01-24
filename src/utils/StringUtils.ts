import 'reflect-metadata';
import { isNumberType } from './index';

// decorators
const formatMetadataKey = Symbol('string.format');

export function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

export function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

// utils

export function isStringType(x: any): x is string {
    return typeof x === 'string';
}

export function padLeft(value: string, padding: string | number) {
    if (isNumberType(padding)) {
        return Array(padding + 1).join(' ') + value;
    }
    if (isStringType(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

export function randomString(length: number, allowDuplicate = true, chars = '0123456789'): string {
    const result: string[] = [];
    while (result.length < length) {
        const randomIx = Math.floor(Math.random() * chars.length);

        if (!allowDuplicate) {
            if (result.indexOf(chars[randomIx]) >= 0) {
                continue;
            }
            result.push(chars[randomIx]);
        } else {
            result.push(chars[randomIx]);
        }
    }
    return result.join('');
}

export function toPascalCase(str: string): string {
    return str.toCamelCase().toUpperFirstCase();
}

export function toCamelCase(str: string): string {
    return str
        .replace(/\s(.)/g, $1 => $1.toLocaleUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, $1 => $1.toLocaleLowerCase());
}

export function toTitleCase(str: string): string {
    return str.replace(/^.| ./g, m => {
        return m.toLocaleUpperCase();
    });
}

export function toSentenceCase(str: string): string {
    return str.toLocaleLowerCase().replace(/^./g, m => {
        return m.toLocaleUpperCase();
    });
}

export function toUpperFirstCase(str: string): string {
    return str.replace(/^./g, m => {
        return m.toLocaleUpperCase();
    });
}
export function toLowerFirstCase(str: string): string {
    return str.replace(/^./g, m => {
        return m.toLocaleLowerCase();
    });
}
export function toSnakeCase(str: string): string {
    return str.toLocaleLowerCase().replace(/\s/g, m => {
        return '_';
    });
}
export function toDotCase(str: string): string {
    return str.toLocaleLowerCase().replace(/\s/g, m => {
        return '.';
    });
}

function toPascalCaseWrapper(): string {
    return toPascalCase(this);
}
function toCamelCaseWrapper(): string {
    return toCamelCase(this);
}
function toTitleCaseWrapper(): string {
    return toTitleCase(this);
}

function toSentenceCaseWrapper(): string {
    return toSentenceCase(this);
}

function toUpperFirstCaseWrapper(): string {
    return toUpperFirstCase(this);
}

function toLowerFirstCaseWrapper(): string {
    return toLowerFirstCase(this);
}

function toSnakeCaseWrapper(): string {
    return toSnakeCase(this);
}
function toDotCaseWrapper(): string {
    return toDotCase(this);
}

String.prototype.toPascalCase = toPascalCaseWrapper;
String.prototype.toCamelCase = toCamelCaseWrapper;
String.prototype.toTitleCase = toTitleCaseWrapper;
String.prototype.toSentenceCase = toSentenceCaseWrapper;
String.prototype.toUpperFirstCase = toUpperFirstCaseWrapper;
String.prototype.toLowerFirstCase = toLowerFirstCaseWrapper;
String.prototype.toSnakeCase = toSnakeCaseWrapper;
String.prototype.toDotCase = toDotCaseWrapper;
