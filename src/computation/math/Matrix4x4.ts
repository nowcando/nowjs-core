import { Vector3D } from './index';
import { NumericSquareMatrix } from './NumericSquareMatrix';

export class Matrix4x4 extends NumericSquareMatrix {
    constructor(...rows: number[][]) {
        super(4, ...rows);
    }
    /**
     * Sets up a viewing frustum,
     *  which is shaped like a truncated pyramid with the camera where the point of the pyramid would be.
     *
     * @param {number} l Left
     * @param {number} r Right
     * @param {number} b Bottom
     * @param {number} t Top
     * @param {number} n Near
     * @param {number} f Far
     * @returns {Matrix4x4}
     * @memberof Matrix4x4
     */
    public frustum(l: number, r: number, b: number, t: number, n: number, f: number): Matrix4x4 {
        const m = this.arr;
        m[0][0] = (2 * n) / (r - l);
        m[0][1] = 0;
        m[0][2] = (r + l) / (r - l);
        m[0][3] = 0;

        m[1][0] = 0;
        m[1][1] = (2 * n) / (t - b);
        m[1][2] = (t + b) / (t - b);
        m[1][3] = 0;

        m[2][0] = 0;
        m[2][1] = 0;
        m[2][2] = -(f + n) / (f - n);
        m[2][3] = (-2 * f * n) / (f - n);

        m[3][0] = 0;
        m[3][1] = 0;
        m[3][2] = -1;
        m[3][3] = 0;

        return this;
    }

