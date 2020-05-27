import React from "react";
import { render, cleanup, waitFor, fireEvent, makeStore } from '../../../lib/testUtils';
import userEvent from "@testing-library/user-event";
import MarketItemEditContainer from "../MarketItemEditContainer";
import { EDIT_ITEM } from "../../../modules/market";
import { createMemoryHistory } from "history"

jest.mock('react-quill', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: class ReactQuill extends React.Component {
      // dummy editor (for ref)
      editor = {
        getModule() {
          return {
            addHandler: () => {}
          }
        }
      }
      render() {
        return (
          <input
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
            style={this.props.style}
            data-testid="content" />
        )
      }
    }
  }
})

const defaultStore = makeStore({
  authReducer: {
    isLoggedIn: true
  },
  marketReducer: {
    data: {
      data: {
        grantEdit: true
      }
    },
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
})

const customMatch = {
  isExact: true,
  path: '/market/:type/edit',
  url: '/market/sell/edit',
  params: {
    type: 'sell'
  }
};

describe("<MarketItemEditContainer/>",() => {

  afterEach(() => {
    cleanup()
    defaultStore.clearActions();
  })
  it("When rendered, dispatch 'CHECK_PERMISSION'", () => {
    sessionStorage.setItem("token","1111");
    sessionStorage.setItem("itemId","1");
    const history = createMemoryHistory({initialEntries: ['/market/sell/edit']});
    render(<MarketItemEditContainer history={history} match={customMatch}/>, {store: defaultStore});
    expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{
      type: "market/CHECK_PERMISSION",
      payload: {
        body: {
          item_id: "1"
        },
        token: "1111"
      },
    }]));
  })

  it("When rendered, dispatch 'GET_ITEM' and set input", () => {
    sessionStorage.setItem("token","1111");
    sessionStorage.setItem("itemId","1");
    const history = createMemoryHistory({initialEntries: ['/market/sell/edit']});
    const { getByPlaceholderText, getByTestId } = render(<MarketItemEditContainer history={history} match={customMatch}/>, {store: defaultStore});
    expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{
      type: "GET_ITEM",
      payload: {
        id: "1",
        token: "1111"
      }
    }]))
    const titleInput = getByPlaceholderText("ex) 샘숭 노트북 팝니다!");
    const contentInput = getByTestId("content");

    expect(titleInput.value).toBe("test");
    expect(contentInput.value).toBe("testing");
  })

  it("With full input, dispatch 'EDIT_ITEM'",async () => {
    sessionStorage.setItem("token","1111");
    sessionStorage.setItem("itemId","1");
    const history = createMemoryHistory({initialEntries: ['/market/sell/edit']});
    const { getByPlaceholderText, getByTestId, getAllByText } = render(<MarketItemEditContainer history={history} match={customMatch}/>, {store: defaultStore});
    const titleInput = getByPlaceholderText("ex) 샘숭 노트북 팝니다!");
    const contentInput = getByTestId("content");
    const submitBtn = getAllByText("수정")[0];

    await userEvent.type(titleInput,'EditTesting');
    fireEvent.change(contentInput, {target: {value: 'EditTest'}});

    jest.spyOn(window, "confirm").mockImplementation(() => true);
    userEvent.click(submitBtn);

    expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{
      type: EDIT_ITEM,
      payload: {
        body: {
          content: "EditTest",
          is_phone_open: true,
          phone: "010-1111-2222",
          state: 0,
          thumbnail: "",
          title: "EditTesting"
        },
        id: "1",
        token: "1111"
      }
    }]))
  })
});
