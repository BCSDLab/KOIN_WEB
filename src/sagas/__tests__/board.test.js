import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import boardSaga from "../board";
import { boardAPI } from "../../api"
import { createMemoryHistory } from "history"
import { getContext } from "redux-saga-test-plan/matchers";

describe("Board saga test", () => {
  it("After register post, push back",async () => {
    const history = createMemoryHistory({initialEntries: ['/board/free/register']});
    const boardPayload = {
      token: "token",
      boardId: "1",
      body: {}
    }
    const fakeRes = {};

    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(boardSaga)
      .provide([[matchers.call.fn(boardAPI.registerArticle), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'REGISTER_POST', payload: boardPayload})
      .put({type: "REGISTER_POST_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("After delete post, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/board/free/1']});
    const boardPayload = {
      token: "token",
      boardId: "1",
      id:"1",
    }
    const fakeRes = {};

    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(boardSaga)
      .provide([[matchers.call.fn(boardAPI.removeArticle), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'DELETE_POST', payload: boardPayload})
      .put({type: "DELETE_POST_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })

  it("After edit post, push back", async () => {
    const history = createMemoryHistory({initialEntries: ['/board/free/edit']});
    const boardPayload = {
      token: "token",
      boardId: "1",
      id:"1",
      body: {}
    }
    const fakeRes = {};

    let historyGoBackSpy = jest.spyOn(history, "goBack");
    await expectSaga(boardSaga)
      .provide([[matchers.call.fn(boardAPI.reviseArticle), fakeRes],[getContext("history"), history]])
      .dispatch({type: 'EDIT_POST', payload: boardPayload})
      .put({type: "EDIT_POST_SUCCESS", payload: fakeRes})
      .run();
    expect(historyGoBackSpy.mock.calls.length).toBe(1);
  })
})
