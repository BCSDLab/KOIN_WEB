import React from "react";
import { render, cleanup, screen, waitFor, waitForElement, makeStore } from '../../../lib/testUtils';
import userEvent from "@testing-library/user-event";
import SignUpContainer from "../SignUpContainer";
import { SIGNUP } from "../../../modules/auth";

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
      ["Pw must have special characters", "id", "aaa111", "aaa111", "비밀번호는 하나 이상의 특수문자가 필요합니다."],
      ["Terms and conditions must be checked", "id", "pass@word", "pass@word", "이용 약관에 모두 동의해주세요."]
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

  describe("Optional Input for sign up", () => {
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
      await userEvent.type(PwInput,"correctpw!");
      await userEvent.type(PwCheckInput,"correctpw!");

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
      ["check", "ThisIsMe", "사용가능한 닉네임입니다."],
  ])("%s", async (_, nickName, toastContext ) => {
      const store = makeStore({
        authReducer: {
          token: null,
          userInfo: null,
          data: {success: "사용 가능한 닉네임입니다.", status: 200},
          authInProgress: false,
          checkInProgress: false,
          isLoggedIn: false,
          isAvailable: true,
          error: null,
        }
      });
      const {getByPlaceholderText, getByText, getByLabelText} = render(<SignUpContainer/>, {store});
      const IdInput = getByPlaceholderText('아우누리 아이디를 입력해주세요. (필수)');
      const PwInput = getByPlaceholderText('비밀번호 (필수)');
      const PwCheckInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const CheckDuplicationButton = getByText('중복확인');
      const TermsCheckBox = getByLabelText('아래 이용약관에 모두 동의합니다.');
      const NicknameInput = getByPlaceholderText('닉네임 (선택)');

      await userEvent.type(IdInput, "correctid");
      await userEvent.type(PwInput, "correctpw!");
      await userEvent.type(PwCheckInput, "correctpw!");

      await userEvent.type(NicknameInput, nickName);

      userEvent.click(CheckDuplicationButton);

      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      });

      expect(store.getActions()).toEqual(expect.arrayContaining())
    })
  })
});
