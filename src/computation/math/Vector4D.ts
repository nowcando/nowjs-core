
import { Point4D } from "./Point4D";

export class Vector4D extends Point4D {
    constructor(x?: number, y?: number, z?: number,  w?: number) {
        super(x, y, z, w);
    }
    // tslint:disable:member-ordering
    public static negative(a: Vector4D, b: Vector4D) {
        b.X = -a.X; b.Y = -a.Y; b.Z = -a.Z; b.W = -a.W;
        return b;
    }
    public static add(a: Vector4D, b: Vector4D | number, c?: Vector4D) {
        c = c || new Vector4D();
        // tslint:disable-next-line:max-line-length
        if (b instanceof Vector4D) {
            c.X = a.X + b.X; c.Y = a.Y + b.Y; c.Z = a.Z + b.Z;
            c.W = a.W + b.W;
          } else { c.X = a.X + b; c.Y = a.Y + b; c.Z = a.Z + b; c.W = a.W + b; }
        return c;
    }
    public static subtract(a: Vector4D, b: Vector4D | number, c?: Vector4D) {
        c = c || new Vector4D();
        if (b instanceof Vector4D) {
            c.X = a.X - b.X; c.Y = a.Y - b.Y; c.Z = a.Z - b.Z; c.W = a.W - b.W;
        }        else { c.X = a.X - b; c.Y = a.Y - b; c.Z = a.Z - b; c.W = a.W - b; }
        return c;
    }
    public static multiply(a: Vector4D, b: Vector4D | number, c?: Vector4D) {
        c = c || new Vector4D();
        if (b instanceof Vector4D) {
            c.X = a.X * b.X; c.Y = a.Y * b.Y; c.Z = a.Z * b.Z; c.W = a.W * b.W;
        }  else { c.X = a.X * b; c.Y = a.Y * b; c.Z = a.Z * b; c.W = a.W * b; }
        return c;
    }
    public static divide(a: Vector4D, b: Vector4D | number, c?: Vector4D) {
        c = c || new Vector4D();
        if (b instanceof Vector4D) {
            c.X = a.X / b.X; c.Y = a.Y / b.Y; c.Z = a.Z / b.Z; c.W = a.W / b.W;
        }        else { c.X = a.X / b; c.Y = a.Y / b; c.Z = a.Z / b; c.W = a.W / b; }
        return c;
    }
    public static cross(a: Vector4D, b: Vector4D, c?: Vector4D) {
        c = c || new Vector4D();
        c.X = a.Y * b.Z - a.Z * b.Y;
        c.Y = a.Z * b.X - a.X * b.Z;
        c.Z = a.X * b.Y - a.Y * b.X;
        c.W = a.W * b.W - a.W * b.X;
        return c;
    }
    public static unit(a: Vector4D, b: Vector4D) {
        const length = a.length();
        b.X = a.X / length;
        b.Y = a.Y / length;
        b.Z = a.Z / length;
        b.W = a.W / length;
        return b;
    }
    public static fromBearing(angle: number, length: number) {
        return new Vector4D(
            length * Math.cos(angle),
            length * Math.sin(angle),
        );
    }
    public static fromAngles(theta: number, phi: number) {
        return new Vector4D(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
    }
    public static randomDirection() {
        return Vector4D.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
    }
    public static min(a: Vector4D, b: Vector4D) {
        return new Vector4D(Math.min(a.X, b.X), Math.min(a.Y, b.Y), Math.min(a.Z, b.Z));
    }
    public static max(a: Vector4D, b: Vector4D) {
        return new Vector4D(Math.max(a.X, b.X), Math.max(a.Y, b.Y), Math.max(a.Z, b.Z));
    }
    public static lerp(a: Vector4D, b: Vector4D, fraction: number) {
        return b.subtract(a).multiply(fraction).add(a);
    }
    public static fromArray(a: number[]) {
        return new Vector4D(a[0], a[1], a[2]);
    }
    public static angleBetween(a: Vector4D, b: Vector4D) {
        return a.angleTo(b);
    }

    public negative() {
        return new Vector4D(-this.X, -this.Y, -this.Z);
    }
    public add(v: Vector4D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector4D) return new Vector4D(this.X + v.X, this.Y + v.Y, this.Z + v.Z);
        // tslint:disable-next-line:curly
        else return new Vector4D(this.X + v, this.Y + v, this.Z + v);
    }
    public subtract(v: Vector4D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector4D) return new Vector4D(this.X - v.X, this.Y - v.Y, this.Z - v.Z);
        // tslint:disable-next-line:curly
        else return new Vector4D(this.X - v, this.Y - v, this.Z - v);
    }
    public multiply(v: Vector4D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector4D) return new Vector4D(this.X * v.X, this.Y * v.Y, this.Z * v.Z);
        // tslint:disable-next-line:curly
        else return new Vector4D(this.X * v, this.Y * v, this.Z * v);
    }
    public divide(v: Vector4D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector4D) return new Vector4D(this.X / v.X, this.Y / v.Y, this.Z / v.Z);
        // tslint:disable-next-line:curly
        else return new Vector4D(this.X / v, this.Y / v, this.Z / v);
    }
    public equals(v: Vector4D): boolean {
        return this.X === v.X && this.Y === v.Y && this.Z === v.Z;
    }
    public dot(v: Vector4D): number {
        return this.X * v.X + this.Y * v.Y + this.Z * v.Z + this.W * v.W;
    }
    public cross(v: Vector4D): Vector4D {
        return new Vector4D(
            this.Y * v.Z - this.Z * v.Y,
            this.Z * v.X - this.X * v.Z,
            this.X * v.Y - this.Y * v.X,
        );
    }
    public magnitude() {
        return this.length();
    }
    public length() {
        return Math.sqrt(this.dot(this));
    }
    public unit() {
        return this.divide(this.length());
    }
    public min() {
        return Math.min(Math.min(Math.min(this.X, this.Y), this.Z), this.W);
    }
    public max() {
        return Math.max(Math.max(Math.max(this.X, this.Y), this.Z), this.W);
    }
    public toAngles() {
        return {
            theta: Math.atan2(this.Z, this.X),
            // tslint:disable-next-line:object-literal-sort-keys
            phi: Math.asin(this.Y / this.length()),
        };
    }
    public angleTo(a: Vector4D) {
        return Math.acos(this.dot(a) / (this.length() * a.length()));
    }
    public areaOfTriangle(a: Vector4D) {
        const c = this.cross(a).magnitude();
        return 0.5 * c;
    }
    public volumeOfVectors(a: Vector4D, b: Vector4D) {
        const v = Math.abs(this.cross(b).dot(a));
        return (1 / 6) * v;
    }
    public toArray(n?: number) {
        return [this.X, this.Y, this.Z, this.W].slice(0, n || 4);
    }
    public clone() {
        return new Vector4D(this.X, this.Y, this.Z, this.W);
    }
    private init(x: number, y: number, z: number , w: number) {
        this.X = x; this.Y = y; this.Z = z; this.W = w;
        return this;
    }
}
