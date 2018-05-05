import "jest";
import { BigNumber } from "../../../src/computation/index";

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
        describe("BigNumber", async () => {
            it("checks add", async () => {
                expect.assertions(1);
                const bn = new BigNumber(5);
                expect(bn.add(1).toString()).toEqual("6");
            });
            it("checks add for very long numbers", async () => {
                expect.assertions(1);
                const bn = new BigNumber("999999999999999999999999999999");
                expect(bn.add("99999999999999999999999999999999991").toString())
                    .toEqual("1.0000099999999999999999999999999999e+35");
            });
            it("checks minus", async () => {
                expect.assertions(1);
                const bn = new BigNumber(5);
                expect(bn.minus(2).toString()).toEqual("3");
            });
            it("checks multiply", async () => {
                expect.assertions(1);
                const bn = new BigNumber(5);
                expect(bn.mul(2).toString()).toEqual("10");
            });
            it("checks divide", async () => {
                expect.assertions(1);
                const bn = new BigNumber(10);
                expect(bn.div(2).toString()).toEqual("5");
            });
            it("checks pow", async () => {
                expect.assertions(1);
                const bn = new BigNumber(5);
                expect(bn.pow(2).toString()).toEqual("25");
            });
            it("checks max", async () => {
                expect.assertions(1);
                const bn = BigNumber.max(new BigNumber(5), new BigNumber(15), new BigNumber(6));
                expect(bn.toString()).toEqual("15");
            });
        });
    });
});