    public ortho(l: number, r: number, b: number, t: number, n: number, f: number) {
        const m = this.arr;

        m[0][0] = 2 / (r - l);
        m[0][1] = 0;
        m[0][2] = 0;
        m[0][3] = -(r + l) / (r - l);

        m[1][0] = 0;
        m[1][1] = 2 / (t - b);
        m[1][2] = 0;
        m[1][3] = -(t + b) / (t - b);

        m[2][0] = 0;
        m[2][1] = 0;
        m[2][2] = -2 / (f - n);
        m[2][3] = -(f + n) / (f - n);

        m[3][0] = 0;
        m[3][1] = 0;
        m[3][2] = 0;
        m[3][3] = -1;
        return this;
    }
    public scale(x: number, y: number, z: number): Matrix4x4;
    public scale(vector: Vector3D): Matrix4x4;
    public scale(arg1: number | Vector3D, arg2?: number, arg3?: number) {
        const m = this.arr;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0,
            y = 0,
            z = 0;
        if (arg1 instanceof Vector3D) {
            x = arg1.X;
            y = arg1.Y;
            z = arg1.Z;
        } else {
            x = arg1;
            y = arg2;
            z = arg3;
        }

        m[0][0] = x;
        m[0][1] = 0;
        m[0][2] = 0;
        m[0][3] = 0;

        m[1][0] = 0;
        m[1][1] = y;
        m[1][2] = 0;
        m[1][3] = 0;

        m[2][0] = 0;
        m[2][1] = 0;
        m[2][2] = z;
        m[2][3] = 0;

        m[3][0] = 0;
        m[3][1] = 0;
        m[3][2] = 0;
        m[3][3] = 1;
        return this;
    }
    public translate(x: number, y: number, z: number): Matrix4x4;
    public translate(vector: Vector3D): Matrix4x4;
    public translate(arg1: number | Vector3D, arg2?: number, arg3?: number) {
        const m = this.arr;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0,
            y = 0,
            z = 0;
        if (arg1 instanceof Vector3D) {
            x = arg1.X;
            y = arg1.Y;
            z = arg1.Z;
        } else {
            x = arg1;
            y = arg2;
            z = arg3;
        }

        m[0][0] = 1;
        m[0][1] = 0;
        m[0][2] = 0;
        m[0][3] = x;

        m[1][0] = 0;
        m[1][1] = 1;
        m[1][2] = 0;
        m[1][3] = y;

        m[2][0] = 0;
        m[2][1] = 0;
        m[2][2] = 1;
        m[2][3] = z;

        m[3][0] = 0;
        m[3][1] = 0;
        m[3][2] = 0;
        m[3][3] = 1;
        return this;
    }
    public rotate(a: number, vector: Vector3D): Matrix4x4;
    public rotate(a: number, x: number, y: number, z: number): Matrix4x4;
    public rotate(a: number, arg1: number | Vector3D, arg2?: number, arg3?: number) {
        const m = this.arr;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0,
            y = 0,
            z = 0;
        if (arg1 instanceof Vector3D) {
            x = arg1.X;
            y = arg1.Y;
            z = arg1.Z;
        } else {
            x = arg1;
            y = arg2;
            z = arg3;
        }
        const d = Math.sqrt(x * x + y * y + z * z);
        a *= Math.PI / 180;
        x /= d;
        y /= d;
        z /= d;
        // tslint:disable-next-line:one-variable-per-declaration
        const c = Math.cos(a),
            s = Math.sin(a),
            t = 1 - c;
        m[0][0] = x * x * t + c;
        m[0][1] = x * y * t - z * s;
        m[0][2] = x * z * t + y * s;
        m[0][3] = 0;

        m[1][0] = y * x * t + z * s;
        m[1][1] = y * y * t + c;
        m[1][2] = y * z * t - x * s;
        m[1][3] = 0;

        m[2][0] = z * x * t - y * s;
        m[2][1] = z * y * t + x * s;
        m[2][2] = z * z * t + c;
        m[2][3] = 0;

        m[3][0] = 0;
        m[3][1] = 0;
        m[3][2] = 0;
        m[3][3] = 1;
        return this;
    }
    public lookAt(e: Vector3D, c: Vector3D, u: Vector3D): Matrix4x4 {
        const m = this.arr;

        const f = e.subtract(c).unit();
        const s = u.cross(f).unit();
        const t = f.cross(s).unit();

        m[0][0] = s.X;
        m[0][1] = s.Y;
        m[0][2] = s.Z;
        m[0][3] = -s.dot(e);

        m[1][0] = t.X;
        m[1][1] = t.Y;
        m[1][2] = t.Z;
        m[1][3] = -t.dot(e);

        m[2][0] = f.X;
        m[2][1] = f.Y;
        m[2][2] = f.Z;
        m[2][3] = -f.dot(e);

        m[3][0] = 0;
        m[3][1] = 0;
        m[3][2] = 0;
        m[3][3] = 1;
        return this;
    }
    public perspective(fov: number, aspect: number, near: number, far: number) {
        const result = new Matrix4x4();
        const y = Math.tan((fov * Math.PI) / 360) * near;
        const x = y * aspect;
        return this.frustum(-x, x, -y, y, near, far);
    }
    public transformPoint(v: Vector3D): Vector3D {
        const m = this.arr;
        return new Vector3D(
            m[0][0] * v.X + m[0][1] * v.Y + m[0][2] * v.Z + m[0][3],
            m[1][0] * v.X + [1][1] * v.Y + [1][2] * v.Z + [1][3],
            m[2][0] * v.X + m[2][1] * v.Y + m[2][2] * v.Z + m[2][3],
        ).divide(m[3][0] * v.X + m[3][1] * v.Y + m[3][2] * v.Z + m[3][3]);
    }

    public transformVector(v: Vector3D): Vector3D {
        const m = this.arr;
        return new Vector3D(
            m[0][0] * v.X + m[0][1] * v.Y + m[0][2] * v.Z,
            m[1][0] * v.X + m[1][1] * v.Y + m[1][2] * v.Z,
            m[2][0] * v.X + m[2][1] * v.Y + m[2][2] * v.Z,
        );
    }
    public transpose(): Matrix4x4 {
        /*
        *  0  1  2   3
           4  5  6   7
           8  9  10  11
           12 13 14  15
         */
        const result = new Matrix4x4();
        const m = this.arr;
        const r = result.arr;
        r[0][0] = m[0][0];
        r[0][1] = m[1][0];
        r[0][2] = m[2][0];
        r[0][3] = m[3][0];
        r[1][0] = m[0][1];
        r[1][1] = m[1][1];
        r[1][2] = m[2][1];
        r[1][3] = m[3][1];
        r[2][0] = m[0][2];
        r[2][1] = m[1][2];
        r[2][2] = m[2][2];
        r[2][3] = m[3][2];
        r[3][0] = m[0][3];
        r[3][1] = m[1][3];
        r[3][2] = m[2][3];
        r[3][3] = m[3][3];
        return result;
    }
}
