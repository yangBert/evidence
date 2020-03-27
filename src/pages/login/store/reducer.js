import * as types from './actionTypes'
const defaultState = {
  loginLoading: false,
  loginName: "",
  password: "",
  ukeyLoading: false
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.CHANGE_LOGIN_LOADING:
      newState.loginLoading = action.loginLoading
      break;
    case types.CHANGE_LOGIN_NAME:
      newState.loginName = action.loginName
      break;
    case types.CHANGE_PASSWORD:
      newState.password = action.password
      break;
    case types.CHANGE_UKEY_LOADING:
      newState.ukeyLoading = action.ukeyLoading
      break;
    default:
      break;
  }
  return newState
}