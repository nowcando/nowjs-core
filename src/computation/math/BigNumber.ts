/* This implementation obtained from :
 https://github.com/MikeMcl/decimal.js/blob/master/decimal.js
 MIT licenced package . thanks to MikeMcl .
*/
// tslint:disable:whitespace
// The maximum exponent magnitude.
// The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
import { Exception } from "../../exceptions/index";

export type BigNumberType = number | string | BigNumber;

const EXP_LIMIT = 9e15;                      // 0 to 9e15

// The limit on the value of `precision`, and on the value of the first argument to
// `to BigNumberPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
export const MAX_DIGITS = 1e9;                        // 0 to 1e9

// Base conversion alphabet.
export const NUMERALS = "0123456789abcdef";

// The natural logarithm of 10 (1025 digits).
// tslint:disable-next-line:max-line-length
export const LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";

// Pi (1025 digits).
// tslint:disable-next-line:max-line-length
export const PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";

export enum BigNumberRoundType {
    ROUND_UP = 0, ROUND_DOWN = 1, ROUND_CEIL = 2, ROUND_FLOOR = 3,
    ROUND_HALF_UP = 4, ROUND_HALF_DOWN = 5, ROUND_HALF_EVEN = 6,
    ROUND_HALF_CEIL = 7, ROUND_HALF_FLOOR = 8,
}
export enum BigNumberModuloType {
    UP = 0, DOWN = 1, FLOOR = 3, HALF_EVEN = 6,
    EUCLID = 9,
}

const mathpow = Math.pow;
const mathfloor = Math.floor;
// tslint:disable-next-line:interface-name
export interface BigNumberOptions {
    precision?: number;
    rounding?: BigNumberRoundType;
    modulo?: BigNumberModuloType;
    toExpNeg?: number;
    toExpPos?: number;
    minE?: number;
    maxE?: number;
    crypto?: boolean;
}

const isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
const isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
const isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
const isBigNumber = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
const BASE = 1e7;
const LOG_BASE = 7;
const MAX_SAFE_INTEGER = 9007199254740991;

const LN10_PRECISION = LN10.length - 1;
const PI_PRECISION = PI.length - 1;

let inexact: any;
// tslint:disable-next-line:prefer-const
let noConflict: any;
// tslint:disable-next-line:prefer-const
let quadrant: any;
let external = true;

const DEFAULT_OPTIONS: BigNumberOptions = {
    crypto: false,
    maxE: EXP_LIMIT,
    minE: -EXP_LIMIT,
    toExpPos: 21,
    // tslint:disable-next-line:object-literal-sort-keys
    toExpNeg: -7,
    modulo: 1,
    rounding: 4,
    precision: 20,
};

export class BigNumber {
    public static readonly LN10 = new BigNumber(LN10);
    public static readonly PI = new BigNumber(PI);
    protected s: number;
    protected e: number;
    protected d: any;
    protected t: string;
    constructor(value?: BigNumberType, private options?: BigNumberOptions) {
        const that = this;
        // tslint:disable-next-line:one-variable-per-declaration
        let e: number, i: number;
        this.options = Object.assign(options || {}, DEFAULT_OPTIONS);
        // Duplicate.
        if (value instanceof BigNumber) {
            that.s = value.s;
            that.e = value.e;
            that.d = (value = value.d) ? (value as any).slice() : value;
            return;
        }
        that.t = typeof value;

        if (that.t === "number") {
            if (value === 0) {
                that.s = 1 / value < 0 ? -1 : 1;
                that.e = 0;
                that.d = [0];
                return;
            }

            if (value < 0) {
                value = -value;
                that.s = -1;
            } else {
                that.s = 1;
            }

            // Fast path for small integers.
            // tslint:disable-next-line:no-bitwise
            if (value === ~~value && value < 1e7) {
                // tslint:disable-next-line:curly
                for (e = 0, i = value; i >= 10; i /= 10) e++;
                that.e = e;
                that.d = [value];
                return;

                // Infinity, NaN.
            } else if (value as any * 0 !== 0) {
                // tslint:disable-next-line:curly
                if (!value) that.s = NaN;
                that.e = NaN;
                that.d = null;
                return;
            }

            return BigNumber.parseBigNumber(that, value.toString());

        } else if (that.t !== "string") {
            throw new Exception("invalidArgument + v");
        }
        if (typeof value === "string") {
            if (value.charCodeAt(0) === 45) {
                value = value.slice(1);
                that.s = -1;
            } else {
                that.s = 1;
            }
            return isBigNumber.test(value) ? BigNumber.parseBigNumber(that, value) : BigNumber.parseOther(that, value);
        }
    }

    // tslint:disable:member-ordering
    private static divider = () => {

        function multiplyInteger(x: any, k: any, base: any) {
            // tslint:disable:one-variable-per-declaration
            let temp,
                carry = 0,
                i = x.length;
            for (x = x.slice(); i--;) {
                temp = x[i] * k + carry;
                // tslint:disable:no-bitwise
                x[i] = temp % base | 0;
                carry = temp / base | 0;
            }
            // tslint:disable:curly
            if (carry) x.unshift(carry);
            return x;
        }
        function compare(a: any, b: any, aL: any, bL: any) {
            let i, r;
            if (aL !== bL) {
                r = aL > bL ? 1 : -1;
            } else {
                for (i = r = 0; i < aL; i++) {
                    if (a[i] !== b[i]) {
                        r = a[i] > b[i] ? 1 : -1;
                        break;
                    }
                }
            }
            return r;
        }
        function subtract(a: any, b: any, aL: any, base: any) {
            let i = 0;
            // Subtract b from a.
            for (; aL--;) {
                a[aL] -= i;
                i = a[aL] < b[aL] ? 1 : 0;
                a[aL] = i * base + a[aL] - b[aL];
            }
            // Remove leading zeros.
            for (; !a[0] && a.length > 1;) a.shift();
        }
        return (x: any, y?: any, pr?: any, rm?: any, dp?: any, base?: any) => {
            // tslint:disable-next-line:one-variable-per-declaration
            let cmp, e, i, k, logBase, more, prod, prodL, q, qd: any, rem, remL, rem0, sd, t, xi, xL, yd0,
                yL, yz,
                // tslint:disable-next-line:prefer-const
                sign = x.s === y.s ? 1 : -1,
                xd = x.d,
                yd = y.d;
            // Either NaN, Infinity or 0?
            if (!xd || !xd[0] || !yd || !yd[0]) {
                return new BigNumber(// Return NaN if either NaN, or both Infinity or 0.
                    !x.s || !y.s || (xd ? yd && xd[0] === yd[0] : !yd) ? NaN :
                        // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
                        xd && xd[0] === 0 || !yd ? sign * 0 : sign / 0);
            }

            if (base) {
                logBase = 1;
                e = x.e - y.e;
            } else {
                base = BASE;
                logBase = LOG_BASE;
                e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
            }

            yL = yd.length;
            xL = xd.length;
            q = new BigNumber(sign);
            qd = q.d = [];
            // Result exponent may be one less than e.
            // The digit array of a  BigNumber from toStringBinary may have trailing zeros.
            // tslint:disable-next-line:curly
            for (i = 0; yd[i] === (xd[i] || 0); i++);
            // tslint:disable-next-line:curly
            if (yd[i] > (xd[i] || 0)) e--;
            if (pr == null) {
                sd = pr = q.options.precision;
                rm = q.options.rounding;
            } else if (dp) {
                sd = pr + (x.e - y.e) + 1;
            } else {
                sd = pr;
            }

            if (sd < 0) {
                qd.push(1);
                more = true;
            } else {

                // Convert precision in number of base 10 digits to base 1e7 digits.
                // tslint:disable-next-line:no-bitwise
                sd = sd / logBase + 2 | 0;
                i = 0;

                // divisor < 1e7
                if (yL === 1) {
                    k = 0;
                    yd = yd[0];
                    sd++;

                    // k is the carry.
                    for (; (i < xL || k) && sd--; i++) {
                        t = k * base + (xd[i] || 0);
                        // tslint:disable-next-line:no-bitwise
                        qd[i] = t / yd | 0;
                        // tslint:disable-next-line:no-bitwise
                        k = t % yd | 0;
                    }

                    more = k || i < xL;

                    // divisor >= 1e7
                } else {

                    // Normalise xd and yd so highest order digit of yd is >= base/2
                    // tslint:disable-next-line:no-bitwise
                    k = base / (yd[0] + 1) | 0;

                    if (k > 1) {
                        yd = multiplyInteger(yd, k, base);
                        xd = multiplyInteger(xd, k, base);
                        yL = yd.length;
                        xL = xd.length;
                    }

                    xi = yL;
                    rem = xd.slice(0, yL);
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    // tslint:disable-next-line:curly
                    for (; remL < yL;) rem[remL++] = 0;

                    yz = yd.slice();
                    yz.unshift(0);
                    yd0 = yd[0];

                    // tslint:disable-next-line:curly
                    if (yd[1] >= base / 2)++yd0;

                    do {
                        k = 0;

                        // Compare divisor and remainder.
                        cmp = compare(yd, rem, yL, remL);

                        // If divisor < remainder.
                        if (cmp < 0) {

                            // Calculate trial digit, k.
                            rem0 = rem[0];
                            // tslint:disable-next-line:curly
                            if (yL !== remL) rem0 = rem0 * base + (rem[1] || 0);

                            // k will be how many times the divisor goes into the current remainder.
                            // tslint:disable-next-line:no-bitwise
                            k = rem0 / yd0 | 0;

                            //  Algorithm:
                            //  1. product = divisor * trial digit (k)
                            //  2. if product > remainder: product -= divisor, k--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, k++

                            if (k > 1) {
                                // tslint:disable-next-line:curly
                                if (k >= base) k = base - 1;

                                // product = divisor * trial digit.
                                prod = multiplyInteger(yd, k, base);
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                cmp = compare(prod, rem, prodL, remL);

                                // product > remainder.
                                if (cmp === 1) {
                                    k--;

                                    // Subtract divisor from product.
                                    subtract(prod, yL < prodL ? yz : yd, prodL, base);
                                }
                            } else {

                                // cmp is -1.
                                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
                                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
                                // tslint:disable-next-line:curly
                                if (k === 0) cmp = k = 1;
                                prod = yd.slice();
                            }

                            prodL = prod.length;
                            // tslint:disable-next-line:curly
                            if (prodL < remL) prod.unshift(0);

                            // Subtract product from remainder.
                            subtract(rem, prod, remL, base);

                            // If product was < previous remainder.
                            if (cmp === -1) {
                                remL = rem.length;

                                // Compare divisor and new remainder.
                                cmp = compare(yd, rem, yL, remL);

                                // If divisor < new remainder, subtract divisor from remainder.
                                if (cmp < 1) {
                                    k++;

                                    // Subtract divisor from remainder.
                                    subtract(rem, yL < remL ? yz : yd, remL, base);
                                }
                            }

                            remL = rem.length;
                        } else if (cmp === 0) {
                            k++;
                            rem = [0];
                        }    // if cmp === 1, k will be 0

                        // Add the next digit, k, to the result array.
                        qd[i++] = k;

                        // Update the remainder.
                        if (cmp && rem[0]) {
                            rem[remL++] = xd[xi] || 0;
                        } else {
                            rem = [xd[xi]];
                            remL = 1;
                        }

                    } while ((xi++ < xL || rem[0] !== void 0) && sd--);

                    more = rem[0] !== void 0;
                }

                // Leading zero?
                // tslint:disable-next-line:curly
                if (!qd[0]) qd.shift();
            }

            // logBase is 1 when divide is being used for base conversion.
            if (logBase === 1) {
                q.e = e;
                inexact = more;
            } else {

                // To calculate q.e, first get the number of digits of qd[0].
                // tslint:disable-next-line:curly
                for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
                q.e = i + e * logBase - 1;

                BigNumber.finalise(q, dp ? pr + q.e + 1 : pr, rm, more as any);
            }

            return q;
        };
    }
    private static divide = BigNumber.divider();
    // tslint:disable-next-line:member-ordering
    private static parseBigNumber(x: BigNumber, str: string) {
        // tslint:disable-next-line:one-variable-per-declaration
        let e, i, len;

        //  BigNumber point?
        // tslint:disable:curly
        // tslint:disable:no-conditional-assignment
        if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

            // Determine exponent.
            if (e < 0) e = i;
            e += +str.slice(i + 1);
            str = str.substring(0, i);
        } else if (e < 0) {

            // Integer.
            e = str.length;
        }

