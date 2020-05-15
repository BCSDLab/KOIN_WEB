import React from "react";
import {render, cleanup, makeStore, waitFor} from "../../../lib/testUtils";
import LostItemDetailContainer from "../LostItemDetailContainer";
import userEvent from "@testing-library/user-event";
import {GET_SPECIFIC_LOST_ITEM, DELETE_LOST_ITEM} from "../../../modules/lost";
import { createMemoryHistory } from 'history'

describe('<LostItemDetailContainer>', () => {
  console.log = () => {};
  afterEach(() => {
    sessionStorage.clear()
    cleanup()
  });

  it("Check dispatch 'GET_SPECIFIC_LOST_ITEMS'", () => {
    const history = createMemoryHistory({initialEntries: ['/lost/details/1']});
    const store = makeStore({
      lostReducer: {
        specificData: {
          comment_count: 0,
          date: "",
          is_phone_open: false,
          comments: [],
          title: "testing",
          content:"test",
          created_at: "2020-05-14 07:35:44",
        }
      }
    });
    render(<LostItemDetailContainer history={history}/>, {store})

    expect(store.getActions()).toEqual(expect.arrayContaining([{type: GET_SPECIFIC_LOST_ITEM}]));
  });

  it("When user is writer, could revise and delete",() => {
    const history = createMemoryHistory({initialEntries: ['/lost/details/1']});
    sessionStorage.setItem("userInfo", JSON.stringify({"id": 1}))
    sessionStorage.setItem("token", "1")
    const store = makeStore({
      lostReducer: {
        specificData: {
          comment_count: 0,
          date: "",
          is_phone_open: false,
          comments: [],
          title: "testing",
          content:"test",
          created_at: "2020-05-14 07:35:44",
          user_id: 1,
        }
      }
    });

    const { getAllByText } = render(<LostItemDetailContainer history={history}/>, {store})
    expect(getAllByText("수정")).not.toBe(null);
    expect(getAllByText("삭제")).not.toBe(null);
  });

  it("When click revise button, route to revise",() => {
    const history = createMemoryHistory({initialEntries: ['/lost/details/1']});
    sessionStorage.setItem("userInfo", JSON.stringify({"id": 1}))
    sessionStorage.setItem("token", "1")
    const store = makeStore({
      lostReducer: {
        specificData: {
          comment_count: 0,
          date: "",
          is_phone_open: false,
          comments: [],
          title: "testing",
          content:"test",
          created_at: "2020-05-14 07:35:44",
          user_id: 1,
        }
      }
    });
    const { getAllByText } = render(<LostItemDetailContainer history={history}/>, {store})

    const reviseBtn = getAllByText("수정");
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    userEvent.click(reviseBtn[0]);
    expect(history.length).toBe(2);
  })
});
