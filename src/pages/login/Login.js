import React from 'react';
import styles from './login.module.css';
import logo from 'static/img/logo.png';
import policeImage from 'static/img/police.png';
import LoginButton from './LoginButton';
import platForm from 'static/js/config';

function Login(props) {
  const copyright = document.getElementById('CONFIG_GLOBAL_COPYRIGHT').value;
  return (
    <div className={styles.bg}>
      <div>
        <div className={styles.pageCenter}>
          <img className={styles.logo} src={logo} alt="" />
          <h2 className={styles.title}>{platForm.platFormName}</h2>
          <LoginButton loginProps={props} />
        </div>
      </div>
      <div className={styles.footer}>sdfsdfsdfsdfsdf
        {copyright}<img src={policeImage} alt="copyright" />
      </div>
    </div>
  )
}

export default Login;
