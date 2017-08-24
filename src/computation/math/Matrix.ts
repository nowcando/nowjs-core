
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
    public getElement(row: number, col: number) {
        this.checkIndexes(row, col);
        return this.arr[row][col];
    }
    public getSize(): number[] {
        return [this.rowSize, this.colSize];
    }
    public get(row?: number, col?: number): T | T[] {
        if (!col && col !== 0) {
            return this.getRow(row);
        } else if (row || row === 0) {
            return this.getElement(row, col);
        } else {
            return this.getColumn(col);
        }
    }
    public getColumn(col: number): T[] {
        const arrs: T[] = [];
        this.checkColumnIndex(col);
        for (const row of this.arr) {
            arrs.push(row[col]);
        }
        return arrs;
    }
    public getRow(row: number): T[] {
        this.checkRowIndex(row);
        return this.arr[row];
    }
    public forEachRow(fn: (index: number, item: T[], items: T[][]) => void) {
        if (typeof fn === "function") {
            for (let i = 0, len = this.arr.length; i < len; i++) {
                fn(i, this.arr[i], this.arr);
            }
        }
        return this;
    }
    public replaceEachRow(fn: (index: number, item: T[], items: T[][]) => void) {
        let newRow;
        if (typeof fn === "function") {
            for (let i = 0, len = this.arr.length; i < len; i++) {
                newRow = fn(i, this.arr[i], this.arr);
                if (newRow && Array.isArray(newRow)) {
                    this.arr[i] = newRow;
                    newRow = null;
                }
            }
        }
        return this;
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
    protected checkColumnIndex(col: number): void {
        if (col >= this.colSize || col < 0) {
            throw new Exception("Col index is out of range.");
        }
    }
    protected checkRowIndex(row: number): void {
        if (row >= this.rowSize || row < 0) {
            throw new Exception("Row index is out of range.");
        }
    }
    protected checkIndexes(row: number, col: number): void {
        this.checkColumnIndex(col);
        this.checkRowIndex(row);
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
