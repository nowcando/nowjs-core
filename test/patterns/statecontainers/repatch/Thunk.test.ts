import * as assert from "assert";
import "jest";
import { Store, thunk } from "../../../../src/patterns/statecontainers/repatch/index";

describe("thunk", () => {
  describe("dispatch", () => {
    it("invokes the delegate", () => {
      const store = new Store(1).addMiddleware(thunk);
      assert.strictEqual(store.getState(), 1);
      store.dispatch((state) => (dispatch, getState) => {
        // tslint:disable-next-line:no-shadowed-variable
        dispatch((state) => getState() + 1);
      });
      assert.strictEqual(store.getState(), 2);
    });

    it("returns the result of delegate", () => {
      const store = new Store(1).addMiddleware(thunk);
      const expected = 8;
      assert.strictEqual(
        store.dispatch((state) => (dispatch) => {
          // tslint:disable-next-line:no-shadowed-variable
          dispatch((state) => state + 1);
          return expected;
        }),
        expected,
      );
    });
  });

  it("provides extra arguments", () => {
    const add = (a: number, b: number) => a + b;
    const store = new Store(1).addMiddleware(thunk.withExtraArgument(add));
    // tslint:disable-next-line:no-shadowed-variable
    store.dispatch((state) => (dispatch, getState, add) => {
      // tslint:disable-next-line:no-shadowed-variable
      dispatch((state) => add(state, 1));
    });
    assert.strictEqual(store.getState(), 2);
  });
});
