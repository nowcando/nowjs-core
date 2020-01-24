import { Exception } from '../../exceptions/index';
import { Matrix } from './Matrix';

export class NumericMatrix extends Matrix<number> {
    constructor(rowSize = 2, colSize = 2, ...rows: number[][]) {
        super(rowSize, colSize, ...rows);
    }

    public negative(): NumericMatrix {
        const arr2: number[][] = [];
        for (let i = 0; i < this.RowSize; i++) {
            arr2.push([]);
            for (let j = 0; j < this.ColSize; j++) {
                arr2[i][j] = -this.arr[i][j];
            }
        }
        return new NumericMatrix(this.RowSize, this.ColSize, ...arr2);
    }
    public add(other: NumericMatrix | number): NumericMatrix {
        const arr2: number[][] = [];
        if (typeof other === 'number') {
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] + other : this.arr[i][j];
                }
            }
        } else {
            this.checkSchemaEqual(other);
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] + other.arr[i][j] : this.arr[i][j];
                }
            }
        }

        return new NumericMatrix(this.RowSize, this.ColSize, ...arr2);
    }
    public subtract(other: NumericMatrix | number): NumericMatrix {
        const arr2: number[][] = [];
        if (typeof other === 'number') {
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] - other : this.arr[i][j];
                }
            }
        } else {
            this.checkSchemaEqual(other);
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] - other.arr[i][j] : this.arr[i][j];
                }
            }
        }

        return new NumericMatrix(this.RowSize, this.ColSize, ...arr2);
    }
    public multiply(other: NumericMatrix | number): NumericMatrix {
        const arr2: number[][] = [];
        if (typeof other === 'number') {
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] * other : this.arr[i][j];
                }
            }
        } else {
            this.checkSchemaEqual(other);
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] * other.arr[i][j] : this.arr[i][j];
                }
            }
        }

        return new NumericMatrix(this.RowSize, this.ColSize, ...arr2);
    }
    public divide(other: NumericMatrix | number): NumericMatrix {
        const arr2: number[][] = [];
        if (typeof other === 'number') {
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] / other : this.arr[i][j];
                }
            }
        } else {
            this.checkSchemaEqual(other);
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] / other.arr[i][j] : this.arr[i][j];
                }
            }
        }

        return new NumericMatrix(this.RowSize, this.ColSize, ...arr2);
    }
    public power(other: NumericMatrix | number): NumericMatrix {
        const arr2: number[][] = [];
        if (typeof other === 'number') {
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] ** other : this.arr[i][j];
                }
            }
        } else {
            this.checkSchemaEqual(other);
            for (let i = 0; i < this.RowSize; i++) {
                arr2.push([]);
                for (let j = 0; j < this.ColSize; j++) {
                    arr2[i][j] = this.arr[i][j] ? this.arr[i][j] ** other.arr[i][j] : this.arr[i][j];
                }
            }
        }

        return new NumericMatrix(this.RowSize, this.ColSize, ...arr2);
    }
    public dotProduct(other: NumericMatrix): NumericMatrix {
        this.checkDotProduct(other);
        const arr2: number[][] = [];
        for (let srow = 0; srow < this.RowSize; srow++) {
            arr2.push([]);
            for (let ocol = 0; ocol < other.ColSize; ocol++) {
                arr2[srow][ocol] = 0;
                for (let orow = 0; orow < other.RowSize; orow++) {
                    arr2[srow][ocol] += this.arr[srow][orow] * other.arr[orow][ocol];
                }
            }
        }

        return new NumericMatrix(this.RowSize, other.ColSize, ...arr2);
    }

    protected checkSchemaEqual(other: NumericMatrix): void {
        if (this.RowSize !== other.RowSize || this.ColSize !== other.ColSize) {
            throw new Exception('The matrixes schema is not equals');
        }
    }
    protected checkDotProduct(other: NumericMatrix): void {
        if (this.RowSize !== other.ColSize || this.ColSize !== other.RowSize) {
            throw new Exception('The matrixes schema is not equals');
        }
    }
}
