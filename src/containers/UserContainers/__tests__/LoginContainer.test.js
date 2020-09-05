import React from "react";
import { render, cleanup, screen, waitFor, waitForElement, makeStore } from '../../../lib/testUtils';
import LoginContainer from "../LoginContainer";
import userEvent from "@testing-library/user-event";
import { login } from '../../../api/auth';
import { LOGIN } from "../../../modules/auth"

describe('<LoginContainer>',() => {

  afterEach(() =>{
    cleanup()
  });

  it.each([
    ["Id must be filled", "", "1111" , "계정명을 입력해주세요."],
    ["Pw must be filled", "aaaa", "" , "비밀번호를 입력해주세요."],
    ["Id must not be email", "aaaa@koreatech.ac.kr", "1111", "계정명은 @koreatech.ac.kr을 빼고 입력해주세요."]
  ]) ("%s" ,async (_, id, pw, toastContext) => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null,
      }
    });
    const { getByPlaceholderText, getByRole, getByText } = render(<LoginContainer/>, { store });
    const IdInput = getByPlaceholderText('아이디를 입력하세요.');
    const PwInput = getByPlaceholderText('비밀번호를 입력하세요.');
    const LoginButton = getByRole('button');

    await userEvent.type(IdInput, id);
    await userEvent.type(PwInput, pw);

    userEvent.click(LoginButton);

    await waitFor(() => {
      let toast = getByText(toastContext);
      expect(toast).toBeInTheDocument();
    });
  });

  it('Click login when filled input, dispatch LOGIN action', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null,
      }
    });
    const { getByPlaceholderText, getByRole } = render(<LoginContainer/>, { store });
    const IdInput = getByPlaceholderText('아이디를 입력하세요.');
    const PwInput = getByPlaceholderText('비밀번호를 입력하세요.');
    const LoginButton = getByRole('button');

    await userEvent.type(IdInput, "koin");
    await userEvent.type(PwInput, "1111");

    userEvent.click(LoginButton);

    expect(store.getActions()).toEqual(expect.arrayContaining([{type: LOGIN, payload: {userId: 'koin', password: '1111', lastLocation: null ,autoLoginFlag: false}}]));
  });

  it('Click login when filled input, button disabled & popup toast', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: {status: 200},
        authInProgress: true,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null,
      }
    });
    const { getByText, getByPlaceholderText } = render(<LoginContainer/>, { store });
    const IdInput = getByPlaceholderText('아이디를 입력하세요.');
    const LoginButton = IdInput.parentNode.querySelector('button');

    userEvent.click(LoginButton);
    await waitFor(() => {
      expect(LoginButton).toBeDisabled();

      let toast = getByText("성공적으로 로그인했습니다.");
      expect(toast).toBeInTheDocument();
    })
  });

  it('Click logo push to main', () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null,
      }
    });
    const { getByRole } = render(<LoginContainer/>, { store });
    const LogoImg = getByRole('img');
    expect(history.length).toBe(1);

    userEvent.click(LogoImg);
    expect(history.length).toBe(2);
  });

  it('Auto login function', async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: false,
        error: null,
      }
    });
    const { getByPlaceholderText, getByLabelText, getByRole } = render(<LoginContainer/>, { store });
    const IdInput = getByPlaceholderText('아이디를 입력하세요.');
    const PwInput = getByPlaceholderText('비밀번호를 입력하세요.');
    const checkBox = getByLabelText('자동 로그인');
    const LoginButton = getByRole('button');

    await userEvent.type(IdInput, "koin");
    await userEvent.type(PwInput, "1111");

    userEvent.click(checkBox);
    expect(checkBox.checked).toBe(true);

    userEvent.click(LoginButton);
    expect(store.getActions()).toEqual(expect.arrayContaining([{type: LOGIN, payload: {userId: 'koin', password: '1111', lastLocation: null ,autoLoginFlag: true}}]));
  })
});
