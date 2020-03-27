import React, { useState } from 'react';
import { Input, message, Form, Select, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';
import { GZCA } from 'static/plugins/gzca/js/gzca';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

function UKey(props) {
  const [userType, setUserType] = useState("")
  const [cert, setCert] = useState("")

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
        const CertB64 = res.CertB64;
        setCert(CertB64)
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

  function save() {
    if (userType === "") {
      message.error('请选择用户类型');
      return
    } else if ($$.trim(cert) === "") {
      message.error('证书base64为空');
      return
    }

    const data = new FormData()
    data.append("userType", userType)
    data.append("cert", cert)
    props.save({ data, props: props })
  }

  return (
    <Form className={`${styles.form} clearfix`}>

      <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">用户类型：</label>
        <div className={`${styles.inline} pullLeft`}>
          <Select
            value={userType}
            style={{ width: "100%" }}
            onChange={value => setUserType(value)}
          >
            <Option value={9527}>请选择</Option>
            <Option value={0}>管理员</Option>
            <Option value={1}>普通操作员</Option>
          </Select>
        </div>
      </div>
      <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">用户签名证书：</label>
        <div className={`${styles.inline} pullLeft`}>
          <TextArea
            rows={4}
            placeholder="用户签名证书"
            onChange={e => setCert(e.target.value)}
            value={cert}
          />
        </div>
      </div>
      <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">&nbsp;</label>
        <div className={`${styles.inline} pullLeft`}>
          <Button size="large" onClick={() => initSocket()} type="primary">读取签名证书</Button>&nbsp;&nbsp;
          <Button size="large" onClick={() => save()} type="primary">保存</Button>&nbsp;&nbsp;
          <Button
            size="large"
            type="primary"
            onClick={() => props.history.goBack()}
          >返回列表</Button>
        </div>
      </div>
    </Form>
  )
}

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.certSaveAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(null, mapDispatch)(UKey));