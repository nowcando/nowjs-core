import { BigNumberOptions, BigNumberType, ComplexNumber } from "../computation/index";
import {BigNumber} from "../computation/math/index";

export function isNumberType(x: any): x is number {
    return typeof x === "number";
}

export function bigNumber(value?: BigNumberType, options?: BigNumberOptions): BigNumber {
    return new BigNumber(value, options);
}

export function complexNumber(a: number | string | ComplexNumber, b?: number): ComplexNumber {
    return new ComplexNumber(a, b);
}

declare global {
    // tslint:disable-next-line:interface-name
    interface Number {
        toBigNumber(options?: BigNumberOptions): BigNumber;
        toComplexNumber(b?: number): ComplexNumber;
    }
}

export function toBigNumber(options?: BigNumberOptions): BigNumber {
    return new BigNumber(this, options);
}

export function toComplexNumber(b?: number): ComplexNumber {
    return new ComplexNumber(this, b);
}

Number.prototype.toBigNumber = toBigNumber;
Number.prototype.toComplexNumber = toComplexNumber;
