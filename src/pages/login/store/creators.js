import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
//import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import $$ from 'static/js/base.js';


const changeLoginLoading = loginLoading => ({
  type: types.CHANGE_LOGIN_LOADING,
  loginLoading,
})

const changeUkeyLoading = ukeyLoading => ({
  type: types.CHANGE_UKEY_LOADING,
  ukeyLoading,
})

const onChangeNameAction = loginName => ({
  type: types.CHANGE_LOGIN_NAME,
  loginName,
})

const onChangePasswordAction = password => ({
  type: types.CHANGE_PASSWORD,
  password,
})

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

const uekyLoginAction = req => {
  return dispatch => {
    console.log("req", req)
    request.json(requestURL.apiVerfy, req.data, res => {
      console.log("res", res)
      dispatch(changeUkeyLoading(false))
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


//签名
function pkcs1SignData_PIN(props, dispatch, GZCA, containerName, original) {
  GZCA.GZCA_Pkcs1SignData_PIN(containerName, original, function (res) {
    if (res.success) {
      const sigtureB64 = res.SignData;
      const data = new FormData();
      console.log("sigtureB64", sigtureB64);
      console.log("src", original);
      data.append("sigtureB64", sigtureB64);
      data.append("src", original);

      dispatch(uekyLoginAction({ data, props }));
    } else {
      dispatch(changeUkeyLoading(false))
      notification('error', res.msg)
    }
  });
}

const getUkeyDataAction = req => {
  return dispatch => {
    dispatch(changeUkeyLoading(true))
    request.json(requestURL.apiGetSigPlan, req.data, res => {
      console.log("res", res)
      if (res.data) {
        const { code, msg, data } = res.data
        if (code === 0) {
          pkcs1SignData_PIN(req.props, dispatch, req.GZCA, req.ContainerName, data)
        } else {
          dispatch(changeUkeyLoading(false))
          notification('error', msg)
        }
      } else {
        dispatch(changeUkeyLoading(false))
        notification('error', res)
      }
    }, false)
  }
}



export {
  onChangeNameAction,
  changeLoginLoading,
  onChangePasswordAction,
  loginSubmitAction,
  getUkeyDataAction,
}