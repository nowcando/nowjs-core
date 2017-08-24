import "jest";
import { ComplexNumber } from "../../../src/computation/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Computation", async () => {
    describe("Math", async () => {
        describe("ComplexNumber", async () => {
            it("checks parse", async () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse("2+3i");
                expect(cn.Real).toEqual(2);
                expect(cn.Imaginary).toEqual(3);
            });
            it("checks add", async () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse("2+3i").add("3+4i");
                expect(cn.Real).toEqual(5);
                expect(cn.Imaginary).toEqual(7);
            });
            it("checks subtract", async () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse("2+3i").subtract("3+5i");
                expect(cn.Real).toEqual(-1);
                expect(cn.Imaginary).toEqual(-2);
            });
            it("checks multiply", async () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse("1+i").multiply("3+5i");
                expect(cn.Real).toEqual(-2);
                expect(cn.Imaginary).toEqual(8);
            });
            it("checks divide", async () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse("10-5i").divide("1+i");
                expect(cn.Real).toEqual(2.5);
                expect(cn.Imaginary).toEqual(-7.5);
            });
            it("checks pow", async () => {
                expect.assertions(2);
                const cn = ComplexNumber.parse("1+i").pow(3);
                expect(cn.Real).toEqual(-2);
                expect(cn.Imaginary).toEqual(2);
            });
            it("checks abs", async () => {
                expect.assertions(1);
                const cn = ComplexNumber.parse("2+5i").abs();
                expect(cn).toEqual(5.385164807134504);
            });
        });
    });
});
