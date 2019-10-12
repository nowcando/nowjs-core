import "jest";
import { uuid, uuidv1 } from "../../src/utils/index";

// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("UUID tests",  () => {

  it("checks generate uuid version 4",  () => {
    expect.assertions(1);
    const actual = uuid();
    expect(actual.length).toEqual(36) ;
  });

  it("checks generate uuid version 1",  () => {
    expect.assertions(1);
    const actual = uuidv1();
    expect(actual.length).toEqual(36) ;
  });

});
