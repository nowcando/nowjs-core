import "jest";
import { Claim, ScopeClaim } from "../../../src/security/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("ScopeClaim", async () => {

  it("checks construct ScopeClaim", async () => {
    expect.assertions(2);
    const sc = new ScopeClaim("roles",
      [new Claim("role", "admin"), new Claim("role", "customer")]);
    expect(sc.Claims.length).toEqual(2);
    expect(sc.Name).toEqual("roles");
  });
  it("checks toJSON ScopeClaim", async () => {
    expect.assertions(1);
    const sc = new ScopeClaim("roles",
      [new Claim("role", "admin"), new Claim("role", "customer")]);
    expect(sc.toJSON()).toEqual({
      roles: [
        { Value: "admin", Type: "role", ValueType: "string" },
        { Value: "customer", Type: "role", ValueType: "string" },
      ],
    });
  });
  it("checks JSON.stringify() claims", async () => {
    expect.assertions(1);
    const sc = new ScopeClaim("roles",
      [new Claim("role", "admin"), new Claim("role", "customer")]);
    // tslint:disable-next-line:max-line-length
    expect(JSON.stringify(sc)).toEqual(`{"roles":[{"Value":"admin","Type":"role","ValueType":"string"},{"Value":"customer","Type":"role","ValueType":"string"}]}`);
  });
});
