
import { Exception } from "../../exceptions/index";

export class Matrix<T> implements Iterable<T> {
    protected arr: T[][];
    constructor(private rowSize: number = 2, private colSize: number = 2, ...rows: T[][]) {
        this.init(rowSize, colSize, ...rows);
    }

    public get IsSquare(): boolean {
        return this.colSize === this.rowSize;
    }
    public get ColSize(): number {
        return this.colSize;
    }
    public get RowSize(): number {
        return this.rowSize;
    }
    public set(value: T, row: number, col: number) {
        this.checkIndexes(row, col);
        this.arr[row][col] = value;
    }
    public get(row: number, col: number): T {
        this.checkIndexes(row, col);
        return this.arr[row][col];
    }
    public [Symbol.iterator](): IterableIterator<T> {
        // tslint:disable-next-line:one-variable-per-declaration
        const itr = {
            [Symbol.iterator]: () => {
                // tslint:disable-next-line:one-variable-per-declaration
                let row = 0, col = -1;
                return {
                    // tslint:disable-next-line:no-empty
                    next: () => {

                        if (col > this.colSize) {
                            row++;
                            col = -1;
                        }
                        col++;
                        if (row > this.rowSize) {
                            return { value: this.arr[row][col], done: true };
                        }
                        return { value: this.arr[row][col], done: false };
                    },

                };
            },
        };
        return itr as IterableIterator<T>;
    }
    public rotateLeft(times: number): Matrix<T> {
        return this;
    }
    public rotateRight(times: number): Matrix<T> {
        return this;
    }
    public reverse(): Matrix<T> {
        return this;
    }
    public transpose(): Matrix<T> {
        const arr2 = this.arr && this.arr.length && this.arr[0].map &&
          Object.keys(this.arr[0]).map((_, c) => {
                return this.arr.map((r) => r[c]);
            }) || [];
        return new Matrix(this.colSize, this.rowSize, ...arr2);
    }
    public toArray(): T[][] {
       const arr = []; // array of rows
       for (let i = 0; i < this.rowSize; i++) {
        arr.push([]); // array of columns
        for (let j = 0; j < this.colSize; j++) {
            arr[i].push(this.arr[i] ? this.arr[i][j] : undefined);
        }
      }
       return arr;
    }

    protected swapValues(firstRow: number, firstCol: number, secondRow: number, secondCol: number) {
        this.checkIndexes(firstRow, firstCol);
        this.checkIndexes(secondRow, secondCol);
        const temp = this.arr[firstRow][firstCol]; // assign first to temp
        this.arr[firstRow][firstCol] = this.arr[secondRow][secondCol]; // assign second to first
        this.arr[secondRow][secondCol] = temp; // assign temp to second
    }
    protected checkIndexes(row: number, col: number): void {
        if (row >= this.rowSize || row < 0) {
            throw new Exception("Row index is out of range");
        }
        if (col >= this.colSize || col < 0) {
            throw new Exception("Col index is out of range");
        }
    }
    private init(rowSize: number, colSize: number, ...rows: T[][]): void {
        this.arr = []; // array of rows
        this.rowSize = rowSize;
        this.colSize = colSize;
        for (let i = 0; i < rowSize; i++) {
            this.arr.push([]); // array of columns
            for (let j = 0; j < colSize; j++) {
                this.arr[i].push(rows[i] ? rows[i][j] : undefined);
            }
        }
    }
}
