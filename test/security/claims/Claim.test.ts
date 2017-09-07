import "jest";
import { Claim } from "../../../src/security/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Claim", async () => {

  it("checks construct claims", async () => {
    expect.assertions(2);
    const claim = new Claim("role", "admin");
    expect(claim.Type).toEqual("role") ;
    expect(claim.Value).toEqual("admin") ;
  });
  it("checks toJSON claims", async () => {
    expect.assertions(1);
    const claim = new Claim("role", "admin");
    expect(claim.toJSON()).toEqual({Value: "admin", Type: "role", ValueType: "string"}) ;
  });
  it("checks JSON.stringify() claims", async () => {
    expect.assertions(1);
    const claim = new Claim("role", "admin");
    expect(JSON.stringify(claim)).toEqual(`{"Value":"admin","Type":"role","ValueType":"string"}`) ;
  });
});
