import * as types from './actionTypes'
const defaultState = {
  loginLoading: false,
  loginName: "",
  password: ""
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
    default:
      break;
  }
  return newState
}