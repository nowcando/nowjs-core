import "jest";
import { uuid } from "../../src/utils/index";

// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("UUID tests", async () => {

  it("checks generate uuid version 4", async () => {
    expect.assertions(1);
    const actual = uuid();
    expect(actual.length).toEqual(36) ;
  });

});
