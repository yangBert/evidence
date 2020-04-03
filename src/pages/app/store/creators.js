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

//保存
const submitFnAction = req => {
  return dispatch => {
    dispatch(onChangeSaveLoadingAction(true))
    const url = requestURL.evidenceCreatApp
    request.json(url, req.data, res => {
      dispatch(onChangeSaveLoadingAction(false))
      dispatch(changeModalAction(false))
      if (res.data) {
        const { code, msg } = res.data
        if (code === 0) {
          notification('success', msg)
          dispatch(queryListAction({ data: { pageSize: 10, pageNo: 1 } }))
        } else {
          Modal.error({
            title: '系统提示',
            content: msg,
            okText: '确认',
            onOk: () => { }
          });
        }
      } else {
        req.props.history.push("")
      }
    }, true)
  }
}

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const reqData = req.data
    console.log("req", req.data)
    request.json(requestURL.evidenceQueryApp, reqData, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { code, data, count, msg } = res.data
        if (code === 0) {
          const action = initListAction(data, createPagination({
            totalSize: count,
            pageSize: reqData.pageSize,
            pageNo: reqData.pageNo,
          }))
          dispatch(action)
        } else {
          Modal.error({
            title: '系统提示',
            content: msg,
            okText: '确认',
            onOk: () => { }
          });
        }
      } else {
        req.props.history.push("")
      }
    }, true)
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