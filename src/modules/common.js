export const UPDATE_FOOTER_MENU = 'UPDATE_FOOTER_MENU';

export const updateFooterMenu = payload => ({ type: UPDATE_FOOTER_MENU, payload });

const initialState = {
  nowFooterMenu: [false, false, false]
}

export default function commonReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_FOOTER_MENU:
      console.log(action.payload);
      return {
        ...state,
        nowFooterMenu: state.nowFooterMenu.map((item, index) => index === action.payload ? !item : item)
      }
    default:
      return state;
  }
}