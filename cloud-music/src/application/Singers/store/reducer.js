import { fromJS } from 'immutable';
import * as actionTypes from './constants';
export const defaultState = fromJS({
  singerList: [],
  enterLoading: false,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
});

export default (state = defaultState, action ) => {
  switch (action.type) {
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data);
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data);
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data);
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data);
    default:
      return state;
  }
}