import React from 'react';
import {makeStore, render, cleanup, waitFor, makeRealStore} from '../../../lib/testUtils'
import FindPasswordContainer from "../FindPasswordContainer";
import '@testing-library/jest-dom/extend-expect';
import userEvents from "@testing-library/user-event";
import { FIND_PASSWORD, FIND_PASSWORD_SUCCESS, FIND_PASSWORD_ERROR } from "../../../modules/auth";

describe('<FindPasswordContainer/>', () => {
  afterEach(() => {
    cleanup();
  })

  it.each([
    ['Account name must not be email', 'admin@koreatech.ac.kr', '계정명은 @koreatech.ac.kr을 빼고 입력해주세요.'],
    ['Account name must match regex', 'admin-koin', '아우누리 계정 형식이 아닙니다.'],
    ['Input must be filled', '         ', '계정명을 입력해주세요.']
  ])('%s', async (_, input, toastContext) => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null
      }
    });
    const { getByRole, getByPlaceholderText, getByText } = render(<FindPasswordContainer/>, { store });
    const accountNameInput = getByPlaceholderText('아우누리 ID를 입력해주세요.');
    const submitButton = getByRole('button');

    await userEvents.type(accountNameInput, input)
    userEvents.click(submitButton);
    jest.setTimeout(1000);
    await waitFor(() => {
      let toast = getByText(toastContext);
      expect(toast).toBeInTheDocument()
    });
  }, 20000)

  it('If account name match regex, Dispatch FIND_PASSWORD', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null
      }
    });
    const { getByRole, getByPlaceholderText } = render(<FindPasswordContainer/>, { store });
    const accountNameInput = getByPlaceholderText('아우누리 ID를 입력해주세요.');
    const submitButton = getByRole('button');

    await userEvents.type(accountNameInput, 'koin');
    userEvents.click(submitButton);
    expect(store.getActions()).toEqual(expect.arrayContaining([{type: FIND_PASSWORD, payload: {userId: 'koin'}}]));
  })

  it('If authInProgress is true, Disable button', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: true,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null
      }
    });
    const { getByRole } = render(<FindPasswordContainer/>, { store });
    const submitButton = getByRole('button');

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    });
  })

  it('If state has data, Popup success toast', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: {status: 201, data: {success: "send authenticate mail to your account email"}},
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null
      }
    });
    const { getByPlaceholderText, getByText, getByRole } = render(<FindPasswordContainer/>, { store });
    const accountNameInput = getByPlaceholderText('아우누리 ID를 입력해주세요.');
    const submitButton = accountNameInput.parentNode.querySelector('button');

    await waitFor(() => {
      let toast = getByText('비밀번호 초기화 메일을 전송했습니다. 아우누리에서 확인해주세요.');
      expect(toast).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    });
  })

  it('If state has 404 error, Popup error toast', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: {status: 404, data: {error: {code: 0, message: "invalid authenticate"}}}
      }
    });
    const { getByText } = render(<FindPasswordContainer/>, { store });

    await waitFor(() => {
      let toast = getByText('존재하지 않는 계정입니다.');
      expect(toast).toBeInTheDocument()
    });
  })
});
