import React from 'react';
import {Input, Modal } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function Add(props) {

  function handleOk() {
    const reg = /^[0-9A-Za-z]{10}$/g.test(props.appID)
    if(!reg){
      Modal.error({
        title: '系统提示',
        content: "请输入10位：字母大小写或数字",
        okText: '确认',
      });
      return;
    }
    const data = {
      appID: props.appID,
    }
    props.submitFn({data})
  }

    return (
      <div>
        <Modal
          title="新增应用"
          visible={props.visible}
          onOk={() => handleOk()}
          onCancel={() => props.changeModal(false)}
          confirmLoading={props.saveLoading}
        >
          <p>appID规则：数字、大小写字母10位<br></br></p>
          <Input 
            allowClear
            onChange={e => props.setAppID(e.target.value)}
            value={props.appID}
          placeholder="请输入appID" />
        </Modal>
      </div>
    )
}

const mapState = state => ({
  spinning: state.app.spinning,
  visible:state.app.visible,
  appID:state.app.addAppID,
  saveLoading: state.app.saveLoading,
})

const mapDispatch = dispatch => ({
  setAppID: req => {
    const action = creators.setAppIDAction(req);
    dispatch(action);
  },
  changeModal: req => {
    const action = creators.changeModalAction(req);
    dispatch(action);
  },
  submitFn: req => {
    const action = creators.submitFnAction(req);
    dispatch(action);
  },

  
})

export default connect(mapState, mapDispatch)(Add);