import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

const setNameAction = name => ({
  type: types.SET_NAME,
  name
})

const setTypeAction = userType => ({
  type: types.SET_TYPE,
  userType
})

const setPasswordAction = password => ({
  type: types.SET_PASSWORD,
  password
})


const setRePasswordAction = rePassword => ({
  type: types.SET_RE_PASSWORD,
  rePassword
})

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

//保存
const saveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = requestURL.evidenceAddUser
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { code, msg } = res.data && res.data
        if (code === 0) {
          Modal.success({
            title: '系统提示',
            content: msg,
            okText: '确认',
            onOk: () => {
              req.props.history.goBack()
            }
          });
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

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const reqData = req.data
    request.json(requestURL.evidenceGetList, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { code, data, count, msg } = res.data && res.data
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
        req.props.history.push("/")
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
  saveAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,

  setNameAction,
  setTypeAction,
  setPasswordAction,
  setRePasswordAction,
}