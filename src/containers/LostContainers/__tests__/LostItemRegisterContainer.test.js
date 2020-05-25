import React from "react";
import {render, cleanup, makeStore, waitFor, fireEvent} from "../../../lib/testUtils";
import LostItemRegisterContainer from "../LostItemRegisterContainer";
import userEvent from "@testing-library/user-event";
import { REGISTER_LOST_ITEM } from "../../../modules/lost";
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

describe("<LostItemRegisterContainer>", () => {

  afterEach(() => {
    defaultStore.clearActions();
    cleanup();
  })

  const defaultStore = makeStore({
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
    },
  })

  it("Title and contents must be filled", async () => {
    const { getAllByText, getByText } = render(<LostItemRegisterContainer/>,{store: defaultStore});
    const submitBtn = getAllByText("등록")[0];
    userEvent.click(submitBtn);

    await waitFor(() => {
      const toast = getByText('제목이나 내용을 추가해주세요.');
      expect(toast).toBeInTheDocument();
    })
  })

  it("Date must be filled", async () => {
    const { getByPlaceholderText, getByTestId, getAllByText, getByText } = render(<LostItemRegisterContainer/>,{store: defaultStore});
    const titleInput = getByPlaceholderText("제목을 입력하세요. ( 최대 255자 )")
    const contentInput = getByTestId('content');
    const submitBtn = getAllByText("등록")[0];

    await userEvent.type(titleInput,'testing');
    fireEvent.change(contentInput, {target: {value: 'test'}});

    userEvent.click(submitBtn);

    await waitFor(() => {
      const toast = getByText('날짜 형식을 맞춰주세요. 예시) 2020-01-01');
      expect(toast).toBeInTheDocument();
    })
  })

  it("With full input, dispatch 'REGISTER_LOST_ITEM'", async () => {
    console.log = () => {};

    const history = createMemoryHistory()
    const { getByPlaceholderText, getByTestId, getAllByText, getByText } = render(<LostItemRegisterContainer history={history}/>,{store: defaultStore});
    const titleInput = getByPlaceholderText("제목을 입력하세요. ( 최대 255자 )")
    const dateInput = getByText("습득일").parentNode.parentNode.querySelector('input');

    const contentInput = getByTestId('content');
    const submitBtn = getAllByText("등록")[0];

    await userEvent.type(titleInput,'testing');
    await userEvent.type(dateInput,'2020-01-01');
    fireEvent.change(contentInput, {target: {value: 'test'}});

    userEvent.click(submitBtn);

    expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{type: REGISTER_LOST_ITEM }]));
    await waitFor(() => {
      const toast = getByText('게시글이 등록되었습니다.');
      expect(toast).toBeInTheDocument();
    })
  })
})
