import React from 'react';
import { makeStore, render, cleanup } from '../../../lib/testUtils'
import ButtonGroup from '../ButtonGroup';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import userEvents from "@testing-library/user-event";

let storageGetItemMock;

beforeAll(() => {
  storageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');
  window.alert = jest.fn(e => e);
})

describe('<ButtonGroup/>', () => {
  const history = {
    push: jest.fn()
  }
  const handleClickEditButton = jest.fn()
  const handleClickDeleteButton = jest.fn()
  const defaultStore = makeStore()

  afterEach(() => {
    history.push.mockClear()
    handleClickDeleteButton.mockClear()
    handleClickEditButton.mockClear()
    cleanup()
  })

  describe('Default Board', () => {
    describe('List Page', () => {
      const defaultMatch = {
        isExact: true,
        path: '/board/:type',
        url: '/board/free',
        params: {
          type: 'free'
        }
      };

      it.each([
        ['Should Login to register article', null, '로그인이 필요합니다.', '/login'],
        ['Should have nickname to register article', {portal_account: 'koin'}, '닉네임이 필요합니다.', '/modifyinfo'],
        ['Should enter /register', {portal_account: 'koin', nickname: 'admin'}, null, '/board/free/register']
      ]) ('%s', (_, userInfo, alertText, routingURL) => {
        const { getByText } = render(
          <ButtonGroup
            match={defaultMatch}
            history={history}
            onClickEditButton={handleClickEditButton}
            onClickDeleteButton={handleClickDeleteButton}/>,
          {store: defaultStore}
        )
        const routingButton = getByText('글쓰기');
        storageGetItemMock.mockImplementation((type) => {
          let storage = {
            boardId: '1',
            userInfo: userInfo ? JSON.stringify(userInfo) : null
          };
          return storage[type] ? storage[type] : null;
        })
        userEvents.click(routingButton);
        if(alertText) {
          expect(window.alert.mock.calls).toEqual(expect.arrayContaining([[alertText]]))
        }
        expect(history.push.mock.calls).toEqual(expect.arrayContaining([[routingURL]]))

      });
    })

    describe('Detail Page', () => {
      const defaultMatch = {
        isExact: false,
        path: '/board/:type/:id',
        url: '/board/free/1',
        params: {
          type: 'free',
          id: '1'
        }
      };

      it('Should have Routing Button to list', () => {
        const { getByText } = render(
          <ButtonGroup
            match={defaultMatch}
            history={history}
            onClickEditButton={handleClickEditButton}
            onClickDeleteButton={handleClickDeleteButton}
            isMyPost={true}/>,
          {store: defaultStore}
        )
        const routingButton = getByText('목록으로');
        storageGetItemMock.mockImplementation((type) => {
          let storage = {
            boardId: '1'
          };
          return storage[type] ? storage[type] : null;
        })

        userEvents.click(routingButton)

        expect(history.push.mock.calls).toEqual(expect.arrayContaining([['/board/free']]))
      });

      it('If post is yours, Should have edit/delete button', () => {
        const { getByText, getByPlaceholderText } = render(
          <ButtonGroup
            match={defaultMatch}
            history={history}
            onClickEditButton={handleClickEditButton}
            onClickDeleteButton={handleClickDeleteButton}
            isMyPost={true}/>,
          {store: defaultStore}
        )
        storageGetItemMock.mockImplementation((type) => {
          let storage = {
            boardId: '1'
          };
          return storage[type] ? storage[type] : null;
        })

        const editButton = getByText('수정');
        const deleteButton = getByText('삭제');
        expect(editButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument();
      });
    })
  })

  describe('Anonymous Board', () => {
    describe('List Page', () => {
      const defaultMatch = {
        isExact: false,
        path: '/board/:type',
        url: '/board/anonymous',
        params: {
          type: 'anonymous'
        }
      };

      it('Should enter /register', () => {
        storageGetItemMock.mockImplementation((type) => {
          let storage = {
            boardId: '-1'
          };
          return storage[type] ? storage[type] : null;
        })
        const { getByText } = render(
          <ButtonGroup
            match={defaultMatch}
            history={history}
            onClickEditButton={handleClickEditButton}
            onClickDeleteButton={handleClickDeleteButton}/>,
          {store: defaultStore}
        )
        const routingButton = getByText('글쓰기');

        userEvents.click(routingButton);
        expect(history.push.mock.calls).toEqual(expect.arrayContaining([['/board/anonymous/register']]))

      });
    })

    describe('Detail Page', () => {
      const defaultMatch = {
        path: '/board/:type/:id',
        url: '/board/anonymous/1',
        params: {
          type: 'anonymous',
          id: '1'
        }
      };

      it('Should have Routing Button to list', () => {
        storageGetItemMock.mockImplementation((type) => {
          let storage = {
            boardId: '-1'
          };
          return storage[type] ? storage[type] : null;
        })
        const { getByText, getByPlaceholderText } = render(
          <ButtonGroup
            match={defaultMatch}
            history={history}
            onClickEditButton={handleClickEditButton}
            onClickDeleteButton={handleClickDeleteButton}
            isMyPost={true}/>,
          {store: defaultStore}
        )

        const passwordInput = getByPlaceholderText('게시글 비밀번호');
        const editButton = getByText('수정');
        const deleteButton = getByText('삭제');
        expect(passwordInput).toBeInTheDocument()
        expect(editButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument();
      })
    })
  })

  describe('Promotion Board', () => {
    describe('List Page', () => {
      const defaultMatch = {
        isExact: true,
        path: '/board/:type',
        url: '/board/promotion',
        params: {
          type: 'promotion'
        }
      };

      it.each([
        ['Should Login to register article', null, '로그인이 필요합니다.', '/login'],
        ['Should identity is 5 to register article', {portal_account: 'koin'}, '점주만이 홍보게시물을 작성할 수 있습니다.', null],
        ['Should enter /register', {portal_account: 'koin', identity: 5}, null, '/board/promotion/register']
      ]) ('%s', (_, userInfo, alertText, routingURL) => {
        const { getByText } = render(
          <ButtonGroup
            match={defaultMatch}
            history={history}
            onClickEditButton={handleClickEditButton}
            onClickDeleteButton={handleClickDeleteButton}/>,
          {store: defaultStore}
        )
        const routingButton = getByText('글쓰기');
        storageGetItemMock.mockImplementation((type) => {
          let storage = {
            boardId: '11',
            userInfo: userInfo ? JSON.stringify(userInfo) : null
          };
          return storage[type] ? storage[type] : null;
        })
        userEvents.click(routingButton);
        if(alertText) {
          expect(window.alert.mock.calls).toEqual(expect.arrayContaining([[alertText]]))
        }
        if(routingURL) {
          expect(history.push.mock.calls).toEqual(expect.arrayContaining([[routingURL]]))
        }
      });
    })
  })
})
