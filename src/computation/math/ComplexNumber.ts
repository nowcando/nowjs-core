
import { Vector2D } from "./index";

function cosh(x: number) {
    return (Math.exp(x) + Math.exp(-x)) * 0.5;
}

function sinh(x: number) {
    return (Math.exp(x) - Math.exp(-x)) * 0.5;
}

function hypot(x: number, y: number) {

    let a = Math.abs(x);
    let b = Math.abs(y);

    if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
    }

    if (a < b) {
        a = b;
        b = x / y;
    } else {
        b = y / x;
    }
    return a * Math.sqrt(1 + b * b);
}

function logHypot(a: number, b: number) {
    // tslint:disable:variable-name
    const _a = Math.abs(a);
    const _b = Math.abs(b);
    if (a === 0) {
        return Math.log(_b);
    }
    if (b === 0) {
        return Math.log(_a);
    }
    if (_a < 3000 && _b < 3000) {
        return Math.log(a * a + b * b) * 0.5;
    }
    return Math.log(a / Math.cos(Math.atan2(b, a)));
}

function parser_exit() {
    throw SyntaxError("Invalid Param");
}

export class ComplexNumber {
    protected re = 0;
    protected im = 0;
    protected abss = 0;
    protected arg = 0;
    protected r = 0;
    protected phi = 0;
    constructor(a: number | string | ComplexNumber, b?: number) {
        if (typeof a === "number") {
            this.re = a;
            this.im = b;
        } else if (!(a instanceof ComplexNumber)) {
            const compl = ComplexNumber.parse(a, b);
            this.re = compl.re;
            this.im = compl.im;
        } else if ((a instanceof ComplexNumber)) {
            this.re = a.re;
            this.im = a.im;
        }

    }

    // tslint:disable:member-ordering
    public static readonly ZERO = new ComplexNumber(0, 0);
    public static readonly ONE = new ComplexNumber(1, 0);
    public static readonly I = new ComplexNumber(0, 1);
    public static readonly PI = new ComplexNumber(Math.PI, 0);
    public static readonly E = new ComplexNumber(Math.E, 0);
    public static readonly EPSILON = 1e-16;

