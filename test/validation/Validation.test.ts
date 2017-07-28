import "jest";

import { JsonSchemaDefinition } from "../../src/utils/index";
import { isEmail, isMobile, isPhone,
  isRequired, isUrl, MaxValidator,
  RequiredValidator, Validation, ValueTypeValidator } from "../../src/validation/index";

// jest.resetAllMocks();
// tslint:disable:object-literal-sort-keys

const schemaSample: JsonSchemaDefinition = {
  Name: {
    Validators: {
      isInRange: {
        Min: 1,
        Max: 30,
        Message: "hello how are you",
      },
      isEmail: {
        Message: "hello how are you",
      },
    },
  },
};

class SampleUser {

  constructor(
    private username: string,
    private password: string,
    private confirmpassword: string,
    private profile: SampleProfile,
  ) { }
  @isRequired()
  public get Username(): string {
    return this.username;
  }

  @isRequired()
  public get Password(): string {
    return this.password;
  }

  @isRequired()
  public get ConfirmPassword(): string {
    return this.confirmpassword;
  }

  public get Profile(): SampleProfile {
    return this.profile;
  }

  // tslint:disable:member-ordering
  public static getSample1() {
    return new SampleUser("ali110", "dfdsf", "dfsf", SampleProfile.getSample1());
  }

  public static getSample2() {
    return new SampleUser("ebiz", "mhgf", "erite", SampleProfile.getSample3());
  }

  public static getSample3() {
    return new SampleUser(null, "", null, SampleProfile.getSample2());
  }

  public static getSample4() {
    return new SampleUser(null, "", null, null);
  }

  // tslint:disable-next-line:no-empty
  public static getSamples() {

  }

}

// tslint:disable:max-classes-per-file
class SampleProfile {
  constructor(
    private firstname: string,
    private lastname: string,
    private mobile: string,
    private email: string,
    private workTel?: string,
    private homeTel?: string,
    private website?: string) {

  }

  // tslint:disable:member-access
  hasProfile(myarg1: string, myarg2: string): boolean {
    return true;
  }

  @isRequired()
  public get Firstname(): string {
    return this.firstname;
  }

  @isRequired()
  public get Lastname(): string {
    return this.lastname;
  }

  @isRequired()
  @isMobile()
  public get Mobile(): string {
    return this.mobile;
  }

  @isRequired()
  @isEmail()
  public get Email(): string {
    return this.email;
  }

  @isPhone()
  public get HomeTel(): string {
    return this.homeTel;
  }

  @isPhone()
  public get WorkTel(): string {
    return this.workTel;
  }

  @isUrl()
  public get WebSite(): string {
    return this.website;
  }

  public static getSample1() {
    return new SampleProfile("Alijah", "Sina",
     "+989121142565", "jj.abrams@gmail.com", "0218890304", "02155998877", "http://jj.com");
  }

  public static getSample2() {
    return new SampleProfile("Mohammad", "Enayat", "+989121142565", "pr.watson@fcg.com.zb", "http://nbc.com");
  }

  public static getSample3() {
    return new SampleProfile("احمد", "صابر", "+989121142565", "ahmad_saber@aol.com", "http://bbc.com");
  }

  public static getSample4() {
    return new SampleProfile("", "", "+", "ahmad_saberaol.com", "http://.");
  }

  public static getSample5() {
    return new SampleProfile(null, null, "+", null, "http://.");
  }

  // tslint:disable:no-empty
  public static getSamples() {

  }

}

beforeAll(() => { });

beforeEach(() => {
  // repo.clear();

});

afterAll(() => { });

afterEach(() => { });

