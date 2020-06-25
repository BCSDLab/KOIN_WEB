import React from 'react';
import { makeStore, render, cleanup, waitFor, fireEvent } from '../../../lib/testUtils'
import PromotionRegisterContainer from "../PromotionRegisterContainer";
import '@testing-library/jest-dom/extend-expect';
import userEvents from "@testing-library/user-event";
import {CHECK_MY_PENDING_PROMOTION, GET_MY_STORE, REGISTER_PROMOTION} from "../../../modules/promotion";

let _Date;

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



describe('<PromotionRegisterContainer/>', () => {
  const defaultStore = makeStore({
    promotionReducer: {
      data: null,
      error: null,
      post: {
        data: null,
        loading: false,
        error: null
      },
      myStore: {
        data: null,
        error: null
      }
    }
  });

  const registerMatch = {
    isExact: true,
    path: '/board/:type/:id',
    url: '/board/promotion/register',
    params: {
      type: 'promotion',
      id: 'register'
    }
  };

  const history = {
    replace: jest.fn(),
    goBack: jest.fn()
  }

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

  afterAll(() => {
    global.Date = _Date
    sessionStorage.clear()
  })

  afterEach(() => {
    defaultStore.clearActions();
    history.replace.mockClear()
    history.goBack.mockClear()
    window.alert.mockClear()
    cleanup();
  })

  describe('Before Rendering', () => {

    it('Should identity is 5', async () => {
      sessionStorage.setItem('userInfo',
        JSON.stringify({
          identity: 1,
          nickname: 'koin',
          portal_account: 'koin'
        }))

      render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );

      expect(window.alert.mock.calls).toEqual(expect.arrayContaining([['점주만이 홍보 게시글을 작성할 수 있습니다']]))

      expect(history.goBack)
        .toBeCalledTimes(1)
    })

    it('If data has no error, Dispatch CHECK_MY_PENDING_PROMOTION, GET_MY_STORE', async () => {
      sessionStorage.setItem('userInfo', JSON.stringify({
        identity: 5,
        nickname: 'koin',
        portal_account: 'koin'
      }))

      render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );

      expect(defaultStore.getActions()).toEqual(expect.arrayContaining([
          {
            type: CHECK_MY_PENDING_PROMOTION,
            payload: {
              token: '1234'
            }
          },
          {
            type: GET_MY_STORE,
            payload: {
              token: '1234'
            }
          }
        ])
      )
    })

    it('Should startDate and endDate is three-day difference', async () => {
      sessionStorage.setItem('userInfo', JSON.stringify({
        identity: 5,
        nickname: 'koin',
        portal_account: 'koin'
      }))

      render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: defaultStore}
      );
      const startDatePicker = document.getElementById('start');
      const endDatePicker = document.getElementById('end');

      const startDate = startDatePicker.value
      const endDate = endDatePicker.value
      expect(startDate).toEqual('2020-01-01')
      expect(endDate).toEqual('2020-01-04')
    })
  })

  describe('After Render', () => {
    const pendingDataStore = makeStore({
      promotionReducer: {
        data: null,
        error: null,
        post: {
          data: null,
          loading: false,
          error: null,
          pendingData: {
            id: 1,
            title: 'test'
          }
        },
        myStore: {
          data: null,
          error: null
        }
      }
    })

    sessionStorage.setItem('userInfo', JSON.stringify({
      identity: 5,
      nickname: 'koin',
      portal_account: 'koin'
    }))

    it('post.pendingData is not null and confirm alert, change to edit page', async () => {
      window.confirm.mockImplementation( e => true)
      render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: pendingDataStore}
      );

      expect(window.confirm.mock.calls).toEqual(expect.
        arrayContaining([['현재 진행중인 이벤트가 있습니다.\n수정하시겠습니까?']])
      )

      expect(history.replace)
        .toBeCalledTimes(1)
      expect(history.replace)
        .toBeCalledWith('/board/promotion/edit')
      expect(sessionStorage.getItem("postId")).toBe('1')
    })

    it('post.pendingData is not null and confirm alert, go back previous page', async () => {
      window.confirm.mockImplementation( e => false)
      render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: pendingDataStore}
      );

      expect(history.goBack)
        .toBeCalledTimes(1)
    })

    it('If post.error is not null, popup error toast', async () => {
      const errorStore = makeStore({
        promotionReducer: {
          data: null,
          error: null,
          post: {
            data: null,
            loading: false,
            error: {}, // 모든 에러
            pendingData: true
          },
          myStore: {
            data: null,
            error: null
          }
        }
      })
      const { getByText } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: errorStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글 체크 중 에러가 발생했습니다.');
        expect(toast).toBeInTheDocument();
      })
    })
  })

  describe('Enter Data', () => {
    const dataStore = makeStore({
      promotionReducer: {
        data: null,
        error: null,
        post: {
          data: null,
          loading: false,
          error: null,
          pendingData: true
        },
        myStore: {
          data: [
            {
              shop_id: 1,
              name: "한기대"
            },
            {
              shop_id: 2,
              name: "코리아텍"
            }
          ],
          error: null
        }
      }
    })

    sessionStorage.setItem('userInfo', JSON.stringify({
      identity: 5,
      nickname: 'koin',
      portal_account: 'koin'
    }))

    afterEach(() => {
      dataStore.clearActions()
    })

    it.each([
      ['enter title', ''],
      ['enter content', 'test'],
    ]) ('Should %s', async (_, title) => {

      const { getByPlaceholderText, getByText } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );

      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const submitButton = getByText('등록');

      fireEvent.change(titleInput, {target: {value: title}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('제목과 내용을 채워주세요');
        expect(toast).toBeInTheDocument();
      })
    })

    it('Should title is not more than 20', async () => {
      const { getByPlaceholderText, getByText, getByTestId } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );
      sessionStorage.setItem('userInfo', JSON.stringify({
        identity: 5,
        nickname: 'koin',
        portal_account: 'koin'
      }))
      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const contentInput = getByTestId('content');
      const submitButton = getByText('등록');

      fireEvent.change(titleInput, {target: {value: 'test is good for you.'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('제목 길이는 최대 20자 입니다. 지금 제목의 길이는 21자 입니다.');
        expect(toast).toBeInTheDocument();
      })
    })

    it.each([
      ['enter summary', '', '홍보 문구를 채워주세요'],
      ['summary is not more than 20', 'test is good for you and me. So we must finish test successfully, and fast',
        '홍보 문구 길이는 최대 50자 입니다. 지금 제목의 길이는 74자 입니다.'],
    ]) ('Should %s', async (_, summary, toastContext) => {
      const { getByPlaceholderText, getByText, getByTestId } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );
      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const contentInput = getByTestId('content');
      const summaryInput = getByPlaceholderText('홍보문구를 입력해주세요. (50자 이내)');
      const submitButton = getByText('등록');

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});
      fireEvent.change(summaryInput, {target: {value: summary}});

      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      })
    })

    it.each([
      ['In IE, Should end date match regex', 'test', '날짜는 형식에 맞춰 적어주세요. 예시)2020-01-01'],
      ['Should end date later than start date', '2019-12-31', '시작 일자는 종료 일자보다 앞서야 합니다.'],
      ['Should startDate and endDate is not over one-month difference',  '2020-02-02', '최대 홍보 기간은 한 달입니다.'],
    ]) ('%s', async (_, dateInputData, toastContext) => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );
      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const contentInput = getByTestId('content');
      const summaryInput = getByPlaceholderText('홍보문구를 입력해주세요. (50자 이내)');
      const dateInput = document.getElementById('end');
      const submitButton = getByText('등록');

      await userEvents.type(titleInput, 'test');
      await userEvents.type(contentInput, 'testing');
      await userEvents.type(summaryInput, 'test is good for you');
      fireEvent.change(dateInput, {target: {value: dateInputData}})
      userEvents.click(submitButton);
      expect(1).toBe(1)
      await waitFor(() => {
        const toast = getByText(toastContext);
        expect(toast).toBeInTheDocument();
      })
    })

    it('Should endDate is after today', async () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );
      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const contentInput = getByTestId('content');
      const summaryInput = getByPlaceholderText('홍보문구를 입력해주세요. (50자 이내)');
      const startDateInput = document.getElementById('start');
      const endDateInput = document.getElementById('end');
      const submitButton = getByText('등록');

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});
      fireEvent.change(summaryInput, {target: {value: 'test is good for you.'}});
      fireEvent.change(startDateInput, {target: {value: '2019-12-10'}})
      fireEvent.change(endDateInput, {target: {value: '2019-12-31'}})
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('종료 일자는 오늘 이후여야 합니다.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('Should select shop', async () => {
      // = If my shop is null
      const noShopStore = makeStore({
        promotionReducer: {
          data: null,
          error: null,
          post: {
            data: null,
            loading: false,
            error: null,
            pendingData: true
          },
          myStore: {
            data: null,
            error: null
          }
        }
      })

      const { getByText, getByPlaceholderText, getByTestId } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: noShopStore}
      );
      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const contentInput = getByTestId('content');
      const summaryInput = getByPlaceholderText('홍보문구를 입력해주세요. (50자 이내)');
      const submitButton = getByText('등록');

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});
      fireEvent.change(summaryInput, {target: {value: 'test is good for you.'}});
      userEvents.click(submitButton);

      await waitFor(() => {
        const toast = getByText('홍보할 상점을 선택해주세요.');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If data has no error, Dispatch REGISTER_PROMOTION', async () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );
      const titleInput = getByPlaceholderText('제목을 입력해주세요. (20자 이내)');
      const contentInput = getByTestId('content');
      const summaryInput = getByPlaceholderText('홍보문구를 입력해주세요. (50자 이내)');
      const submitButton = getByText('등록');

      fireEvent.change(titleInput, {target: {value: 'test'}});
      fireEvent.change(contentInput, {target: {value: 'testing'}});
      fireEvent.change(summaryInput, {target: {value: 'test is good for you.'}});
      userEvents.click(submitButton);

      expect(dataStore.getActions())
        .toContainEqual(expect
          .objectContaining(
            {
              type: REGISTER_PROMOTION,
              payload: {
                body: {
                  title: 'test',
                  content: 'testing',
                  event_title: 'test is good for you.',
                  shop_id: 1,
                  thumbnail: undefined,
                  start_date: '2020-01-01',
                  end_date: '2020-01-04',
                },
                token: '1234'
              }
            }
          ));
    })
  })
  describe('After register', () => {

    it('If data.status is 201, popup toast', async () => {
      const dataStore = makeStore({
        promotionReducer: {
          data: {status: 201, data: {}},
          error: null,
          post: {
            data: null,
            loading: false,
            error: null,
            pendingData: true
          },
          myStore: {
            data: null,
            error: null
          }
        }
      })
      const { getByText } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: dataStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글을 등록했습니다');
        expect(toast).toBeInTheDocument();
      })
    })

    it('If error is not null, popup toast', async () => {
      const errorStore = makeStore({
        promotionReducer: {
          data: null,
          error: {},
          post: {
            data: null,
            loading: false,
            error: null,
            pendingData: true
          },
          myStore: {
            data: null,
            error: null
          }
        }
      })
      const { getByText } = render(
        <PromotionRegisterContainer history={history} match={registerMatch}/>,
        {store: errorStore}
      );

      await waitFor(() => {
        const toast = getByText('게시글 등록 중 에러가 발생했습니다.');
        expect(toast).toBeInTheDocument();
      })
    })
  })
})
