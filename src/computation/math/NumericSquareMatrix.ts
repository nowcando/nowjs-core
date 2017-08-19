
import { Exception } from "../../exceptions/index";
import { NumericMatrix } from "./index";
import { NumericIdentityMatrix } from "./NumericIdentityMatrix";

export class NumericSquareMatrix extends NumericMatrix {
    private identity: NumericIdentityMatrix;
    constructor(size: number = 2, ...rows: number[][]) {
        super(size, size, ...rows);
        this.identity = new NumericIdentityMatrix();
    }
    public get Identity(): NumericIdentityMatrix {
        return this.identity;
    }

    public determinant(): number {
        if (this.RowSize === 1) {
            return this.arr[1][1];
        } else if (this.RowSize === 2) {
            return (this.arr[1][1] * this.arr[2][2] - this.arr[1][2] * this.arr[2][1]);
        } else {
            return this.determinantInternal(this.arr, this.RowSize);
        }
    }

    public inverse(): NumericSquareMatrix {
        let arr2: number[][] = [];
        const det = this.determinant();
        if (det === 0) {
            throw new Exception("Matrix inverse failed because determinant is zero .");
        }
        arr2 = this.cofactorInternal(this.arr, this.RowSize);
        const inverted = new NumericSquareMatrix(this.RowSize, ...arr2);
        return inverted;
    }

    public diagonal(): NumericSquareMatrix {
        const arr2: number[][] = [];
        for (let i = 0; i < this.RowSize; i++) {
            arr2.push([]);
            for (let j = 0; j < this.ColSize; j++) {
                if (i !== j) {
                    arr2[i][j] = 0;
                } else { arr2[i][j] = this.arr[i][j]; }

            }

        }
        const mat = new NumericSquareMatrix(this.RowSize, ...arr2);
        return mat;
    }

    public diagonalValues(): number[] {
        const arr2: number[] = [];
        for (let i = 0; i < this.RowSize; i++) {
            for (let j = 0; j < this.ColSize; j++) {
                if (i === j) {
                    arr2[i] = this.arr[i][j];
                }
            }

        }
        return arr2;
    }

    public upperTriangular(): NumericSquareMatrix {
        const arr2: number[][] = [];
        for (let i = 0; i < this.RowSize; i++) {
            arr2.push([]);
            for (let j = 0; j < this.ColSize; j++) {
                if (i > j) {
                    arr2[i][j] = 0;
                } else { arr2[i][j] = this.arr[i][j]; }

            }

        }
        const trian = new NumericSquareMatrix(this.RowSize, ...arr2);
        return trian;
    }

    public lowerTriangular(): NumericSquareMatrix {
        const arr2: number[][] = [];
        for (let i = 0; i < this.RowSize; i++) {
            arr2.push([]);
            for (let j = 0; j < this.ColSize; j++) {
                if (i < j) {
                    arr2[i][j] = 0;
                } else {arr2[i][j] = this.arr[i][j];  }

            }
        }
        const trian = new NumericSquareMatrix(this.RowSize, ...arr2);
        return trian;
    }

    /*For calculating Determinant of the Matrix */
    private determinantInternal(a: number[][], size: number): number {
        // tslint:disable-next-line:one-variable-per-declaration
        let s = 1, det = 0, m = 0, n = 0;
        const b: number[][] = [];
        if (size === 1) {
            return (a[0][0]);
        } else {
            det = 0;
            for (let c = 0; c < size; c++) {
                m = 0;
                n = 0;
                for (let i = 0; i < size; i++) {
                    b.push([]);
                    for (let j = 0; j < size; j++) {
                        b[i][j] = 0;
                        if (i !== 0 && j !== c) {
                            b[m][n] = a[i][j];
                            if (n < (size - 2)) {
                                n++;
                            } else {
                                n = 0;
                                m++;
                            }
                        }
                    }
                }
                det = det + s * (a[0][c] * this.determinantInternal(b, size - 1));
                s = -1 * s;
            }
        }

        return (det);
    }

    private cofactorInternal(num: number[][], f: number): number[][] {
        const b: number[][] = [];
        const fac: number[][] = [];
        // tslint:disable-next-line:one-variable-per-declaration
        let m = 0, n = 0;
        for (let q = 0; q < f; q++) {
            fac.push([]);
            for (let p = 0; p < f; p++) {
                m = 0;
                n = 0;
                for (let i = 0; i < f; i++) {
                    b.push([]);
                    for (let j = 0; j < f; j++) {
                        if (i !== q && j !== p) {
                            b[m][n] = num[i][j];
                            if (n < (f - 2)) {
                                n++;
                            } else {
                                n = 0;
                                m++;
                            }
                        }
                    }
                }
                fac[q][p] = Math.pow(-1, q + p) * this.determinantInternal(b, f - 1);
            }
        }
        return this.transposeInternal(num, fac, f);
    }

    private transposeInternal(num: number[][], fac: number[][], r: number): number[][] {
        let d = 0;
        const b: number[][] = []; const inverse: number[][] = [];

        for (let i = 0; i < r; i++) {
            b.push([]);
            for (let j = 0; j < r; j++) {
                b[i][j] = fac[j][i];
            }
        }
        d = this.determinantInternal(num, r);
        for (let i = 0; i < r; i++) {
            inverse.push([]);
            for (let j = 0; j < r; j++) {
                inverse[i][j] = b[i][j] / d;
            }
        }
        return inverse;
    }

}
