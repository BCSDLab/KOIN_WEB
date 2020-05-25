import React from "react";
import { render, cleanup, screen, waitFor, waitForElement, makeStore } from '../../../lib/testUtils';
import userEvent from "@testing-library/user-event";
import MarketItemContainer from "../MarketItemContainer";

const customMatch = {
  isExact: true,
  path: '/market/:type/:id',
  url: '/market/sell/1',
  params: {
    type: 'sell',
    id: '1'
  }
};

const defaultMarketReducer = {
  item: {
    data: {
      comments: [],
      content: "testing",
      created_at: "2020-05-03 12:04:23",
      hit: 1,
      id: 1,
      is_phone_open: true,
      nickname: "tester",
      phone: "010-1111-2222",
      price: 0,
      state: 0,
      thumbnail: null,
      title: "test",
      type: 1,
      item_id: 1,
      updated_at: "2020-02-02 02:02:02",
    }
  }
}

describe('<MarketItemContainer/>', () => {
  console.log = () => {};
  afterEach(() =>{
    cleanup()
  });

  it("Check dispatch 'GET_ITEM'", () => {
    const store = makeStore({
      marketReducer: defaultMarketReducer,
    })
    render(<MarketItemContainer match={customMatch}/>, {store});

    expect(store.getActions()).toEqual(expect.arrayContaining([{
      type: "GET_ITEM",
      payload: {
        id: "1",
        token: undefined
      }
    }]))
  })

  it("If user logged in, check grantEdit by 'CHECK_PERMISSION'", () => {
    sessionStorage.setItem("token","1111")
    const store = makeStore({
      marketReducer: defaultMarketReducer,
    })
    render(<MarketItemContainer match={customMatch}/>, {store});
    expect(store.getActions()).toEqual(expect.arrayContaining([{
      type: "market/CHECK_PERMISSION",
      payload: {
        body: {
          item_id: "1"
        },
        token: "1111"
      },
    }]))
  })

  it("When user is writer, could revise and delete", () => {
    const store = makeStore({
      marketReducer: {
        item: {defaultMarketReducer},
        data: {
          data: {
            grantEdit: true
          }
        }
      }
    })
    const { getAllByText } = render(<MarketItemContainer match={customMatch}/>, {store});

    const reviseBtn = getAllByText("수정")[0];
    const deleteBtn = getAllByText("삭제")[0];
    expect(reviseBtn).not.toBe(null);
    expect(deleteBtn).not.toBe(null);
  })

  it("When writer delete post, dispatch 'DELETE_ITEM'", () => {
    const store = makeStore({
      marketReducer: {
        item: {defaultMarketReducer},
        data: {
          data: {
            grantEdit: true
          }
        }
      }
    })
    const { getAllByText } = render(<MarketItemContainer match={customMatch}/>, {store});

    const deleteBtn = getAllByText("삭제")[0];

    jest.spyOn(window, "confirm").mockImplementation(() => true)
    userEvent.click(deleteBtn)
    expect(store.getActions()).toEqual(expect.arrayContaining([{
      type: "DELETE_ITEM",
      payload: {
        id: "1",
        token: "1111"
      },
    }]))
  })
});
