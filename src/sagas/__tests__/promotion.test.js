import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import promotionSaga from "../promotion";
import { promotionAPI } from "../../api";
import { createMemoryHistory } from "history"
import { getContext } from "redux-saga-test-plan/matchers";

describe("Promotion saga test", () => {

  it("After register promotion, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/promotion/register']});
    const promotionPayload = {
      token: "token",
      body: {}
    }
    const fakeRes = {};

    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(promotionSaga)
      .provide([[matchers.call.fn(promotionAPI.registerPromotion), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'REGISTER_PROMOTION', payload: promotionPayload})
      .put({type: "REGISTER_PROMOTION_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("After delete promotion, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/promotion/1']});
    const promotionPayload = {
      token: "token",
      id: 1
    }
    const fakeRes = {};

    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(promotionSaga)
      .provide([[matchers.call.fn(promotionAPI.removePromotion), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'DELETE_PROMOTION', payload: promotionPayload})
      .put({type: "DELETE_PROMOTION_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("After adjust promotion, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/promotion/1']});
    const promotionPayload = {
      token: "token",
      body: {},
      id: 1
    }
    const fakeRes = {};

    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(promotionSaga)
      .provide([[matchers.call.fn(promotionAPI.adjustPromotion), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'ADJUST_PROMOTION', payload: promotionPayload})
      .put({type: "ADJUST_PROMOTION_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })
})
