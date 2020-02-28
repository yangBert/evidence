import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styles from './login.module.css';
import * as creators from './store/creators';
import { connect } from 'react-redux';
import { Button, Input, message } from 'antd';

function LoginButton(props) {
  const [refName, setRefName] = useState(null)
  const [refPassword, setRefPassword] = useState(null)

  function login() {
    const username = props.loginName
    const password = props.password
    if (username === "") {
      message.error('请输入用户名')
      refName.focus()
      return
    } else if (password === "") {
      message.error('请输入密码')
      refPassword.focus()
      return
    }
    const data = { username, password }
    props.loginSubmit({ props, data })
  }

  return <div>
    <div className={styles.formBlock}>
      <Input
        style={{ height: "35px", marginBottom: "20px" }}
        placeholder="请输入账号"
        onChange={e => props.onChangeName(e.target.value)}
        value={props.loginName}
        ref={input => setRefName(input)}
      />
      <Input
        style={{ height: "35px" }}
        placeholder="请输入密码"
        type="password"
        value={props.password}
        onChange={e => props.onChangePassword(e.target.value)}
        ref={input => setRefPassword(input)}
      />
    </div>

    <Button
      type="primary"
      size="large"
      style={{ height: "41px", fontSize: "20px" }}
      className={styles.submit}
      onClick={() => login()}
      loading={props.loginLoading}
    >登 录</Button>
  </div>

}

const mapState = state => ({
  loginLoading: state.login.loginLoading,
  loginName: state.login.loginName,
  password: state.login.password,
})

const mapDispatch = dispatch => ({
  onChangeName: params => {
    const action = creators.onChangeNameAction(params);
    dispatch(action);
  },
  onChangePassword: params => {
    const action = creators.onChangePasswordAction(params);
    dispatch(action);
  },
  loginSubmit: params => {
    const action = creators.loginSubmitAction(params);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(LoginButton));
