import React from 'react';
import styles from './login.module.css';
import { Button, Modal } from 'antd';
import { GZCA } from 'static/plugins/gzca/js/gzca';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import { withRouter } from 'react-router-dom';

function UKey(props) {
  //初始化连接
  function initSocket() {
    GZCA.init((res) => {
      if (res) {
        getUkeyList();
      } else {
        Modal.error({
          title: '系统提示',
          content: res.msg,
          okText: '确认',
          onOk: () => { }
        });
      }
    });
  }

  //获取UKEY列表
  function getUkeyList() {
    const CertType = 1;
    GZCA.GZCA_GetCertList(true, CertType, function (res) {
      if (res.success) {
        getCert(res.ContainerName, CertType)
      } else {
        Modal.error({
          title: '系统提示',
          content: res.msg,
          okText: '确认',
          onOk: () => { }
        });
      }
    });
  }

  //获取签名证书base64
  function getCert(ContainerName, CertType) {
    GZCA.GZCA_ExportCert(ContainerName, CertType, function (res) {
      if (res.success) {
        const certB64 = res.CertB64;
        const data = new FormData();
        data.append("certB64", certB64)
        props.getUkeyData({ props, GZCA, ContainerName, data })
      } else {
        Modal.error({
          title: '系统提示',
          content: res.msg,
          okText: '确认',
          onOk: () => { }
        });
      }
    });
  }

  return (
    <div className={styles.keyContainer}>
      <p>注意事项：</p>
      <p>1、确保安装GZCA数字证书助手</p>
      <p>2、确保已插入介质UKEY</p>
      <Button
        type="primary"
        size="large"
        style={{ height: "41px", fontSize: "20px" }}
        className={styles.submit}
        onClick={() => initSocket()}
        loading={props.ukeyLoading}
      >登 录</Button>
    </div>

  )
}

const mapState = state => ({
  ukeyLoading: state.login.ukeyLoading,
})

const mapDispatch = dispatch => ({
  getUkeyData: req => {
    const action = creators.getUkeyDataAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(UKey));