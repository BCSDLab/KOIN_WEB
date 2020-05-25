import React from 'react';
import { makeStore, render, cleanup, waitFor, fireEvent, prettyDOM, screen } from '../../../lib/testUtils'
import PostEditContainer from "../PostEditContainer";
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import userEvents from "@testing-library/user-event";
import {CHECK_PERMISSION, GET_POST, EDIT_POST} from "../../../modules/board";

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
  window.alert = jest.fn(e => e);
  window.confirm = jest.fn(e => e);
})

afterAll(() => {
  storageGetItemMock.mockRestore()
})

describe('<PostEditContainer/>', () => {
  const defaultStore = makeStore({
    boardReducer: {
      data: null,
      error: null,
      post: {
        data: null
      }
    }
  });
  const postStore = makeStore({
    boardReducer: {
      data: null,
      error: null,
      post: {
        data: {
          nickname: 'koin',
          title: 'test',
          content: 'testing'
        }
      }
    }
  });
  const history = {
    push: jest.fn(),
    goBack: jest.fn()
  }

  afterEach(() => {
    defaultStore.clearActions();
    postStore.clearActions();
    cleanup();
    window.alert.mockClear()
    window.confirm.mockClear()
    history.push.mockClear()
    history.goBack.mockClear()
  })

  describe('Default Board', () => {
    const editMatch = {
      isExact: true,
      path: '/board/:type/:id',
      url: '/board/free/edit',
      params: {
        type: 'free',
        id: 'edit'
      }
    };


    it('Should have post id', async () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '1'
        };
        return storage[type] ? storage[type] : null;
      })
      render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: defaultStore}
      );

      expect(window.alert.mock.calls).toEqual(expect.arrayContaining([['선택된 게시글이 없습니다.']]))
      expect(history.goBack).toHaveBeenCalledTimes(1)
    })

    it('If data has no error, Dispatch CHECK_PERMISSION', () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '1',
          token: '1234',
          postId: '2'
        };
        return storage[type] ? storage[type] : null;
      })
      render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: defaultStore}
      );

      expect(defaultStore.getActions())
        .toEqual(expect
          .arrayContaining([
            {
              type: CHECK_PERMISSION,
              payload: {
                token: '1234',
                boardId: '1',
                id: '2',
                password: null
              }
            }
          ]));
    })

    it('If data.data.grantEdit is true, Dispatch GET_POST', () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '1',
          token: "1234",
          postId: '2'
        };
        return storage[type] ? storage[type] : null;
      })
      const grantEditStore = makeStore({
        boardReducer: {
          data: {data: {grantEdit: true}},
          error: null,
          post: {
            data: null
          }
        }
      });
      render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: grantEditStore}
      );

      expect(grantEditStore.getActions())
        .toEqual(expect
          .arrayContaining([
            {
              type: GET_POST,
              payload: {
                token: '1234',
                boardId: '1',
                id: '2'
              }
            }
            ]));
    })

    it('Should fill title', async () => {
      const { getAllByPlaceholderText, getByText, getAllByText } = render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: postStore}
      );
      const titleInput = getAllByPlaceholderText('제목을 입력해주세요.')[0];
      const submitButton = getAllByText('수정')[1];

      fireEvent.change(titleInput, {target: {value: ''}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('제목을 입력해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('Should fill content', async () => {
      const history = createMemoryHistory();
      const { getByText, getAllByText, getByTestId } = render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: postStore}
      );
      const contentInput = getByTestId('content');
      const submitButton = getAllByText('수정')[1];

      fireEvent.change(contentInput, {target: {value: ''}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('내용을 입력해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If data has no error, Dispatch EDIT_POST', async () => {
      const { getAllByText } = render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: postStore}
      );
      const submitButton = getAllByText('수정')[1];
      userEvents.click(submitButton);

      expect(postStore.getActions())
        .toContainEqual(
          expect.objectContaining({
            type: EDIT_POST,
            payload: {
              body: {
                board_id: '1',
                title: 'test',
                content: 'testing'
              },
              token: '1234',
              boardId: '1',
              id: '2'
            }
          }));
    })

    it('If state.data.status is 201, Popup success register toast', async () => {
      const successStore = makeStore({
        boardReducer: {
          data: {status: 201, data: {}},
          error: null,
          post: {
            data: null
          }
        }
      })
      const { getByText } = render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: successStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글을 수정했습니다');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If state.error is true, Popup error register toast', async () => {
      const errorStore = makeStore({
        boardReducer: {
          data: null,
          error: {},
          post: {
            data: null
          }
        }
      })
      const { getByText } = render(
        <PostEditContainer history={history} match={editMatch}/>,
        {store: errorStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글 수정 중 에러가 발생했습니다.');
        expect(toast).toBeInTheDocument();
      })
    })
  })

  describe('Anonymous Board', () => {
    const anonymousEditMatch = {
      isExact: true,
      path: '/board/:type/:id',
      url: '/board/anonymous/register',
      params: {
        type: 'anonymous',
        id: 'register'
      }
    };

    it('Should have tempPassword', async () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '-1',
          postId: '2'
        };
        return storage[type] ? storage[type] : null;
      })
      render(
        <PostEditContainer history={history} match={anonymousEditMatch}/>,
        {store: defaultStore}
      );

      expect(window.alert.mock.calls).toEqual(expect.arrayContaining([['잘못된 접근입니다.']]))
      expect(history.goBack).toHaveBeenCalledTimes(1)
    })

    it('If data has no error, Dispatch CHECK_PERMISSION', () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '-1',
          token: '1234',
          postId: '2',
          tempPassword: 'admin'
        };
        return storage[type] ? storage[type] : null;
      })
      render(
        <PostEditContainer history={history} match={anonymousEditMatch}/>,
        {store: defaultStore}
      );

      expect(defaultStore.getActions())
        .toEqual(expect
          .arrayContaining([
            {
              type: CHECK_PERMISSION,
              payload: {
                token: '1234',
                boardId: '-1',
                id: '2',
                password: 'admin'
              }
            }
          ]));
    })

    it('Should fill password', async () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '-1',
          token: '1234',
          postId: '2',
          tempPassword: 'admin'
        };
        return storage[type] ? storage[type] : null;
      })
      const { getByText, getAllByText } = render(
        <PostEditContainer history={history} match={anonymousEditMatch}/>,
        {store: postStore}
      );
      const submitButton = getAllByText('수정')[1];

      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('비밀번호를 입력해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If data has no error, Dispatch REGISTER_POST', async () => {
      storageGetItemMock.mockImplementation((type) => {
        let storage = {
          boardId: '-1',
          token: '1234',
          postId: '2',
          tempPassword: 'admin'
        };
        return storage[type] ? storage[type] : null;
      })
      const { getAllByPlaceholderText, getAllByText, debug } = render(
        <PostEditContainer history={history} match={anonymousEditMatch}/>,
        {store: postStore}
      );
      const passwordInput = getAllByPlaceholderText('비밀번호를 입력해주세요.')[0];
      const submitButton = getAllByText('수정')[1];

      fireEvent.change(passwordInput, {target: {value: 'admin'}})
      userEvents.click(submitButton);
      expect(postStore.getActions())
        .toContainEqual(
          expect.objectContaining(
            {
              type: EDIT_POST,
              payload: {
                body: {
                  title: 'test',
                  content: 'testing',
                  password: 'admin'
                },
                id: '2',
                boardId: '-1'
              }
            }
          ));
    })
  })
})
