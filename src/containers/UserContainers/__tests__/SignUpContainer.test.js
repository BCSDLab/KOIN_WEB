import React from "react";
import { render, cleanup, screen, waitFor, waitForElement, makeStore } from '../../../lib/testUtils';
import userEvent from "@testing-library/user-event";
import SignUpContainer from "../SignUpContainer";
import { SIGNUP, CHECK_NICKNAME } from "../../../modules/auth";

describe('<SignUpContainer>', () => {

  afterEach(() =>{
    cleanup()
  });

  describe("Required input for sign up", () => {
    it.each([
      ["Id must be filled", "", "pw", "pw", "필수정보는 반드시 입력해야 합니다."],
      ["Pw must be filled", "id", "", "pw", "필수정보는 반드시 입력해야 합니다."],
      ["Pw check must be filled", "id", "pw", "", "필수정보는 반드시 입력해야 합니다."],
      ["Id must be shorter than 13", "1234567890123", "pw", "pw", "아우누리 계정 형식이 아닙니다."],
      ["Id must not be local email", "123@koreatech.ac.kr", "pw", "pw", "계정명은 @koreatech.ac.kr을 빼고 입력해주세요."],
      ["Pw must be more than 6 and less than 18", "id", "1!", "1!", "비밀번호는 6자 이상 18자 이하여야 합니다."],
      ["PwCheck must the same as Pw", "id", "123456!", "123456!@", "입력하신 비밀번호가 일치하지 않습니다."],
      ["Pw must have special characters", "id", "aaa111", "aaa111", "비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 사용해야 합니다."],
      ["Terms and conditions must be checked", "id", "pass@123", "pass@123", "이용 약관에 모두 동의해주세요."]
    ]) ("%s", async (_, id, pw, pwc, toastContext) => {
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
      const { getByPlaceholderText, getByText } = render(<SignUpContainer/>, { store });
      const IdInput = getByPlaceholderText('아우누리 아이디를 입력해주세요. (필수)');
      const PwInput = getByPlaceholderText('비밀번호 (필수)');
      const PwCheckInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const SignUpButton = getByText('회원가입');

      await userEvent.type(IdInput,id);
      await userEvent.type(PwInput,pw);
      await userEvent.type(PwCheckInput,pwc);

      userEvent.click(SignUpButton);

      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      });
    });
  });

  describe("Optional input for sign up", () => {
    it.each([
      ["Check terms and conditions", "nick", "", "", "닉네임 중복확인을 해주세요."],
      ["StudentNumber must be 10-digit number", "", "123", "", "학번은 열자리 숫자여야 합니다."],
      ["Admission year must be more than 1992", "", "1000000000", "", "올바른 입학년도가 아닙니다."],
      ["Department code must be valid", "", "2000123456", "", "올바른 학부코드가 아닙니다."],
      ["PhoneNumber must include '-'", "", "", "01011112222", "전화번호 양식을 지켜주세요. (Ex: 010-0000-0000)"],
    ])("%s", async (_, nickName, studentNumber, phoneNumber, toastContext ) => {
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
      const { getByPlaceholderText, getByText, getByLabelText } = render(<SignUpContainer/>, { store });
      const IdInput = getByPlaceholderText('아우누리 아이디를 입력해주세요. (필수)');
      const PwInput = getByPlaceholderText('비밀번호 (필수)');
      const PwCheckInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const SignUpButton = getByText('회원가입');
      const TermsCheckBox = getByLabelText('아래 이용약관에 모두 동의합니다.');
      const NicknameInput = getByPlaceholderText('닉네임 (선택)');
      const StudentNumberInput = getByPlaceholderText('학번 (선택)');
      const PhoneNumberInput = getByPlaceholderText('전화번호 (Ex: 010-0000-0000) (선택)');

      await userEvent.type(IdInput,"correctid");
      await userEvent.type(PwInput,"pass@123");
      await userEvent.type(PwCheckInput,"pass@123");

      await userEvent.type(NicknameInput, nickName);
      await userEvent.type(StudentNumberInput, studentNumber);
      await userEvent.type(PhoneNumberInput, phoneNumber);

      userEvent.click(TermsCheckBox);
      userEvent.click(SignUpButton);

      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      });
    })
  });

  describe("Dispatch duplicated nickname check", () => {
    it.each([
      ["'admin' cannot be user's nickname", "admin", "사용할 수 없는 닉네임입니다.", true],
      ["If nickname is not duplicated, check success", "ThisIsMe", "사용가능한 닉네임입니다.", true],
      ["If nickname is duplicated, check failed", "ThisIsMe", "사용 불가능한 닉네임입니다.", false],
  ])("%s", async (_, nickname, toastContext, available ) => {
      const store = makeStore({
        authReducer: {
          token: null,
          userInfo: null,
          data: available? {status: 200} : null,
          authInProgress: false,
          checkInProgress: false,
          isLoggedIn: false,
          isAvailable: available,
          error: null,
          nicknameCheckError: available ? null :{status: 409}
        }
      });
      const { getByPlaceholderText, getByText } = render(<SignUpContainer/>, {store});
      const IdInput = getByPlaceholderText('아우누리 아이디를 입력해주세요. (필수)');
      const PwInput = getByPlaceholderText('비밀번호 (필수)');
      const PwCheckInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const CheckDuplicationButton = getByText('중복확인');
      const NicknameInput = getByPlaceholderText('닉네임 (선택)');

      await userEvent.type(IdInput, "correctid");
      await userEvent.type(PwInput, "pass@123");
      await userEvent.type(PwCheckInput, "pass@123");

      await userEvent.type(NicknameInput, nickname);

      userEvent.click(CheckDuplicationButton);

      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      });
      if(nickname !== 'admin') {
        expect(store.getActions()).toEqual(expect.arrayContaining([{
          type: CHECK_NICKNAME,
          payload: {nickname: nickname}
        }]))
      }
    })
  });

  it("Dispatch sign up action with full input", async () => {
    const store = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: {status: 201},
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: true,
        error: null,
      }
    });
    const { getByPlaceholderText, getByText, getByLabelText } = render(<SignUpContainer/>, {store});
    const IdInput = getByPlaceholderText('아우누리 아이디를 입력해주세요. (필수)');
    const PwInput = getByPlaceholderText('비밀번호 (필수)');
    const PwCheckInput = getByPlaceholderText('비밀번호 확인 (필수)');
    const NameInput = getByPlaceholderText('이름 (선택)');
    const NicknameInput = getByPlaceholderText('닉네임 (선택)');
    const StudentNumberInput = getByPlaceholderText('학번 (선택)');
    const PhoneNumberInput = getByPlaceholderText('전화번호 (Ex: 010-0000-0000) (선택)');
    const TermsCheckBox = getByLabelText('아래 이용약관에 모두 동의합니다.');
    const SignUpButton = getByText('회원가입');

    await userEvent.type(IdInput, "correctid");
    await userEvent.type(PwInput, "pass@123");
    await userEvent.type(PwCheckInput, "pass@123");
    await userEvent.type(NameInput, "김김김");
    await userEvent.type(NicknameInput, "nick");
    await userEvent.type(StudentNumberInput, "2020136999");
    await userEvent.type(PhoneNumberInput, "010-0000-0000");

    userEvent.click(TermsCheckBox);
    userEvent.click(SignUpButton);

    expect(store.getActions()).toEqual(expect.arrayContaining([{
      type: SIGNUP,
      payload: {
        gender: undefined,
        identity: 0,
        is_graduated: false,
        major: "컴퓨터공학부",
        name: "김김김",
        nickname: "nick",
        password: "pass@123",
        phone_number: "010-0000-0000",
        portal_account: "correctid",
        student_number: "2020136999",
      }
    }]))

    await waitFor(() => {
      let toast = getByText("아우누리 이메일로 인증 메일을 발송했습니다. 확인 부탁드립니다.");
      expect(toast).toBeInTheDocument();
    });
  })
});
