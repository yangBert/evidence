import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
//import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import $$ from 'static/js/base.js';


const loginSubmitAction = req => {
  return dispatch => {
    dispatch(changeLoginLoading(true))
    request.json(requestURL.evidenceLogin, req.data, res => {
      dispatch(changeLoginLoading(false))
      if (res.data) {
        const { code, msg, data } = res.data
        if (code === 0) {
          $$.token.set(data)
          req.props.history.push("/home")
        } else {
          notification('error', msg)
        }
      } else {
        notification('error', res)
      }
    }, false)
  }
}

//改变编辑弹出层提交按钮loading状态
const changeLoginLoading = loginLoading => ({
  type: types.CHANGE_LOGIN_LOADING,
  loginLoading,
})

const onChangeNameAction = loginName => ({
  type: types.CHANGE_LOGIN_NAME,
  loginName,
})

const onChangePasswordAction = password => ({
  type: types.CHANGE_PASSWORD,
  password,
})


export {
  onChangeNameAction,
  changeLoginLoading,
  onChangePasswordAction,
  loginSubmitAction
}