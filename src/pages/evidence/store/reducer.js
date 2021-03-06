import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  fileHash: "",
  fileSize: 0,
  fileName: "",
  appkey: "",
  appList: [],
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
    case types.CHANGE_FILE_HASH:
      newState.fileHash = action.fileHash
      break;
    case types.CHANGE_FILE_NAME:
      newState.fileName = action.fileName
      break;
    case types.CHANGE_FILE_SIZE:
      newState.fileSize = action.fileSize
      break;
    case types.CHANGE_APP_KEY:
      newState.appkey = action.appkey
      break;
    case types.INIT_APP_LIST:
      newState.appList = action.appList
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    default:
      break;
  }
  return newState
}