import "jest";
import "../../src/";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Set",  () => {

    it("union",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const actual1 = setA.union(setB).toArray();
        expect(actual1.length).toEqual(7);
        expect(actual1).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it("intersect",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const actual1 = setA.intersect(setB).toArray();
        expect(actual1.length).toEqual(3);
        expect(actual1).toEqual([3, 4, 2]);
    });

    it("except",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const actual1 = setA.except(setB).toArray();
        expect(actual1.length).toEqual(2);
        expect(actual1).toEqual([1 , 5]);
    });

    it("xor",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const actual1 = setA.xor(setB).toArray();
        expect(actual1.length).toEqual(4);
        expect(actual1).toEqual([1 , 5 , 6, 7]);
    });

    it("isSubSetOf",  () => {
        expect.assertions(3);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const setC = new Set<number>([3, 4, 2, 1, 5 , 8]);
        const setD = new Set<number>([]);
        const actual1 = setA.isSubSetOf(setB);
        const actual2 = setA.isSubSetOf(setC);
        const actual3 = setD.isSubSetOf(setC);
        expect(actual1).toEqual(false);
        expect(actual2).toEqual(true);
        expect(actual3).toEqual(true);
    });

    it("isSuperSetOf",  () => {
        expect.assertions(3);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const setC = new Set<number>([3, 4, 2, 1, 5 , 8]);
        const setD = new Set<number>([]);
        const actual1 = setA.isSuperSetOf(setB);
        const actual2 = setC.isSuperSetOf(setA);
        const actual3 = setD.isSuperSetOf(setC);
        expect(actual1).toEqual(false);
        expect(actual2).toEqual(true);
        expect(actual3).toEqual(false);
    });

    it("join",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>([3, 4, 2, 6, 7]);
        const actual1 = setA.join();
        const actual2 = setB.join("");
        expect(actual1).toEqual("1 , 2 , 3 , 4 , 5");
        expect(actual2).toEqual("34267");
    });

    it("isEmpty",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>();
        const actual1 = setA.isEmpty();
        const actual2 = setB.isEmpty();
        expect(actual1).toEqual(false);
        expect(actual2).toEqual(true);
    });

    it("filter",  () => {
        expect.assertions(2);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>();
        const actual1 = setA.filter((xx) => xx >= 3).toArray();
        expect(actual1.length).toEqual(3);
        expect(actual1).toEqual([3, 4, 5]);
    });
    it("find",  () => {
        expect.assertions(1);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>();
        const actual1 = setA.find((xx) => xx === 3);
        expect(actual1).toEqual(3);
    });
    it("every",  () => {
        expect.assertions(1);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>();
        const actual1 = setA.every((xx) => xx >= 1 );
        expect(actual1).toEqual(true);
    });
    it("some",  () => {
        expect.assertions(1);
        const setA = new Set<number>([1, 2, 3, 4, 5]);
        const setB = new Set<number>();
        const actual1 = setA.some((xx) => xx <= 2);
        expect(actual1).toEqual(true);
    });
});
