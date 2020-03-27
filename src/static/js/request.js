import axios from 'axios';
//import qs from 'qs';
import $$ from 'static/js/base';
import notification from 'pages/common/layer/notification';
const errorMsg = "请求失败,请检查网络"

function authRedirect(message) {
  $$.token.set("")
  if (window.$GLOBALPROPS) {
    window.$GLOBALPROPS.history.push("/")
  }
  notification("error", message)
}

function configFn(url, data, method, isToken) {
  const config = {
    url,
    method,
    data,
  }
  const TOKEN = $$.token.get()
  if (isToken) {
    config.headers = {}
    config.headers["E-token"] = TOKEN
  }
  return config
}

function json(requestURL, requestData, callback, isToken) {
  const config = configFn(requestURL, requestData, 'POST', isToken)
  axios(config).then(res => {
    callback(res)
  }).catch((err) => {
    callback(err);
  })
}

function getJson(requestURL, requestData, callback) {
  const config = configFn(requestURL, requestData, 'GET')
  axios(config).then(res => {
    if (res.data && !res.data.success && res.data.errCode === '400') {
      authRedirect(res.data.message)
    } else {
      callback(res)
    }
  }).catch(err => {
    console.log(err);
    callback(errorMsg);
  })
}

function jsonArr(requestURL, requestData, callback) {
  let config = {
    url: requestURL,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'E-token': $$.token.get()
    },
    data: requestData,
  }
  const AuthToken = $$.token.get()
  if (AuthToken) {
    config.headers["E-token"] = AuthToken
  }
  axios(config).then(res => {
    if (res.data && !res.data.success && res.data.errCode === '400') {
      authRedirect(res.data.message)
    } else {
      callback(res)
    }
  }).catch((err) => {
    console.log(err);
    callback(errorMsg);
  })
}


function formData(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'E-token': $$.token.get()
    },
    // transformRequest: [function (data) {
    //   return qs.stringify(data);
    // }],
  }).then(res => {
    if (res.data && !res.data.success && res.data.errCode === '400') {
      authRedirect(res.data.message)
    } else {
      callback(res)
    }
  }).catch((err) => {
    console.log(err);
    callback(errorMsg);
  })
}

function urlToBlob(requestURL, callback) {
  axios({
    url: requestURL,
    method: 'get',
    responseType: 'blob'
  }).then(res => {
    if (res.data && !res.data.success && res.data.errCode === '400') {
      authRedirect(res.data.message)
    } else {
      callback(res)
    }
  }).catch((err) => {
    console.log(err);
    callback(errorMsg);
  })
}

export { json, jsonArr, formData, urlToBlob, getJson }