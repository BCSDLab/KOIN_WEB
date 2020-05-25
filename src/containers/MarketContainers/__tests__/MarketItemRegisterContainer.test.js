import React from "react";
import { render, cleanup, waitFor, fireEvent, makeStore } from '../../../lib/testUtils';
import userEvent from "@testing-library/user-event";
import MarketItemRegisterContainer from "../MarketItemRegisterContainer";
import {REGISTER_ITEM} from "../../../modules/market";

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
    data: null
  }
})

const customMatch = {
  isExact: true,
  path: '/market/:type/register',
  url: '/market/sell/register',
  params: {
    type: 'sell'
  }
};

describe("<MarketItemRegisterContainer/>", () => {

  it("Title and content must be filled", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<MarketItemRegisterContainer match={customMatch}/>, {store: defaultStore});
    const registerBtn = getAllByText("등록")[0];

    userEvent.click(registerBtn);

    await waitFor(() => {
      let toast = getByText("제목이나 내용을 입력해주세요.");
      expect(toast).toBeInTheDocument();
    });
  });

  it("Price is must be a positive number", async () => {
    const { getByText, getAllByText, getByPlaceholderText, getByTestId } = render(<MarketItemRegisterContainer match={customMatch}/>, {store: defaultStore});
    const titleInput = getByPlaceholderText("ex) 샘숭 노트북 팝니다!");
    const priceInput = getByPlaceholderText("가격을 입력해주세요");
    const registerBtn = getAllByText("등록")[0];
    const contentInput = getByTestId("content");

    await userEvent.type(titleInput,'testing');
    await userEvent.type(priceInput,"-1");
    fireEvent.change(contentInput, {target: {value: 'test'}});

    userEvent.click(registerBtn);

    await waitFor(() => {
      let toast = getByText("가격은 음수일 수 없습니다.");
      expect(toast).toBeInTheDocument();
    });
  })

  it("With full input, dispatch'REGISTER_ITEM' and make toast", async () => {
    const store = makeStore({
      authReducer: {
        isLoggedIn: true
      },
      marketReducer: {
        data: {
          status: 201
        },
      }
    })
    const { getByText, getAllByText, getByPlaceholderText, getByTestId } = render(<MarketItemRegisterContainer match={customMatch}/>, {store});
    const titleInput = getByPlaceholderText("ex) 샘숭 노트북 팝니다!");
    const priceInput = getByPlaceholderText("가격을 입력해주세요");
    const registerBtn = getAllByText("등록")[0];
    const contentInput = getByTestId("content");

    await userEvent.type(titleInput,'testing');
    await userEvent.type(priceInput,"10000");
    fireEvent.change(contentInput, {target: {value: 'test'}});

    userEvent.click(registerBtn);

    await waitFor(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([{
        type: REGISTER_ITEM,
        payload: {
          body: {
            content: "test",
            is_phone_open: 0,
            price: "10000",
            thumbnail: "",
            title: "testing",
            type: null
          },
          token: null
        }
      }]))
      let toast = getByText("게시글이 등록되었습니다.");
      expect(toast).toBeInTheDocument();
    });
  })
})
