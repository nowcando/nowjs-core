import "jest";
import { NumericSquareMatrix } from "../../../src/computation/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Computation",  () => {
    describe("Math",  () => {
        describe("NumericSquareMatrix",  () => {
            it("checks addition matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix( 3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix2 = new NumericSquareMatrix( 3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.add(matrix2);
                expect(matrix3.get(0, 0)).toEqual(2);
                expect(matrix3.get(0, 1)).toEqual(4);
                expect(matrix3.get(0, 2)).toEqual(6);
                expect(matrix3.get(1, 0)).toEqual(8);
                expect(matrix3.get(1, 1)).toEqual(10);
                expect(matrix3.get(1, 2)).toEqual(12);
                expect(matrix3.get(2, 0)).toEqual(14);
                expect(matrix3.get(2, 1)).toEqual(16);
                expect(matrix3.get(2, 2)).toEqual(18);
            });
            it("checks subtract matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix2 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.subtract(matrix2);
                expect(matrix3.get(0, 0)).toEqual(0);
                expect(matrix3.get(0, 1)).toEqual(0);
                expect(matrix3.get(0, 2)).toEqual(0);
                expect(matrix3.get(1, 0)).toEqual(0);
                expect(matrix3.get(1, 1)).toEqual(0);
                expect(matrix3.get(1, 2)).toEqual(0);
                expect(matrix3.get(2, 0)).toEqual(0);
                expect(matrix3.get(2, 1)).toEqual(0);
                expect(matrix3.get(2, 2)).toEqual(0);
            });
            it("checks multiply matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3,  [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix2 = new NumericSquareMatrix(3,  [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.multiply(matrix2);
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(4);
                expect(matrix3.get(0, 2)).toEqual(9);
                expect(matrix3.get(1, 0)).toEqual(16);
                expect(matrix3.get(1, 1)).toEqual(25);
                expect(matrix3.get(1, 2)).toEqual(36);
                expect(matrix3.get(2, 0)).toEqual(49);
                expect(matrix3.get(2, 1)).toEqual(64);
                expect(matrix3.get(2, 2)).toEqual(81);
            });
            it("checks division matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix2 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.divide(matrix2);
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(1);
                expect(matrix3.get(0, 2)).toEqual(1);
                expect(matrix3.get(1, 0)).toEqual(1);
                expect(matrix3.get(1, 1)).toEqual(1);
                expect(matrix3.get(1, 2)).toEqual(1);
                expect(matrix3.get(2, 0)).toEqual(1);
                expect(matrix3.get(2, 1)).toEqual(1);
                expect(matrix3.get(2, 2)).toEqual(1);
            });
            it("checks dotProduct matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix2 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.dotProduct(matrix2);
                expect(matrix3.get(0, 0)).toEqual(30);
                expect(matrix3.get(0, 1)).toEqual(36);
                expect(matrix3.get(0, 2)).toEqual(42);
                expect(matrix3.get(1, 0)).toEqual(66);
                expect(matrix3.get(1, 1)).toEqual(81);
                expect(matrix3.get(1, 2)).toEqual(96);
                expect(matrix3.get(2, 0)).toEqual(102);
                expect(matrix3.get(2, 1)).toEqual(126);
                expect(matrix3.get(2, 2)).toEqual(150);
            });
            it("checks transpose matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.transpose();
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(4);
                expect(matrix3.get(0, 2)).toEqual(7);
                expect(matrix3.get(1, 0)).toEqual(2);
                expect(matrix3.get(1, 1)).toEqual(5);
                expect(matrix3.get(1, 2)).toEqual(8);
                expect(matrix3.get(2, 0)).toEqual(3);
                expect(matrix3.get(2, 1)).toEqual(6);
                expect(matrix3.get(2, 2)).toEqual(9);
            });
            it("checks diagonal matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.diagonal();
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(0);
                expect(matrix3.get(0, 2)).toEqual(0);
                expect(matrix3.get(1, 0)).toEqual(0);
                expect(matrix3.get(1, 1)).toEqual(5);
                expect(matrix3.get(1, 2)).toEqual(0);
                expect(matrix3.get(2, 0)).toEqual(0);
                expect(matrix3.get(2, 1)).toEqual(0);
                expect(matrix3.get(2, 2)).toEqual(9);
            });
            it("checks upperTriangular matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.upperTriangular();
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(2);
                expect(matrix3.get(0, 2)).toEqual(3);
                expect(matrix3.get(1, 0)).toEqual(0);
                expect(matrix3.get(1, 1)).toEqual(5);
                expect(matrix3.get(1, 2)).toEqual(6);
                expect(matrix3.get(2, 0)).toEqual(0);
                expect(matrix3.get(2, 1)).toEqual(0);
                expect(matrix3.get(2, 2)).toEqual(9);
            });
            it("checks lowerTriangular matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                const matrix3 = matrix1.lowerTriangular();
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(0);
                expect(matrix3.get(0, 2)).toEqual(0);
                expect(matrix3.get(1, 0)).toEqual(4);
                expect(matrix3.get(1, 1)).toEqual(5);
                expect(matrix3.get(1, 2)).toEqual(0);
                expect(matrix3.get(2, 0)).toEqual(7);
                expect(matrix3.get(2, 1)).toEqual(8);
                expect(matrix3.get(2, 2)).toEqual(9);
            });
            it("checks negative matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [-4, 5, 6], [7, -8, 9]);
                const matrix3 = matrix1.negative();
                expect(matrix3.get(0, 0)).toEqual(-1);
                expect(matrix3.get(0, 1)).toEqual(-2);
                expect(matrix3.get(0, 2)).toEqual(-3);
                expect(matrix3.get(1, 0)).toEqual(4);
                expect(matrix3.get(1, 1)).toEqual(-5);
                expect(matrix3.get(1, 2)).toEqual(-6);
                expect(matrix3.get(2, 0)).toEqual(-7);
                expect(matrix3.get(2, 1)).toEqual(8);
                expect(matrix3.get(2, 2)).toEqual(-9);
            });
            it("checks inverse matrix",  () => {
                expect.assertions(9);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 4], [9, 5, 6], [-5, 2, -3]);
                const matrix3 = matrix1.inverse();
                expect(matrix3.get(0, 0)).toEqual(-27 / 139);
                expect(matrix3.get(0, 1)).toEqual(14 / 139);
                expect(matrix3.get(0, 2)).toEqual(-8 / 139);

                expect(matrix3.get(1, 0)).toEqual(-3 / 139);
                expect(matrix3.get(1, 1)).toEqual(17 / 139);
                expect(matrix3.get(1, 2)).toEqual(30 / 139);

                expect(matrix3.get(2, 0)).toEqual(43 / 139);
                expect(matrix3.get(2, 1)).toEqual(-12 / 139);
                expect(matrix3.get(2, 2)).toEqual(-13 / 139);
            });
            it("checks inverse matrix should return error cause determinant is zero",  () => {
                expect.assertions(1);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
                try {
                    const matrix3 = matrix1.inverse();
                } catch (error) {
                    expect(error).not.toEqual(null);
                }
            });
            it("checks determinant matrix",  () => {
                expect.assertions(1);
                const matrix1 = new NumericSquareMatrix(3, [1, 2, 4], [9, 5, 6], [-5, 2, -3]);
                const det = matrix1.determinant();
                expect(det).toEqual(139);
            });
        });
    });
});
