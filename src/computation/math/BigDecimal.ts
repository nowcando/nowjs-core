/* eslint-disable prefer-const */
export interface BigDecimalOptions {
    decimals?: number;
}

export type NumericTypes = BigDecimal | number | string | bigint;

export class BigDecimal {
    public static readonly DEFAULT_PRECISION = 18;
    public bigint = 0n;
    private options: BigDecimalOptions;
    constructor(value: NumericTypes, options?: BigDecimalOptions) {
        this.options = { ...options } || {};
        this.options.decimals = this.options.decimals || BigDecimal.DEFAULT_PRECISION;
        if (!(value instanceof BigDecimal)) {
            // tslint:disable-next-line:prefer-const
            let [ints, decis] = String(value)
                .split('.')
                .concat('');
            decis = decis.padEnd(this.options.decimals, '0');
            this.bigint = BigInt(ints + decis);
        } else {
            this.bigint = value.bigint;
            this.options = value.options;
        }
    }

    public static min(...bigDecimals: BigDecimal[]): BigDecimal {
        if (bigDecimals.length < 1) {
            throw new Error('Operation not valid');
        }
        let r: BigDecimal = bigDecimals[0];
        for (const item of bigDecimals) {
            if (item.bigint < r.bigint) {
                r = item;
            }
        }
        return r;
    }
    public static max(...bigDecimals: BigDecimal[]): BigDecimal {
        if (bigDecimals.length < 1) {
            throw new Error('Operation not valid');
        }
        let r: BigDecimal = bigDecimals[0];
        for (const item of bigDecimals) {
            if (item.bigint > r.bigint) {
                r = item;
            }
        }
        return r;
    }
    public static fromBigInt(bigint: bigint, options?: BigDecimalOptions): BigDecimal {
        return Object.assign(Object.create(BigDecimal.prototype), { bigint, options });
    }
    public divide(value: NumericTypes) {
        if (!(value instanceof BigDecimal)) {
            value = new BigDecimal(value);
        }
        return BigDecimal.fromBigInt(
            (this.bigint * BigInt('1' + '0'.repeat(this.options.decimals))) / value.bigint,
            value.options,
        );
    }

    public plus(value: NumericTypes) {
        if (!(value instanceof BigDecimal)) {
            value = new BigDecimal(value);
        }
        return BigDecimal.fromBigInt(this.bigint + value.bigint, value.options);
    }

    public minus(value: NumericTypes) {
        if (!(value instanceof BigDecimal)) {
            value = new BigDecimal(value);
        }
        return BigDecimal.fromBigInt(this.bigint - value.bigint, value.options);
    }
    public multiply(value: NumericTypes) {
        if (!(value instanceof BigDecimal)) {
            value = new BigDecimal(value);
        }
        return BigDecimal.fromBigInt(
            (this.bigint * value.bigint) / BigInt('1' + '0'.repeat(this.options.decimals)),
            value.options,
        );
    }

    public power(value: string | number | bigint) {
        if (!(typeof value === 'bigint')) {
            value = BigInt(value);
        }
        return BigDecimal.fromBigInt(
            this.bigint ** value / BigInt('1' + '0'.repeat(this.options.decimals)),
            this.options,
        );
    }

    public sqrt() {
        const value = this.bigint;
        if (value < 0n) {
            throw new Error('square root of negative numbers is not supported');
        }

        if (value < 2n) {
            return value;
        }

        function newtonIteration(n: bigint, x0: bigint): any {
            // tslint:disable-next-line:no-bitwise
            const x1 = (n / x0 + x0) >> 1n;
            if (x0 === x1 || x0 === x1 - 1n) {
                return x0;
            }
            return newtonIteration(n, x1);
        }

        const r = newtonIteration(value, 1n);

        return BigDecimal.fromBigInt(r, this.options);
    }
    private normalizeValue(value: NumericTypes) {
        if (!(value instanceof BigDecimal)) {
            value = new BigDecimal(value);
        }
        return value;
    }

    public toString() {
        const s = this.bigint.toString();
        const r = s.slice(0, -this.options.decimals);
        const d = s.slice(-this.options.decimals).replace(/\.?0+$/, '');
        return d && d.length > 0 ? r + '.' + d : r;
    }
}