    // tslint:disable-next-line:member-ordering
    public static parse(a: number | string | ComplexNumber, b?: number): ComplexNumber {
        const result: ComplexNumber = new ComplexNumber(0, 0);
        if (a === undefined || a === null) {
            result.re = 0;
            result.im = 0;
        } else if (b !== undefined && typeof a === "number") {
            result.re = a;
            result.im = b;
        } else {
            if (a instanceof ComplexNumber) {
                if (a.re && a.im) {
                    result.re = a.re;
                    result.im = a.im;
                } else if ("abs" in a && "arg" in a) {
                    result.re = a.abss * Math.cos(a.arg);
                    result.im = a.abss * Math.sin(a.arg);
                } else if ("r" in a && "phi" in a) {
                    result.re = a.r * Math.cos(a.phi);
                    result.im = a.r * Math.sin(a.phi);
                } else if (Array.isArray(a) && a.length === 2) { // Quick array check
                    result.re = a[0];
                    result.im = a[1];
                } else {
                    parser_exit();
                }
            } else if (typeof a === "number") {
                result.im = 0;
                result.re = a;
            }
            if (typeof a === "string") {
                result.im = /* void */
                    result.re = 0;

                const tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
                let plus = 1;
                let minus = 0;

                if (tokens === null) {
                    parser_exit();
                }

                for (let i = 0; i < tokens.length; i++) {

                    const c = tokens[i];

                    if (c === " " || c === "\t" || c === "\n") {
                        /* void */
                    } else if (c === "+") {
                        plus++;
                    } else if (c === "-") {
                        minus++;
                    } else if (c === "i" || c === "I") {

                        if (plus + minus === 0) {
                            parser_exit();
                        }

                        if (tokens[i + 1] !== " " && !isNaN(tokens[i + 1] as any)) {
                            result.im += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
                            i++;
                        } else {
                            result.im += parseFloat((minus % 2 ? "-" : "") + "1");
                        }
                        plus = minus = 0;

                    } else {

                        if (plus + minus === 0 || isNaN(c as any)) {
                            parser_exit();
                        }

                        if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
                            result.im += parseFloat((minus % 2 ? "-" : "") + c);
                            i++;
                        } else {
                            result.re += parseFloat((minus % 2 ? "-" : "") + c);
                        }
                        plus = minus = 0;
                    }
                }

                // Still something on the stack
                if (plus + minus > 0) {
                    parser_exit();
                }
            }
        }
        return result;
    }

    public get Real(): number {
        return this.re;
    }
    public get Imaginary(): number {
        return this.im;
    }

    public sign(): ComplexNumber {
        const abs = this.magnitude();

        return new ComplexNumber(
            this.re / abs,
            this.im / abs);
    }
    public add(a: number | string | ComplexNumber, b?: number): ComplexNumber {
        const P = ComplexNumber.parse(a, b); // mutates P

        return new ComplexNumber(
            this.re + P.re,
            this.im + P.im);
    }
    public subtract(a: number | string | ComplexNumber, b?: number): ComplexNumber {
        const P = ComplexNumber.parse(a, b); // mutates P

        return new ComplexNumber(
            this.re - P.re,
            this.im - P.im);
    }
    public multiply(a: number | string | ComplexNumber, b?: number): ComplexNumber {
        const P = ComplexNumber.parse(a, b); // mutates P
        if (P.im === 0 && this.im === 0) {
            return new ComplexNumber(this.re * P.re, 0);
        }

        return new ComplexNumber(
            this.re * P.re - this.im * P.im,
            this.re * P.im + this.im * P.re);
    }
    public divide(aa: number | string | ComplexNumber, bb?: number): ComplexNumber {
        const P = ComplexNumber.parse(aa, bb); // mutates P
        const a = this.re;
        const b = this.im;

        const c = P.re;
        const d = P.im;
        // tslint:disable-next-line:one-variable-per-declaration
        let t, x;

        if (0 === d) {
            if (0 === c) {
                // Divisor is zero
                return new ComplexNumber(
                    (a !== 0) ? (a / 0) : 0,
                    (b !== 0) ? (b / 0) : 0);
            } else {
                // Divisor is real
                return new ComplexNumber(a / c, b / c);
            }
        }

        if (Math.abs(c) < Math.abs(d)) {

            x = c / d;
            t = c * x + d;

            return new ComplexNumber(
                (a * x + b) / t,
                (b * x - a) / t);

        } else {

            x = d / c;
            t = d * x + c;

            return new ComplexNumber(
                (a + b * x) / t,
                (b - a * x) / t);
        }

    }
    public pow(aa: number | string | ComplexNumber, bb?: number): ComplexNumber {
        const P = ComplexNumber.parse(aa, bb); // mutates P
        let a = this.re;
        let b = this.im;
        if (a === 0 && b === 0) {
            return ComplexNumber.ZERO;
        }

        // If the exponent is real
        if (P.im === 0) {

            if (b === 0 && a >= 0) {

                return new ComplexNumber(Math.pow(a, P.re), 0);

            } else if (a === 0) { // If base is fully imaginary

                switch ((P.re % 4 + 4) % 4) {
                    case 0:
                        return new ComplexNumber(Math.pow(b, P.re), 0);
                    case 1:
                        return new ComplexNumber(0, Math.pow(b, P.re));
                    case 2:
                        return new ComplexNumber(-Math.pow(b, P.re), 0);
                    case 3:
                        return new ComplexNumber(0, -Math.pow(b, P.re));
                }
            }
        }

        /* I couldn't find a good formula, so here is a derivation and optimization
         *
         * z_1^z_2 = (a + bi)^(c + di)
         *         = exp((c + di) * log(a + bi)
         *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
         * =>...
         * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
         * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
         *
         * =>...
         * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
         * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
         *
         * =>
         * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
         * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
         *
         */

        const arg = Math.atan2(b, a);
        const loh = logHypot(a, b);

        a = Math.exp(P.re * loh - P.im * arg);
        b = P.im * loh + P.re * arg;
        return new ComplexNumber(
            a * Math.cos(b),
            a * Math.sin(b));
    }
    public sqrt(): ComplexNumber {
        const a = this.re;
        const b = this.im;
        const r = this.magnitude();

        // tslint:disable-next-line:one-variable-per-declaration
        let re, im;

        if (a >= 0) {

            if (b === 0) {
                return new ComplexNumber(Math.sqrt(a), 0);
            }

            re = 0.5 * Math.sqrt(2.0 * (r + a));
        } else {
            re = Math.abs(b) / Math.sqrt(2 * (r - a));
        }

        if (a <= 0) {
            im = 0.5 * Math.sqrt(2.0 * (r - a));
        } else {
            im = Math.abs(b) / Math.sqrt(2 * (r + a));
        }

        return new ComplexNumber(re, b < 0 ? -im : im);
    }
    public exp(): ComplexNumber {
        const tmp = Math.exp(this.re);

        if (this.im === 0) {
            // return new Complex(tmp, 0);
        }
        return new ComplexNumber(
            tmp * Math.cos(this.im),
            tmp * Math.sin(this.im));
    }
    public log(): ComplexNumber {
        const a = this.re;
        const b = this.im;

        if (b === 0 && a > 0) {
            // return new Complex(Math.log(a), 0);
        }

        return new ComplexNumber(
            logHypot(a, b),
            Math.atan2(b, a));
    }
    public abs(): number {
        return hypot(this.re, this.im);
    }
    public magnitude(): number {
        return hypot(this.re, this.im);
    }
    public angle(): number {
        return Math.atan2(this.im, this.re);
    }
    public sin(): ComplexNumber {
        // sin(c) = (e^b - e^(-b)) / (2i)

        const a = this.re;
        const b = this.im;

        return new ComplexNumber(
            Math.sin(a) * cosh(b),
            Math.cos(a) * sinh(b));
    }
    public cos(): ComplexNumber {
        // cos(z) = (e^b + e^(-b)) / 2

        const a = this.re;
        const b = this.im;

        return new ComplexNumber(
            Math.cos(a) * cosh(b),
            -Math.sin(a) * sinh(b));
    }
    public tan(): ComplexNumber {
        // tan(c) = (e^(ci) - e^(-ci)) / (i(e^(ci) + e^(-ci)))

        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = Math.cos(a) + cosh(b);

        return new ComplexNumber(
            Math.sin(a) / d,
            sinh(b) / d);
    }
    public cot(): ComplexNumber {
        // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))

        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = Math.cos(a) - cosh(b);

        return new ComplexNumber(
            -Math.sin(a) / d,
            sinh(b) / d);
    }
    public sec(): ComplexNumber {
        // sec(c) = 2 / (e^(ci) + e^(-ci))

        const a = this.re;
        const b = this.im;
        const d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);

        return new ComplexNumber(
            Math.cos(a) * cosh(b) / d,
            Math.sin(a) * sinh(b) / d);
    }
    public csc(): ComplexNumber {
        // csc(c) = 2i / (e^(ci) - e^(-ci))

        const a = this.re;
        const b = this.im;
        const d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);

        return new ComplexNumber(
            Math.sin(a) * cosh(b) / d,
            -Math.cos(a) * sinh(b) / d);
    }
    public asin(): ComplexNumber {
        // asin(c) = -i * log(ci + sqrt(1 - c^2))

        const a = this.re;
        const b = this.im;

        const t1 = new ComplexNumber(
            b * b - a * a + 1,
            -2 * a * b).sqrt();

        const t2 = new ComplexNumber(
            t1.re - b,
            t1.im + a).log();

        return new ComplexNumber(t2.im, -t2.re);
    }
    public acos(): ComplexNumber {
        // acos(c) = i * log(c - i * sqrt(1 - c^2))

        const a = this.re;
        const b = this.im;

        const t1 = new ComplexNumber(
            b * b - a * a + 1,
            -2 * a * b).sqrt();

        const t2 = new ComplexNumber(
            t1.re - b,
            t1.im + a).log();

        return new ComplexNumber(Math.PI / 2 - t2.im, t2.re);
    }
    public atan(): ComplexNumber {
        // atan(c) = i / 2 log((i + x) / (i - x))

        const a = this.re;
        const b = this.im;

        if (a === 0) {

            if (b === 1) {
                return new ComplexNumber(0, Infinity);
            }

            if (b === -1) {
                return new ComplexNumber(0, -Infinity);
            }
        }

        const d = a * a + (1.0 - b) * (1.0 - b);

        const t1 = new ComplexNumber(
            (1 - b * b - a * a) / d,
            -2 * a / d).log();

        return new ComplexNumber(-0.5 * t1.im, 0.5 * t1.re);
    }
    public acot(): ComplexNumber {
        // acot(c) = i / 2 log((c - i) / (c + i))

        const a = this.re;
        const b = this.im;

        if (b === 0) {
            return new ComplexNumber(Math.atan2(1, a), 0);
        }

        const d = a * a + b * b;
        return (d !== 0)
            ? new ComplexNumber(
                a / d,
                -b / d).atan()
            : new ComplexNumber(
                (a !== 0) ? a / 0 : 0,
                (b !== 0) ? -b / 0 : 0).atan();
    }
    public asec(): ComplexNumber {
        // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))

        const a = this.re;
        const b = this.im;

        if (a === 0 && b === 0) {
            return new ComplexNumber(0, Infinity);
        }

        const d = a * a + b * b;
        return (d !== 0)
            ? new ComplexNumber(
                a / d,
                -b / d).acos()
            : new ComplexNumber(
                (a !== 0) ? a / 0 : 0,
                (b !== 0) ? -b / 0 : 0).acos();
    }
    public acsc(): ComplexNumber {
        // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))

        const a = this.re;
        const b = this.im;

        if (a === 0 && b === 0) {
            return new ComplexNumber(Math.PI / 2, Infinity);
        }

        const d = a * a + b * b;
        return (d !== 0)
            ? new ComplexNumber(
                a / d,
                -b / d).asin()
            : new ComplexNumber(
                (a !== 0) ? a / 0 : 0,
                (b !== 0) ? -b / 0 : 0).asin();
    }
    public sinh(): ComplexNumber {
        // sinh(c) = (e^c - e^-c) / 2

        const a = this.re;
        const b = this.im;

        return new ComplexNumber(
            sinh(a) * Math.cos(b),
            cosh(a) * Math.sin(b));
    }
    public cosh(): ComplexNumber {
        // cosh(c) = (e^c + e^-c) / 2

        const a = this.re;
        const b = this.im;

        return new ComplexNumber(
            cosh(a) * Math.cos(b),
            sinh(a) * Math.sin(b));
    }
    public tanh(): ComplexNumber {
        // tanh(c) = (e^c - e^-c) / (e^c + e^-c)

        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = cosh(a) + Math.cos(b);

        return new ComplexNumber(
            sinh(a) / d,
            Math.sin(b) / d);
    }
    public coth(): ComplexNumber {
        // coth(c) = (e^c + e^-c) / (e^c - e^-c)

        const a = 2 * this.re;
        const b = 2 * this.im;
        const d = cosh(a) - Math.cos(b);

        return new ComplexNumber(
            sinh(a) / d,
            -Math.sin(b) / d);
    }
    public sech(): ComplexNumber {
        // sech(c) = 2 / (e^c + e^-c)

        const a = this.re;
        const b = this.im;
        const d = Math.cos(2 * b) + cosh(2 * a);

        return new ComplexNumber(
            2 * cosh(a) * Math.cos(b) / d,
            -2 * sinh(a) * Math.sin(b) / d);
    }
    public csch(): ComplexNumber {
        // csch(c) = 2 / (e^c - e^-c)

        const a = this.re;
        const b = this.im;
        const d = Math.cos(2 * b) - cosh(2 * a);

        return new ComplexNumber(
            -2 * sinh(a) * Math.cos(b) / d,
            2 * cosh(a) * Math.sin(b) / d);
    }
    public asinh(): ComplexNumber {
        // asinh(c) = log(c + sqrt(c^2 + 1))

        let tmp = this.im;
        this.im = -this.re;
        this.re = tmp;
        const res = this.asin();

        this.re = -this.im;
        this.im = tmp;
        tmp = res.re;

        res.re = -res.im;
        res.im = tmp;
        return res;
    }
    public acosh(): ComplexNumber {
        // acosh(c) = log(c + sqrt(c^2 - 1))

        let tmp;
        // tslint:disable-next-line:prefer-const
        let res = this.acos();
        if (res.im <= 0) {
            tmp = res.re;
            res.re = -res.im;
            res.im = tmp;
        } else {
            tmp = res.im;
            res.im = -res.re;
            res.re = tmp;
        }
        return res;
    }
    public atanh(): ComplexNumber {
        // atanh(c) = log((1+c) / (1-c)) / 2

        const a = this.re;
        const b = this.im;

        const noIM = a > 1 && b === 0;
        const oneMinus = 1 - a;
        const onePlus = 1 + a;
        const d = oneMinus * oneMinus + b * b;

        const x = (d !== 0)
            ? new ComplexNumber(
                (onePlus * oneMinus - b * b) / d,
                (b * oneMinus + onePlus * b) / d)
            : new ComplexNumber(
                (a !== -1) ? (a / 0) : 0,
                (b !== 0) ? (b / 0) : 0);

        const temp = x.re;
        x.re = logHypot(x.re, x.im) / 2;
        x.im = Math.atan2(x.im, temp) / 2;
        if (noIM) {
            x.im = -x.im;
        }
        return x;
    }
    public acoth(): ComplexNumber {
        // acoth(c) = log((c+1) / (c-1)) / 2

        const a = this.re;
        const b = this.im;

        if (a === 0 && b === 0) {

            return new ComplexNumber(0, Math.PI / 2);
        }

        const d = a * a + b * b;
        return (d !== 0)
            ? new ComplexNumber(
                a / d,
                -b / d).atanh()
            : new ComplexNumber(
                (a !== 0) ? a / 0 : 0,
                (b !== 0) ? -b / 0 : 0).atanh();
    }
    public asech(): ComplexNumber {
        const a = this.re;
        const b = this.im;

        if (a === 0 && b === 0) {
            return new ComplexNumber(Infinity, 0);
        }

        const d = a * a + b * b;
        return (d !== 0)
            ? new ComplexNumber(
                a / d,
                -b / d).acosh()
            : new ComplexNumber(
                (a !== 0) ? a / 0 : 0,
                (b !== 0) ? -b / 0 : 0).acosh();
    }
    public acsch(): ComplexNumber {
        // acsch(c) = log((1+sqrt(1+c^2))/c)

        const a = this.re;
        const b = this.im;

        if (b === 0) {

            return new ComplexNumber(
                (a !== 0)
                    ? Math.log(a + Math.sqrt(a * a + 1))
                    : Infinity, 0);
        }

        const d = a * a + b * b;
        return (d !== 0)
            ? new ComplexNumber(
                a / d,
                -b / d).asinh()
            : new ComplexNumber(
                (a !== 0) ? a / 0 : 0,
                (b !== 0) ? -b / 0 : 0).asinh();
    }
    public inverse(): ComplexNumber {
        const a = this.re;
        const b = this.im;

        const d = a * a + b * b;

        return new ComplexNumber(
            a !== 0 ? a / d : 0,
            b !== 0 ? -b / d : 0);
    }
    public conjugate(): ComplexNumber {
        return new ComplexNumber(this.re, -this.im);
    }
    public neg(): ComplexNumber {
        return new ComplexNumber(-this.re, -this.im);
    }
    public ceil(places?: number): ComplexNumber {
        places = Math.pow(10, places || 0);
        return new ComplexNumber(
            Math.ceil(this.re * places) / places,
            Math.ceil(this.im * places) / places);
    }
    public floor(places?: number): ComplexNumber {
        places = Math.pow(10, places || 0);

        return new ComplexNumber(
            Math.floor(this.re * places) / places,
            Math.floor(this.im * places) / places);
    }
    public round(places?: number): ComplexNumber {
        places = Math.pow(10, places || 0);

        return new ComplexNumber(
            Math.round(this.re * places) / places,
            Math.round(this.im * places) / places);
    }
    public equals(a: number | string | ComplexNumber, b?: number): boolean {
        const P = ComplexNumber.parse(a, b); // mutates P
        return Math.abs(P.re - this.re) <= ComplexNumber.EPSILON &&
            Math.abs(P.im - this.im) <= ComplexNumber.EPSILON;
    }
    public clone(): ComplexNumber {
        return new ComplexNumber(this.re, this.im);
    }
    public valueOf(): number | null {
        if (this.im === 0) {
            return this.re;
        }
        return null;
    }
    public isNaN(): boolean {
        return isNaN(this.re) || isNaN(this.im);
    }
    public isFinite(): boolean {
        return isFinite(this.re) && isFinite(this.im);
    }
    public toString(): string {
        const a = this.re;
        let b = this.im;
        let ret = "";

        if (isNaN(a) || isNaN(b)) {
            return "NaN";
        }

        if (a !== 0) {
            ret += a;
        }

        if (b !== 0) {

            if (a !== 0) {
                ret += b < 0 ? " - " : " + ";
            } else if (b < 0) {
                ret += "-";
            }

            b = Math.abs(b);

            if (1 !== b) {
                ret += b;
            }
            ret += "i";
        }

        // tslint:disable-next-line:curly
        if (!ret)
            return "0";

        return ret;
    }
    public toVector(): number[] {
        return [this.re, this.im];
    }
    public toVector2D(): Vector2D {
        return new Vector2D(this.re, this.im);
    }
}