        // Determine leading zeros.
        for (i = 0; str.charCodeAt(i) === 48; i++);

        // Determine trailing zeros.
        for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
        str = str.slice(i, len);

        if (str) {
            len -= i;
            x.e = e = e - i - 1;
            x.d = [];

            // Transform base

            // e is the base 10 exponent.
            // i is where to slice str to get the first word of the digits array.
            i = (e + 1) % LOG_BASE;
            if (e < 0) i += LOG_BASE;

            if (i < len) {
                if (i) x.d.push(+str.slice(0, i));
                for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
                str = str.slice(i);
                i = LOG_BASE - str.length;
            } else {
                i -= len;
            }

            for (; i--;) str += "0";
            x.d.push(+str);

            if (external) {

                // Overflow?
                if (x.e > x.options.maxE) {

                    // Infinity.
                    x.d = null;
                    x.e = NaN;

                    // Underflow?
                } else if (x.e < x.options.minE) {

                    // Zero.
                    x.e = 0;
                    x.d = [0];
                    // x.constructor.underflow = true;
                } // else x.constructor.underflow = false;
            }
        } else {

            // Zero.
            x.e = 0;
            x.d = [0];
        }

        return x;
    }

    /*
    * Parse the value of a new  BigNumber `x` from a string `str`, which is not a decimal value.
    */
    // tslint:disable-next-line:member-ordering
    private static parseOther(x: BigNumber, str: string) {
        // tslint:disable-next-line:one-variable-per-declaration
        let base, Ctor, divisor, i, isFloat, len, p, xd, xe;

        if (str === "Infinity" || str === "NaN") {
            if (!+str) x.s = NaN;
            x.e = NaN;
            x.d = null;
            return x;
        }

        if (isHex.test(str)) {
            base = 16;
            str = str.toLowerCase();
        } else if (isBinary.test(str)) {
            base = 2;
        } else if (isOctal.test(str)) {
            base = 8;
        } else {
            throw Error("invalidArgument + str");
        }

        // Is there a binary exponent part?
        i = str.search(/p/i);

        if (i > 0) {
            p = +str.slice(i + 1);
            str = str.substring(2, i);
        } else {
            str = str.slice(2);
        }

        // Convert `str` as an integer then divide the result by `base` raised to a power such that the
        // fraction part will be restored.
        i = str.indexOf(".");
        isFloat = i >= 0;
        Ctor = x.constructor;

        if (isFloat) {
            str = str.replace(".", "");
            len = str.length;
            i = len - i;

            // log[10](16) = 1.2041... , log[10](88) = 1.9444....
            divisor = BigNumber.intPow(new BigNumber(base), i, i * 2);
        }

        xd = BigNumber.convertBase(str, base, BASE);
        xe = xd.length - 1;

        // Remove trailing zeros.
        for (i = xe; xd[i] === 0; --i) xd.pop();
        if (i < 0) return new BigNumber(x.s * 0);
        x.e = BigNumber.getBase10Exponent(xd, xe);
        x.d = xd;
        external = false;

        // At what precision to perform the division to ensure exact conversion?
        // max BigNumberIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
        // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
        // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
        // max BigNumberFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
        // Therefore using 4 * the number of digits of str will always be enough.
        if (isFloat) x = BigNumber.divide(x, divisor, len * 4);

        // Multiply by the binary exponent part if present.
        if (p) x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : BigNumber.pow(2, p));
        external = true;

        return x;
    }
    public negated() {
        return this.neg();
    }
    public neg() {
        const x = new BigNumber(this);
        x.s = -x.s;
        return BigNumber.finalise(x);
    }

    /*
  * Return true if the value of this  BigNumber is a finite number, otherwise return false.
  *
  */
    public isFinite() {
        return !!this.d;
    }

    /*
     * Return true if the value of this  BigNumber is an integer, otherwise return false.
     *
     */
    public isInt() {
        return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
    }

    /*
     * Return true if the value of this  BigNumber is NaN, otherwise return false.
     *
     */
    public isNaN() {
        return !this.s;
    }

    /*
     * Return true if the value of this  BigNumber is negative, otherwise return false.
     *
     */
    public isNeg() {
        return this.s < 0;
    }

    /*
     * Return true if the value of this  BigNumber is positive, otherwise return false.
     *
     */
    public isPos() {
        return this.s > 0;
    }

    /*
     * Return true if the value of this  BigNumber is 0 or -0, otherwise return false.
     *
     */
    public isZero() {
        return !!this.d && this.d[0] === 0;
    }

    /*
  * Return true if the value of this  BigNumber is greater than the value of `y`, otherwise return
  * false.
  *
  */
    public gt(y: BigNumberType) {
        return this.cmp(y) > 0;
    }

    /*
     * Return true if the value of this  BigNumber is greater than or equal to the value of `y`,
     * otherwise return false.
     *
     */
    public gte(y: BigNumberType) {
        const k = this.cmp(y);
        return k === 1 || k === 0;
    }

    /*
     * Return true if the value of this  BigNumber is less than `y`, otherwise return false.
     *
     */
    public lt(y: BigNumberType) {
        return this.cmp(y) < 0;
    }

    /*
     * Return true if the value of this  BigNumber is less than or equal to `y`, otherwise return false.
     *
     */
    public lte(y: BigNumberType) {
        return this.cmp(y) < 1;
    }

    public equals(y: BigNumberType) {
        return this.eq(y);
    }
    public eq(y: BigNumberType) {
        return this.cmp(y) === 0;
    }

    public precision(z: boolean | number) {
        return this.sd(z);
    }
    /*
   * Return the number of significant digits of the value of this  BigNumber.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */
    public sd(z?: boolean | number) {
        let k,
            // tslint:disable-next-line:prefer-const
            x = this;

        if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(`invalidArgument + z`);

        if (x.d) {
            k = BigNumber.getPrecision(x.d);
            if (z && x.e + 1 > k) k = x.e + 1;
        } else {
            k = NaN;
        }

        return k;
    }

    /*
     * Return a new  BigNumber whose value is the value of this  BigNumber rounded to a whole number using
     * rounding mode `rounding`.
     *
     */
    public round() {
        const x = this;

        return BigNumber.finalise(new BigNumber(x), x.e + 1, x.options.rounding);
    }

    public floor() {
        return BigNumber.finalise(new BigNumber(this), this.e + 1, 3);
    }
    public decimalPlaces() {
        return this.dp();
    }
    public dp() {
        let w,
            // tslint:disable-next-line:prefer-const
            d = this.d,
            n = NaN;

        if (d) {
            w = d.length - 1;
            n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

            // Subtract the number of trailing zeros of the last word.
            w = d[w];
            if (w) for (; w % 10 === 0; w /= 10) n--;
            if (n < 0) n = 0;
        }
        return n;
    }

    public mul(y: BigNumberType) {
        return this.times(y);
    }
    public times(y: BigNumberType) {
        let carry, e, i, k, r, rL, t, xdL, ydL,
            // tslint:disable-next-line:prefer-const
            x = this,
            xd = x.d,
            yd = (y = new BigNumber(y)).d;

        y.s *= x.s;

        // If either is NaN, ±Infinity or ±0...
        if (!xd || !xd[0] || !yd || !yd[0]) {

            return new BigNumber(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

                // Return NaN if either is NaN.
                // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
                ? NaN

                // Return ±Infinity if either is ±Infinity.
                // Return ±0 if either is ±0.
                : !xd || !yd ? y.s / 0 : y.s * 0);
        }

        e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
        xdL = xd.length;
        ydL = yd.length;

        // Ensure xd points to the longer array.
        if (xdL < ydL) {
            r = xd;
            xd = yd;
            yd = r;
            rL = xdL;
            xdL = ydL;
            ydL = rL;
        }

        // Initialise the result array with zeros.
        r = [];
        rL = xdL + ydL;
        for (i = rL; i--;) r.push(0);

        // Multiply!
        for (i = ydL; --i >= 0;) {
            carry = 0;
            for (k = xdL + i; k > i;) {
                t = r[k] + yd[i] * xd[k - i - 1] + carry;
                r[k--] = t % BASE | 0;
                carry = t / BASE | 0;
            }

            r[k] = (r[k] + carry) % BASE | 0;
        }

        // Remove trailing zeros.
        for (; !r[--rL];) r.pop();

        if (carry)++e;
        else r.shift();

        y.d = r;
        y.e = BigNumber.getBase10Exponent(r, e);

        return external ? BigNumber.finalise(y, x.options.precision, x.options.rounding) : y;
    }

    public dividedBy(y: BigNumberType) {
        return this.div(y);
    }
    public div(y: BigNumberType) {
        return BigNumber.divide(this, new BigNumber(y));
    }
    public dividedToIntegerBy(y: BigNumberType) {
        return this.divToInt(y);
    }
    public divToInt(y: BigNumberType) {
        const x = this;
        return BigNumber.finalise(BigNumber.divide(x, new BigNumber(y),
            0, 1, 1), x.options.precision, x.options.rounding);
    }

    public squareRoot() {
        return this.sqrt();
    }
    public sqrt() {
        // tslint:disable:prefer-const
        let m, n, sd, r, rep, t,
            x = this,
            d = x.d,
            e = x.e,
            s = x.s;
        // Negative/NaN/Infinity/zero?
        if (s !== 1 || !d || !d[0]) {
            return new BigNumber(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
        }
        external = false;

        // Initial estimate.
        s = Math.sqrt(+x);

        // Math.sqrt underflow/overflow?
        // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
        if (s === 0 || s === 1 / 0) {
            n = BigNumber.digitsToString(d);

            if ((n.length + e) % 2 === 0) n += "0";
            s = Math.sqrt(parseFloat(n));
            e = mathfloor((e + 1) / 2) - ((e < 0 || e % 2) as any);

            if (s === 1 / 0) {
                n = "1e" + e;
            } else {
                n = s.toExponential();
                n = n.slice(0, n.indexOf("e") + 1) + e;
            }

            r = new BigNumber(n);
        } else {
            r = new BigNumber(s.toString());
        }

        sd = (e = x.options.precision) + 3;

        // Newton-Raphson iteration.
        for (; ;) {
            t = r;
            r = t.plus(BigNumber.divide(x, t, sd + 2, 1)).times(0.5);

            // TODO? Replace with for-loop and checkRoundingDigits.
            if (BigNumber.digitsToString(t.d).slice(0, sd) === (n = BigNumber.digitsToString(r.d)).slice(0, sd)) {
                n = n.slice(sd - 3, sd + 1);

                // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
                // 4999, i.e. approaching a rounding boundary, continue the iteration.
                if (n === "9999" || !rep && n === "4999") {

                    // On the first iteration only, check to see if rounding up gives the exact result as the
                    // nines may infinitely repeat.
                    if (!rep) {
                        BigNumber.finalise(t, e + 1, 0);

                        if (t.times(t).eq(x)) {
                            r = t;
                            break;
                        }
                    }

                    sd += 4;
                    rep = 1;
                } else {

                    // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
                    // If not, then there are further digits and m will be truthy.
                    if (!+n || !+n.slice(1) && n.charAt(0) === "5") {

                        // Truncate to the first rounding digit.
                        BigNumber.finalise(r, e + 1, 1);
                        m = !r.times(r).eq(x);
                    }

                    break;
                }
            }
        }

        external = true;

        return BigNumber.finalise(r, e, x.options.rounding, m);

    }

    public acos() {
        let halfPi,
            x = this;

        const k = x.abs().cmp(1),
            pr = x.options.precision,
            rm = x.options.rounding;

        if (k !== -1) {
            return k === 0
                // |x| is 1
                ? x.isNeg() ? BigNumber.getPi(x, pr, rm) : new BigNumber(0)
                // |x| > 1 or x is NaN
                : new BigNumber(NaN);
        }

        if (x.isZero()) return BigNumber.getPi(x, pr + 4, rm).times(0.5);

        // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

        x.options.precision = pr + 6;
        x.options.rounding = 1;

        x = x.asin();
        halfPi = BigNumber.getPi(x, pr + 4, rm).times(0.5);

        x.options.precision = pr;
        x.options.rounding = rm;

        return halfPi.minus(x);
    }

    public acosh() {
        let pr, rm,
            x: any = this;

        if (x.lte(1)) return new BigNumber(x.eq(1) ? 0 : NaN);
        if (!x.isFinite()) return new BigNumber(x);

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
        x.options.rounding = 1;
        external = false;

        x = x.times(x).minus(1).sqrt().plus(x);

        external = true;
        x.options.precision = pr;
        x.options.rounding = rm;

        return x.ln();
    }

    public asinh() {
        let pr, rm,
            x: any = this,
            Ctor = x.constructor;

        if (!x.isFinite() || x.isZero()) return new BigNumber(x);

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
        x.options.rounding = 1;
        external = false;

        x = x.times(x).plus(1).sqrt().plus(x);

        external = true;
        x.options.precision = pr;
        x.options.rounding = rm;

        return x.ln();
    }

    public asin() {
        let halfPi, k,
            pr, rm,
            x: any = this,
            Ctor = x.constructor;

        if (x.isZero()) return new BigNumber(x);

        k = x.abs().cmp(1);
        pr = x.options.precision;
        rm = x.options.rounding;

        if (k !== -1) {

            // |x| is 1
            if (k === 0) {
                halfPi = BigNumber.getPi(x, pr + 4, rm).times(0.5);
                halfPi.s = x.s;
                return halfPi;
            }

            // |x| > 1 or x is NaN
            return new BigNumber(NaN);
        }

        // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

        x.options.precision = pr + 6;
        x.options.rounding = 1;

        x = x.div(new BigNumber(1).minus(x.times(x)).sqrt().plus(1)).atan();

        x.options.precision = pr;
        x.options.rounding = rm;

        return x.times(2);
    }

    public atanh() {
        let pr, rm, wpr, xsd,
            x: any = this;

        if (!x.isFinite()) return new BigNumber(NaN);
        if (x.e >= 0) return new BigNumber(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

        pr = x.options.precision;
        rm = x.options.rounding;
        xsd = x.sd();

        if (Math.max(xsd, pr) < 2 * -x.e - 1) return BigNumber.finalise(new BigNumber(x), pr, rm, true);

        x.options.precision = wpr = xsd - x.e;

        x = BigNumber.divide(x.plus(1), new BigNumber(1).minus(x), wpr + pr, 1);

        x.options.precision = pr + 4;
        x.options.rounding = 1;

        x = x.ln();

        x.options.precision = pr;
        x.options.rounding = rm;

        return x.times(0.5);
    }

    public atan() {
        let i, j, k, n, px, t, r, wpr, x2,
            x: any = this,
            pr = x.options.precision,
            rm = x.options.rounding;

        if (!x.isFinite()) {
            if (!x.s) return new BigNumber(NaN);
            if (pr + 4 <= PI_PRECISION) {
                r = BigNumber.getPi(x, pr + 4, rm).times(0.5);
                r.s = x.s;
                return r;
            }
        } else if (x.isZero()) {
            return new BigNumber(x);
        } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
            r = BigNumber.getPi(x, pr + 4, rm).times(0.25);
            r.s = x.s;
            return r;
        }

        x.options.precision = wpr = pr + 10;
        x.options.rounding = 1;

        // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

        // Argument reduction
        // Ensure |x| < 0.42
        // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

        k = Math.min(28, wpr / LOG_BASE + 2 | 0);

        for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

        external = false;

        j = Math.ceil(wpr / LOG_BASE);
        n = 1;
        x2 = x.times(x);
        r = new BigNumber(x);
        px = x;

        // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
        for (; i !== -1;) {
            px = px.times(x2);
            t = r.minus(px.div(n += 2));

            px = px.times(x2);
            r = t.plus(px.div(n += 2));

            if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
        }

        if (k) r = r.times(2 << (k - 1));

        external = true;

        return BigNumber.finalise(r, x.options.precision = pr, x.options.rounding = rm, true);
    }

    public cosh() {
        let k, n, pr, rm, len,
            x: any = this,
            one = new BigNumber(1);

        if (!x.isFinite()) return new BigNumber(x.s ? 1 / 0 : NaN);
        if (x.isZero()) return one;

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + Math.max(x.e, x.sd()) + 4;
        x.options.rounding = 1;
        len = x.d.length;

        // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
        // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

        // Estimate the optimum number of times to use the argument reduction.
        // TODO? Estimation reused from cosine() and may not be optimal here.
        if (len < 32) {
            k = Math.ceil(len / 3);
            n = Math.pow(4, -k).toString();
        } else {
            k = 16;
            n = "2.3283064365386962890625e-10";
        }

        x = this.taylorSeries(1, x.times(n), new BigNumber(1), true);

        // Reverse argument reduction
        // tslint:disable-next-line:variable-name
        let cosh2_x,
            i = k,
            d8 = new BigNumber(8);
        for (; i--;) {
            cosh2_x = x.times(x);
            x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
        }
        return BigNumber.finalise(x, x.options.precision = pr, x.options.rounding = rm, true);
    }

    public sinh() {
        let k, pr, rm, len,
            x: any = this;

        if (!x.isFinite() || x.isZero()) return new BigNumber(x);

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + Math.max(x.e, x.sd()) + 4;
        x.options.rounding = 1;
        len = x.d.length;

        if (len < 3) {
            x = this.taylorSeries(2, x, x, true);
        } else {

            // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
            // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
            // 3 multiplications and 1 addition

            // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
            // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
            // 4 multiplications and 2 additions

            // Estimate the optimum number of times to use the argument reduction.
            k = 1.4 * Math.sqrt(len);
            k = k > 16 ? 16 : k | 0;

            x = x.times(Math.pow(5, -k));

            x = this.taylorSeries(2, x, x, true);

            // Reverse argument reduction
            // tslint:disable-next-line:variable-name
            let sinh2_x,
                d5 = new BigNumber(5),
                d16 = new BigNumber(16),
                d20 = new BigNumber(20);
            for (; k--;) {
                sinh2_x = x.times(x);
                x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
            }
        }

        x.options.precision = pr;
        x.options.rounding = rm;

        return BigNumber.finalise(x, pr, rm, true);
    }

    public tanh() {
        let pr, rm,
            x = this;

        if (!x.isFinite()) return new BigNumber(x.s);
        if (x.isZero()) return new BigNumber(x);

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + 7;
        x.options.rounding = 1;

        return BigNumber.divide(x.sinh(), x.cosh(), x.options.precision = pr, x.options.rounding = rm);
    }

    public mod(y: BigNumberType) {
        let q,
            x = this;
        y = new BigNumber(y);

        // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
        if (!x.d || !y.s || y.d && !y.d[0]) return new BigNumber(NaN);

        // Return x if y is ±Infinity or x is ±0.
        if (!y.d || x.d && !x.d[0]) {
            return BigNumber.finalise(new BigNumber(x), x.options.precision, x.options.rounding);
        }

        // Prevent rounding of intermediate calculations.
        external = false;

        if (x.options.modulo === 9) {

            // Euclidian division: q = sign(y) * floor(x / abs(y))
            // result = x - q * y    where  0 <= result < abs(y)
            q = BigNumber.divide(x, y.abs(), 0, 3, 1);
            q.s *= y.s;
        } else {
            q = BigNumber.divide(x, y, 0, x.options.modulo, 1);
        }

        q = q.times(y);

        external = true;

        return x.minus(q);
    }
    /*
    *
    * Return a new  BigNumber whose value is the cube root of the value of this  BigNumber, rounded to
    * `precision` significant digits using rounding mode `rounding`.
    *
    *  cbrt(0)  =  0
    *  cbrt(-0) = -0
    *  cbrt(1)  =  1
    *  cbrt(-1) = -1
    *  cbrt(N)  =  N
    *  cbrt(-I) = -I
    *  cbrt(I)  =  I
    *
    * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
    *
    */
    public cbrt() {
        let e, m, n, r, rep, s, sd, t, t3, t3plusx,
            x: any = this;

        if (!x.isFinite() || x.isZero()) return new BigNumber(x);
        external = false;

        // Initial estimate.
        s = x.s * Math.pow(x.s * x, 1 / 3);

        // Math.cbrt underflow/overflow?
        // Pass x to Math.pow as integer, then adjust the exponent of the result.
        if (!s || Math.abs(s) === 1 / 0) {
            n = BigNumber.digitsToString(x.d);
            e = x.e;

            // Adjust n exponent so it is a multiple of 3 away from x exponent.
            if (s = (e - n.length + 1) % 3) n += (s === 1 || s === -2 ? "0" : "00");
            s = Math.pow(parseFloat(n), 1 / 3);

            // Rarely, e may be one less than the result exponent value.
            e = mathfloor((e + 1) / 3) - ((e % 3 === (e < 0 ? -1 : 2)) as any);

            if (s === 1 / 0) {
                n = "5e" + e;
            } else {
                n = s.toExponential();
                n = n.slice(0, n.indexOf("e") + 1) + e;
            }

            r = new BigNumber(n);
            r.s = x.s;
        } else {
            r = new BigNumber(s.toString());
        }

        sd = (e = x.options.precision) + 3;

        // Halley's method.
        // TODO? Compare Newton's method.
        for (; ;) {
            t = r;
            t3 = t.times(t).times(t);
            t3plusx = t3.plus(x);
            r = BigNumber.divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

            // TODO? Replace with for-loop and checkRoundingDigits.
            if (BigNumber.digitsToString(t.d).slice(0, sd) === (n = BigNumber.digitsToString(r.d)).slice(0, sd)) {
                n = n.slice(sd - 3, sd + 1);

                // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
                // , i.e. approaching a rounding boundary, continue the iteration.
                if (n === "9999" || !rep && n === "4999") {

                    // On the first iteration only, check to see if rounding up gives the exact result as the
                    // nines may infinitely repeat.
                    if (!rep) {
                        BigNumber.finalise(t, e + 1, 0);

                        if (t.times(t).times(t).eq(x)) {
                            r = t;
                            break;
                        }
                    }

                    sd += 4;
                    rep = 1;
                } else {

                    // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
                    // If not, then there are further digits and m will be truthy.
                    if (!+n || !+n.slice(1) && n.charAt(0) === "5") {

                        // Truncate to the first rounding digit.
                        BigNumber.finalise(r, e + 1, 1);
                        m = !r.times(r).times(r).eq(x);
                    }

                    break;
                }
            }
        }

        external = true;

        return BigNumber.finalise(r, e, x.options.rounding, m);
    }

    public exp() {
        return BigNumber.naturalExponential(this);
    }

    public ln() {
        return BigNumber.naturalLogarithm(this);
    }

    public logarithm(base?: BigNumberType) {
        return this.log(base);
    }

    /*
   * Return the logarithm of the value of this  BigNumber to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)       = NaN
   * log[0](a)        = NaN
   * log[1](a)        = NaN
   * log[NaN](a)      = NaN
   * log[Infinity](a) = NaN
   * log[b](0)        = -Infinity
   * log[b](-0)       = -Infinity
   * log[b](-a)       = NaN
   * log[b](1)        = 0
   * log[b](Infinity) = Infinity
   * log[b](NaN)      = NaN
   *
   * [base] {number|string| BigNumber} The base of the logarithm.
   *
   */
    public log(base?: BigNumberType) {
        let isBase10, d, denominator, k, inf, num, sd, r,
            arg = this,
            pr = arg.options.precision,
            rm = arg.options.rounding,
            guard = 5;

        // Default base is 10.
        if (base == null) {
            base = new BigNumber(10);
            isBase10 = true;
        } else {
            base = new BigNumber(base);
            d = base.d;

            // Return NaN if base is negative, or non-finite, or is 0 or 1.
            if (base.s < 0 || !d || !d[0] || base.eq(1)) return new BigNumber(NaN);

            isBase10 = base.eq(10);
        }

        d = arg.d;

        // Is arg negative, non-finite, 0 or 1?
        if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
            return new BigNumber(d && !d[0] ? -1 / 0 : arg.s !== 1 ? NaN : d ? 0 : 1 / 0);
        }

        // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
        // integer power of 10.
        if (isBase10) {
            if (d.length > 1) {
                inf = true;
            } else {
                for (k = d[0]; k % 10 === 0;) k /= 10;
                inf = k !== 1;
            }
        }

        external = false;
        sd = pr + guard;
        num = BigNumber.naturalLogarithm(arg, sd);
        denominator = isBase10 ? BigNumber.getLn10(arg, sd + 10) : BigNumber.naturalLogarithm(base, sd);

        // The result will have 5 rounding digits.
        r = BigNumber.divide(num, denominator, sd, 1);

        // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
        // calculate 10 further digits.
        //
        // If the result is known to have an infinite decimal expansion, repeat this until it is clear
        // that the result is above or below the boundary. Otherwise, if after calculating the 10
        // further digits, the last 14 are nines, round up and assume the result is exact.
        // Also assume the result is exact if the last 14 are zero.
        //
        // Example of a result that will be incorrectly rounded:
        // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
        // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
        // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
        // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
        // place is still 2.6.
        if (BigNumber.checkRoundingDigits(r.d, k = pr, rm)) {

            do {
                sd += 10;
                num = BigNumber.naturalLogarithm(arg, sd);
                denominator = isBase10 ? BigNumber.getLn10(arg, sd + 10) : BigNumber.naturalLogarithm(base, sd);
                r = BigNumber.divide(num, denominator, sd, 1);

                if (!inf) {

                    // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
                    if (+BigNumber.digitsToString(r.d).slice(k + 1, k + 15) + 1 === 1e14) {
                        r = BigNumber.finalise(r, pr + 1, 0);
                    }

                    break;
                }
            } while (BigNumber.checkRoundingDigits(r.d, k += 10, rm));
        }

        external = true;

        return BigNumber.finalise(r, pr, rm);
    }

    public toNumber() {
        return +this;
    }

    public toBinary(sd?: number, rm?: BigNumberRoundType) {
        return BigNumber.toStringBinary(this, 2, sd, rm);
    }
    public toOctal(sd?: number, rm?: BigNumberRoundType) {
        return BigNumber.toStringBinary(this, 8, sd, rm);
    }

    /*
   * Return a string representing the value of this  BigNumber in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number}  BigNumber places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
    public toExponential(dp?: number, rm?: BigNumberRoundType) {
        let str,
            x: any = this;

        if (dp === void 0) {
            str = BigNumber.finiteToString(x, true);
        } else {
            BigNumber.checkInt32(dp, 0, MAX_DIGITS);

            if (rm === void 0) rm = x.options.rounding;
            else BigNumber.checkInt32(rm, 0, 8);

            x = BigNumber.finalise(new BigNumber(x), dp + 1, rm);
            str = BigNumber.finiteToString(x, true, dp + 1);
        }

        return x.isNeg() && !x.isZero() ? "-" + str : str;
    }

    /*
   * Return a string representing the value of this  BigNumber in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number}  BigNumber places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */
    public toFixed(dp?: number, rm?: BigNumberRoundType) {
        let str, y,
            x: any = this;

        if (dp === void 0) {
            str = BigNumber.finiteToString(x);
        } else {
            BigNumber.checkInt32(dp, 0, MAX_DIGITS);

            if (rm === void 0) rm = x.options.rounding;
            else BigNumber.checkInt32(rm, 0, 8);

            y = BigNumber.finalise(new BigNumber(x), dp + x.e + 1, rm);
            str = BigNumber.finiteToString(y, false, dp + y.e + 1);
        }

        // To determine whether to add the minus sign look at the value before it was rounded,
        // i.e. look at `x` rather than `y`.
        return x.isNeg() && !x.isZero() ? "-" + str : str;
    }

    /*
   * Return an array representing the value of this  BigNumber as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string| BigNumber} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */
    public toFraction(maxD: BigNumberType) {
        let d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
            x = this,
            xd = x.d;

        if (!xd) return new BigNumber(x);

        n1 = d0 = new BigNumber(1);
        d1 = n0 = new BigNumber(0);

        d = new BigNumber(d1);
        e = d.e = BigNumber.getPrecision(xd) - x.e - 1;
        k = e % LOG_BASE;
        d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

        if (maxD == null) {

            // d is 10**e, the minimum max-denominator needed.
            maxD = e > 0 ? d : n1;
        } else {
            n = new BigNumber(maxD);
            if (!n.isInt() || n.lt(n1)) throw Error(`invalidArgument + n`);
            maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
        }

        external = false;
        n = new BigNumber(BigNumber.digitsToString(xd));
        pr = x.options.precision;
        x.options.precision = e = xd.length * LOG_BASE * 2;

        for (; ;) {
            q = BigNumber.divide(n, d, 0, 1, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.cmp(maxD) === 1) break;
            d0 = d1;
            d1 = d2;
            d2 = n1;
            n1 = n0.plus(q.times(d2));
            n0 = d2;
            d2 = d;
            d = n.minus(q.times(d2));
            n = d2;
        }

        d2 = BigNumber.divide(maxD.minus(d0), d1, 0, 1, 1);
        n0 = n0.plus(d2.times(n1));
        d0 = d0.plus(d2.times(d1));
        n0.s = n1.s = x.s;

        // Determine which fraction is closer to x, n0/d0 or n1/d1?
        r = BigNumber.divide(n1, d1, e, 1).minus(x).abs().cmp(BigNumber.divide(n0, d0, e, 1).minus(x).abs()) < 1
            ? [n1, d1] : [n0, d0];

        x.options.precision = pr;
        external = true;

        return r;
    }

    /*
     * Return a string representing the value of this  BigNumber in base 16, round to `sd` significant
     * digits using rounding mode `rm`.
     *
     * If the optional `sd` argument is present then return binary exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     */
    public toHex(sd?: number, rm?: BigNumberRoundType) {
        return BigNumber.toStringBinary(this, 16, sd, rm);
    }

    /*
     * Returns a new  BigNumber whose value is the nearest multiple of the magnitude of `y` to the value
     * of this  BigNumber.
     *
     * If the value of this  BigNumber is equidistant from two multiples of `y`, the rounding mode `rm`,
     * or ` BigNumber.rounding` if `rm` is omitted, determines the direction of the nearest multiple.
     *
     * In the context of this method, rounding mode 4 (ROUND_HALF_UP) is the same as rounding mode 0
     * (ROUND_UP), and so on.
     *
     * The return value will always have the same sign as this  BigNumber, unless either this  BigNumber
     * or `y` is NaN, in which case the return value will be also be NaN.
     *
     * The return value is not affected by the value of `precision`.
     *
     * y {number|string| BigNumber} The magnitude to round to a multiple of.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * 'toNearest() rounding mode not an integer: {rm}'
     * 'toNearest() rounding mode out of range: {rm}'
     *
     */
    public toNearest(y: BigNumberType, rm?: BigNumberRoundType) {
        let x: any = this;

        x = new BigNumber(x);

        if (y == null) {

            // If x is not finite, return x.
            if (!x.d) return x;

            y = new BigNumber(1);
            rm = x.options.rounding;
        } else {
            y = new BigNumber(y);
            if (rm !== void 0) BigNumber.checkInt32(rm, 0, 8);

            // If x is not finite, return x if y is not NaN, else NaN.
            if (!x.d) return y.s ? x : y;

            // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
            if (!y.d) {
                if (y.s) y.s = x.s;
                return y;
            }
        }

        // If y is not zero, calculate the nearest multiple of y to x.
        if (y.d[0]) {
            external = false;
            if (rm < 4) rm = [4, 5, 7, 8][rm];
            x = BigNumber.divide(x, y, 0, rm, 1).times(y);
            external = true;
            BigNumber.finalise(x);

            // If y is zero, return zero with the sign of x.
        } else {
            y.s = x.s;
            x = y;
        }

        return x;
    }

    /*
   * Return a string representing the value of this  BigNumber rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
    public toPrecision(sd?: number, rm?: BigNumberRoundType) {
        let str,
            x: any = this;

        if (sd === void 0) {
            str = BigNumber.finiteToString(x, x.e <= x.options.toExpNeg || x.e >= x.options.toExpPos);
        } else {
            BigNumber.checkInt32(sd, 1, MAX_DIGITS);

            if (rm === void 0) rm = x.options.rounding;
            else BigNumber.checkInt32(rm, 0, 8);

            x = BigNumber.finalise(new BigNumber(x), sd, rm);
            str = BigNumber.finiteToString(x, sd <= x.e || x.e <= x.options.toExpNeg, sd);
        }

        return x.isNeg() && !x.isZero() ? "-" + str : str;
    }

    /*
   * Return a string representing the value of this  BigNumber.
   *
   * Return exponential notation if this  BigNumber has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */
    public toString() {
        let x: any = this;
        let str = BigNumber.finiteToString(x, x.e <= x.options.toExpNeg || x.e >= x.options.toExpPos);

        return x.isNeg() && !x.isZero() ? "-" + str : str;
    }

    /*
     * Return a new  BigNumber whose value is the value of this  BigNumber truncated to a whole number.
     *
     */
    public truncated() {
        return BigNumber.finalise(new BigNumber(this), this.e + 1, 1);
    }

    public valueOf() {
        return this.toJSON();
    }
    /*
     * Return a string representing the value of this  BigNumber.
     * Unlike `toString`, negative zero will include the minus sign.
     *
     */
    public toJSON() {
        let x = this;
        let str = BigNumber.finiteToString(x, x.e <= x.options.toExpNeg || x.e >= x.options.toExpPos);

        return x.isNeg() ? "-" + str : str;
    }

    /*
   * Return a new  BigNumber whose value is the value of this  BigNumber rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */
    public toSD(sd?: number, rm?: BigNumberRoundType) {
        let x = this;

        if (sd === void 0) {
            sd = x.options.precision;
            rm = x.options.rounding;
        } else {
            BigNumber.checkInt32(sd, 1, MAX_DIGITS);

            if (rm === void 0) rm = x.options.rounding;
            else BigNumber.checkInt32(rm, 0, 8);
        }

        return BigNumber.finalise(new BigNumber(x), sd, rm);
    }

    public plus(y: BigNumberType): BigNumber {
        return this.add(y);
    }
    public add(y: BigNumberType): BigNumber {
        let carry, d, e, i, k, len, pr, rm, xd, yd,
            // tslint:disable-next-line:prefer-const
            x = this;

        y = new BigNumber(y);

        // If either is not finite...
        if (!x.d || !y.d) {

            // Return NaN if either is NaN.
            if (!x.s || !y.s) y = new BigNumber(NaN);

            // Return x if y is finite and x is ±Infinity.
            // Return x if both are ±Infinity with the same sign.
            // Return NaN if both are ±Infinity with different signs.
            // Return y if x is finite and y is ±Infinity.
            else if (!x.d) y = new BigNumber(y.d || x.s === y.s ? x : NaN);

            return y;
        }

        // If signs differ...
        if (x.s !== y.s) {
            y.s = -y.s;
            return x.minus(y);
        }

        xd = x.d;
        yd = y.d;
        pr = x.options.precision;
        rm = x.options.rounding;

        // If either is zero...
        if (!xd[0] || !yd[0]) {

            // Return x if y is zero.
            // Return y if y is non-zero.
            if (!yd[0]) y = new BigNumber(x);

            return external ? BigNumber.finalise(y, pr, rm) : y;
        }

        // x and y are finite, non-zero numbers with the same sign.

        // Calculate base 1e7 exponents.
        k = mathfloor(x.e / LOG_BASE);
        e = mathfloor(y.e / LOG_BASE);

        xd = xd.slice();
        i = k - e;

        // If base 1e7 exponents differ...
        if (i) {

            if (i < 0) {
                d = xd;
                i = -i;
                len = yd.length;
            } else {
                d = yd;
                e = k;
                len = xd.length;
            }

            // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
            k = Math.ceil(pr / LOG_BASE);
            len = k > len ? k + 1 : len + 1;

            if (i > len) {
                i = len;
                d.length = 1;
            }

            // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
            d.reverse();
            for (; i--;) d.push(0);
            d.reverse();
        }

        len = xd.length;
        i = yd.length;

        // If yd is longer than xd, swap xd and yd so xd points to the longer array.
        if (len - i < 0) {
            i = len;
            d = yd;
            yd = xd;
            xd = d;
        }

        // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
        for (carry = 0; i;) {
            carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
            xd[i] %= BASE;
        }

        if (carry) {
            xd.unshift(carry);
            ++e;
        }

        // Remove trailing zeros.
        // No need to check for zero, as +x + +y != 0 && -x + -y != 0
        for (len = xd.length; xd[--len] === 0;) xd.pop();

        y.d = xd;
        y.e = BigNumber.getBase10Exponent(xd, e);

        return external ? BigNumber.finalise(y, pr, rm) : y;
    }
    public minus(y: BigNumberType): BigNumber {
        return this.sub(y);
    }
    public sub(y: BigNumberType): BigNumber {
        let d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
            // tslint:disable-next-line:prefer-const
            x = this;

        y = new BigNumber(y);

        // If either is not finite...
        if (!x.d || !y.d) {

            // Return NaN if either is NaN.
            if (!x.s || !y.s) y = new BigNumber(NaN);

            // Return y negated if x is finite and y is ±Infinity.
            else if (x.d) y.s = -y.s;

            // Return x if y is finite and x is ±Infinity.
            // Return x if both are ±Infinity with different signs.
            // Return NaN if both are ±Infinity with the same sign.
            else y = new BigNumber(y.d || x.s !== y.s ? x : NaN);

            return y;
        }

        // If signs differ...
        if (x.s !== y.s) {
            y.s = -y.s;
            return x.plus(y);
        }

        xd = x.d;
        yd = y.d;
        pr = x.options.precision;
        rm = x.options.rounding;

        // If either is zero...
        if (!xd[0] || !yd[0]) {

            // Return y negated if x is zero and y is non-zero.
            if (yd[0]) y.s = -y.s;

            // Return x if y is zero and x is non-zero.
            else if (xd[0]) y = new BigNumber(x);

            // Return zero if both are zero.
            // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
            else return new BigNumber(rm === 3 ? -0 : 0);

            return external ? BigNumber.finalise(y, pr, rm) : y;
        }

        // x and y are finite, non-zero numbers with the same sign.

        // Calculate base 1e7 exponents.
        e = mathfloor(y.e / LOG_BASE);
        xe = mathfloor(x.e / LOG_BASE);

        xd = xd.slice();
        k = xe - e;

        // If base 1e7 exponents differ...
        if (k) {
            xLTy = k < 0;

            if (xLTy) {
                d = xd;
                k = -k;
                len = yd.length;
            } else {
                d = yd;
                e = xe;
                len = xd.length;
            }

            // Numbers with massively different exponents would result in a very high number of
            // zeros needing to be prepended, but this can be avoided while still ensuring correct
            // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
            i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

            if (k > i) {
                k = i;
                d.length = 1;
            }

            // Prepend zeros to equalise exponents.
            d.reverse();
            for (i = k; i--;) d.push(0);
            d.reverse();

            // Base 1e7 exponents equal.
        } else {

            // Check digits to determine which is the bigger number.

            i = xd.length;
            len = yd.length;
            xLTy = i < len;
            if (xLTy) len = i;

            for (i = 0; i < len; i++) {
                if (xd[i] !== yd[i]) {
                    xLTy = xd[i] < yd[i];
                    break;
                }
            }

            k = 0;
        }

        if (xLTy) {
            d = xd;
            xd = yd;
            yd = d;
            y.s = -y.s;
        }

        len = xd.length;

        // Append zeros to `xd` if shorter.
        // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
        for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

        // Subtract yd from xd.
        for (i = yd.length; i > k;) {

            if (xd[--i] < yd[i]) {
                for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
                --xd[j];
                xd[i] += BASE;
            }

            xd[i] -= yd[i];
        }

        // Remove trailing zeros.
        for (; xd[--len] === 0;) xd.pop();

        // Remove leading zeros and adjust exponent accordingly.
        for (; xd[0] === 0; xd.shift())--e;

        // Zero?
        if (!xd[0]) return new BigNumber(rm === 3 ? -0 : 0);

        y.d = xd;
        y.e = BigNumber.getBase10Exponent(xd, e);

        return external ? BigNumber.finalise(y, pr, rm) : y;
    }
    public toPower(y: BigNumberType): BigNumber {
        return this.pow(y);
    }
    public pow(y: BigNumberType): BigNumber {
        let e, k, pr, r, rm, s,
            x: BigNumber = this,
            // tslint:disable-next-line:prefer-const
            yn = +(y = new BigNumber(y));

        // Either ±Infinity, NaN or ±0?
        if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new BigNumber(mathpow(+x, yn));

        x = new BigNumber(x);

        if (x.eq(1)) return x;

        pr = x.options.precision;
        rm = x.options.rounding;

        if (y.eq(1)) return BigNumber.finalise(x, pr, rm);

        // y exponent
        e = mathfloor(y.e / LOG_BASE);

        // If y is a small integer use the 'exponentiation by squaring' algorithm.
        if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
            r = BigNumber.intPow(x, k, pr);
            return y.s < 0 ? new BigNumber(1).div(r) : BigNumber.finalise(r, pr, rm);
        }

        s = x.s;

        // if x is negative
        if (s < 0) {

            // if y is not an integer
            if (e < y.d.length - 1) return new BigNumber(NaN);

            // Result is positive if x is negative and the last digit of integer y is even.
            if ((y.d[e] & 1) === 0) s = 1;

            // if x.eq(-1)
            if (x.e === 0 && x.d[0] === 1 && x.d.length === 1) {
                x.s = s;
                return x;
            }
        }

        // Estimate result exponent.
        // x^y = 10^e,  where e = y * log10(x)
        // log10(x) = log10(x_significand) + x_exponent
        // log10(x_significand) = ln(x_significand) / ln(10)
        k = mathpow(+x, yn);
        e = k === 0 || !isFinite(k)
            ? mathfloor(yn * (Math.log(parseFloat("0." + BigNumber.digitsToString(x.d))) / Math.LN10 + x.e + 1))
            : new BigNumber(k + "").e;

        // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

        // Overflow/underflow?
        if (e > x.options.maxE + 1 || e < x.options.minE - 1) return new BigNumber(e > 0 ? s / 0 : 0);

        external = false;
        x.options.rounding = x.s = 1;

        // Estimate the extra guard digits needed to ensure five correct rounding digits from
        // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
        // new  BigNumber(2.32456).pow('2087987436534566.46411')
        // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
        k = Math.min(12, (e + "").length);

        // r = x^y = exp(y*ln(x))
        r = BigNumber.naturalExponential(y.times(BigNumber.naturalLogarithm(x, pr + k)), pr);

        // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
        if (r.d) {

            // Truncate to the required precision plus five rounding digits.
            r = BigNumber.finalise(r, pr + 5, 1);

            // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
            // the result.
            if (BigNumber.checkRoundingDigits(r.d, pr, rm)) {
                e = pr + 10;

                // Truncate to the increased precision plus five rounding digits.
                r = BigNumber.finalise(BigNumber.naturalExponential(y.
                    times(BigNumber.naturalLogarithm(x, e + k)), e), e + 5, 1);

                // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
                if (+BigNumber.digitsToString(r.d).slice(pr + 1, pr + 15) + 1 === 1e14) {
                    r = BigNumber.finalise(r, pr + 1, 0);
                }
            }
        }

        r.s = s;
        external = true;
        x.options.rounding = rm;

        return BigNumber.finalise(r, pr, rm);
    }

    public absoluteValue(): BigNumber {
        return this.abs();
    }
    public abs(): BigNumber {
        const x = new BigNumber(this);
        if (x.s < 0) x.s = 1;
        return BigNumber.finalise(x);
    }
    public ceil() {
        return BigNumber.finalise(new BigNumber(this), this.e + 1, 2);
    }
    public cosine(): BigNumber {
        return this.cos();
    }
    public cos(): BigNumber {
        let pr, rm;
        let x: any = this;
        if (!x.d) return new BigNumber(NaN);

        // cos(0) = cos(-0) = 1
        if (!x.d[0]) return new BigNumber(1);

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
        x.options.rounding = 1;

        x = BigNumber.cos(BigNumber.toLessThanHalfPi(x));

        x.options.precision = pr;
        x.options.rounding = rm;

        return BigNumber.finalise(quadrant === 2 || quadrant === 3 ? x.neg() : x, pr, rm, true);
    }
    public sine() {
        return this.sin();
    }
    /*
     * sin(x) = x - x^3/3! + x^5/5! - ...
     * |x| < pi/2
     *
     */
    public sin() {
        // tslint:disable-next-line:one-variable-per-declaration
        let k;
        let x: any = this;
        const len = x.d.length;

        if (len < 3) return this.taylorSeries(2, x, x);

        // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
        // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
        // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

        // Estimate the optimum number of times to use the argument reduction.
        k = 1.4 * Math.sqrt(len);
        // tslint:disable-next-line:no-bitwise
        k = k > 16 ? 16 : k | 0;

        // Max k before Math.pow precision loss is 22
        x = x.times(Math.pow(5, -k));
        x = this.taylorSeries(2, x, x);

        // Reverse argument reduction
        // tslint:disable:one-variable-per-declaration
        // tslint:disable:variable-name
        let sin2_x;
        // tslint:disable-next-line:prefer-const
        const d5 = new BigNumber(5);
        // tslint:disable-next-line:prefer-const
        const d16 = new BigNumber(16);
        // tslint:disable-next-line:prefer-const
        const d20 = new BigNumber(20);
        for (; k--;) {
            sin2_x = x.times(x);
            x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
        }

        return x;
    }

    public tan() {
        let pr, rm,
            x: any = this;

        if (!x.isFinite()) return new BigNumber(NaN);
        if (x.isZero()) return new BigNumber(x);

        pr = x.options.precision;
        rm = x.options.rounding;
        x.options.precision = pr + 10;
        x.options.rounding = 1;

        x = x.sin();
        x.s = 1;
        x = BigNumber.divide(x, new BigNumber(1).minus(x.times(x)).sqrt(), pr + 10, 0);

        x.options.precision = pr;
        x.options.rounding = rm;

        return BigNumber.finalise(quadrant === 2 || quadrant === 4 ? x.neg() : x, pr, rm, true);
    }

    // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
    public taylorSeries(n: any, x?: any, y?: any, isHyperbolic?: boolean) {
        let j, t, u, x2,
            i = 1;
        const pr = this.options.precision,
            k = Math.ceil(pr / LOG_BASE);

        external = false;
        x2 = x.times(x);
        u = new BigNumber(y);

        for (; ;) {
            t = BigNumber.divide(u.times(x2), new BigNumber(n++ * n++), pr, 1);
            u = isHyperbolic ? y.plus(t) : y.minus(t);
            y = BigNumber.divide(t.times(x2), new BigNumber(n++ * n++), pr, 1);
            t = u.plus(y);

            if (t.d[k] !== void 0) {
                for (j = k; t.d[j] === u.d[j] && j--;);
                if (j === -1) break;
            }

            j = u;
            u = y;
            y = t;
            t = j;
            i++;
        }

        external = true;
        t.d.length = k + 1;

        return t;
    }

    // Does not strip trailing zeros.
    private static truncate(arr: any, len: any) {
        if (arr.length > len) {
            arr.length = len;
            return true;
        }
    }

    private static getBase10Exponent(digits: any, e: any) {
        let w = digits[0];
        // Add the number of digits of the first word of the digits array.
        for (e *= LOG_BASE; w >= 10; w /= 10) e++;
        return e;
    }

    private static finalise(x: BigNumber, sd?: number, rm?: BigNumberRoundType, isTruncated?: boolean) {
        let digits, i: number, j: number, k, rd: any, roundUp, w: any, xd, xdi;

        // Don't round if sd is null or undefined.
        const out = () => {

            if (sd != null) {
                xd = x.d;

                // Infinity/NaN.
                if (!xd) return x;

                // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
                // w: the word of xd containing rd, a base 1e7 number.
                // xdi: the index of w within xd.
                // digits: the number of digits of w.
                // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
                // they had leading zeros)
                // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

                // Get the length of the first word of the digits array xd.
                for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
                i = sd - digits;

                // Is the rounding digit in the first word of xd?
                if (i < 0) {
                    i += LOG_BASE;
                    j = sd;
                    w = xd[xdi = 0];

                    // Get the rounding digit at index j of w.
                    // tslint:disable-next-line:no-bitwise
                    rd = w / mathpow(10, digits - j - 1) % 10 | 0;
                } else {
                    xdi = Math.ceil((i + 1) / LOG_BASE);
                    k = xd.length;
                    if (xdi >= k) {
                        if (isTruncated) {

                            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
                            for (; k++ <= xdi;) xd.push(0);
                            w = rd = 0;
                            digits = 1;
                            i %= LOG_BASE;
                            j = i - LOG_BASE + 1;
                        } else {
                            out(); // break
                        }
                    } else {
                        w = k = xd[xdi];

                        // Get the number of digits of w.
                        for (digits = 1; k >= 10; k /= 10) digits++;

                        // Get the index of rd within w.
                        i %= LOG_BASE;

                        // Get the index of rd within w, adjusted for leading zeros.
                        // The number of leading zeros of w is given by LOG_BASE - digits.
                        j = i - LOG_BASE + digits;

                        // Get the rounding digit at index j of w.
                        // tslint:disable-next-line:no-bitwise
                        rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
                    }
                }

                // Are there any non-zero digits after the rounding digit?
                isTruncated = isTruncated || sd < 0 ||
                    xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

                // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
                // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
                // will give 714.

                roundUp = rm < 4
                    ? (rd || isTruncated) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
                    : rd > 5 || rd === 5 && (rm === 4 || isTruncated || rm === 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        // tslint:disable-next-line:no-bitwise
                        ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
                        rm === (x.s < 0 ? 8 : 7));

                if (sd < 1 || !xd[0]) {
                    xd.length = 0;
                    if (roundUp) {

                        // Convert sd to decimal places.
                        sd -= x.e + 1;

                        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
                        x.e = -sd || 0;
                    } else {

                        // Zero.
                        xd[0] = x.e = 0;
                    }

                    return x;
                }

                // Remove excess digits.
                if (i === 0) {
                    xd.length = xdi;
                    k = 1;
                    xdi--;
                } else {
                    xd.length = xdi + 1;
                    k = mathpow(10, LOG_BASE - i);

                    // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                    // j > 0 means i > number of leading zeros of w.
                    // tslint:disable-next-line:no-bitwise
                    xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
                }

                if (roundUp) {
                    for (; ;) {

                        // Is the digit to be rounded up in the first word of xd?
                        if (xdi === 0) {

                            // i will be the length of xd[0] before k is added.
                            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
                            j = xd[0] += k;
                            for (k = 1; j >= 10; j /= 10) k++;

                            // if i != k the length has increased.
                            if (i !== k) {
                                x.e++;
                                if (xd[0] === BASE) xd[0] = 1;
                            }

                            break;
                        } else {
                            xd[xdi] += k;
                            if (xd[xdi] !== BASE) break;
                            xd[xdi--] = 0;
                            k = 1;
                        }
                    }
                }

                // Remove trailing zeros.
                for (i = xd.length; xd[--i] === 0;) xd.pop();
            }
        };
        if (external) {

            // Overflow?
            if (x.e > x.options.maxE) {

                // Infinity.
                x.d = null;
                x.e = NaN;

                // Underflow?
            } else if (x.e < x.options.minE) {

                // Zero.
                x.e = 0;
                x.d = [0];
                // Ctor.underflow = true;
            } // else Ctor.underflow = false;
        }

        return x;
    }

    private static getLn10(x: BigNumber, sd?: number, pr?: number) {
        if (sd > LN10_PRECISION) {

            // Reset global state in case the exception is caught.
            external = true;
            if (pr) x.options.precision = pr;
            throw Error(`precisionLimitExceeded`);
        }
        return BigNumber.finalise(new BigNumber(LN10), sd, 1, true);
    }
    private static getPi(xx: BigNumber, sd: number, rm: number) {
        if (sd > PI_PRECISION) throw Error(`precisionLimitExceeded`);
        return BigNumber.finalise(new BigNumber(PI), sd, rm, true);
    }

    private static getPrecision(digits: any) {
        let w = digits.length - 1,
            len = w * LOG_BASE + 1;

        w = digits[w];

        // If non-zero...
        if (w) {

            // Subtract the number of trailing zeros of the last word.
            for (; w % 10 === 0; w /= 10) len--;

            // Add the number of digits of the first word.
            for (w = digits[0]; w >= 10; w /= 10) len++;
        }

        return len;
    }

    private static getZeroString(k: number) {
        let zs = "";
        for (; k--;) zs += "0";
        return zs;
    }

    /*
     * Return a new  BigNumber whose value is the value of  BigNumber `x` to the power `n`, where `n` is an
     * integer of type number.
     *
     * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
     *
     */
    private static intPow(x: BigNumber, n: any, pr: any) {
        let isTruncated,
            r = new BigNumber(1);

        // Max n of 9007199254740991 takes 53 loop iterations.
        // Maximum digits array length; leaves [28, 34] guard digits.
        const k = Math.ceil(pr / LOG_BASE + 4);

        external = false;

        for (; ;) {
            if (n % 2) {
                r = r.times(x);
                if (BigNumber.truncate(r.d, k)) isTruncated = true;
            }

            n = mathfloor(n / 2);
            if (n === 0) {

                // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
                n = r.d.length - 1;
                if (isTruncated && r.d[n] === 0)++r.d[n];
                break;
            }

            x = x.times(x);
            BigNumber.truncate(x.d, k);
        }

        external = true;

        return r;
    }

    private static isOdd(n: BigNumber) {
        return n.d[n.d.length - 1] & 1;
    }

    /*
     * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
     */
    private static maxOrMin(args: BigNumberType[], ltgt: any) {
        let y,
            x: any = new BigNumber(args[0]),
            i = 0;

        for (; ++i < args.length;) {
            y = new BigNumber(args[i]);
            if (!y.s) {
                x = y;
                break;
            } else if (x[ltgt](y)) {
                x = y;
            }
        }

        return x;
    }

    /*
     * Return a new  BigNumber whose value is the natural exponential of `x` rounded to `sd` significant
     * digits.
     *
     * Taylor/Maclaurin series.
     *
     * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
     *
     * Argument reduction:
     *   Repeat x = x / 32, k += 5, until |x| < 0.1
     *   exp(x) = exp(x / 2^k)^(2^k)
     *
     * Previously, the argument was initially reduced by
     * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
     * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
     * found to be slower than just dividing repeatedly by 32 as above.
     *
     * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
     * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
     * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
     *
     *  exp(Infinity)  = Infinity
     *  exp(-Infinity) = 0
     *  exp(NaN)       = NaN
     *  exp(±0)        = 1
     *
     *  exp(x) is non-terminating for any finite, non-zero x.
     *
     *  The result will always be correctly rounded.
     *
     */
    private static naturalExponential(x: BigNumber, sd?: number) {
        let denominator, guard, j, pow, sum, t, wpr,
            rep = 0,
            i = 0,
            k = 0,
            // tslint:disable:prefer-const
            rm = x.options.rounding,
            pr = x.options.precision;

        // 0/NaN/Infinity?
        if (!x.d || !x.d[0] || x.e > 17) {

            return new BigNumber(x.d
                ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
                : x.s ? x.s < 0 ? 0 : x : 0 / 0);
        }

        if (sd == null) {
            external = false;
            wpr = pr;
        } else {
            wpr = sd;
        }

        t = new BigNumber(0.03125);

        // while abs(x) >= 0.1
        while (x.e > -2) {

            // x = x / 2^5
            x = x.times(t);
            k += 5;
        }

        // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
        // necessary to ensure the first 4 rounding digits are correct.
        guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
        wpr += guard;
        denominator = pow = sum = new BigNumber(1);
        x.options.precision = wpr;

        for (; ;) {
            pow = BigNumber.finalise(pow.times(x), wpr, 1);
            denominator = denominator.times(++i);
            t = sum.plus(BigNumber.divide(pow, denominator, wpr, 1));

            if (BigNumber.digitsToString(t.d).slice(0, wpr) === BigNumber.digitsToString(sum.d).slice(0, wpr)) {
                j = k;
                while (j--) sum = BigNumber.finalise(sum.times(sum), wpr, 1);

                // Check to see if the first 4 rounding digits are [49]999.
                // If so, repeat the summation with a higher precision, otherwise
                // e.g. with precision: 18, rounding: 1
                // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
                // `wpr - guard` is the index of first rounding digit.
                if (sd == null) {

                    if (rep < 3 && BigNumber.checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
                        x.options.precision = wpr += 10;
                        denominator = pow = t = new BigNumber(1);
                        i = 0;
                        rep++;
                    } else {
                        return BigNumber.finalise(sum, x.options.precision = pr, rm, external = true);
                    }
                } else {
                    x.options.precision = pr;
                    return sum;
                }
            }

            sum = t;
        }
    }

    private static toLessThanHalfPi(x: BigNumber) {
        let t,
            // tslint:disable:prefer-const
            isNeg = x.s < 0,
            pi = BigNumber.getPi(x, x.options.precision, 1),
            halfPi = pi.times(0.5);

        x = x.abs();

        if (x.lte(halfPi)) {
            quadrant = isNeg ? 4 : 1;
            return x;
        }

        t = x.divToInt(pi);

        if (t.isZero()) {
            quadrant = isNeg ? 3 : 2;
        } else {
            x = x.minus(t.times(pi));

            // 0 <= x < pi
            if (x.lte(halfPi)) {
                quadrant = BigNumber.isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
                return x;
            }

            quadrant = BigNumber.isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
        }

        return x.minus(pi).abs();
    }

    /*
     * Return a new  BigNumber whose value is the natural logarithm of `x` rounded to `sd` significant
     * digits.
     *
     *  ln(-n)        = NaN
     *  ln(0)         = -Infinity
     *  ln(-0)        = -Infinity
     *  ln(1)         = 0
     *  ln(Infinity)  = Infinity
     *  ln(-Infinity) = NaN
     *  ln(NaN)       = NaN
     *
     *  ln(n) (n != 1) is non-terminating.
     *
     */
    private static naturalLogarithm(y: BigNumber, sd?: number) {
        let c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
            n = 1,
            // tslint:disable-next-line:prefer-const
            guard = 10,
            x = y,
            // tslint:disable:prefer-const
            xd = x.d,
            rm = x.options.rounding,
            pr = x.options.precision;

        // Is x negative or Infinity, NaN, 0 or 1?
        if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] === 1 && xd.length === 1) {
            return new BigNumber(xd && !xd[0] ? -1 / 0 : x.s !== 1 ? NaN : xd ? 0 : x);
        }

        if (sd == null) {
            external = false;
            wpr = pr;
        } else {
            wpr = sd;
        }

        x.options.precision = wpr += guard;
        c = BigNumber.digitsToString(xd);
        c0 = c.charAt(0);

        if (Math.abs(e = x.e) < 1.5e15) {

            // Argument reduction.
            // The series converges faster the closer the argument is to 1, so using
            // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
            // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
            // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
            // later be divided by this number, then separate out the power of 10 using
            // ln(a*10^b) = ln(a) + b*ln(10).

            // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
            // while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
            // max n is 6 (gives 0.7 - 1.3)
            while (c0 < 7 && c0 !== 1 || c0 === 1 && parseFloat(c.charAt(1)) > 3) {
                x = x.times(y);
                c = BigNumber.digitsToString(x.d);
                c0 = parseFloat(c.charAt(0));
                n++;
            }

            e = x.e;

            if (c0 > 1) {
                x = new BigNumber("0." + c);
                e++;
            } else {
                x = new BigNumber(c0 + "." + c.slice(1));
            }
        } else {

            // The argument reduction method above may result in overflow if the argument y is a massive
            // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
            // function using ln(x*10^e) = ln(x) + e*ln(10).
            t = BigNumber.getLn10(x, wpr + 2, pr).times(e + "");
            x = BigNumber.naturalLogarithm(new BigNumber(c0 + "." + c.slice(1)), wpr - guard).plus(t);
            x.options.precision = pr;

            return sd == null ? BigNumber.finalise(x, pr, rm, external = true) : x;
        }

        // x1 is x reduced to a value near 1.
        x1 = x;

        // Taylor series.
        // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
        // where x = (y - 1)/(y + 1)    (|x| < 1)
        sum = numerator = x = BigNumber.divide(x.minus(1), x.plus(1), wpr, 1);
        x2 = BigNumber.finalise(x.times(x), wpr, 1);
        denominator = 3;

        for (; ;) {
            numerator = BigNumber.finalise(numerator.times(x2), wpr, 1);
            t = sum.plus(BigNumber.divide(numerator, new BigNumber(denominator), wpr, 1));

            if (BigNumber.digitsToString(t.d).slice(0, wpr) === BigNumber.digitsToString(sum.d).slice(0, wpr)) {
                sum = sum.times(2);

                // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
                // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
                if (e !== 0) sum = sum.plus(BigNumber.getLn10(x, wpr + 2, pr).times(e + ""));
                sum = BigNumber.divide(sum, new BigNumber(n), wpr, 1);

                // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
                // been repeated previously) and the first 4 rounding digits 9999?
                // If so, restart the summation with a higher precision, otherwise
                // e.g. with precision: 12, rounding: 1
                // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
                // `wpr - guard` is the index of first rounding digit.
                if (sd == null) {
                    if (BigNumber.checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
                        x.options.precision = wpr += guard;
                        t = numerator = x = BigNumber.divide(x1.minus(1), x1.plus(1), wpr, 1);
                        x2 = BigNumber.finalise(x.times(x), wpr, 1);
                        denominator = rep = 1;
                    } else {
                        return BigNumber.finalise(sum, x.options.precision = pr, rm, external = true);
                    }
                } else {
                    x.options.precision = pr;
                    return sum;
                }
            }

            sum = t;
            denominator += 2;
        }
    }

    // ±Infinity, NaN.
    private static nonFiniteToString(x: BigNumber) {
        // Unsigned.
        return String(x.s * x.s / 0);
    }

    private static digitsToString(d: any) {
        let i, k, ws,
            // tslint:disable-next-line:prefer-const
            indexOfLastWord = d.length - 1,
            str = "",
            w = d[0];

        if (indexOfLastWord > 0) {
            str += w;
            for (i = 1; i < indexOfLastWord; i++) {
                ws = d[i] + "";
                k = LOG_BASE - ws.length;
                if (k) str += BigNumber.getZeroString(k);
                str += ws;
            }

            w = d[i];
            ws = w + "";
            k = LOG_BASE - ws.length;
            if (k) str += BigNumber.getZeroString(k);
        } else if (w === 0) {
            return "0";
        }

        // Remove trailing zeros of last w.
        for (; w % 10 === 0;) w /= 10;

        return str + w;
    }

    private static checkInt32(i: any, min: any, max: any) {
        if (i !== ~~i || i < min || i > max) {
            throw Error(`invalidArgument + i`);
        }
    }

    /*
     * Check 5 rounding digits if `repeating` is null, 4 otherwise.
     * `repeating == null` if caller is `log` or `pow`,
     * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
     */
    private static checkRoundingDigits(d: any, i?: any, rm?: BigNumberRoundType, repeating?: any) {
        let di, k, r, rd;

        // Get the length of the first word of the array d.
        for (k = d[0]; k >= 10; k /= 10)--i;

        // Is the rounding digit in the first word of d?
        if (--i < 0) {
            i += LOG_BASE;
            di = 0;
        } else {
            di = Math.ceil((i + 1) / LOG_BASE);
            i %= LOG_BASE;
        }

        // i is the index (0 - 6) of the rounding digit.
        // E.g. if within the word 3487563 the first rounding digit is 5,
        // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
        k = mathpow(10, LOG_BASE - i);
        rd = d[di] % k | 0;

        if (repeating == null) {
            if (i < 3) {
                if (i === 0) rd = rd / 100 | 0;
                else if (i === 1) rd = rd / 10 | 0;
                r = rm < 4 && rd === 99999 || rm > 3 && rd === 49999 || rd === 50000 || rd === 0;
            } else {
                r = (rm < 4 && rd + 1 === k || rm > 3 && rd + 1 === k / 2) &&
                    (d[di + 1] / k / 100 | 0) === mathpow(10, i - 2) - 1 ||
                    (rd === k / 2 || rd === 0) && (d[di + 1] / k / 100 | 0) === 0;
            }
        } else {
            if (i < 4) {
                if (i === 0) rd = rd / 1000 | 0;
                else if (i === 1) rd = rd / 100 | 0;
                else if (i === 2) rd = rd / 10 | 0;
                r = (repeating || rm < 4) && rd === 9999 || !repeating && rm > 3 && rd === 4999;
            } else {
                r = ((repeating || rm < 4) && rd + 1 === k ||
                    (!repeating && rm > 3) && rd + 1 === k / 2) &&
                    (d[di + 1] / k / 1000 | 0) === mathpow(10, i - 3) - 1;
            }
        }

        return r;
    }

    // Convert string of `baseIn` to an array of numbers of `baseOut`.
    // Eg. convertBase('255', 10, 16) returns [15, 15].
    // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
    private static convertBase(str: string, baseIn: any, baseOut: any) {
        let j,
            arr = [0],
            arrL,
            i = 0,
            strL = str.length;

        for (; i < strL;) {
            for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
            arr[0] += NUMERALS.indexOf(str.charAt(i++));
            for (j = 0; j < arr.length; j++) {
                if (arr[j] > baseOut - 1) {
                    if (arr[j + 1] === void 0) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }

    private static toStringBinary(x: BigNumber, baseOut?: any, sd?: number, rm?: number) {
        let base, e, i, k, len, roundUp, str, xd, y,
            isExp = sd !== void 0;
        if (isExp) {
            BigNumber.checkInt32(sd, 1, MAX_DIGITS);
            if (rm === void 0) rm = x.options.rounding;
            else BigNumber.checkInt32(rm, 0, 8);
        } else {
            sd = x.options.precision;
            rm = x.options.rounding;
        }

        if (!x.isFinite()) {
            str = BigNumber.nonFiniteToString(x);
        } else {
            str = BigNumber.finiteToString(x);
            i = str.indexOf(".");

            // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
            // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
            // minBinaryExponent = floor(decimalExponent * log[2](10))
            // log[2](10) = 3.321928094887362347870319429489390175864

            if (isExp) {
                base = 2;
                if (baseOut === 16) {
                    sd = sd * 4 - 3;
                } else if (baseOut === 8) {
                    sd = sd * 3 - 2;
                }
            } else {
                base = baseOut;
            }

            // Convert the number as an integer then divide the result by its base raised to a power such
            // that the fraction part will be restored.

            // Non-integer.
            if (i >= 0) {
                str = str.replace(".", "");
                y = new BigNumber(1);
                y.e = str.length - i;
                y.d = BigNumber.convertBase(BigNumber.finiteToString(y), 10, base);
                y.e = y.d.length;
            }

            xd = BigNumber.convertBase(str, 10, base);
            e = len = xd.length;

            // Remove trailing zeros.
            for (; xd[--len] === 0;) xd.pop();

            if (!xd[0]) {
                str = isExp ? "0p+0" : "0";
            } else {
                if (i < 0) {
                    e--;
                } else {
                    x = new BigNumber(x);
                    x.d = xd;
                    x.e = e;
                    x = BigNumber.divide(x, y, sd, rm, 0, base);
                    xd = x.d;
                    e = x.e;
                    roundUp = inexact;
                }

                // The rounding digit, i.e. the digit after the digit that may be rounded up.
                i = xd[sd];
                k = base / 2;
                roundUp = roundUp || xd[sd + 1] !== void 0;

                roundUp = rm < 4
                    ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
                    : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
                        rm === (x.s < 0 ? 8 : 7));

                xd.length = sd;

                if (roundUp) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for (; ++xd[--sd] > base - 1;) {
                        xd[sd] = 0;
                        if (!sd) {
                            ++e;
                            xd.unshift(1);
                        }
                    }
                }

                // Determine trailing zeros.
                for (len = xd.length; !xd[len - 1]; --len);

                // E.g. [4, 11, 15] becomes 4bf.
                for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);

                // Add binary exponent suffix?
                if (isExp) {
                    if (len > 1) {
                        if (baseOut === 16 || baseOut === 8) {
                            i = baseOut === 16 ? 4 : 3;
                            for (--len; len % i; len++) str += "0";
                            xd = BigNumber.convertBase(str, base, baseOut);
                            for (len = xd.length; !xd[len - 1]; --len);

                            // xd[0] will always be be 1
                            for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
                        } else {
                            str = str.charAt(0) + "." + str.slice(1);
                        }
                    }

                    str = str + (e < 0 ? "p" : "p+") + e;
                } else if (e < 0) {
                    for (; ++e;) str = "0" + str;
                    str = "0." + str;
                } else {
                    if (++e > len) for (e -= len; e--;) str += "0";
                    else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
                }
            }

            str = (baseOut === 16 ? "0x" : baseOut === 2 ? "0b" : baseOut === 8 ? "0o" : "") + str;
        }

        return x.s < 0 ? "-" + str : str;
    }

    private static finiteToString(x: BigNumber, isExp?: boolean, sd?: number) {
        if (!x.isFinite()) return BigNumber.nonFiniteToString(x);
        let k,
            e = x.e,
            str = BigNumber.digitsToString(x.d),
            len = str.length;

        if (isExp) {
            if (sd && (k = sd - len) > 0) {
                str = str.charAt(0) + "." + str.slice(1) + BigNumber.getZeroString(k);
            } else if (len > 1) {
                str = str.charAt(0) + "." + str.slice(1);
            }

            str = str + (x.e < 0 ? "e" : "e+") + x.e;
        } else if (e < 0) {
            str = "0." + BigNumber.getZeroString(-e - 1) + str;
            if (sd && (k = sd - len) > 0) str += BigNumber.getZeroString(k);
        } else if (e >= len) {
            str += BigNumber.getZeroString(e + 1 - len);
            if (sd && (k = sd - e - 1) > 0) str = str + "." + BigNumber.getZeroString(k);
        } else {
            if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
            if (sd && (k = sd - len) > 0) {
                if (e + 1 === len) str += ".";
                str += BigNumber.getZeroString(k);
            }
        }

        return str;
    }

    /*
       * Return a new  BigNumber whose value is the absolute value of `x`.
       *
       * x {number|string| BigNumber}
       *
       */
    public static abs(x: BigNumberType) {
        return new this(x).abs();
    }

    /*
     * Return a new  BigNumber whose value is the arccosine in radians of `x`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static acos(x: BigNumberType) {
        return new this(x).acos();
    }

    /*
     * Return a new  BigNumber whose value is the inverse of the hyperbolic cosine of `x`, rounded to
     * `precision` significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static acosh(x: BigNumberType) {
        return new this(x).acosh();
    }

    /*
     * Return a new  BigNumber whose value is the sum of `x` and `y`, rounded to `precision` significant
     * digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     * y {number|string| BigNumber}
     *
     */
    public static add(x: BigNumberType, y: BigNumberType) {
        return new this(x).plus(y);
    }

    /*
     * Return a new  BigNumber whose value is the arcsine in radians of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static asin(x: BigNumberType) {
        return new this(x).asin();
    }

    /*
     * Return a new  BigNumber whose value is the inverse of the hyperbolic sine of `x`, rounded to
     * `precision` significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static asinh(x: BigNumberType) {
        return new this(x).asinh();
    }

    /*
     * Return a new  BigNumber whose value is the arctangent in radians of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static atan(x: BigNumberType) {
        return new this(x).atan();
    }

    /*
     * Return a new  BigNumber whose value is the inverse of the hyperbolic tangent of `x`, rounded to
     * `precision` significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static atanh(x: BigNumberType) {
        return new this(x).atanh();
    }

    /*
     * Return a new  BigNumber whose value is the arctangent in radians of `y/x` in the range -pi to pi
     * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
     *
     * Domain: [-Infinity, Infinity]
     * Range: [-pi, pi]
     *
     * y {number|string| BigNumber} The y-coordinate.
     * x {number|string| BigNumber} The x-coordinate.
     *
     * atan2(±0, -0)               = ±pi
     * atan2(±0, +0)               = ±0
     * atan2(±0, -x)               = ±pi for x > 0
     * atan2(±0, x)                = ±0 for x > 0
     * atan2(-y, ±0)               = -pi/2 for y > 0
     * atan2(y, ±0)                = pi/2 for y > 0
     * atan2(±y, -Infinity)        = ±pi for finite y > 0
     * atan2(±y, +Infinity)        = ±0 for finite y > 0
     * atan2(±Infinity, x)         = ±pi/2 for finite x
     * atan2(±Infinity, -Infinity) = ±3*pi/4
     * atan2(±Infinity, +Infinity) = ±pi/4
     * atan2(NaN, x) = NaN
     * atan2(y, NaN) = NaN
     *
     */
    public static atan2(y: BigNumberType, x: BigNumberType) {
        y = new this(y);
        x = new this(x);
        let r,
            pr = y.options.precision,
            rm = y.options.rounding,
            wpr = pr + 4;

        // Either NaN
        if (!y.s || !x.s) {
            r = new this(NaN);

            // Both ±Infinity
        } else if (!y.d && !x.d) {
            r = BigNumber.getPi(y, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
            r.s = y.s;

            // x is ±Infinity or y is ±0
        } else if (!x.d || y.isZero()) {
            r = x.s < 0 ? BigNumber.getPi(x, pr, rm) : new this(0);
            r.s = y.s;

            // y is ±Infinity or x is ±0
        } else if (!y.d || x.isZero()) {
            r = BigNumber.getPi(y, wpr, 1).times(0.5);
            r.s = y.s;

            // Both non-zero and finite
        } else if (x.s < 0) {
            x.options.precision = wpr;
            x.options.rounding = 1;
            r = this.atan(BigNumber.divide(y, x, wpr, 1));
            x = BigNumber.getPi(x, wpr, 1);
            x.options.precision = pr;
            x.options.rounding = rm;
            r = y.s < 0 ? r.minus(x) : r.plus(x);
        } else {
            r = this.atan(BigNumber.divide(y, x, wpr, 1));
        }

        return r;
    }

    /*
     * Return a new  BigNumber whose value is the cube root of `x`, rounded to `precision` significant
     * digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static cbrt(x: BigNumberType) {
        return new this(x).cbrt();
    }

    /*
     * Return a new  BigNumber whose value is `x` rounded to an integer using `ROUND_CEIL`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static ceil(x: BigNumberType) {
        return BigNumber.finalise(x = new this(x), x.e + 1, 2);
    }

    /*
  * Return a new  BigNumber whose value is the cosine of `x`, rounded to `precision` significant
  * digits using rounding mode `rounding`.
  *
  * x {number|string| BigNumber} A value in radians.
  *
  */
    public static cos(x: BigNumberType) {
        return new this(x).cos();
    }

    /*
     * Return a new  BigNumber whose value is the hyperbolic cosine of `x`, rounded to precision
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static cosh(x: BigNumberType) {
        return new this(x).cosh();
    }

    /*
   * Return a new  BigNumber whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string| BigNumber}
   * y {number|string| BigNumber}
   *
   */
    public static div(x: BigNumberType, y: BigNumberType) {
        return new this(x).div(y);
    }

    /*
     * Return a new  BigNumber whose value is the natural exponential of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} The power to which to raise the base of the natural log.
     *
     */
    public static exp(x: BigNumberType) {
        return new this(x).exp();
    }

    /*
     * Return a new  BigNumber whose value is `x` round to an integer using `ROUND_FLOOR`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static floor(x: BigNumberType) {
        return BigNumber.finalise(x = new this(x), x.e + 1, 3);
    }

    /*
     * Return a new  BigNumber whose value is the square root of the sum of the squares of the arguments,
     * rounded to `precision` significant digits using rounding mode `rounding`.
     *
     * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
     *
     */
    public static hypot() {
        let i, n,
            t = new this(0);

        external = false;

        for (i = 0; i < arguments.length;) {
            n = new this(arguments[i++]);
            if (!n.d) {
                if (n.s) {
                    external = true;
                    return new this(1 / 0);
                }
                t = n;
            } else if (t.d) {
                t = t.plus(n.times(n));
            }
        }

        external = true;

        return t.sqrt();
    }

    /*
     * Return a new  BigNumber whose value is the natural logarithm of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static ln(x: BigNumberType) {
        return new this(x).ln();
    }

    /*
     * Return a new  BigNumber whose value is the log of `x` to the base `y`, or to base 10 if no base
     * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
     *
     * log[y](x)
     *
     * x {number|string| BigNumber} The argument of the logarithm.
     * y {number|string| BigNumber} The base of the logarithm.
     *
     */
    public static log(x: BigNumberType, y: BigNumberType) {
        return new this(x).log(y);
    }

    /*
     * Return a new  BigNumber whose value is the base 2 logarithm of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static log2(x: BigNumberType) {
        return new this(x).log(2);
    }

    /*
     * Return a new  BigNumber whose value is the base 10 logarithm of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static log10(x: BigNumberType) {
        return new this(x).log(10);
    }

    /*
     * Return a new  BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string| BigNumber}
     *
     */
    public static max(...args: BigNumberType[]) {
        return BigNumber.maxOrMin(args, "lt");
    }

    /*
     * Return a new  BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string| BigNumber}
     *
     */
    public static min(...args: BigNumberType[]) {
        return BigNumber.maxOrMin(args, "gt");
    }

    /*
     * Return a new  BigNumber whose value is `x` modulo `y`, rounded to `precision` significant digits
     * using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     * y {number|string| BigNumber}
     *
     */
    public static mod(x: BigNumberType, y: BigNumberType) {
        return new this(x).mod(y);
    }

    /*
     * Return a new  BigNumber whose value is `x` multiplied by `y`, rounded to `precision` significant
     * digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     * y {number|string| BigNumber}
     *
     */
    public static mul(x: BigNumberType, y: BigNumberType) {
        return new this(x).mul(y);
    }

    /*
     * Return a new  BigNumber whose value is `x` raised to the power `y`, rounded to precision
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} The base.
     * y {number|string| BigNumber} The exponent.
     *
     */
    public static pow(x: BigNumberType, y: BigNumberType) {
        return new this(x).pow(y);
    }

    /*
     * Returns a new  BigNumber with a random value equal to or greater than 0 and less than 1, and with
     * `sd`, or ` BigNumber.precision` if `sd` is omitted, significant digits (or less if trailing zeros
     * are produced).
     *
     * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
     *
     */
    /* public static random(sd?: number) {
        let that: any = this;
        let d, e, k, n,
            i = 0,
            r = new this(1),
            rd = [];

        if (sd === void 0) sd = r.options.precision;
        else BigNumber.checkInt32(sd, 1, MAX_DIGITS);

        k = Math.ceil(sd / LOG_BASE);

        if (!that.crypto) {
            for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

            // Browsers supporting crypto.getRandomValues.
        } else if (crypto.getRandomValues) {
            d = crypto.getRandomValues(new Uint32Array(k));

            for (; i < k;) {
                n = d[i];

                // 0 <= n < 4294967296
                // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
                if (n >= 4.29e9) {
                    d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
                } else {

                    // 0 <= n <= 4289999999
                    // 0 <= (n % 1e7) <= 9999999
                    rd[i++] = n % 1e7;
                }
            }

            // Node.js supporting crypto.randomBytes.
        } else if (crypto.randomBytes) {

            // buffer
            d = crypto.randomBytes(k *= 4);

            for (; i < k;) {

                // 0 <= n < 2147483648
                n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

                // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
                if (n >= 2.14e9) {
                    crypto.randomBytes(4).copy(d, i);
                } else {

                    // 0 <= n <= 2139999999
                    // 0 <= (n % 1e7) <= 9999999
                    rd.push(n % 1e7);
                    i += 4;
                }
            }

            i = k / 4;
        } else {
            throw Error(`cryptoUnavailable`);
        }

        k = rd[--i];
        sd %= LOG_BASE;

        // Convert trailing digits to zeros according to sd.
        if (k && sd) {
            n = mathpow(10, LOG_BASE - sd);
            rd[i] = (k / n | 0) * n;
        }

        // Remove trailing words which are zero.
        for (; rd[i] === 0; i--) rd.pop();

        // Zero?
        if (i < 0) {
            e = 0;
            rd = [0];
        } else {
            e = -1;

            // Remove leading words which are zero and adjust exponent accordingly.
            for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

            // Count the digits of the first word of rd to determine leading zeros.
            for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

            // Adjust the exponent for leading zeros of the first word of rd.
            if (k < LOG_BASE) e -= LOG_BASE - k;
        }

        r.e = e;
        r.d = rd;

        return r;
    } */

    /*
     * Return a new  BigNumber whose value is `x` rounded to an integer using rounding mode `rounding`.
     *
     * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
     *
     * x {number|string| BigNumber}
     *
     */
    public static round(x: BigNumberType) {
        return BigNumber.finalise(x = new this(x), x.e + 1, x.options.rounding);
    }

    /*
     * Return
     *   1    if x > 0,
     *  -1    if x < 0,
     *   0    if x is 0,
     *  -0    if x is -0,
     *   NaN  otherwise
     *
     */
    public static sign(x: BigNumberType) {
        x = new this(x);
        return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
    }

    /*
     * Return a new  BigNumber whose value is the sine of `x`, rounded to `precision` significant digits
     * using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static sin(x: BigNumberType) {
        return new this(x).sin();
    }

    /*
     * Return a new  BigNumber whose value is the hyperbolic sine of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static sinh(x: BigNumberType) {
        return new this(x).sinh();
    }

    /*
     * Return a new  BigNumber whose value is the square root of `x`, rounded to `precision` significant
     * digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     *
     */
    public static sqrt(x: BigNumberType) {
        return new this(x).sqrt();
    }

    /*
     * Return a new  BigNumber whose value is `x` minus `y`, rounded to `precision` significant digits
     * using rounding mode `rounding`.
     *
     * x {number|string| BigNumber}
     * y {number|string| BigNumber}
     *
     */
    public static sub(x: BigNumberType, y: BigNumberType) {
        return new this(x).sub(y);
    }

    /*
     * Return a new  BigNumber whose value is the tangent of `x`, rounded to `precision` significant
     * digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static tan(x: BigNumberType) {
        return new this(x).tan();
    }

    /*
     * Return a new  BigNumber whose value is the hyperbolic tangent of `x`, rounded to `precision`
     * significant digits using rounding mode `rounding`.
     *
     * x {number|string| BigNumber} A value in radians.
     *
     */
    public static tanh(x: BigNumberType) {
        return new this(x).tanh();
    }

    /*
     * Return a new  BigNumber whose value is `x` truncated to an integer.
     *
     * x {number|string| BigNumber}
     *
     */
    public static trunc(x: BigNumberType) {
        return BigNumber.finalise(x = new this(x), x.e + 1, 1);
    }

    public compareTo(y: BigNumberType) {
        this.cmp(y);
    }
    public cmp(y: BigNumberType) {
        // tslint:disable:one-variable-per-declaration
        let i, j, xdL: number, ydL: number;
        const x = this;
        const xd: any = x.d;
        const yd = (y = new BigNumber(y)).d;
        const xs: any = x.s,
            ys = y.s;

        // Either NaN or ±Infinity?
        if (!xd || !yd) {
            // tslint:disable-next-line:no-bitwise
            return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : ((!xd) as any ^ xs) < 0 ? 1 : -1;
        }

        // Either zero?
        if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

        // Signs differ?
        if (xs !== ys) return xs;

        // Compare exponents.
        // tslint:disable-next-line:no-bitwise
        if (x.e !== y.e) return ((x.e > y.e) as any) ^ ((xs < 0) as any) ? 1 : -1;

        xdL = xd.length;
        ydL = yd.length;

        // Compare digit by digit.
        for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
            // tslint:disable-next-line:no-bitwise
            if (xd[i] !== yd[i]) return ((xd[i] > yd[i]) as any) ^ ((xs < 0) as any) ? 1 : -1;
        }

        // Compare lengths.
        // tslint:disable-next-line:no-bitwise
        return (xdL === ydL) ? 0 : ((xdL > ydL) as any) ^ ((xs < 0) as any) ? 1 : -1;
    }
}
