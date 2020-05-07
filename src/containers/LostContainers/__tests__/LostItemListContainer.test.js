import React from "react";
import {render, cleanup, makeStore, waitFor} from "../../../lib/testUtils";
import LostItemListContainer from "../LostItemListContainer";
import userEvent from "@testing-library/user-event";
import { GET_LOST_ITEMS } from "../../../modules/lost"

describe('<LostItemListContainer>',() => {

  afterEach(() => {
    cleanup()
  });

  it("Check dispatch 'GET_LOST_ITEMS'", () => {
    const store = makeStore({
      lostReducer: {
        lostItems: {
          loading: false,
          data: {
            totalPage: 0,
            lostItems: []
          },
          error: null
        },
        data: null,
      }
    });
    render(<LostItemListContainer/>, {store});

    expect(store.getActions()).toEqual(expect.arrayContaining([{type: GET_LOST_ITEMS}]));
  });

  it("When click pagination, update data and sessionStorage", () => {
    const store = makeStore({
      lostReducer: {
        lostItems: {
          loading: false,
          data: {
            totalPage: 5,
            lostItems: []
          },
          error: null
        },
        data: null,
      }
    });
    const { getByText } =render(<LostItemListContainer/>, {store});
    const nextBtn = getByText('다음으로');

    userEvent.click(nextBtn);
    expect(sessionStorage.getItem('lpn')).toBe("2");
    expect(store.getActions()).toEqual(expect.arrayContaining([{type: GET_LOST_ITEMS}]));
  })
})
