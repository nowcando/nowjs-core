import "jest";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Claim Tests", async () => {

  it("checks claims", async () => {
    expect.assertions(1);
    const length = 6;
    expect(length).toEqual(6) ;
  });

});
