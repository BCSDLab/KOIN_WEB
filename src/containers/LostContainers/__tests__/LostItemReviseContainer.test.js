import React from "react";
import {render, cleanup, makeStore, waitFor, fireEvent} from "../../../lib/testUtils";
import LostItemReviseContainer from "../LostItemReviseContainer";
import userEvent from "@testing-library/user-event";
import {GET_SPECIFIC_LOST_ITEM, REVISE_LOST_ITEM} from "../../../modules/lost";
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
  console.log = () => {};
  afterEach(() => {
    sessionStorage.clear()
    cleanup();
  })

  it("Dispatch 'GET_SPECIFIC_LOST_ITEM",() => {
    sessionStorage.setItem("specificId", "1");
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
    render(<LostItemReviseContainer/>, {store});
    expect(store.getActions()).toEqual(expect.arrayContaining([{type: GET_SPECIFIC_LOST_ITEM}]));
  })

  it("Check specific data already typing", () => {
    sessionStorage.setItem("specificId", "1");
    const store = makeStore({
      lostReducer: {
        specificData: {
          comment_count: 0,
          date: "2020-02-02",
          is_phone_open: true,
          phone: "010-1111-2222",
          comments: [],
          title: "testing",
          content:"test",
          created_at: "2020-05-14 07:35:44",
        }
      }
    });
    const { getAllByRole, getByTestId } = render(<LostItemReviseContainer/>, {store});
    const titleInput = getAllByRole("textbox")[0]
    const phoneInput = getAllByRole("textbox")[1]
    const contentInput = getByTestId('content');

    expect(titleInput.value).toBe("testing");
    expect(phoneInput.value).toBe("010-1111-2222");
    expect(contentInput.value).toBe("test");
  })

  it("With full input, dispatch 'REVISE_LOST_ITEM", async () => {
    const history = createMemoryHistory()
    sessionStorage.setItem('token', "1234")
    const store = makeStore({
      lostReducer: {
        specificData: {
          comment_count: 0,
          date: "2020-02-02",
          is_phone_open: true,
          phone: "010-1111-2222",
          comments: [],
          title: "testing",
          content:"test",
          created_at: "2020-05-14 07:35:44",
          id: "1",
          type: 0,
        }
      }
    });
    const { getAllByRole, getByTestId, getAllByText, getByText } = render(<LostItemReviseContainer history={history}/>, {store});
    const submitBtn = getAllByText("수정")[0];
    const titleInput = getAllByRole("textbox")[0]
    const contentInput = getByTestId('content');

    await userEvent.type(titleInput,'title testing');
    fireEvent.change(contentInput, {target: {value: 'content testing'}});

    let spy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
    userEvent.click(submitBtn);

    expect(spy.mock.calls.length).toBe(1);
    expect(store.getActions()).toEqual(expect.arrayContaining([{type: REVISE_LOST_ITEM }]));

    await waitFor(() => {
      const toast = getByText('게시물이 수정되었습니다.');
      expect(toast).toBeInTheDocument();
    })
  })
})
