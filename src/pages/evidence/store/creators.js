import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'
import sm3 from 'sm3';

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

const onChangeAppkeyAction = appkey => ({
  type: types.CHANGE_APP_KEY,
  appkey
})


const changeFileHashAction = fileHash => ({
  type: types.CHANGE_FILE_HASH,
  fileHash
})

const changeFileNameAction = fileName => ({
  type: types.CHANGE_FILE_NAME,
  fileName
})
const changeFileSizeAction = fileSize => ({
  type: types.CHANGE_FILE_SIZE,
  fileSize
})

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

//保存
const saveAction = req => {
  return dispatch => {
    const url = requestURL.evidencesave
    request.json(url, req.data, res => {
      dispatch(onChangeSaveLoadingAction(false))
      console.log("保存", res)
      if (res.data) {
        const { code, msg } = res.data
        if (code === 0) {
          Modal.success({
            title: '系统提示',
            content: msg,
            okText: '确认',
            onOk: () => {
              req.props.history.goBack();
            }
          });
        } else {
          dispatch(onChangeSaveLoadingAction(false))
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

//区块链数据收集
function collectData(d) {
  const { fileHash, fileName, fileSize } = d
  const appKey = document.getElementById("CONFIG_GLOBAL_APPKEY").value;
  const secret = document.getElementById("CONFIG_GLOBAL_SECRET").value;
  const evidenceData = JSON.stringify({ fileHash, fileName, fileSize })
  const sign = sm3(appKey + evidenceData + secret)
  return {
    appKey,
    evidenceData,
    sign,
  }
}

//调用区块链接口
const createEvidenceAction = req => {
  const reqData = collectData(req.data)
  return dispatch => {
    const url = requestURL.evidenceCreate
    dispatch(onChangeSaveLoadingAction(true))
    request.json(url, reqData, res => {
      console.log("res", res)
      if (res.data) {
        const bcHash = res.data.data.bcHash
        const saveData = req.data;
        saveData.id = bcHash
        dispatch(saveAction({ props: req.props, data: saveData }))
      } else {
        console.log("存证区块链：", res)
      }
    }, true)
  }
}

const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    let reqData = req.data;
    if (!reqData.startTime) {
      reqData.startTime = "2000-02-19";
      reqData.endTime = "2220-10-19";
    }
    request.json(requestURL.evidenceQueryByTime, reqData, res => {
      dispatch(spinningAction(false))
      console.log("res", res)
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

const initAppListAction = appList => ({
  type: types.INIT_APP_LIST,
  appList
})

const queryFetchAppkeyAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.evidenceQueryApp, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { code, data } = res.data
        if (code === 0) {
          const action = initAppListAction(data, createPagination(data))
          dispatch(action)
        } else {
          req.props.history.push("")
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
  onChangeAppkeyAction,
  queryFetchAppkeyAction,
  changeFileNameAction,
  changeFileHashAction,
  changeFileSizeAction,
  createEvidenceAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
}