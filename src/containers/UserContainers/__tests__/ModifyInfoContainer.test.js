import React from 'react';
import { makeStore, render, cleanup, waitFor, fireEvent } from '../../../lib/testUtils'
import ModifyInfoContainer from "../ModifyInfoContainer";
import '@testing-library/jest-dom/extend-expect';
import userEvents from "@testing-library/user-event";
import {CHECK_NICKNAME, MODIFY_INFO, WITHDRAW} from "../../../modules/auth";

beforeAll(() => {
  if (!jest.isMockFunction(Storage.prototype.getItem)) {
    Storage.prototype.getItem = jest.fn()
  }
})

describe('<ModifyInfoContainer/>', () => {

  const defaultStore = makeStore({
    authReducer: {
      token: null,
      userInfo: null,
      data: null,
      authInProgress: false,
      checkInProgress: false,
      isLoggedIn: false,
      isAvailable: false,
      error: null,
      nicknameCheckError: null
    }
  });

  afterEach(() => {
    defaultStore.clearActions();
    cleanup();
  })

  describe('Common Data', () => {


    it('If password and passwordConfirm is empty, Skip Change Password', async () => {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin'
      }));

      const { getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const submitButton = getByText('정보수정');

      userEvents.click(submitButton);

      await waitFor(() => {
        let toast = getByText('기존 비밀번호가 그대로 사용됩니다.');
        expect(toast).toBeInTheDocument()
      });
    })

    it.each([
      ['Should be same password and password', 'temp', 'temp1'],
      ['Should fill password', 'temp', ''],
      ['Should fill passwordConfirm', '', 'temp'],
    ]) ('%s', async (_, password, passwordConfirm) => {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin'
      }));
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const passwordInput = getByPlaceholderText('비밀번호 (필수)');
      const passwordConfirmInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const submitButton = getByText('정보수정');

      await userEvents.type(passwordInput, password);
      await userEvents.type(passwordConfirmInput, passwordConfirm);
      expect(passwordInput.style.border).toBe('2px solid red');

      userEvents.click(submitButton);

      await waitFor(() => {
        let toast = getByText('입력하신 비밀번호가 일치하지 않습니다.');
        expect(toast).toBeInTheDocument()
      });
    })


    it.each([
      ['Should be pasword length more than 6', 'temp', '비밀번호는 6자 이상 18자 이하여야 합니다.'],
      ['Should be pasword length less than 18', 'tempPasswordIsworkingOn', '비밀번호는 6자 이상 18자 이하여야 합니다.'],
      ['Should password contain number', 'temps_', '비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 사용해야 합니다.'],
      ['Should password contain english', '123456_', '비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 사용해야 합니다.'],
      ['Should password contain special character', 'temp123', '비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 사용해야 합니다.'],
    ]) ('%s', async (_, password, toastContext) =>  {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin'
      }));
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const passwordInput = getByPlaceholderText('비밀번호 (필수)');
      const passwordConfirmInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const submitButton = getByText('정보수정');
      await userEvents.type(passwordInput, password);
      await userEvents.type(passwordConfirmInput, password);
      userEvents.click(submitButton);
      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument()
      });
    })


    it('Should phone number match regex', async () => {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin'
      }));
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const phoneNumberInput = getByPlaceholderText('전화번호 (Ex: 010-0000-0000) (선택)');
      const submitButton = getByText('정보수정');

      await userEvents.type(phoneNumberInput, '01012345678');

      userEvents.click(submitButton);

      await waitFor(() => {
        let toast = getByText('전화번호 양식을 지켜주세요. (Ex: 010-0000-0000)');
        expect(toast).toBeInTheDocument()
      });
    })

    it('Should fill nickname if nickname existed', async () => {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin',
        nickname: 'koin',
      }));
      const { getByPlaceholderText, getByText, getAllByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const nicknameInput = getByPlaceholderText('닉네임 (선택)');
      const duplicateCheckButton = getByText('중복확인');
      const submitButton = getByText('정보수정');

      fireEvent.change(nicknameInput,{target: {value: ''}})

      userEvents.click(duplicateCheckButton);
      userEvents.click(submitButton);

      await waitFor(() => {
        let toasts = getAllByText('닉네임을 입력해주세요.');
        expect(toasts).toHaveLength(2)
        for(let toast of toasts) {
          expect(toast).toBeInTheDocument()
        }
      });
    })

    it('Should duplicate check if nickname is not same', async () => {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin',
        nickname: 'koin',
      }));
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const nicknameInput = getByPlaceholderText('닉네임 (선택)');
      const submitButton = getByText('정보수정');

      fireEvent.change(nicknameInput,{target: {value: 'koreatech'}})

      userEvents.click(submitButton);

      await waitFor(() => {
        let toast = getByText('닉네임 중복확인을 해주세요.');
        expect(toast).toBeInTheDocument()
      });
    })

    it.each([
      ['Should not be nickname admin or 관리자', 'admin', '사용할 수 없는 닉네임입니다.'],
      ['Should be different nickname from before', 'koin', '기존에 등록한 닉네임입니다.'],
    ]) ('%s', async (_, nickname, toastContext) => {
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin',
        nickname: 'koin',
      }));
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const nicknameInput = getByPlaceholderText('닉네임 (선택)');
      const duplicateCheckButton = getByText('중복확인');

      fireEvent.change(nicknameInput,{target: {value: nickname}})

      userEvents.click(duplicateCheckButton);

      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument()
      });
    });

    describe('Common Dispatch Check', () => {
      it('If click withdraw button, Dispatch WITHDRAW', () => {
        Storage.prototype.getItem.mockReturnValue(JSON.stringify({
          // requiredValue
          portal_account: 'koin',
          nickname: 'koin',
        }));
        const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
        const withdrawButton = getByText('회원탈퇴');
        Storage.prototype.getItem.mockReturnValue('1234');
        window.confirm = jest.fn().mockReturnValue(true)
        userEvents.click(withdrawButton);

        expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{type: WITHDRAW, payload: {token: '1234'}}]));
      });

      it('If nickname has no error, Dispatch CHECK_NICKNAME', () => {
        Storage.prototype.getItem.mockReturnValue(JSON.stringify({
          // requiredValue
          portal_account: 'koin',
          nickname: 'koin',
        }));
        const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
        const nicknameInput = getByPlaceholderText('닉네임 (선택)');
        const duplicateCheckButton = getByText('중복확인');

        fireEvent.change(nicknameInput,{target: {value: 'nickname'}})
        userEvents.click(duplicateCheckButton);

        expect(defaultStore.getActions()).toEqual(expect.arrayContaining([{type: CHECK_NICKNAME, payload: {nickname: 'nickname'}}]));
      });
    })

    describe('Common Response Check', () => {
      it.each([
        ['If state.data.success is true, Popup success delete toast', {data: {success: true}}, '성공적으로 탈퇴했습니다.'],
        ['If state.data.success has object, Popup success nickname toast', {data: {success: {}}}, '사용가능한 닉네임입니다.'],
        ['If state.data has status, Popup success change toast', {status: 201, data: {}}, '성공적으로 회원정보를 수정했습니다.'],
      ]) ('%s', async (_, data, toastContext) => {
        const errorStore = makeStore({
          authReducer: {
            token: null,
            userInfo: null,
            data: data,
            authInProgress: false,
            checkInProgress: false,
            isLoggedIn: false,
            isAvailable: false,
            error: null,
            nicknameCheckError: null
          }
        });
        Storage.prototype.getItem.mockReturnValue(JSON.stringify({
          // requiredValue
          portal_account: 'koin'
        }));
        const { getByText } = render(<ModifyInfoContainer/>, {store: errorStore});

        await waitFor(() => {
          let toast = getByText(toastContext);
          expect(toast).toBeInTheDocument()
        });
      })
      it.each([
        ['If state has 401 error, Popup error toast', 'error', 401, '존재하지 않는 계정입니다.'],
        ['If state has 422 error, Popup error toast', 'error', 422, '형식에 맞지 않는 데이터가 있습니다.'],
        ['If state has 409 nickname error, Popup error toast', 'nicknameCheckError', 409, '사용 불가능한 닉네임입니다.'],
        ['If state has 412 nickname error, Popup error toast', 'nicknameCheckError', 412, '올바르지 않은 닉네임 형식입니다.'],
      ]) ('%s', async (_, errorType, errorStatus, toastContext) => {
        const customState = {
          authReducer: {
            token: null,
            userInfo: null,
            data: null,
            authInProgress: false,
            checkInProgress: false,
            isLoggedIn: false,
            isAvailable: false,
            error: null,
            nicknameCheckError: null
          }
        };
        customState.authReducer[errorType] = {status: errorStatus, data: {error: {}}};
        const errorStore = makeStore(customState);
        Storage.prototype.getItem.mockReturnValue(JSON.stringify({
          // requiredValue
          portal_account: 'koin'
        }));
        const { getByText } = render(<ModifyInfoContainer/>, {store: errorStore});

        await waitFor(() => {
          let toast = getByText(toastContext);
          expect(toast).toBeInTheDocument()
        });
      })
    })


  });

  describe('If user is Student', () => {
    let DateGetFullYear = Date.prototype.getFullYear;
    beforeAll(() => {
      Date.prototype.getFullYear = jest.fn();
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin',
        identity: 1,
        nickname: 'koin',
        is_graduated: false,
      }));
    })

    afterAll(() => {
      Date.prototype.getFullYear = DateGetFullYear
    })

    it.each([
      ['Should be studentNumber length is 10', '12345678910', '학번은 열자리 숫자여야 합니다.'],
      ['Should be year in studentNumber more than 1992', '1991136001', '올바른 입학년도가 아닙니다.'],
      ['Should not be year in studentNumber more than now(2019)', '2020136001', '올바른 입학년도가 아닙니다.'],
      ['Should be match studentNumber regex', '2019222001', '올바른 학부코드가 아닙니다.'],
    ]) ('%s', async (_, studentNumber , toastContext) => {
      Date.prototype.getFullYear.mockReturnValue(2019)
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: defaultStore});
      const studentNumberInput = getByPlaceholderText('학번 (선택)');
      const submitButton = getByText('정보수정');

      fireEvent.change(studentNumberInput,{target: {value: studentNumber}})

      userEvents.click(submitButton);

      await waitFor(() => {
        let toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      });
    })

    it('If data has no error, Dispatch MODIFY_INFO', () => {
      const nicknameCheckedStore = makeStore({
        authReducer: {
          token: null,
          userInfo: null,
          data: null,
          authInProgress: false,
          checkInProgress: false,
          isLoggedIn: false,
          isAvailable: true,
          error: null,
          nicknameCheckError: null
        }
      });
      Date.prototype.getFullYear.mockReturnValue(2019)
      const { getByPlaceholderText, getByText, debug } = render(<ModifyInfoContainer/>, {store: nicknameCheckedStore});
      const passwordInput = getByPlaceholderText('비밀번호 (필수)');
      const passwordConfirmInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const nameInput = getByPlaceholderText('이름 (선택)');
      const studentNumberInput = getByPlaceholderText('학번 (선택)');
      const phoneNumberInput = getByPlaceholderText('전화번호 (Ex: 010-0000-0000) (선택)');
      const genderDropdown = getByText('성별');
      const genderDropdownMaleItem = getByText('남');
      const submitButton = getByText('정보수정');

      fireEvent.change(passwordInput,{target: {value: 'asdf1234!'}})
      fireEvent.change(passwordConfirmInput,{target: {value: 'asdf1234!'}})
      fireEvent.change(nameInput,{target: {value: '한기대'}})
      fireEvent.change(studentNumberInput,{target: {value: '2019136001'}})
      fireEvent.change(phoneNumberInput,{target: {value: '010-1234-5678'}})
      fireEvent.mouseOver(genderDropdown)
      expect(genderDropdownMaleItem).toBeVisible()
      fireEvent.click(genderDropdownMaleItem)
      fireEvent.mouseLeave(genderDropdownMaleItem)
      expect(genderDropdownMaleItem).not.toBeVisible()
      Storage.prototype.getItem.mockReturnValue('1234');
      userEvents.click(submitButton);

      expect(nicknameCheckedStore.getActions())
        .toEqual(expect
          .arrayContaining(
            [
              {
                type: MODIFY_INFO,
                payload: {
                  token: '1234',
                  userInfo: {
                    portal_account: 'koin',
                    password: 'asdf1234!',
                    name: '한기대',
                    major: '컴퓨터공학부',
                    nickname: 'koin',
                    gender: 0,
                    student_number: '2019136001',
                    phone_number: '010-1234-5678',
                    identity: 1,
                    is_graduated: false,
                    email: undefined
                  }
                }
              }]));
    })
  });

  describe('if user is Owner', () => {
    const nicknameCheckedStore = makeStore({
      authReducer: {
        token: null,
        userInfo: null,
        data: null,
        authInProgress: false,
        checkInProgress: false,
        isLoggedIn: false,
        isAvailable: true,
        error: null,
        nicknameCheckError: null
      }
    });
    beforeAll(() => {
      Date.prototype.getFullYear = jest.fn();
      Storage.prototype.getItem.mockReturnValue(JSON.stringify({
        // requiredValue
        portal_account: 'koin',
        identity: 5,
      }));
    })

    it('Should match email regex', async () => {
      Date.prototype.getFullYear.mockReturnValue(2019)
      const { getByPlaceholderText, getByText } = render(<ModifyInfoContainer/>, {store: nicknameCheckedStore});
      const emailInput = getByPlaceholderText('이메일 등록');
      const submitButton = getByText('정보수정');

      fireEvent.change(emailInput,{target: {value: 'asdf'}})

      userEvents.click(submitButton);

      await waitFor(() => {
        let toast = getByText('이메일 형식을 지켜주세요');
        expect(toast).toBeInTheDocument();
      });
    })

    it('If data has no error, Dispatch MODIFY_INFO', () => {
      Date.prototype.getFullYear.mockReturnValue(2019)
      const { getByPlaceholderText, getByText, debug } = render(<ModifyInfoContainer/>, {store: nicknameCheckedStore});
      const passwordInput = getByPlaceholderText('비밀번호 (필수)');
      const passwordConfirmInput = getByPlaceholderText('비밀번호 확인 (필수)');
      const nameInput = getByPlaceholderText('이름 (선택)');
      const phoneNumberInput = getByPlaceholderText('전화번호 (Ex: 010-0000-0000) (선택)');
      const emailInput = getByPlaceholderText('이메일 등록');
      const submitButton = getByText('정보수정');

      fireEvent.change(passwordInput,{target: {value: 'asdf1234!'}})
      fireEvent.change(passwordConfirmInput,{target: {value: 'asdf1234!'}})
      fireEvent.change(nameInput,{target: {value: '한기대'}})
      fireEvent.change(phoneNumberInput,{target: {value: '010-1234-5678'}})
      fireEvent.change(emailInput,{target: {value: 'asdf@asdf.com'}})
      Storage.prototype.getItem.mockReturnValue('1234');
      userEvents.click(submitButton);

      expect(nicknameCheckedStore.getActions())
        .toEqual(expect
          .arrayContaining(
            [
              {
                type: MODIFY_INFO,
                payload: {
                  token: '1234',
                  userInfo: {
                    portal_account: 'koin',
                    password: 'asdf1234!',
                    name: '한기대',
                    major: undefined,
                    nickname: undefined,
                    gender: '',
                    student_number: undefined,
                    phone_number: '010-1234-5678',
                    identity: 5,
                    is_graduated: undefined,
                    email: 'asdf@asdf.com'
                  }
                }
              }]));
    })
  });

})
