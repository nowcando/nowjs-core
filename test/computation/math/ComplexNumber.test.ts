import 'jest';
import { ComplexNumber } from '../../../src/computation/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Computation', () => {
    describe('Math', () => {
        describe('ComplexNumber', () => {
            it('checks parse', () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse('2+3i');
                expect(cn.Real).toEqual(2);
                expect(cn.Imaginary).toEqual(3);
            });
            it('checks add', () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse('2+3i').add('3+4i');
                expect(cn.Real).toEqual(5);
                expect(cn.Imaginary).toEqual(7);
            });
            it('checks subtract', () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse('2+3i').subtract('3+5i');
                expect(cn.Real).toEqual(-1);
                expect(cn.Imaginary).toEqual(-2);
            });
            it('checks multiply', () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse('1+i').multiply('3+5i');
                expect(cn.Real).toEqual(-2);
                expect(cn.Imaginary).toEqual(8);
            });
            it('checks divide', () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse('10-5i').divide('1+i');
                expect(cn.Real).toEqual(2.5);
                expect(cn.Imaginary).toEqual(-7.5);
            });
            it('checks pow', () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse('1+i').pow(3);
                expect(cn.Real).toEqual(-2);
                expect(cn.Imaginary).toEqual(2);
            });
            it('checks abs', () => {
                expect.assertions(1);
                const cn = ComplexNumber.parse('2+5i').abs();
                expect(cn).toEqual(5.385164807134504);
            });
        });
    });
});
