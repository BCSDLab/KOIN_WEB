import React from 'react';
import { makeStore, render, cleanup, waitFor, fireEvent, prettyDOM, screen } from '../../../lib/testUtils'
import PostRegisterContainer from "../PostRegisterContainer";
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import userEvents from "@testing-library/user-event";
import { REGISTER_POST } from "../../../modules/board";

let storageGetItemMock;

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

beforeAll(() => {
  storageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');
})

afterAll(() => {
  storageGetItemMock.mockRestore()
})

describe('<PostRegisterContainer/>', () => {
  const defaultStore = makeStore({
    boardReducer: {
      data: null,
      error: null
    }
  });

  afterEach(() => {
    defaultStore.clearActions();
    cleanup();
  })

  describe('Default Board', () => {
    const registerMatch = {
      isExact: true,
      path: '/board/:type/:id',
      url: '/board/free/register',
      params: {
        type: 'free',
        id: 'register'
      }
    };
    beforeAll(() => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '1',
          token: '1234'
        };
        return storage[type];
      })
    })

    it('Should fill title', async () => {
      const history = createMemoryHistory();
      const { getByText, getAllByText } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );
      const submitButton = getAllByText('등록')[1];

      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('제목을 입력해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('Should fill content', async () => {
      const history = createMemoryHistory();
      const { getAllByPlaceholderText, getByText, getAllByText } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );
      const titleInput = getAllByPlaceholderText('제목을 입력해주세요.')[0];
      const submitButton = getAllByText('등록')[1];

      fireEvent.change(titleInput, {target: {value: 'test'}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('내용을 입력해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If data has no error, Dispatch REGISTER_POST', async () => {
      const history = createMemoryHistory();
      const { getAllByPlaceholderText, getAllByText, getByTestId } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );
      const titleInput = getAllByPlaceholderText('제목을 입력해주세요.')[0];
      const contentInput = getByTestId('content');
      const submitButton = getAllByText('등록')[1];

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});

      userEvents.click(submitButton);

      expect(defaultStore.getActions())
        .toEqual(expect
          .arrayContaining([
            {
              type: REGISTER_POST,
              payload: {
                body: {
                  board_id: '1',
                  title: 'test',
                  content: 'testing'
                },
                token: '1234',
                boardId: '1'
              }
            }
            ]));
    })

    it('If state.data.status is 201, Popup success register toast', async () => {
      const history = createMemoryHistory();
      const successStore = makeStore({
        boardReducer: {
          data: {status: 201, data: {}},
          error: null
        }
      })
      const { getByText } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: successStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글이 등록되었습니다');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If state.error is true, Popup error register toast', async () => {
      const history = createMemoryHistory();
      const errorStore = makeStore({
        boardReducer: {
          data: null,
          error: {}
        }
      })
      const { getByText } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: errorStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글 등록 중 에러가 발생했습니다.');
        expect(toast).toBeInTheDocument();
      })
    })
  })
  describe('Anonymous Board', () => {
    const registerMatch = {
      isExact: true,
      path: '/board/:type/:id',
      url: '/board/anonymous/register',
      params: {
        type: 'anonymous',
        id: 'register'
      }
    };
    beforeAll(() => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '-1',
          token: '1234'
        };
        return storage[type];
      })
    })

    it.each([
      ['Should fill nickname', '', '닉네임을 입력해주세요.'],
      ['Should nickname.length is not more than 10', 'abcdefghijk', '닉네임은 10글자 이하여야 합니다.'],
      ['Should fill password', 'koin', '비밀번호를 입력해주세요.'],
    ])('%s', async (_, nickname, toastContext) => {
      const history = createMemoryHistory();
      const { getAllByPlaceholderText, getByText, getAllByText, getByTestId } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );
      const titleInput = getAllByPlaceholderText('제목을 입력해주세요.')[0];
      const nicknameInput = getAllByPlaceholderText('닉네임을 입력하세요.')[0];
      const contentInput = getByTestId('content');
      const submitButton = getAllByText('등록')[1];

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(nicknameInput, {target: {value: nickname}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      })
    })

    it('If data has no error, Dispatch REGISTER_POST', async () => {
      const history = createMemoryHistory();
      const { getAllByPlaceholderText, getAllByText, getByTestId } = render(
        <PostRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );
      const titleInput = getAllByPlaceholderText('제목을 입력해주세요.')[0];
      const nicknameInput = getAllByPlaceholderText('닉네임을 입력하세요.')[0];
      const passwordInput = getAllByPlaceholderText('비밀번호를 입력하세요')[0];
      const contentInput = getByTestId('content');
      const submitButton = getAllByText('등록')[1];

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(nicknameInput, {target: {value: 'koin'}});
      fireEvent.change(passwordInput, {target: {value: 'admin'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});

      userEvents.click(submitButton);

      expect(defaultStore.getActions())
        .toEqual(expect
          .arrayContaining([
            {
              type: REGISTER_POST,
              payload: {
                body: {
                  title: 'test',
                  content: 'testing',
                  nickname: 'koin',
                  password: 'admin'
                },
                token: '1234',
                boardId: '-1'
              }
            }
          ]));
    })
  })
})
