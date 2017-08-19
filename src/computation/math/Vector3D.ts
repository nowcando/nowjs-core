
import { Point3D } from "./Point3D";

export class Vector3D extends Point3D {
    constructor(x?: number, y?: number, z?: number) {
        super(x, y, z);
    }
    // tslint:disable:one-line
    // tslint:disable:member-ordering
    public static negative(a: Vector3D, b: Vector3D) {
        b.X = -a.X; b.Y = -a.Y; b.Z = -a.Z;
        return b;
    }
    public static add(a: Vector3D, b: Vector3D | number, c?: Vector3D) {
        c = c || new Vector3D();
        if (b instanceof Vector3D) { c.X = a.X + b.X; c.Y = a.Y + b.Y; c.Z = a.Z + b.Z; }
        else { c.X = a.X + b; c.Y = a.Y + b; c.Z = a.Z + b; }
        return c;
    }
    public static subtract(a: Vector3D, b: Vector3D | number, c?: Vector3D) {
        c = c || new Vector3D();
        if (b instanceof Vector3D) { c.X = a.X - b.X; c.Y = a.Y - b.Y; c.Z = a.Z - b.Z; }
        else { c.X = a.X - b; c.Y = a.Y - b; c.Z = a.Z - b; }
        return c;
    }
    public static multiply(a: Vector3D, b: Vector3D | number, c?: Vector3D) {
        c = c || new Vector3D();
        if (b instanceof Vector3D) { c.X = a.X * b.X; c.Y = a.Y * b.Y; c.Z = a.Z * b.Z; }
        else { c.X = a.X * b; c.Y = a.Y * b; c.Z = a.Z * b; }
        return c;
    }
    public static divide(a: Vector3D, b: Vector3D | number, c?: Vector3D) {
        c = c || new Vector3D();
        if (b instanceof Vector3D) { c.X = a.X / b.X; c.Y = a.Y / b.Y; c.Z = a.Z / b.Z; }
        else { c.X = a.X / b; c.Y = a.Y / b; c.Z = a.Z / b; }
        return c;
    }
    public static cross(a: Vector3D, b: Vector3D, c?: Vector3D) {
        c = c || new Vector3D();
        c.X = a.Y * b.Z - a.Z * b.Y;
        c.Y = a.Z * b.X - a.X * b.Z;
        c.Z = a.X * b.Y - a.Y * b.X;
        return c;
    }
    public static unit(a: Vector3D, b: Vector3D) {
        const length = a.length();
        b.X = a.X / length;
        b.Y = a.Y / length;
        b.Z = a.Z / length;
        return b;
    }
    public static fromBearing(angle: number, length: number) {
        return new Vector3D(
            length * Math.cos(angle),
            length * Math.sin(angle),
        );
    }
    public static fromAngles(theta: number, phi: number) {
        return new Vector3D(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
    }
    public static randomDirection() {
        return Vector3D.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
    }
    public static min(a: Vector3D, b: Vector3D) {
        return new Vector3D(Math.min(a.X, b.X), Math.min(a.Y, b.Y), Math.min(a.Z, b.Z));
    }
    public static max(a: Vector3D, b: Vector3D) {
        return new Vector3D(Math.max(a.X, b.X), Math.max(a.Y, b.Y), Math.max(a.Z, b.Z));
    }
    public static lerp(a: Vector3D, b: Vector3D, fraction: number) {
        return b.subtract(a).multiply(fraction).add(a);
    }
    public static fromArray(a: number[]) {
        return new Vector3D(a[0], a[1], a[2]);
    }
    public static angleBetween(a: Vector3D, b: Vector3D) {
        return a.angleTo(b);
    }

    public negative() {
        return new Vector3D(-this.X, -this.Y, -this.Z);
    }
    public add(v: Vector3D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector3D) return new Vector3D(this.X + v.X, this.Y + v.Y, this.Z + v.Z);
        // tslint:disable-next-line:curly
        else return new Vector3D(this.X + v, this.Y + v, this.Z + v);
    }
    public subtract(v: Vector3D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector3D) return new Vector3D(this.X - v.X, this.Y - v.Y, this.Z - v.Z);
        // tslint:disable-next-line:curly
        else return new Vector3D(this.X - v, this.Y - v, this.Z - v);
    }
    public multiply(v: Vector3D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector3D) return new Vector3D(this.X * v.X, this.Y * v.Y, this.Z * v.Z);
        // tslint:disable-next-line:curly
        else return new Vector3D(this.X * v, this.Y * v, this.Z * v);
    }
    public divide(v: Vector3D | number) {
        // tslint:disable-next-line:curly
        if (v instanceof Vector3D) return new Vector3D(this.X / v.X, this.Y / v.Y, this.Z / v.Z);
        // tslint:disable-next-line:curly
        else return new Vector3D(this.X / v, this.Y / v, this.Z / v);
    }
    public equals(v: Vector3D): boolean {
        return this.X === v.X && this.Y === v.Y && this.Z === v.Z;
    }
    public dot(v: Vector3D): number {
        return this.X * v.X + this.Y * v.Y + this.Z * v.Z;
    }
    public cross(v: Vector3D): Vector3D {
        return new Vector3D(
            this.Y * v.Z - this.Z * v.Y,
            this.Z * v.X - this.X * v.Z,
            this.X * v.Y - this.Y * v.X,
        );
    }
    public magnitude(){
        return this.length();
    }
    public length() {
        return Math.sqrt(this.dot(this));
    }
    public unit() {
        return this.divide(this.length());
    }
    public min() {
        return Math.min(Math.min(this.X, this.Y), this.Z);
    }
    public max() {
        return Math.max(Math.max(this.X, this.Y), this.Z);
    }
    public toAngles() {
        return {
            theta: Math.atan2(this.Z, this.X),
            // tslint:disable-next-line:object-literal-sort-keys
            phi: Math.asin(this.Y / this.length()),
        };
    }
    public angleTo(a: Vector3D) {
        return Math.acos(this.dot(a) / (this.length() * a.length()));
    }
    public areaOfTriangle(a: Vector3D) {
        const c = this.cross(a).magnitude();
        return 0.5 * c;
    }
    public volumeOfVectors(a: Vector3D, b: Vector3D) {
        const v = Math.abs(this.cross(b).dot(a));
        return (1 / 6) * v;
    }
    public toArray(n?: number) {
        return [this.X, this.Y, this.Z].slice(0, n || 3);
    }
    public clone() {
        return new Vector3D(this.X, this.Y, this.Z);
    }
    private init(x: number, y: number, z: number) {
        this.X = x; this.Y = y; this.Z = z;
        return this;
    }
}
