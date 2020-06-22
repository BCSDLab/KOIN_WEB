import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import authSaga from "../auth";
import { authAPI } from "../../api"
import { createMemoryHistory } from "history"
import { getContext } from "redux-saga-test-plan/matchers";

describe("Auth saga test", () => {

  it("Login with lastLocation, execute history.goBack",async () => {
    const history = createMemoryHistory({initialEntries: ['/login']});
    const loginPayload = {userId:"aaaa", password: "1111", lastLocation: "/", autoLoginFlag: false};
    const fakeRes = {
      data: {
        token: "token",
        user: {}
      }
    };
    let historyGoBackSpy = jest.spyOn(history, "goBack");

    await expectSaga(authSaga)
      .provide([[matchers.call.fn(authAPI.login), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'LOGIN', payload: loginPayload})
      .put({type: "LOGIN_SUCCESS", res: fakeRes})
      .run();

    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("Login without lastLocation, push to index", async () => {
    const history = createMemoryHistory({initialEntries: ['/login']});
    const loginPayload = {userId:"aaaa", password: "1111", lastLocation: null, autoLoginFlag: false};
    const fakeRes = {
      data: {
        token: "token",
        user: {}
      }
    };
    let historyPushSpy = jest.spyOn(history, "push");
    await expectSaga(authSaga)
      .provide([[matchers.call.fn(authAPI.login), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'LOGIN', payload: loginPayload})
      .put({type: "LOGIN_SUCCESS", res: fakeRes})
      .run();
    expect(historyPushSpy.mock.calls.length).toBe(1);
  })

  it("When user logout, push to index", async () => {
    const history = createMemoryHistory({initialEntries: ['/']});
    const token = "token";
    const fakeRes = {
      data: {
        success: "logout"
      }
    };
    let historyPushSpy = jest.spyOn(history, "push");
    await expectSaga(authSaga)
      .provide([[matchers.call.fn(authAPI.logout), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'LOGOUT', payload: token})
      .put({type: "LOGOUT_SUCCESS", res: fakeRes})
      .run();
    expect(historyPushSpy.mock.calls.length).toBe(1);
  })

  it("When user withdraw, push to index", async () => {
    const history = createMemoryHistory({initialEntries: ['/modifyinfo']});
    const token = "token";
    const fakeRes = {
      data: {
        success: "withdraw"
      }
    };
    let historyPushSpy = jest.spyOn(history, "push");
    await expectSaga(authSaga)
      .provide([[matchers.call.fn(authAPI.userWithdrawl), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'WITHDRAW', payload: token})
      .put({type: "WITHDRAW_SUCCESS", res: fakeRes})
      .run();
    expect(historyPushSpy.mock.calls.length).toBe(1);
  })

  it("After modify info, push to index", async () => {
    const history = createMemoryHistory({initialEntries: ['/modifyinfo']});
    const token = "token";
    const fakeRes = {
      identity: 5,
    }
    let historyPushSpy = jest.spyOn(history, "push");
    await expectSaga(authSaga)
      .provide([[matchers.call.fn(authAPI.modifyUserInfo), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'MODIFY_INFO', payload: token})
      .put({type: "MODIFY_INFO_SUCCESS", res: fakeRes})
      .run();
    expect(historyPushSpy.mock.calls.length).toBe(1);
  })
})
