import "jest";
import "../../../src/";

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
        it("clamp", async () => {
            expect.assertions(3);
            const actual1 = Math.clamp(10, 5, 20);
            const actual2 = Math.clamp(250, 5, 200);
            const actual3 = Math.clamp(1, 5, 200);
            expect(actual1).toEqual(10);
            expect(actual2).toEqual(200);
            expect(actual3).toEqual(5);
        });
        it("scale", async () => {
            expect.assertions(1);
            const actual = Math.scale(10, 5, 20, 10, 40);
            expect(actual).toEqual(20);
        });
        it("fscale", async () => {
            expect.assertions(1);
            const actual = Math.fscale(10, 5, 20, 10, 40);
            expect(actual).toEqual(20);
        });
        it("degrees", async () => {
            expect.assertions(1);
            const actual = Math.degrees(Math.PI / 2);
            expect(actual).toEqual(90);
        });
        it("radians", async () => {
            expect.assertions(1);
            const actual = Math.radians(90);
            expect(actual).toEqual(Math.PI / 2);
        });
    });
});