describe("Lib::Validation:Define.", async () => {

  it("checks defined schema for validation.", async () => {
    expect.assertions(1);
    const obj1 = SampleUser.getSample1();
    Validation.define("SampleUser1", {
      "Username": {
        Validators: {
          isRequired: { Message: "Username Field is Required." },
          isInRange: { Max: 10, Min: 1 },
          // "isAlphabet": {  }
        },
      },
      "Profile.Firstname": {
        Validators: {
          isRequired: { Message: "Username Field is Required." },
          isInRange: { Max: 10, Min: 1 },
          // "isAlphabet": {  }
        },
      },
    });
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, "SampleUser1");
      expect(actual).toEqual(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it("checks defined schema for validation should reject error.", async () => {
    expect.assertions(1);
    const obj1 = SampleUser.getSample1();
    Validation.define("SampleUser2", {
      "Username": {
        Validators: {
          isRequired: { Message: "Username Field is Required." },
          isInRange: { Max: 10, Min: 1 },
          // "isAlphabet": {  }
        },
      },
      "Profile.Firstname": {
        Validators: {
          isRequired: { Message: "Firstname Field is Required." },
          isInRange: { Max: 3, Min: 1, Message: "Firstname is not in true range." },
          // "isAlphabet": {  }
        },
      },
    });
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, "SampleUser2");
      expect(actual).toEqual(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

});

describe("Lib::Validation:RequiredValidator.", async () => {

  it("checks null value should be reject error.", async () => {
    const obj1: any = null;
    const expected = false;
    try {
      const actual = await Validation.validate(obj1, new RequiredValidator());
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks a non null value should be true.", async () => {
    const obj1 = 5;
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, new RequiredValidator());
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks fluent definition Age is null required value should be reject error.", async () => {
    const obj1: any = { Age: null };
    const expected = true;
    try {
      const dfn = Validation.define()
        .on("Age")
        .isMax(50);
      const actual = await Validation.validate(obj1, dfn);
      expect(expected).toBe(actual);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it("checks fluent definition Age is non null required value should be true.", async () => {
    const obj1 = { Age: 52 };
    const expected = true;
    try {
      const dfn = Validation.define()
        .on("Age")
        .isMax(50);
      const actual = await Validation.validate(obj1, dfn);
      expect(expected).toBe(actual);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

});

describe("Lib::Validation:MaxValidator.", async () => {

  it("checks null value should be true.", async () => {
    const obj1: any = null;
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, new MaxValidator(100));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks max value is lower than max and should be true.", async () => {
    const obj1 = 5;
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, new MaxValidator(100));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks max value is lower than max and should be true.", async () => {
    const obj1 = -150;
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, new MaxValidator(100));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks greater than max value should be reject error.", async () => {
    const obj1 = 150;
    const expected = false;
    try {
      const actual = await Validation.validate(obj1, new MaxValidator(100));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks fluent definition object lower Age should be true.", async () => {
    const obj1 = { Age: 42 };
    const expected = true;
    try {
      const dfn = Validation.define()
        .on("Age")
        .isMax(50);
      const actual = await Validation.validate(obj1, dfn);
      expect(expected).toBe(actual);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it("checks fluent definition object upper Age should reject error.", async () => {
    const obj1 = { Age: 52 };
    const expected = false;
    try {
      const dfn = Validation.define()
        .on("Age")
        .isMax(50);
      const actual = await Validation.validate(obj1, dfn);
      expect(expected).toBe(actual);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

});

describe("Lib::Validation:ValueTypeValidator.", async () => {

  it("checks null value should be true.", async () => {
    const obj1: any = null;
    const expected = true;
    try {
      const actual = await Validation.validate(obj1, new ValueTypeValidator("null"));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks value type  should be number.", async () => {
    const obj1 = 150;
    const expected = false;
    try {
      const actual = await Validation.validate(obj1, new ValueTypeValidator("number"));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

  it("checks value type of number should be error.", async () => {
    const obj1 = 150;
    const expected = false;
    try {
      const actual = await Validation.validate(obj1, new ValueTypeValidator("string"));
      expect(actual).toBe(expected);
    } catch (error) {
      expect(error).not.toBeNull();
    }

  });

});
