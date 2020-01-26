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

export function toPascalCaseWrapper(): string {
    return toPascalCase(this);
}
export function toCamelCaseWrapper(): string {
    return toCamelCase(this);
}
export function toTitleCaseWrapper(): string {
    return toTitleCase(this);
}

export function toSentenceCaseWrapper(): string {
    return toSentenceCase(this);
}

export function toUpperFirstCaseWrapper(): string {
    return toUpperFirstCase(this);
}

export function toLowerFirstCaseWrapper(): string {
    return toLowerFirstCase(this);
}

export function toSnakeCaseWrapper(): string {
    return toSnakeCase(this);
}
export function toDotCaseWrapper(): string {
    return toDotCase(this);
}
