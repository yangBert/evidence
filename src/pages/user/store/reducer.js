import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  name: "",
  userType: "",
  password: "",
  rePassword: "",
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.SET_NAME:
      newState.name = action.name
      break;
    case types.SET_TYPE:
      newState.userType = action.userType
      break;
    case types.SET_PASSWORD:
      newState.password = action.password
      break;
    case types.SET_RE_PASSWORD:
      newState.rePassword = action.rePassword
      break;
    default:
      break;
  }
  return newState
}