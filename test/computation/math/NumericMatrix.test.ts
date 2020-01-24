import 'jest';
import { NumericMatrix } from '../../../src/computation/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Computation', () => {
    describe('Math', () => {
        describe('NumericMatrix', () => {
            it('checks addition matrix', () => {
                expect.assertions(6);
                const matrix1 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix2 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix3 = matrix1.add(matrix2);
                expect(matrix3.get(0, 0)).toEqual(2);
                expect(matrix3.get(0, 1)).toEqual(4);
                expect(matrix3.get(0, 2)).toEqual(6);
                expect(matrix3.get(1, 0)).toEqual(8);
                expect(matrix3.get(1, 1)).toEqual(10);
                expect(matrix3.get(1, 2)).toEqual(12);
            });
            it('checks subtract matrix', () => {
                expect.assertions(6);
                const matrix1 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix2 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix3 = matrix1.subtract(matrix2);
                expect(matrix3.get(0, 0)).toEqual(0);
                expect(matrix3.get(0, 1)).toEqual(0);
                expect(matrix3.get(0, 2)).toEqual(0);
                expect(matrix3.get(1, 0)).toEqual(0);
                expect(matrix3.get(1, 1)).toEqual(0);
                expect(matrix3.get(1, 2)).toEqual(0);
            });
            it('checks multiply matrix', () => {
                expect.assertions(6);
                const matrix1 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix2 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix3 = matrix1.multiply(matrix2);
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(4);
                expect(matrix3.get(0, 2)).toEqual(9);
                expect(matrix3.get(1, 0)).toEqual(16);
                expect(matrix3.get(1, 1)).toEqual(25);
                expect(matrix3.get(1, 2)).toEqual(36);
            });
            it('checks division matrix', () => {
                expect.assertions(6);
                const matrix1 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix2 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix3 = matrix1.divide(matrix2);
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(1);
                expect(matrix3.get(0, 2)).toEqual(1);
                expect(matrix3.get(1, 0)).toEqual(1);
                expect(matrix3.get(1, 1)).toEqual(1);
                expect(matrix3.get(1, 2)).toEqual(1);
            });
            it('checks dotProduct matrix', () => {
                expect.assertions(4);
                const matrix1 = new NumericMatrix(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix2 = new NumericMatrix(3, 2, [7, 8], [9, 10], [11, 12]);
                const matrix3 = matrix1.dotProduct(matrix2);
                expect(matrix3.get(0, 0)).toEqual(58);
                expect(matrix3.get(0, 1)).toEqual(64);
                expect(matrix3.get(1, 0)).toEqual(139);
                expect(matrix3.get(1, 1)).toEqual(154);
            });
            it('checks negative matrix', () => {
                expect.assertions(6);
                const matrix1 = new NumericMatrix(2, 3, [1, 2, 3], [-4, 5, 6]);
                const matrix3 = matrix1.negative();
                expect(matrix3.get(0, 0)).toEqual(-1);
                expect(matrix3.get(0, 1)).toEqual(-2);
                expect(matrix3.get(0, 2)).toEqual(-3);
                expect(matrix3.get(1, 0)).toEqual(4);
                expect(matrix3.get(1, 1)).toEqual(-5);
                expect(matrix3.get(1, 2)).toEqual(-6);
            });
        });
    });
});
