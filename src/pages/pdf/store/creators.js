import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import { Modal } from 'antd'

const sigSaveLoadingAction = sigSaveLoading => ({
  type: types.SIG_SAVE_LOADING,
  sigSaveLoading
})

const setResultsAction = results => ({
  type: types.SET_RESULTS,
  results
})

const sigSaveAction = req => {
  return dispatch => {
    dispatch(sigSaveLoadingAction(true))
    console.log("req", req.data)
    request.formData(requestURL.pdfSig, req.data, res => {
      dispatch(sigSaveLoadingAction(false))
      console.log("res", res)
      if (res.data) {
        const { code, data, msg } = res.data
        if (code === 0) {
          let pdfWindow = window.open("")
          pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(data) + "'></iframe>")
        } else {
          Modal.error({
            title: '系统提示',
            content: msg,
            okText: '确认',
            onOk: () => { }
          });
        }
      } else {
        req.props.history.push("/")
      }
    }, true)
  }
}

const verSaveAction = req => {
  return dispatch => {
    dispatch(sigSaveLoadingAction(true))
    request.formData(requestURL.pdfVer, req.data, res => {
      dispatch(sigSaveLoadingAction(false))
      console.log("res", res)
      if (res.data) {
        const { code, data, msg } = res.data
        if (code === 0) {
          dispatch(setResultsAction(data))
        } else {
          Modal.error({
            title: '系统提示',
            content: msg,
            okText: '确认',
            onOk: () => { }
          });
        }
      } else {
        req.props.history.push("/")
      }
    }, true)
  }
}

export {
  sigSaveAction,
  verSaveAction
}