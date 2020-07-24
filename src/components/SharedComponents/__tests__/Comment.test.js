import React from 'react';
import { makeStore, render, cleanup, waitFor, fireEvent, waitForElementToBeRemoved } from '../../../lib/testUtils'
import Comment from "../Comment";
import '@testing-library/jest-dom/extend-expect';
import userEvents from "@testing-library/user-event";

let _Date;

beforeAll(() => {
  sessionStorage.setItem('boardId', 11)
  sessionStorage.setItem('token', '1234')

  window.alert = jest.fn(e => e);
  window.confirm = jest.fn(e => e);
  let mockDate = new Date("2020-01-01T00:00:00.000Z")
  _Date = global.Date

  global.Date = class extends _Date {
    constructor(...theArgs) {
      super();
      if (theArgs.length) {
        return new _Date(...theArgs);
      }
      return new _Date(mockDate);
    }

    static now() {
      return new _Date(mockDate).getTime();
    }
  }
})

describe('<Comment/>', () => {
  const editComment = jest.fn(e => e)
  const registerComment = jest.fn((e, tempInfo) => e)
  const deleteComment = jest.fn(e => e)
  const defaultStore = makeStore({})

  const history = {
    push: jest.fn()
  }

  afterEach(() => {
    history.push.mockClear()
    editComment.mockClear()
    registerComment.mockClear()
    deleteComment.mockClear()
    window.alert.mockClear()
    window.confirm.mockClear()
    cleanup()
  })
  describe('Default Board', () => {
    const specificData = {
      comment_count: 3,
      user_id: 1,
      comments: [
        {
          id: 1,
          nickname: 'koin',
          user_id: 1,
          grantEdit: false,
          grantDelete: false,
          created_at: '2019-12-30 00:00:00',
          content: 'testing'
        },
        // available to edit
        {
          id: 2,
          nickname: 'admin',
          user_id: 2,
          grantEdit: true,
          grantDelete: true,
          created_at: '2019-12-30 12:00:00',
          content: 'admin is watching'
        },
        {
          id: 3,
          nickname: 'user',
          user_id: 3,
          grantEdit: false,
          grantDelete: false,
          created_at: '2019-12-30 23:00:00',
          content: 'he is not thinking'
        },
      ]
    }
    sessionStorage.setItem('boardId', 1)

    it('Should login', async () => {
      sessionStorage.removeItem('token')
      sessionStorage.setItem('userInfo', null)

      const { getByRole } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment}/>,
        {store: defaultStore}
      )

      const registerInput = getByRole('textbox');

      await userEvents.click(registerInput)
      expect(window.confirm.mock.calls).toEqual(expect.arrayContaining([['로그인해야 작성하실 수 있습니다. 로그인하시겠습니까?']]))

      expect(history.push.mock.calls).toEqual(expect.arrayContaining([['/login']]))
    })

    it('Should nickname required', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: null
      }))

      const { getByRole } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment} />,
        {store: defaultStore}
      )

      const registerInput = getByRole('textbox');

      await userEvents.click(registerInput)
      expect(window.alert.mock.calls).toEqual(expect.arrayContaining([['닉네임이 필요합니다.']]))

      expect(history.push.mock.calls).toEqual(expect.arrayContaining([['/modifyinfo']]))
    })

    it('Should content required', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getByText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment} />,
        {store: defaultStore}
      )
      const registerButton = getByText('등록');

      await userEvents.click(registerButton)

      await waitFor(() => {
        const toast = getByText('내용을 입력해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('dispatch registerComment', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getByRole, getByText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment} />,
        {store: defaultStore}
      )

      const registerInput = getByRole('textbox');
      const registerButton = getByText('등록');

      fireEvent.change(registerInput, {target: {value: 'test for comment'}})
      await userEvents.click(registerButton)
      expect(registerComment.mock.calls).toEqual(expect.arrayContaining([['test for comment']]))
    })

    it('not dispatch editComment', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getAllByRole, getByText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment} />,
        {store: defaultStore}
      )
      const editButton = getByText('수정');
      await userEvents.click(editButton)

      const editInput = getAllByRole('textbox')[0];
      fireEvent.change(editInput, {target: {value: 'test for comment'}})

      const cancelButton = getByText('취소');
      await userEvents.click(cancelButton)
      expect(getByText('admin is watching')).toBeInTheDocument();
    })

    it('dispatch editComment', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getAllByRole, getByText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment} />,
        {store: defaultStore}
      )
      const editButton = getByText('수정');
      await userEvents.click(editButton)

      const editInput = getAllByRole('textbox')[0];
      fireEvent.change(editInput, {target: {value: 'test for comment'}})

      const editButtonForEdit = getByText('수정');
      await userEvents.click(editButtonForEdit)
      expect(editComment.mock.calls).toEqual(expect.arrayContaining([[2, 'test for comment']]))
    })

    it('dispatch deleteComment', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getByRole } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment} />,
        {store: defaultStore}
      )
      const deleteButton = getByRole('img')

      await userEvents.click(deleteButton)

      expect(deleteComment.mock.calls).toEqual(expect.arrayContaining([[2]]))
    })
  })

  describe('Anonymous Board', () => {
    const specificData = {
      comment_count: 3,
      user_id: 1,
      comments: [
        {
          id: 1,
          nickname: 'koin',
          grantEdit: false,
          grantDelete: false,
          created_at: '2019-12-30 00:00:00',
          content: 'testing'
        },
        // available to edit
        {
          id: 2,
          nickname: 'admin',
          grantEdit: true,
          grantDelete: true,
          created_at: '2019-12-30 12:00:00',
          content: 'admin is watching'
        },
        {
          id: 3,
          nickname: 'user',
          grantEdit: false,
          grantDelete: false,
          created_at: '2019-12-30 23:00:00',
          content: 'he is not thinking'
        },
      ]
    }

    it.each([
      ['Should nickname required', '', '닉네임을 입력해주세요.'],
      ['Should not nickname.length more than 10', 'AdminForKoin', '닉네임은 10글자 이하여야 합니다.'],
      ['Should password required', 'admin', '비밀번호를 입력해주세요.'],
    ])('%s', async (_, nicknameData, toastContext) => {
      sessionStorage.setItem('boardId', -1)

      const { getAllByRole, getByText, getByPlaceholderText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment}
          isAnonymousFlag={true} />,
        {store: defaultStore}
      )
      const nicknameInput = getByPlaceholderText('댓글 닉네임');
      const registerInput = getAllByRole('textbox')[1];
      const registerButton = getByText('등록');

      await userEvents.type(nicknameInput, nicknameData)
      fireEvent.change(registerInput, {target: {value: 'test for comment'}})
      await userEvents.click(registerButton)
      await waitFor(() => {
        const toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      })
    })

    it('dispatch registerComment', async () => {
      sessionStorage.setItem('boardId', -1)
      const { getAllByRole, getByText, getByPlaceholderText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment}
          isAnonymousFlag={true} />,
        {store: defaultStore}
      )
      const nicknameInput = getByPlaceholderText('댓글 닉네임');
      const passwordInput = getByPlaceholderText('댓글 비밀번호');
      const registerInput = getAllByRole('textbox')[1];
      const registerButton = getByText('등록');

      fireEvent.change(nicknameInput, {target: {value: 'admin'}})
      fireEvent.change(passwordInput, {target: {value: 'koin'}})
      fireEvent.change(registerInput, {target: {value: 'test for comment'}})
      await userEvents.click(registerButton)

      expect(registerComment.mock.calls).toEqual(expect
        .arrayContaining([
          [
            'test for comment',
            {
              nickname: 'admin',
              password: 'koin'
            }
          ]]))
    })

    it('dispatch editComment', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getAllByRole, getAllByText, getByText, getByPlaceholderText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment}
          isAnonymousFlag={true} />,
        {store: defaultStore}
      )
      const editButton = getAllByText('수정')[1];
      await userEvents.click(editButton)

      const passwordInput = getByPlaceholderText('비밀번호를 입력해주세요');
      const editInput = getAllByRole('textbox')[0];
      fireEvent.change(editInput, {target: {value: 'test for comment'}})
      fireEvent.change(passwordInput, {target: {value: 'koin'}})

      const editButtonForEdit = getAllByText('수정')[1];
      await userEvents.click(editButtonForEdit)
      expect(editComment.mock.calls).toEqual(expect.arrayContaining([[2, 'test for comment', 'koin']]))
    })


    it('dispatch deleteComment', async () => {
      sessionStorage.setItem('token', '1234')
      sessionStorage.setItem('userInfo', JSON.stringify({
        portal_account: 'koin',
        nickname: 'admin'
      }))

      const { getAllByText, getByText, getByPlaceholderText } = render(
        <Comment
          history={history}
          specificData={specificData}
          editComment={editComment}
          registerComment={registerComment}
          deleteComment={deleteComment}
          isAnonymousFlag={true} />,
        {store: defaultStore}
      )
      const editButton = getAllByText('수정')[1];
      await userEvents.click(editButton)

      const passwordInput = getByPlaceholderText('비밀번호를 입력해주세요');
      fireEvent.change(passwordInput, {target: {value: 'koin'}})

      const deleteButton = getByText('삭제');
      await userEvents.click(deleteButton)
      expect(deleteComment.mock.calls).toEqual(expect.arrayContaining([[2, 'koin']]))
    })
  })
})
