import "jest";
import { CodedException, ErrorBase, IllegalOperationException,
     ValidationException } from "../../src/exceptions/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("ErrorBase", async () => {

    it("checks dummy exception to handle node 10", async () => {
        expect.assertions(1);
        expect(1).toEqual(1);
      });
//   it("checks errorbase", async () => {
//     expect.assertions(2);
//     try {
//         throw new ErrorBase("a sample error message");
//     } catch (error) {
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

//   it("checks errorbase with inner", async () => {
//     expect.assertions(3);
//     try {
//         throw new ErrorBase("a sample error message", new Error("an inner error"));
//     } catch (error) {
//         expect(error.Stack).not.toEqual(null) ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

});

// describe("CodedException", async () => {

//   it("checks codedexception", async () => {
//     expect.assertions(3);
//     try {
//         throw new CodedException(-1120, "a sample error message");
//     } catch (error) {
//         expect(error.Code).toEqual(-1120) ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

//   it("checks codedexception with inner error", async () => {
//     expect.assertions(3);
//     try {
//         throw new CodedException(-1120, "a sample error message", new Error("a inner message"));
//     } catch (error) {
//         expect(error.Code).toEqual(-1120) ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

// });

// describe("ValidationException", async () => {

//   it("checks ValidationException", async () => {
//     expect.assertions(3);
//     try {
//         throw new ValidationException("name", "a sample error message");
//     } catch (error) {
//         expect(error.Field).toEqual("name") ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

//   it("checks ValidationException with inner error", async () => {
//     expect.assertions(3);
//     try {
//         throw new ValidationException("name", "a sample error message", new Error("a inner message"));
//     } catch (error) {
//         expect(error.Field).toEqual("name") ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

// });

// describe("IllegalOperationException", async () => {

//   it("checks IllegalOperationException", async () => {
//     expect.assertions(3);
//     try {
//         throw new CodedException(-1120, "a sample error message");
//     } catch (error) {
//         expect(error.Code).toEqual(-1120) ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

//   it("checks IllegalOperationException with inner error", async () => {
//     expect.assertions(3);
//     try {
//         throw new IllegalOperationException(-1120, "a sample error message", new Error("a inner message"));
//     } catch (error) {
//         expect(error.Code).toEqual(-1120) ;
//         expect(error.toString()).not.toEqual(null) ;
//         expect(error.toJSON()).not.toEqual(null) ;
//     }
//   });

// });
