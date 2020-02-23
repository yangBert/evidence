import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

const setAppIDAction = addAppID => ({
  type: types.SET_APP_ID,
  addAppID
})

//弹出层
const changeModalAction = visible => ({
  type: types.SCHANGE_VISIBLE,
  visible
})


//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

//保存和修改
const submitFnAction = req => {
  return dispatch => {
    dispatch(onChangeSaveLoadingAction(true))
    console.log("req",req);
    const url = req.data.id ? requestURL.evidenceCreatApp : requestURL.evidenceCreatApp
    request.json(url, req.data, res => {
      console.log("res", res);
      dispatch(onChangeSaveLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          Modal.success({
            title: '系统提示',
            content: message,
            okText: '确认',
            onOk: () => {
              req.props.history.goBack()
            }
          });
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.linkQueryLinksByPage, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initListAction(data.results, createPagination(data))
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}


//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  queryListAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  setAppIDAction,
  changeModalAction,
  submitFnAction
}