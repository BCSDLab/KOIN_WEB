import React from "react";
import { render, cleanup, screen, waitFor, waitForElement, makeStore } from '../../../lib/testUtils';
import userEvent from "@testing-library/user-event";
import MarketItemListContainer from "../MarketItemListContainer";
import { GET_ITEMS, GET_MY_ITEMS } from "../../../modules/market";
import { createMemoryHistory } from "history"

const customMatch = {
  isExact: true,
  path: '/market/:type',
  url: '/market/sell',
  params: {
    type: 'sell',
  }
};
const customHistory = createMemoryHistory({initialEntries: ['/market/sell']});

const defaultStore = makeStore({
  marketReducer: {
    items: {
      data: null,
      loading: false,
      error: null
    },
    numOfItems: 0
  }
})

describe('<MarketItemListContainer>', () => {
  console.log = () => {};
  afterEach(() =>{
    cleanup()
  });

  it("Show correct header text by match",() => {
    const {getByRole} = render(<MarketItemListContainer match={customMatch} history={customHistory}/>, {store: defaultStore})
    const HeaderMessage = getByRole("heading");

    expect(HeaderMessage.childNodes[0].textContent).toBe("팝니다");
  })

  it("Dispatch 'GET_ITEMS' when rendered",() => {
    render(<MarketItemListContainer match={customMatch} history={customHistory}/>, {store: defaultStore})

    expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{
        type: GET_ITEMS,
        payload: {"marketId": "0", "pageNum": 1},
      }])
    )
  })

  it("If user is logged in, user could dispatch 'GET_MY_ITEMS'",async () => {
    sessionStorage.setItem("token", "1111")
    sessionStorage.setItem("userInfo", JSON.stringify({"nickname": "test"}))
    const customStore = makeStore({
      marketReducer: {
        items: {
          data: null,
          loading: false,
          error: null
        },
        numOfItems: 0
      },
      authReducer: {
        isLoggedIn: true,
      }
    })
    const { getByText } =render(<MarketItemListContainer match={customMatch} history={customHistory}/>, {store: customStore})

    const myItemBtn = getByText("내가 등록한 물품 보기");

    userEvent.click(myItemBtn);

    await waitFor(() => {
      expect(customStore.getActions()).toEqual(expect.arrayContaining([{
          type: GET_MY_ITEMS,
          payload: {"marketId": "0", "pageNum": 1, "token": "1111"}
        }])
      )
      const AllItemBtn = getByText("전체 물품 보기");
      expect(AllItemBtn).not.toBe(null);
    })
  })
})
