import { BigNumberOptions, BigNumberType } from "../computation/index";
import {BigNumber} from "../computation/math/index";

export function isNumberType(x: any): x is number {
    return typeof x === "number";
}

export function bigNumber(value?: BigNumberType, options?: BigNumberOptions): BigNumber {
    return new BigNumber(value, options);
}

declare global {
    // tslint:disable-next-line:interface-name
    interface Number {
        toBigNumber(options?: BigNumberOptions): BigNumber;
    }
}

export function toBigNumber(options?: BigNumberOptions): BigNumber {
    return new BigNumber(this, options);
}

Number.prototype.toBigNumber = toBigNumber;
