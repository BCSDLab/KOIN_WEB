import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import marketSaga from "../market";
import { marketAPI } from "../../api";
import { createMemoryHistory } from "history"
import { getContext } from "redux-saga-test-plan/matchers";

describe("Market saga test", () => {

  it("After register market item, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/market/sell/register']});
    const marketPayload = {
      token: "token",
      body: {}
    };
    const fakeRes = {};
    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(marketSaga)
      .provide([[matchers.call.fn(marketAPI.registerItem), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'REGISTER_ITEM', payload: marketPayload})
      .put({type: "REGISTER_ITEM_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("After edit market item, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/market/sell/1']});
    const marketPayload = {
      token: "token",
      id: 1,
      body: {}
    };
    const fakeRes = {};
    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(marketSaga)
      .provide([[matchers.call.fn(marketAPI.reviseItem), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'EDIT_ITEM', payload: marketPayload})
      .put({type: "EDIT_ITEM_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("After delete market item, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/market/sell/1']});
    const marketPayload = {
      token: "token",
      id: 1
    };
    const fakeRes = {};
    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(marketSaga)
      .provide([[matchers.call.fn(marketAPI.removeItem), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'DELETE_ITEM', payload: marketPayload})
      .put({type: "DELETE_ITEM_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })
})
