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

describe("Map", async () => {

    it("toObject", async () => {
        expect.assertions(4);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.toObject();
        expect(3).toEqual(mp.size);
        expect(actual.name).toEqual(mp.get("name"));
        expect(actual.family).toEqual(mp.get("family"));
        expect(actual.gender).toEqual(mp.get("gender"));
    });
    it("toArray", async () => {
        expect.assertions(4);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.toArray();
        expect(3).toEqual(mp.size);
        expect(actual[0][1]).toEqual(mp.get("name"));
        expect(actual[1][1]).toEqual(mp.get("family"));
        expect(actual[2][1]).toEqual(mp.get("gender"));
    });
    it("toList", async () => {
        expect.assertions(4);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.toList();
        expect(3).toEqual(mp.size);
        expect(actual.get(0)[1]).toEqual(mp.get("name"));
        expect(actual.get(1)[1]).toEqual(mp.get("family"));
        expect(actual.get(2)[1]).toEqual(mp.get("gender"));
    });
    it("containsKey", async () => {
        expect.assertions(2);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.containsKey("family");
        expect(3).toEqual(mp.size);
        expect(actual).toEqual(true);
    });
    it("containsValue", async () => {
        expect.assertions(2);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.containsValue("tabrizi");
        expect(3).toEqual(mp.size);
        expect(actual).toEqual(true);
    });
    it("toKeyList", async () => {
        expect.assertions(2);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.toKeyList().toArray();
        expect(3).toEqual(mp.size);
        expect(actual).toEqual(["name", "family", "gender"]);
    });
    it("toValueList", async () => {
        expect.assertions(2);
        const mp = new Map();
        mp.set("name", "saeed");
        mp.set("family", "tabrizi");
        mp.set("gender", "male");
        const actual = mp.toValueList().toArray();
        expect(3).toEqual(mp.size);
        expect(actual).toEqual(["saeed", "tabrizi", "male"]);
    });
});
