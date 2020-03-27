import React from 'react';
import styles from './login.module.css';
import logo from 'static/img/logo.png';
import policeImage from 'static/img/police.png';
import LoginButton from './LoginButton';
import platForm from 'static/js/config';
import { Tabs } from 'antd';
import UKey from './UKey';

const { TabPane } = Tabs;

function Login(props) {
  const copyright = document.getElementById('CONFIG_GLOBAL_COPYRIGHT').value;
  return (
    <div className={styles.bg}>
      <div>
        <div className={styles.pageCenter}>
          <div className={styles.header}>
            <img className={styles.logo} src={logo} alt="" />
            <h2 className={styles.title}>{platForm.platFormName}</h2>
          </div>
          <div style={{ textAlign: "left", paddingLeft: "10%" }}>
            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab="介质UKEY登录" key="1">
                <UKey />
              </TabPane>
              <TabPane tab="用户名密码登录" key="2">
                <LoginButton loginProps={props} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {copyright}<img src={policeImage} alt="copyright" />
      </div>
    </div>
  )
}

export default Login;
